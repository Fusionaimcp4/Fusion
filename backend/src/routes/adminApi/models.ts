import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core'; // Import core for Query type
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

export default router; 