import express, { Request } from 'express';
import pool from '../../db';
import { logAdminAction } from '../../utils/adminLogger';
import { User as AuthUser } from '../../middleware/auth'; // For req.user type

const router = express.Router();

const VALID_ROLES = ['admin', 'pro', 'user', 'tester'];

// GET /api/admin/users - List all users
router.get('/', async (req, res) => {
  try {
    // Omit sensitive fields like encrypted_api_key, password_hash from general user listing
    // Join with user_credits to get balance if it's stored there and you want to show it.
    const result = await pool.query(
      'SELECT u.id, u.email, u.display_name, u.role, u.created_at, uc.balance_cents ' +
      'FROM users u LEFT JOIN user_credits uc ON u.id = uc.user_id ORDER BY u.id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('[Admin API] Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:userId/role - Update a user's role
router.put('/:userId/role', async (req: Request<{ userId: string }>, res) => {
  const { userId: targetUserIdString } = req.params;
  const { role: newRole, summary: roleChangeSummary } = req.body;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.'});
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  if (!newRole || typeof newRole !== 'string' || !VALID_ROLES.includes(newRole.toLowerCase())) {
    return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` });
  }
  const normalizedNewRole = newRole.toLowerCase();

  if (targetUserId === adminUserId && normalizedNewRole !== 'admin') {
    return res.status(403).json({ error: 'Admins cannot demote themselves from the admin role.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userResult = await client.query('SELECT role FROM users WHERE id = $1', [targetUserId]);
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Target user not found.' });
    }
    const currentRole = userResult.rows[0].role;

    if (currentRole === normalizedNewRole) {
      await client.query('ROLLBACK'); 
      return res.status(200).json({ message: `User role is already ${normalizedNewRole}. No change made.`, role: normalizedNewRole });
    }

    const updateResult = await client.query(
      'UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, role, display_name',
      [normalizedNewRole, targetUserId]
    );

    const logDetails = {
      old_role: currentRole,
      new_role: normalizedNewRole,
      target_user_id: targetUserId
    };
    await logAdminAction(adminUserId, 'USER_ROLE_UPDATED', 'USER', targetUserId.toString(), logDetails, roleChangeSummary || undefined, client);

    await client.query('COMMIT');
    res.status(200).json({ message: 'User role updated successfully.', user: updateResult.rows[0] });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`[Admin API] Error updating role for user ${targetUserId}:`, error);
    res.status(500).json({ error: 'Failed to update user role.' });
  } finally {
    client.release();
  }
});

// POST /api/admin/users/:userId/adjust-credits - Manually adjust a user's credit balance
router.post('/:userId/adjust-credits', async (req: Request<{ userId: string }>, res) => {
  const { userId: targetUserIdString } = req.params;
  const { amount_cents, reason } = req.body;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.'});
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  // 1. Validate inputs
  if (typeof amount_cents !== 'number' || !Number.isInteger(amount_cents) || amount_cents === 0) {
    return res.status(400).json({ error: 'Invalid amount_cents. Must be a non-zero integer.' });
  }
  if (!reason || typeof reason !== 'string' || reason.trim() === '') {
    return res.status(400).json({ error: 'Reason for credit adjustment is required and cannot be empty.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 2. Fetch current user's credit balance
    const creditResult = await client.query('SELECT balance_cents FROM user_credits WHERE user_id = $1', [targetUserId]);
    if (creditResult.rows.length === 0) {
      // It's possible a user exists but has no entry in user_credits yet. Create one.
      // Or, if an entry *must* exist, this would be an error.
      // For now, let's assume a new user might not have one, so we can proceed as if balance is 0.
      // If your system guarantees a user_credits row, change this to an error.
      // For now, let's error if the user is not found in users table, and assume 0 credits if no user_credits row.
       const userCheck = await client.query('SELECT id FROM users WHERE id = $1', [targetUserId]);
       if (userCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Target user not found.' });
       }
       // If user exists but no credits row, we can treat current balance as 0
    }
    
    const currentBalanceCents = creditResult.rows[0]?.balance_cents || 0;

    // 3. Negative Balance Rule Check
    const projectedNewBalance = currentBalanceCents + amount_cents;
    if (projectedNewBalance < 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        error: `Adjustment would result in a negative balance. User has ${currentBalanceCents} cents. Maximum possible deduction is ${currentBalanceCents} cents.`,
        current_balance_cents: currentBalanceCents
      });
    }

    // 4. Update user_credits table
    // Using UPSERT to handle cases where user_credits row might not exist (though previous check tries to ensure user exists)
    const updateCreditResult = await client.query(
      `INSERT INTO user_credits (user_id, balance_cents, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET balance_cents = user_credits.balance_cents + $3, updated_at = NOW()
       RETURNING balance_cents AS new_balance_cents`,
      [targetUserId, amount_cents, amount_cents] // For INSERT, it's amount_cents directly. For UPDATE, it's current + amount_cents.
                                               // This UPSERT adds amount_cents to existing or sets initial to amount_cents.
                                               // Corrected UPSERT for adding/subtracting:
    );
    // Corrected logic for UPSERT: Update if exists, insert if not.
    // The previous UPSERT would ADD amount_cents to itself if new. We need currentBalance + amount_cents for the new value.
    const finalNewBalanceResult = await client.query(
        `INSERT INTO user_credits (user_id, balance_cents, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (user_id)
         DO UPDATE SET balance_cents = user_credits.balance_cents + $3, updated_at = NOW()
         RETURNING balance_cents`,
         [targetUserId, projectedNewBalance, amount_cents] // If inserting new, use projected. If updating, add amount.
                                                         // This is still a bit tricky. Let's simplify: Query first, then insert/update based on existence.
      );
       // Simplified approach: We fetched currentBalanceCents. We know projectedNewBalance.
       // So, just do an UPSERT that SETS to projectedNewBalance.
       const finalUpsertResult = await client.query(
        `INSERT INTO user_credits (user_id, balance_cents, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (user_id)
         DO UPDATE SET balance_cents = $2, updated_at = NOW()
         RETURNING balance_cents`,
         [targetUserId, projectedNewBalance]
       );
    const newBalanceCents = finalUpsertResult.rows[0].balance_cents;

    // 5. Log in credit_transactions
    const transactionDescription = `Admin Credit Adjustment: ${reason}`;
    await client.query(
      `INSERT INTO credit_transactions (user_id, amount_cents, method, status, description, created_at)
       VALUES ($1, $2, 'admin_adjustment', 'completed', $3, NOW())`,
      [targetUserId, amount_cents, transactionDescription]
    );

    // 6. Log admin action
    const logDetails = {
      adjusted_amount_cents: amount_cents,
      previous_balance_cents: currentBalanceCents,
      new_balance_cents: newBalanceCents, // Use the actual new balance from DB
      reason: reason
    };
    await logAdminAction(adminUserId, 'USER_CREDIT_ADJUSTMENT', 'USER', targetUserId.toString(), logDetails, reason, client);

    await client.query('COMMIT');
    res.status(200).json({
      message: 'User credits adjusted successfully.',
      user_id: targetUserId,
      previous_balance_cents: currentBalanceCents,
      adjusted_amount_cents: amount_cents,
      new_balance_cents: newBalanceCents
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`[Admin API] Error adjusting credits for user ${targetUserId}:`, error);
    res.status(500).json({ error: 'Failed to adjust user credits.' });
  } finally {
    client.release();
  }
});

export default router; 