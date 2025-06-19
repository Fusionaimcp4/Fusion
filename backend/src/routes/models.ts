import express from 'express';
import pool  from '../db';

const router = express.Router();

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get all AI models
 *     description: Retrieves a list of all available AI models with their specifications, pricing, and capabilities. This is a public endpoint.
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: List of available AI models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique model identifier
 *                   name:
 *                     type: string
 *                     description: Human-readable model name
 *                   id_string:
 *                     type: string
 *                     description: Provider-specific model ID
 *                   provider:
 *                     type: string
 *                     description: AI provider name
 *                   input_cost_per_million_tokens:
 *                     type: number
 *                     description: Cost per million input tokens in USD
 *                   output_cost_per_million_tokens:
 *                     type: number
 *                     description: Cost per million output tokens in USD
 *                   context_length_tokens:
 *                     type: integer
 *                     description: Maximum context length in tokens
 *                   supports_json_mode:
 *                     type: boolean
 *                     description: Whether model supports JSON mode
 *                   supports_tool_use:
 *                     type: boolean
 *                     description: Whether model supports tool/function calling
 *                   supports_vision:
 *                     type: boolean
 *                     description: Whether model supports image input
 *                   description:
 *                     type: string
 *                     description: Model description
 *                   release_date:
 *                     type: string
 *                     format: date
 *                     description: Model release date
 *                   is_active:
 *                     type: boolean
 *                     description: Whether model is currently active
 *             example:
 *               - id: 1
 *                 name: "GPT-4"
 *                 id_string: "gpt-4"
 *                 provider: "openai"
 *                 input_cost_per_million_tokens: 30.0
 *                 output_cost_per_million_tokens: 60.0
 *                 context_length_tokens: 8192
 *                 supports_json_mode: true
 *                 supports_tool_use: true
 *                 supports_vision: false
 *                 description: "OpenAI's most capable model"
 *                 release_date: "2023-03-14"
 *                 is_active: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
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
        is_active,
        created_at,
        updated_at
      FROM models
      ORDER BY provider, name
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/models/{id}:
 *   get:
 *     summary: Get a specific AI model
 *     description: Retrieves detailed information about a specific AI model by its ID.
 *     tags: [Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the model
 *         example: 1
 *     responses:
 *       200:
 *         description: Model details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 id_string:
 *                   type: string
 *                 provider:
 *                   type: string
 *                 input_cost_per_million_tokens:
 *                   type: number
 *                 output_cost_per_million_tokens:
 *                   type: number
 *                 context_length_tokens:
 *                   type: integer
 *                 supports_json_mode:
 *                   type: boolean
 *                 supports_tool_use:
 *                   type: boolean
 *                 supports_vision:
 *                   type: boolean
 *                 description:
 *                   type: string
 *                 release_date:
 *                   type: string
 *                   format: date
 *                 is_active:
 *                   type: boolean
 *       404:
 *         description: Model not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM models WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching model:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/models - Create a new model (protected, admin only)
router.post('/', async (req, res) => {
  try {
    const {
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
      release_date
    } = req.body;

    const result = await pool.query(`
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
        release_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
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
      release_date
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating model:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/models/:id - Update a model (protected, admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
      release_date
    } = req.body;

    const result = await pool.query(`
      UPDATE models
      SET
        name = $1,
        id_string = $2,
        provider = $3,
        input_cost_per_million_tokens = $4,
        output_cost_per_million_tokens = $5,
        context_length_tokens = $6,
        supports_json_mode = $7,
        supports_tool_use = $8,
        supports_vision = $9,
        description = $10,
        release_date = $11
      WHERE id = $12
      RETURNING *
    `, [
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
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating model:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 