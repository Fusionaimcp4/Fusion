"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
// GET /api/credits/balance
// Fetches the current user's credit balance.
router.get('/balance', auth_1.verifyToken, async (req, res) => {
    const authenticatedUser = req.user;
    const userId = authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.id;
    if (!userId) {
        // This should technically be caught by verifyToken, but as a safeguard:
        return res.status(403).json({ error: 'User ID not found in token.' });
    }
    try {
        const result = await db_1.default.query('SELECT balance_cents FROM user_credits WHERE user_id = $1', [userId]);
        if (result.rows.length > 0) {
            // balance_cents is stored as an INTEGER
            const balanceInCents = parseInt(result.rows[0].balance_cents, 10);
            const balanceInDollars = (balanceInCents / 100).toFixed(2); // Convert to dollars and format to two decimal places
            res.json({ balance: balanceInDollars });
        }
        else {
            // No record found, implies balance is 0 cents.
            res.json({ balance: "0.00" }); // Return as dollars string
        }
    }
    catch (error) {
        console.error('Error fetching user credit balance:', error);
        res.status(500).json({ error: 'Failed to fetch credit balance.', details: error.message });
    }
});
// GET /api/credits/transactions
// Fetches the current user's credit transaction history.
// Can be filtered by type=payment to only show credit purchases.
router.get('/transactions', auth_1.verifyToken, async (req, res) => {
    const authenticatedUser = req.user;
    const userId = authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.id;
    const type = req.query.type; // 'payment' or undefined
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token.' });
    }
    try {
        let query = `
      SELECT 
        id, 
        amount_cents, 
        method, 
        status, 
        provider_transaction_id, 
        description, 
        created_at 
      FROM credit_transactions 
      WHERE user_id = $1`;
        const queryParams = [userId];
        if (type === 'payment') {
            query += ` AND amount_cents > 0 AND status = 'completed'`; // Assuming 'completed' is the status for successful payments
        }
        query += ` ORDER BY created_at DESC`;
        const result = await db_1.default.query(query, queryParams);
        const transactions = result.rows.map(tx => ({
            id: tx.id,
            amount_dollars: (parseInt(tx.amount_cents, 10) / 100).toFixed(2),
            method: tx.method,
            status: tx.status,
            provider_transaction_id: tx.provider_transaction_id,
            description: tx.description || `Payment via ${tx.method}`,
            created_at: tx.created_at
        }));
        res.json(transactions);
    }
    catch (error) {
        console.error('Error fetching user credit transactions:', error);
        res.status(500).json({ error: 'Failed to fetch credit transactions.', details: error.message });
    }
});
exports.default = router;
