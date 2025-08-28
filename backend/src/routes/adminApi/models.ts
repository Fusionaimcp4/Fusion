import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core'; // Import core for Query type
import * as fs from 'fs';
import * as path from 'path';
import pool from '../../db';
import { logAdminAction } from '../../utils/adminLogger';
import { User as AuthUser } from '../../middleware/auth';

const router = express.Router();

// Interface for the PUT request body
interface UpdateModelBody {
  input_cost_per_million_tokens: string | number;
  output_cost_per_million_tokens: string | number;
  is_active: boolean; // Added is_active
}

// GET /api/admin/models - List all models
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, id_string, provider, input_cost_per_million_tokens, output_cost_per_million_tokens, context_length_tokens, supports_json_mode, supports_tool_use, supports_vision, description, release_date, is_active, created_at, updated_at FROM models ORDER BY provider, name ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('[Admin API] Error fetching models:', error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// PUT /api/admin/models/:modelId - Update a model's pricing and active status
router.put('/:modelId', async (
  req: Request<{ modelId: string }, any, UpdateModelBody, core.Query>,
  res: Response
) => {
  const { modelId } = req.params;
  const { input_cost_per_million_tokens, output_cost_per_million_tokens, is_active } = req.body;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  const targetModelId = parseInt(modelId, 10);
  if (isNaN(targetModelId)) {
    return res.status(400).json({ error: 'Invalid model ID format.' });
  }

  // Validate inputs
  const inputCost = parseFloat(input_cost_per_million_tokens as string);
  const outputCost = parseFloat(output_cost_per_million_tokens as string);

  if (isNaN(inputCost) || inputCost < 0 || isNaN(outputCost) || outputCost < 0) {
    return res.status(400).json({ error: 'Invalid cost values. Must be non-negative numbers.' });
  }
  if (typeof is_active !== 'boolean') {
    return res.status(400).json({ error: 'Invalid is_active value. Must be true or false.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Fetch current model details for validation and logging
    const modelResult = await client.query(
      'SELECT name, input_cost_per_million_tokens, output_cost_per_million_tokens, is_active FROM models WHERE id = $1',
      [targetModelId]
    );

    if (modelResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Model not found.' });
    }

    const currentModel = modelResult.rows[0];
    const oldInputCost = parseFloat(currentModel.input_cost_per_million_tokens);
    const oldOutputCost = parseFloat(currentModel.output_cost_per_million_tokens);
    const oldIsActive = currentModel.is_active;

    // Check if anything is actually changing (no-op)
    if (oldInputCost === inputCost && oldOutputCost === outputCost && oldIsActive === is_active) {
        await client.query('ROLLBACK');
        return res.status(200).json({ 
            message: 'Model details are already set to the provided values. No change made.', 
            model: currentModel 
        });
    }

    // Update model details
    const updateResult = await client.query(
      'UPDATE models SET input_cost_per_million_tokens = $1, output_cost_per_million_tokens = $2, is_active = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [inputCost, outputCost, is_active, targetModelId]
    );

    // Log admin action
    const logDetails = {
      model_id: targetModelId,
      model_name: currentModel.name,
      old_input_cost: oldInputCost,
      new_input_cost: inputCost,
      old_output_cost: oldOutputCost,
      new_output_cost: outputCost,
      old_is_active: oldIsActive,
      new_is_active: is_active,
    };
    await logAdminAction(
      adminUserId,
      'MODEL_CONFIG_UPDATED', // More general action type
      'MODEL',
      targetModelId.toString(),
      logDetails,
      `Updated configuration for model ${currentModel.name} (ID: ${targetModelId})`,
      client
    );

    await client.query('COMMIT');
    res.status(200).json({ message: 'Model configuration updated successfully.', model: updateResult.rows[0] });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`[Admin API] Error updating configuration for model ${targetModelId}:`, error);
    res.status(500).json({ error: 'Failed to update model configuration.' });
  } finally {
    client.release();
  }
});

// Provider name mapping (from OpenRouter format to our DB format)
const PROVIDER_MAPPING: Record<string, string> = {
  'openai': 'OpenAI',
  'anthropic': 'Anthropic', 
  'google': 'Google'
};

// Providers we want to import
const TARGET_PROVIDERS = ['openai', 'anthropic', 'google'];

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
 * Normalize the ID string according to the specified rules
 */
function normalizeIdString(originalId: string): string {
  const [provider, ...rawIdParts] = originalId.split('/');
  const rawId = rawIdParts.join('/');
  
  if (provider === 'anthropic') {
    return `${provider}/${rawId.replace(/\./g, '-')}`;
  }
  
  if (provider === 'google' && rawId.includes('gemini')) {
    const geminiFixed = rawId
      .replace(/gemini-flash-(\d+\.?\d*)/g, 'gemini-$1-flash')
      .replace(/gemini-pro-(\d+\.?\d*)/g, 'gemini-$1-pro');
    return `${provider}/${geminiFixed}`;
  }
  
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
 * Parse release date from timestamp
 */
function parseReleaseDate(created?: number): string | null {
  if (!created) return null;
  
  try {
    const date = new Date(created * 1000);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn(`Failed to parse release date: ${created}`);
    return null;
  }
}

/**
 * Upsert a model into the database
 */
async function upsertModel(model: OpenRouterModel, stats: ModelStats, client: any): Promise<void> {
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
    const existingResult = await client.query(
      'SELECT id, is_active FROM models WHERE id_string = $1',
      [normalizedId]
    );

    const now = new Date().toISOString();

    if (existingResult.rows.length > 0) {
      // Update existing model (preserving is_active)
      await client.query(`
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

      console.log(`✅ Updated: ${model.name} (${normalizedId})`);
      stats.updated++;
    } else {
      // Insert new model (is_active defaults to false)
      await client.query(`
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

// POST /api/admin/models/sync - Sync platform models from OpenRouter cache
router.post('/sync', async (req: Request, res: Response) => {
  const adminUser = req.user as AuthUser;
  const adminUserId = adminUser?.id;

  if (!adminUserId) {
    return res.status(401).json({ error: 'Admin user ID not found in request' });
  }

  const { action } = req.body;
  if (action !== 'sync') {
    return res.status(400).json({ error: 'Invalid action. Expected "sync".' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    console.log('🚀 Starting platform models sync from OpenRouter cache...');
    
    // Get cache file path from environment or default
    const cacheDir = process.env.CACHE_DIR || path.join(process.cwd(), '..', 'cache');
    const CACHE_FILE_PATH = path.join(cacheDir, 'openrouter-models.json');
    console.log(`📁 Reading from: ${CACHE_FILE_PATH}`);

    // Check if cache file exists
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: `Cache file not found: ${CACHE_FILE_PATH}. Make sure the rankings page has been loaded to generate the cache file.` 
      });
    }

    let cacheData: JSONCache;
    
    try {
      const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      cacheData = JSON.parse(fileContent);
    } catch (error) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: `Failed to read or parse cache file: ${error}` });
    }

    console.log(`📊 Found ${cacheData.data.length} total models in cache`);

    // Filter models for target providers
    const targetModels = cacheData.data.filter(model => {
      const [provider] = model.id.split('/');
      return TARGET_PROVIDERS.includes(provider);
    });

    console.log(`🎯 Filtered to ${targetModels.length} models from target providers`);

    const stats: ModelStats = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0
    };

    // Process each model
    for (const model of targetModels) {
      await upsertModel(model, stats, client);
    }

    // Log the admin action
    await logAdminAction(
      adminUserId,
      'MODELS_SYNC_BULK',
      'MODELS',
      'bulk_sync',
      {
        created: stats.created,
        updated: stats.updated,
        skipped: stats.skipped,
        errors: stats.errors,
        total_processed: stats.created + stats.updated + stats.skipped + stats.errors,
        cache_last_updated: cacheData.last_updated
      },
      `Platform models synced from OpenRouter cache: ${stats.created} created, ${stats.updated} updated, ${stats.errors} errors`,
      client
    );

    await client.query('COMMIT');

    console.log('\n📋 Sync Summary:');
    console.log(`   ✅ Created: ${stats.created}`);
    console.log(`   🔄 Updated: ${stats.updated}`);
    console.log(`   ⏭️  Skipped: ${stats.skipped}`);
    console.log(`   ❌ Errors:  ${stats.errors}`);

    res.json({
      success: true,
      message: 'Model sync completed successfully',
      stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Model sync API error:', error);
    
    // Try to log the failed action
    try {
      await logAdminAction(
        adminUserId || 1,
        'MODELS_SYNC_BULK_FAILED',
        'MODELS',
        'bulk_sync',
        { error: error instanceof Error ? error.message : 'Unknown error' },
        `Model sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } catch (logError) {
      console.error('Failed to log admin action:', logError);
    }

    res.status(500).json({
      error: 'Failed to sync models',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  } finally {
    client.release();
  }
});

export default router; 