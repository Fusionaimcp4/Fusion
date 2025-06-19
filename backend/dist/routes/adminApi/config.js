"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../db")); // Adjust path to db.ts if necessary
const auth_1 = require("../../middleware/auth"); // Adjust path if necessary
const adminAuth_1 = require("../../middleware/adminAuth"); // Adjust path if necessary
const router = express_1.default.Router();
// GET /api/admin/config - Fetch all application configuration settings
router.get('/', auth_1.verifyToken, adminAuth_1.requireAdminRole, async (req, res) => {
    try {
        const result = await db_1.default.query('SELECT key, value, description, updated_at FROM app_config ORDER BY key ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching app_config:', error);
        res.status(500).json({ error: 'Failed to fetch application configuration', details: error.message });
    }
});
// PUT /api/admin/config - Update application configuration settings
router.put('/', auth_1.verifyToken, adminAuth_1.requireAdminRole, async (req, res) => {
    const updates = req.body; // Expecting an array of {key: string, value: string}
    if (!Array.isArray(updates) || updates.some(u => typeof u.key !== 'string' || typeof u.value === 'undefined')) {
        return res.status(400).json({ error: 'Invalid request body. Expected an array of {key: string, value: string} objects.' });
    }
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        for (const update of updates) {
            // Ensure value is treated as text, even if it's numeric, null, or boolean as a string
            const valueToStore = update.value === null ? null : String(update.value);
            const result = await client.query('UPDATE app_config SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2 RETURNING key', [valueToStore, update.key]);
            if (result.rowCount === 0) {
                // Optional: Handle case where a key to update was not found
                console.warn(`[Admin Config] PUT: Key "${update.key}" not found in app_config. No update performed for this key.`);
            }
        }
        await client.query('COMMIT');
        // Fetch and return all configs after update
        const updatedConfig = await client.query('SELECT key, value, description, updated_at FROM app_config ORDER BY key ASC');
        res.json(updatedConfig.rows);
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating app_config:', error);
        res.status(500).json({ error: 'Failed to update application configuration', details: error.message });
    }
    finally {
        client.release();
    }
});
exports.default = router;
