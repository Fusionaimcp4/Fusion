import express, { Request, Response, Router } from 'express';
import { verifyToken, User as AuthUser } from '../middleware/auth';
import pool from '../db';

const router: Router = express.Router();

// GET /api/credits/balance
// Fetches the current user's credit balance.
router.get('/balance', verifyToken, async (req: Request, res: Response) => {
  const authenticatedUser = req.user as AuthUser;
  const userId = authenticatedUser?.id;

  if (!userId) {
    // This should technically be caught by verifyToken, but as a safeguard:
    return res.status(403).json({ error: 'User ID not found in token.' });
  }

  try {
    const result = await pool.query(
      'SELECT balance_cents FROM user_credits WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      // balance_cents is stored as an INTEGER
      const balanceInCents = parseInt(result.rows[0].balance_cents, 10);
      const balanceInDollars = (balanceInCents / 100).toFixed(2); // Convert to dollars and format to two decimal places
      res.json({ balance: balanceInDollars });
    } else {
      // No record found, implies balance is 0 cents.
      res.json({ balance: "0.00" }); // Return as dollars string
    }
  } catch (error: any) {
    console.error('Error fetching user credit balance:', error);
    res.status(500).json({ error: 'Failed to fetch credit balance.', details: error.message });
  }
});

// GET /api/credits/transactions
// Fetches the current user's credit transaction history.
// Can be filtered by type=payment to only show credit purchases.
router.get('/transactions', verifyToken, async (req: Request, res: Response) => {
  const authenticatedUser = req.user as AuthUser;
  const userId = authenticatedUser?.id;
  const type = req.query.type as string; // 'payment' or undefined

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
    const queryParams: any[] = [userId];

    if (type === 'payment') {
      query += ` AND amount_cents > 0 AND status = 'completed'`; // Assuming 'completed' is the status for successful payments
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, queryParams);

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

  } catch (error: any) {
    console.error('Error fetching user credit transactions:', error);
    res.status(500).json({ error: 'Failed to fetch credit transactions.', details: error.message });
  }
});

export default router; 