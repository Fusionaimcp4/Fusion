"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const db_1 = __importDefault(require("../../db"));
const adminLogger_1 = require("../../utils/adminLogger");
const router = express_1.default.Router();
// GET /api/admin/models - List all models
router.get('/', async (req, res) => {
    try {
        const result = await db_1.default.query('SELECT id, name, id_string, provider, input_cost_per_million_tokens, output_cost_per_million_tokens, context_length_tokens, supports_json_mode, supports_tool_use, supports_vision, description, release_date, is_active, created_at, updated_at FROM models ORDER BY provider, name ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('[Admin API] Error fetching models:', error);
        res.status(500).json({ error: 'Failed to fetch models' });
    }
});
// PUT /api/admin/models/:modelId - Update a model's pricing and active status
router.put('/:modelId', async (req, res) => {
    const { modelId } = req.params;
    const { input_cost_per_million_tokens, output_cost_per_million_tokens, is_active } = req.body;
    const adminUser = req.user;
    if (!adminUser || typeof adminUser.id === 'undefined') {
        return res.status(401).json({ error: 'Admin user ID not found, unauthorized.' });
    }
    const adminUserId = adminUser.id;
    const targetModelId = parseInt(modelId, 10);
    if (isNaN(targetModelId)) {
        return res.status(400).json({ error: 'Invalid model ID format.' });
    }
    // Validate inputs
    const inputCost = parseFloat(input_cost_per_million_tokens);
    const outputCost = parseFloat(output_cost_per_million_tokens);
    if (isNaN(inputCost) || inputCost < 0 || isNaN(outputCost) || outputCost < 0) {
        return res.status(400).json({ error: 'Invalid cost values. Must be non-negative numbers.' });
    }
    if (typeof is_active !== 'boolean') {
        return res.status(400).json({ error: 'Invalid is_active value. Must be true or false.' });
    }
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        // Fetch current model details for validation and logging
        const modelResult = await client.query('SELECT name, input_cost_per_million_tokens, output_cost_per_million_tokens, is_active FROM models WHERE id = $1', [targetModelId]);
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
        const updateResult = await client.query('UPDATE models SET input_cost_per_million_tokens = $1, output_cost_per_million_tokens = $2, is_active = $3, updated_at = NOW() WHERE id = $4 RETURNING *', [inputCost, outputCost, is_active, targetModelId]);
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
        await (0, adminLogger_1.logAdminAction)(adminUserId, 'MODEL_CONFIG_UPDATED', // More general action type
        'MODEL', targetModelId.toString(), logDetails, `Updated configuration for model ${currentModel.name} (ID: ${targetModelId})`, client);
        await client.query('COMMIT');
        res.status(200).json({ message: 'Model configuration updated successfully.', model: updateResult.rows[0] });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error(`[Admin API] Error updating configuration for model ${targetModelId}:`, error);
        res.status(500).json({ error: 'Failed to update model configuration.' });
    }
    finally {
        client.release();
    }
});
// Provider name mapping (from OpenRouter format to our DB format)
const PROVIDER_MAPPING = {
    'openai': 'OpenAI',
    'anthropic': 'Anthropic',
    'google': 'Google'
};
// Providers we want to import
const TARGET_PROVIDERS = ['openai', 'anthropic', 'google'];
/**
 * Normalize the ID string according to the specified rules
 */
function normalizeIdString(originalId) {
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
function extractFeatures(model) {
    var _a, _b, _c, _d, _e, _f, _g;
    const supportedParams = model.supported_parameters || [];
    return {
        supports_json_mode: supportedParams.includes('response_format') ||
            supportedParams.includes('structured_outputs'),
        supports_tool_use: supportedParams.includes('tool_choice') ||
            supportedParams.includes('tools') ||
            ((_a = model.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('tool')) || false,
        supports_vision: ((_c = (_b = model.architecture) === null || _b === void 0 ? void 0 : _b.input_modalities) === null || _c === void 0 ? void 0 : _c.includes('image')) ||
            ((_e = (_d = model.architecture) === null || _d === void 0 ? void 0 : _d.modality) === null || _e === void 0 ? void 0 : _e.includes('vision')) ||
            ((_g = (_f = model.architecture) === null || _f === void 0 ? void 0 : _f.modality) === null || _g === void 0 ? void 0 : _g.includes('image')) ||
            model.name.toLowerCase().includes('vision') || false
    };
}
/**
 * Convert pricing from per-token to per-million-tokens format
 */
function convertPricing(pricePerToken) {
    const price = parseFloat(pricePerToken);
    return isNaN(price) ? 0 : price * 1000000;
}
/**
 * Parse release date from timestamp
 */
function parseReleaseDate(created) {
    if (!created)
        return null;
    try {
        const date = new Date(created * 1000);
        return date.toISOString().split('T')[0];
    }
    catch (error) {
        console.warn(`Failed to parse release date: ${created}`);
        return null;
    }
}
/**
 * Upsert a model into the database
 */
async function upsertModel(model, stats, client) {
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
        const existingResult = await client.query('SELECT id, is_active FROM models WHERE id_string = $1', [normalizedId]);
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
        }
        else {
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
    }
    catch (error) {
        console.error(`❌ Error upserting model ${model.name} (${normalizedId}):`, error);
        stats.errors++;
    }
}
// POST /api/admin/models/sync - Sync platform models from OpenRouter cache
router.post('/sync', async (req, res) => {
    const adminUser = req.user;
    const adminUserId = adminUser === null || adminUser === void 0 ? void 0 : adminUser.id;
    if (!adminUserId) {
        return res.status(401).json({ error: 'Admin user ID not found in request' });
    }
    const { action } = req.body;
    if (action !== 'sync') {
        return res.status(400).json({ error: 'Invalid action. Expected "sync".' });
    }
    const client = await db_1.default.connect();
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
        let cacheData;
        try {
            const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
            cacheData = JSON.parse(fileContent);
        }
        catch (error) {
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
        const stats = {
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
        await (0, adminLogger_1.logAdminAction)(adminUserId, 'MODELS_SYNC_BULK', 'MODELS', 'bulk_sync', {
            created: stats.created,
            updated: stats.updated,
            skipped: stats.skipped,
            errors: stats.errors,
            total_processed: stats.created + stats.updated + stats.skipped + stats.errors,
            cache_last_updated: cacheData.last_updated
        }, `Platform models synced from OpenRouter cache: ${stats.created} created, ${stats.updated} updated, ${stats.errors} errors`, client);
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
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Model sync API error:', error);
        // Try to log the failed action
        try {
            await (0, adminLogger_1.logAdminAction)(adminUserId || 1, 'MODELS_SYNC_BULK_FAILED', 'MODELS', 'bulk_sync', { error: error instanceof Error ? error.message : 'Unknown error' }, `Model sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        catch (logError) {
            console.error('Failed to log admin action:', logError);
        }
        res.status(500).json({
            error: 'Failed to sync models',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        });
    }
    finally {
        client.release();
    }
});
exports.default = router;
