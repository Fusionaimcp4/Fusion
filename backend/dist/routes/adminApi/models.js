"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
exports.default = router;
