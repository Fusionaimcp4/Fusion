"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth"); // Assuming your verifyToken middleware is here
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
// API Key Generation Function (can be a shared utility)
const generateNewApiKey = (prefix = 'sk-fusion-') => {
    return prefix + crypto_1.default.randomBytes(28).toString('hex');
};
/**
 * @swagger
 * /api/keys:
 *   get:
 *     summary: Get all API keys for authenticated user
 *     description: Retrieves all API keys belonging to the authenticated user. API keys are masked for security.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of API keys (masked)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiKey'
 *                   - type: object
 *                     properties:
 *                       api_key_masked:
 *                         type: string
 *                         description: Masked version of the API key
 *                         example: "sk-fusion-abcd...xyz"
 *             example:
 *               - id: 1
 *                 name: "My Integration Key"
 *                 api_key_masked: "sk-fusion-abcd...xyz"
 *                 created_at: "2024-01-01T00:00:00.000Z"
 *                 last_used_at: "2024-01-02T10:30:00.000Z"
 *                 is_active: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - User ID not found in token
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
router.get('/', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        const result = await db_1.default.query('SELECT id, name, api_key, created_at, last_used_at, is_active FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        // Mask the API key before sending it to the client
        const maskedKeys = result.rows.map(key => ({
            ...key,
            api_key: key.api_key ? `${key.api_key.substring(0, 12)}...${key.api_key.substring(key.api_key.length - 4)}` : null
        }));
        res.json(maskedKeys);
    }
    catch (error) {
        console.error('Error fetching API keys:', error);
        res.status(500).json({ error: 'Failed to fetch API keys' });
    }
});
/**
 * @swagger
 * /api/keys:
 *   post:
 *     summary: Create a new API key
 *     description: Creates a new API key for the authenticated user. The full API key is only returned once during creation.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Human-readable name for the API key
 *                 minLength: 1
 *                 example: "My Integration Key"
 *     responses:
 *       201:
 *         description: API key created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiKey'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Important security message
 *             example:
 *               id: 1
 *               name: "My Integration Key"
 *               api_key: "sk-fusion-abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx1234yz"
 *               created_at: "2024-01-01T00:00:00.000Z"
 *               is_active: true
 *               message: "API Key created successfully. Please save this key securely. You will not be able to see it again."
 *       400:
 *         description: Bad request - Missing or invalid name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - Failed to generate unique API key
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
router.post('/', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'API key name is required and must be a non-empty string' });
        }
        const apiKey = generateNewApiKey();
        const result = await db_1.default.query('INSERT INTO api_keys (user_id, name, api_key) VALUES ($1, $2, $3) RETURNING id, name, api_key, created_at, is_active', [userId, name.trim(), apiKey]);
        const newKey = result.rows[0];
        // IMPORTANT: Send the full unmasked key only ONCE upon creation.
        // Subsequent GET requests will show the masked version.
        res.status(201).json({
            id: newKey.id,
            name: newKey.name,
            api_key: newKey.api_key, // Full key
            created_at: newKey.created_at,
            is_active: newKey.is_active,
            message: "API Key created successfully. Please save this key securely. You will not be able to see it again."
        });
    }
    catch (error) {
        console.error('Error creating API key:', error);
        if (error.code === '23505') { // unique_violation
            return res.status(409).json({ error: 'Failed to generate a unique API key. Please try again.' });
        }
        res.status(500).json({ error: 'Failed to create API key' });
    }
});
/**
 * @swagger
 * /api/keys/{keyId}:
 *   put:
 *     summary: Update API key name
 *     description: Updates the name of an existing API key belonging to the authenticated user.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: keyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the API key
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the API key
 *                 minLength: 1
 *                 example: "Updated Integration Key"
 *     responses:
 *       200:
 *         description: API key updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiKey'
 *                 - type: object
 *                   properties:
 *                     api_key_masked:
 *                       type: string
 *                       description: Masked version of the API key
 *       400:
 *         description: Bad request - Missing or invalid name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: API key not found or user unauthorized
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
router.put('/:keyId', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { keyId } = req.params;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'API key name is required' });
        }
        const result = await db_1.default.query('UPDATE api_keys SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, created_at, last_used_at, is_active', [name.trim(), keyId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'API key not found or user unauthorized' });
        }
        // Return the updated key (masked)
        const updatedKey = result.rows[0];
        const apiKeyFull = await db_1.default.query('SELECT api_key FROM api_keys WHERE id = $1', [updatedKey.id]);
        res.json({
            ...updatedKey,
            api_key: apiKeyFull.rows[0].api_key ? `${apiKeyFull.rows[0].api_key.substring(0, 12)}...${apiKeyFull.rows[0].api_key.substring(apiKeyFull.rows[0].api_key.length - 4)}` : null
        });
    }
    catch (error) {
        console.error('Error updating API key:', error);
        res.status(500).json({ error: 'Failed to update API key' });
    }
});
/**
 * @swagger
 * /api/keys/{keyId}/status:
 *   put:
 *     summary: Update API key status
 *     description: Enable or disable an API key. Disabled keys cannot be used for authentication.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: keyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the API key
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Whether the API key should be active
 *                 example: false
 *     responses:
 *       200:
 *         description: API key status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiKey'
 *                 - type: object
 *                   properties:
 *                     api_key_masked:
 *                       type: string
 *                       description: Masked version of the API key
 *       400:
 *         description: Bad request - Missing or invalid isActive value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: API key not found or user unauthorized
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
router.put('/:keyId/status', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { keyId } = req.params;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        const { isActive } = req.body;
        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'isActive status (boolean) is required' });
        }
        const result = await db_1.default.query('UPDATE api_keys SET is_active = $1 WHERE id = $2 AND user_id = $3 RETURNING id, name, api_key, created_at, last_used_at, is_active', [isActive, keyId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'API key not found or user unauthorized' });
        }
        const updatedKey = result.rows[0];
        // Mask the API key before sending it back
        res.json({
            ...updatedKey,
            api_key: updatedKey.api_key ? `${updatedKey.api_key.substring(0, 12)}...${updatedKey.api_key.substring(updatedKey.api_key.length - 4)}` : null
        });
    }
    catch (error) {
        console.error('Error updating API key status:', error);
        res.status(500).json({ error: 'Failed to update API key status' });
    }
});
/**
 * @swagger
 * /api/keys/{keyId}:
 *   delete:
 *     summary: Delete an API key
 *     description: Permanently deletes an API key. This action cannot be undone. The key will immediately stop working.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: keyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the API key to delete
 *         example: 1
 *     responses:
 *       204:
 *         description: API key deleted successfully (no content)
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: API key not found or user unauthorized
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
router.delete('/:keyId', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { keyId } = req.params;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        const result = await db_1.default.query('DELETE FROM api_keys WHERE id = $1 AND user_id = $2', [keyId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'API key not found or user unauthorized' });
        }
        res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting API key:', error);
        res.status(500).json({ error: 'Failed to delete API key' });
    }
});
/**
 * @swagger
 * /api/keys/{keyId}/activity:
 *   get:
 *     summary: Get API key usage activity
 *     description: Retrieves usage logs and activity history for a specific API key belonging to the authenticated user.
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: keyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the API key
 *         example: 1
 *     responses:
 *       200:
 *         description: API key activity history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Usage log ID
 *                   model:
 *                     type: string
 *                     description: AI model used
 *                   provider:
 *                     type: string
 *                     description: AI provider used
 *                   prompt_tokens:
 *                     type: integer
 *                     description: Number of input tokens
 *                   completion_tokens:
 *                     type: integer
 *                     description: Number of output tokens
 *                   total_tokens:
 *                     type: integer
 *                     description: Total tokens used
 *                   cost:
 *                     type: number
 *                     description: Cost in USD
 *                   fallback_reason:
 *                     type: string
 *                     nullable: true
 *                     description: Reason for fallback if any
 *                   response_time:
 *                     type: integer
 *                     description: Response time in milliseconds
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: When the request was made
 *             example:
 *               - id: 123
 *                 model: "gpt-4"
 *                 provider: "openai"
 *                 prompt_tokens: 50
 *                 completion_tokens: 100
 *                 total_tokens: 150
 *                 cost: 0.003
 *                 fallback_reason: null
 *                 response_time: 1200
 *                 created_at: "2024-01-01T12:00:00.000Z"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: API key not found or user unauthorized
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
router.get('/:keyId/activity', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { keyId } = req.params;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token (after assertion)' });
        }
        // First, verify the API key belongs to the user
        const apiKeyCheck = await db_1.default.query('SELECT id FROM api_keys WHERE id = $1 AND user_id = $2', [keyId, userId]);
        if (apiKeyCheck.rowCount === 0) {
            return res.status(404).json({ error: 'API key not found or user unauthorized' });
        }
        // Fetch usage logs
        // You might want to add pagination here for large datasets
        const activityResult = await db_1.default.query(`SELECT id, model, provider, prompt_tokens, completion_tokens, total_tokens, cost, fallback_reason, response_time, created_at 
       FROM usage_logs 
       WHERE api_key_id = $1 
       ORDER BY created_at DESC
       LIMIT 50`, [keyId]);
        res.json(activityResult.rows);
    }
    catch (error) {
        console.error('Error fetching API key activity:', error);
        res.status(500).json({ error: 'Failed to fetch API key activity' });
    }
});
exports.default = router;
