import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set.');
  console.log('💡 Please set DATABASE_URL in your .env file or environment variables.');
  console.log('   Example: DATABASE_URL=postgres://username:password@localhost:5432/dbname');
  process.exit(1);
}

// Path to the OpenRouter JSON cache file
const CACHE_FILE_PATH = path.join(__dirname, '../cache/openrouter-models.json');

// Providers we want to import
const TARGET_PROVIDERS = ['openai', 'anthropic', 'google'];

// Provider name mapping (from OpenRouter format to our DB format)
const PROVIDER_MAPPING: Record<string, string> = {
  'openai': 'OpenAI',
  'anthropic': 'Anthropic', 
  'google': 'Google'
};

interface OpenRouterModel {
  id: string;
  name: string;
  created?: number;
  description?: string;
  context_length: number;
  architecture?: {
    modality?: string;
    input_modalities?: string[];
    output_modalities?: string[];
    tokenizer?: string;
    instruct_type?: string | null;
  };
  pricing: {
    prompt: string;
    completion: string;
    request?: string;
    image?: string;
    web_search?: string;
    internal_reasoning?: string;
  };
  top_provider?: {
    context_length?: number;
    max_completion_tokens?: number | null;
    is_moderated?: boolean;
  };
  supported_parameters?: string[];
}

interface JSONCache {
  data: OpenRouterModel[];
  timestamp: number;
  last_updated: string;
}

interface ModelStats {
  created: number;
  updated: number;
  skipped: number;
  errors: number;
}

/**
 * Normalize the ID string according to the specified rules:
 * - For Anthropic: replace dots with dashes
 * - For Google Gemini: fix model name ordering (flash-1.5 → 1.5-flash)
 * - For OpenAI and others: keep original format
 */
function normalizeIdString(originalId: string): string {
  const [provider, ...rawIdParts] = originalId.split('/');
  const rawId = rawIdParts.join('/'); // Handle cases with multiple slashes
  
  if (provider === 'anthropic') {
    // Replace dots only for Anthropic
    return `${provider}/${rawId.replace(/\./g, '-')}`;
  }
  
  if (provider === 'google' && rawId.includes('gemini')) {
    // Fix Gemini model ordering: gemini-flash-1.5 → gemini-1.5-flash
    const geminiFixed = rawId
      .replace(/gemini-flash-(\d+\.?\d*)/g, 'gemini-$1-flash')
      .replace(/gemini-pro-(\d+\.?\d*)/g, 'gemini-$1-pro');
    return `${provider}/${geminiFixed}`;
  }
  
  // Keep original for OpenAI, other Google models, etc.
  return originalId;
}

/**
 * Extract features from OpenRouter model data
 */
function extractFeatures(model: OpenRouterModel) {
  const supportedParams = model.supported_parameters || [];
  
  return {
    supports_json_mode: supportedParams.includes('response_format') || 
                       supportedParams.includes('structured_outputs'),
    supports_tool_use: supportedParams.includes('tool_choice') || 
                      supportedParams.includes('tools') || 
                      model.description?.toLowerCase().includes('tool') || false,
    supports_vision: model.architecture?.input_modalities?.includes('image') || 
                    model.architecture?.modality?.includes('vision') ||
                    model.architecture?.modality?.includes('image') ||
                    model.name.toLowerCase().includes('vision') || false
  };
}

/**
 * Convert pricing from per-token to per-million-tokens format
 */
function convertPricing(pricePerToken: string): number {
  const price = parseFloat(pricePerToken);
  return isNaN(price) ? 0 : price * 1000000;
}

/**
 * Parse release date from timestamp or other formats
 */
function parseReleaseDate(created?: number): string | null {
  if (!created) return null;
  
  try {
    const date = new Date(created * 1000); // Convert Unix timestamp to milliseconds
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  } catch (error) {
    console.warn(`Failed to parse release date: ${created}`);
    return null;
  }
}

/**
 * Upsert a model into the database
 */
async function upsertModel(model: OpenRouterModel, stats: ModelStats): Promise<void> {
  const [providerPrefix] = model.id.split('/');
  const provider = PROVIDER_MAPPING[providerPrefix];
  
  if (!provider) {
    console.warn(`Unknown provider for model ${model.id}, skipping`);
    stats.skipped++;
    return;
  }

  const normalizedId = normalizeIdString(model.id);
  const features = extractFeatures(model);
  const inputCost = convertPricing(model.pricing.prompt);
  const outputCost = convertPricing(model.pricing.completion);
  const releaseDate = parseReleaseDate(model.created);

  try {
    // Check if model exists
    const existingResult = await pool.query(
      'SELECT id, is_active FROM models WHERE id_string = $1',
      [normalizedId]
    );

    const now = new Date().toISOString();

    if (existingResult.rows.length > 0) {
      // Update existing model (preserving is_active)
      const existingModel = existingResult.rows[0];
      
      await pool.query(`
        UPDATE models SET
          name = $1,
          provider = $2,
          input_cost_per_million_tokens = $3,
          output_cost_per_million_tokens = $4,
          context_length_tokens = $5,
          supports_json_mode = $6,
          supports_tool_use = $7,
          supports_vision = $8,
          description = $9,
          release_date = $10,
          updated_at = $11
        WHERE id_string = $12
      `, [
        model.name,
        provider,
        inputCost,
        outputCost,
        model.context_length || 0,
        features.supports_json_mode,
        features.supports_tool_use,
        features.supports_vision,
        model.description || null,
        releaseDate,
        now,
        normalizedId
      ]);

      console.log(`✅ Updated: ${model.name} (${normalizedId}) - is_active: ${existingModel.is_active}`);
      stats.updated++;
    } else {
      // Insert new model (is_active defaults to false)
      await pool.query(`
        INSERT INTO models (
          name,
          id_string,
          provider,
          input_cost_per_million_tokens,
          output_cost_per_million_tokens,
          context_length_tokens,
          supports_json_mode,
          supports_tool_use,
          supports_vision,
          description,
          release_date,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `, [
        model.name,
        normalizedId,
        provider,
        inputCost,
        outputCost,
        model.context_length || 0,
        features.supports_json_mode,
        features.supports_tool_use,
        features.supports_vision,
        model.description || null,
        releaseDate,
        now,
        now
      ]);

      console.log(`🆕 Created: ${model.name} (${normalizedId})`);
      stats.created++;
    }
  } catch (error) {
    console.error(`❌ Error upserting model ${model.name} (${normalizedId}):`, error);
    stats.errors++;
  }
}

/**
 * Main function to import platform models
 */
async function importPlatformModels(): Promise<void> {
  console.log('🚀 Starting platform models import from OpenRouter cache...');
  console.log(`📁 Reading from: ${CACHE_FILE_PATH}`);

  // Check if cache file exists
  if (!fs.existsSync(CACHE_FILE_PATH)) {
    console.error(`❌ Cache file not found: ${CACHE_FILE_PATH}`);
    console.log('💡 Make sure the rankings page has been loaded to generate the cache file.');
    process.exit(1);
  }

  let cacheData: JSONCache;
  
  try {
    const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
    cacheData = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Failed to read or parse cache file:', error);
    process.exit(1);
  }

  console.log(`📊 Found ${cacheData.data.length} total models in cache`);
  console.log(`📅 Cache last updated: ${cacheData.last_updated}`);

  // Filter models for target providers
  const targetModels = cacheData.data.filter(model => {
    const [provider] = model.id.split('/');
    return TARGET_PROVIDERS.includes(provider);
  });

  console.log(`🎯 Filtered to ${targetModels.length} models from target providers:`);
  
  // Show breakdown by provider
  const providerCounts: Record<string, number> = {};
  targetModels.forEach(model => {
    const [provider] = model.id.split('/');
    providerCounts[provider] = (providerCounts[provider] || 0) + 1;
  });
  
  Object.entries(providerCounts).forEach(([provider, count]) => {
    console.log(`   • ${PROVIDER_MAPPING[provider] || provider}: ${count} models`);
  });

  const stats: ModelStats = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: 0
  };

  console.log('\n🔄 Processing models...\n');

  // Process each model
  for (const model of targetModels) {
    await upsertModel(model, stats);
  }

  // Final summary
  console.log('\n📋 Import Summary:');
  console.log(`   ✅ Created: ${stats.created}`);
  console.log(`   🔄 Updated: ${stats.updated}`);
  console.log(`   ⏭️  Skipped: ${stats.skipped}`);
  console.log(`   ❌ Errors:  ${stats.errors}`);
  console.log(`   📊 Total processed: ${stats.created + stats.updated + stats.skipped + stats.errors}`);

  if (stats.errors > 0) {
    console.log('\n⚠️  Some models failed to import. Check the error messages above.');
  } else {
    console.log('\n🎉 Import completed successfully!');
  }

  // Close database connection
  await pool.end();
}

// Run the import if this script is executed directly
if (require.main === module) {
  importPlatformModels().catch(error => {
    console.error('💥 Fatal error during import:', error);
    process.exit(1);
  });
}

export { importPlatformModels, normalizeIdString }; 