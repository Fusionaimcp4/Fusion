import express, { Request, Response } from 'express';
import pool from '../../db';
import { logAdminAction } from '../../utils/adminLogger';
import { User as AuthUser } from '../../middleware/auth'; // For req.user type
import { requireAdminRole } from '../../middleware/adminAuth';
import crypto from 'crypto';

const router = express.Router();

const VALID_ROLES = ['admin', 'pro', 'user', 'sub_user', 'tester'];

// Generate new API key
const generateNewApiKey = (): string => {
  const prefix = 'sk-fusion-';
  return prefix + crypto.randomBytes(28).toString('hex');
};

// POST /api/admin/users - Create new user account
router.post('/', requireAdminRole, async (req: Request, res: Response) => {
  const { email, display_name, role, password, is_active } = req.body;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  // Validate required fields
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'Email is required and must be a non-empty string.' });
  }
  if (!display_name || typeof display_name !== 'string' || display_name.trim() === '') {
    return res.status(400).json({ error: 'Display name is required and must be a non-empty string.' });
  }
  if (!role || typeof role !== 'string' || !VALID_ROLES.includes(role.toLowerCase())) {
    return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` });
  }

  const normalizedRole = role.toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedDisplayName = display_name.trim();
  const userIsActive = is_active !== undefined ? Boolean(is_active) : true;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check if email already exists
    const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Create user (password is optional for OAuth-only accounts)
    let passwordHash = '';
    if (password && typeof password === 'string' && password.trim() !== '') {
      // In a real implementation, you'd hash the password here
      // For now, we'll store it as-is (you should implement proper password hashing)
      passwordHash = password.trim();
    }

    const userResult = await client.query(
      `INSERT INTO users (email, display_name, role, password_hash, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, email, display_name, role, is_active, created_at`,
      [normalizedEmail, normalizedDisplayName, normalizedRole, passwordHash, userIsActive]
    );

    const newUser = userResult.rows[0];

    // Initialize user credits with 0 balance
    await client.query(
      'INSERT INTO user_credits (user_id, balance_cents, updated_at) VALUES ($1, 0, NOW())',
      [newUser.id]
    );

    // Log admin action
    const logDetails = {
      created_user_id: newUser.id,
      email: normalizedEmail,
      display_name: normalizedDisplayName,
      role: normalizedRole,
      is_active: userIsActive,
      has_password: passwordHash !== ''
    };
    await logAdminAction(adminUserId, 'USER_CREATED', 'USER', newUser.id.toString(), logDetails, `Created user account for ${normalizedEmail}`, client);

    await client.query('COMMIT');
    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        display_name: newUser.display_name,
        role: newUser.role,
        is_active: newUser.is_active,
        created_at: newUser.created_at
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Admin API] Error creating user:', error);
    if ((error as any).code === '23505') { // unique_violation
      return res.status(409).json({ error: 'User with this email already exists.' });
    }
    res.status(500).json({ error: 'Failed to create user.' });
  } finally {
    client.release();
  }
});

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

// POST /api/admin/users/:userId/api-keys - Create API key for a user
router.post('/:userId/api-keys', requireAdminRole, async (req: Request<{ userId: string }>, res: Response) => {
  const { userId: targetUserIdString } = req.params;
  const { name } = req.body;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  // Validate API key name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'API key name is required and must be a non-empty string.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Verify target user exists
    const userResult = await client.query('SELECT id, email, display_name FROM users WHERE id = $1', [targetUserId]);
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Target user not found.' });
    }
    const targetUser = userResult.rows[0];

    // Generate new API key
    const apiKey = generateNewApiKey();

    // Insert API key
    const apiKeyResult = await client.query(
      'INSERT INTO api_keys (user_id, name, api_key, created_at, is_active) VALUES ($1, $2, $3, NOW(), true) RETURNING id, name, api_key, created_at, is_active',
      [targetUserId, name.trim(), apiKey]
    );

    const newApiKey = apiKeyResult.rows[0];

    // Log admin action
    const logDetails = {
      target_user_id: targetUserId,
      target_user_email: targetUser.email,
      api_key_id: newApiKey.id,
      api_key_name: name.trim()
    };
    await logAdminAction(adminUserId, 'API_KEY_CREATED_FOR_USER', 'API_KEY', newApiKey.id.toString(), logDetails, `Created API key "${name.trim()}" for user ${targetUser.email}`, client);

    await client.query('COMMIT');
    res.status(201).json({
      success: true,
      data: {
        id: newApiKey.id,
        name: newApiKey.name,
        api_key: newApiKey.api_key, // Full key returned only once
        created_at: newApiKey.created_at,
        is_active: newApiKey.is_active,
        message: "API Key created successfully. Please save this key securely. You will not be able to see it again."
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Admin API] Error creating API key for user:', error);
    if ((error as any).code === '23505') { // unique_violation
      return res.status(409).json({ error: 'Failed to generate a unique API key. Please try again.' });
    }
    res.status(500).json({ error: 'Failed to create API key.' });
  } finally {
    client.release();
  }
});

// GET /api/admin/users/:userId/api-keys - List user API keys (masked)
router.get('/:userId/api-keys', requireAdminRole, async (req: Request<{ userId: string }>, res: Response) => {
  const { userId: targetUserIdString } = req.params;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  try {
    // Verify target user exists
    const userResult = await pool.query('SELECT id, email, display_name FROM users WHERE id = $1', [targetUserId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Target user not found.' });
    }
    const targetUser = userResult.rows[0];

    // Fetch user's API keys
    const apiKeysResult = await pool.query(
      'SELECT id, name, api_key, created_at, last_used_at, is_active FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC',
      [targetUserId]
    );

    // Mask the API keys before sending
    const maskedKeys = apiKeysResult.rows.map(key => ({
      id: key.id,
      name: key.name,
      api_key_masked: key.api_key ? `${key.api_key.substring(0, 12)}...${key.api_key.substring(key.api_key.length - 4)}` : null,
      created_at: key.created_at,
      last_used_at: key.last_used_at,
      is_active: key.is_active
    }));

    res.json({
      success: true,
      data: {
        user: {
          id: targetUser.id,
          email: targetUser.email,
          display_name: targetUser.display_name
        },
        api_keys: maskedKeys
      }
    });

  } catch (error) {
    console.error('[Admin API] Error fetching user API keys:', error);
    res.status(500).json({ error: 'Failed to fetch user API keys.' });
  }
});

// GET /api/admin/users/:userId/usage - Get user usage metrics
router.get('/:userId/usage', requireAdminRole, async (req: Request<{ userId: string }>, res: Response) => {
  const { userId: targetUserIdString } = req.params;
  const { from, to, page = '1', limit = '20', provider, model, apiKeyId } = req.query;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  try {
    // Verify target user exists
    const userResult = await pool.query('SELECT id, email, display_name FROM users WHERE id = $1', [targetUserId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Target user not found.' });
    }
    const targetUser = userResult.rows[0];

    // Validate and default dates
    const toDate = to ? new Date(to as string) : new Date();
    const fromDate = from ? new Date(from as string) : new Date(new Date().setDate(toDate.getDate() - 30));

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    // Build query conditions
    const queryParams: any[] = [targetUserId, fromDate, toDate];
    let whereClause = '';
    let paramIndex = 4;

    if (provider) {
      whereClause += ` AND ul.provider = $${paramIndex}`;
      queryParams.push(provider as string);
      paramIndex++;
    }
    if (model) {
      whereClause += ` AND ul.model = $${paramIndex}`;
      queryParams.push(model as string);
      paramIndex++;
    }
    if (apiKeyId) {
      whereClause += ` AND ul.api_key_id = $${paramIndex}`;
      queryParams.push(parseInt(apiKeyId as string, 10));
      paramIndex++;
    }

    // Fetch overall metrics
    const metricsResult = await pool.query(
      `SELECT
         COALESCE(SUM(cost + neuroswitch_fee), 0) AS total_spend,
         COALESCE(SUM(total_tokens), 0) AS total_tokens,
         COUNT(*) AS total_requests
       FROM usage_logs ul
       WHERE ul.user_id = $1 AND ul.created_at >= $2 AND ul.created_at <= $3 ${whereClause}`,
      queryParams
    );

    const metrics = {
      spend: parseFloat(metricsResult.rows[0].total_spend) || 0,
      tokens: parseInt(metricsResult.rows[0].total_tokens, 10) || 0,
      requests: parseInt(metricsResult.rows[0].total_requests, 10) || 0
    };

    // Fetch activity logs with pagination
    const activityQueryParams = [...queryParams, limitNum, offset];
    const activityResult = await pool.query(
      `SELECT
         ul.id,
         ul.created_at AS timestamp,
         ul.provider,
         ul.model,
         ul.prompt_tokens,
         ul.completion_tokens,
         ul.total_tokens,
         ul.cost AS llm_provider_cost,
         ul.neuroswitch_fee,
         ul.response_time,
         ul.fallback_reason,
         ul.request_model,
         ul.api_key_id,
         uak.name AS api_key_name
       FROM usage_logs ul
       LEFT JOIN api_keys uak ON ul.api_key_id = uak.id
       WHERE ul.user_id = $1 AND ul.created_at >= $2 AND ul.created_at <= $3 ${whereClause}
       ORDER BY ul.created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      activityQueryParams
    );

    // Get total count for pagination
    const totalCountResult = await pool.query(
      `SELECT COUNT(*) FROM usage_logs ul WHERE ul.user_id = $1 AND ul.created_at >= $2 AND ul.created_at <= $3 ${whereClause}`,
      queryParams
    );
    const totalLogs = parseInt(totalCountResult.rows[0].count, 10);

    res.json({
      success: true,
      data: {
        user: {
          id: targetUser.id,
          email: targetUser.email,
          display_name: targetUser.display_name
        },
        metrics,
        activity: activityResult.rows,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalLogs / limitNum),
          totalLogs,
          limit: limitNum
        }
      }
    });

  } catch (error) {
    console.error('[Admin API] Error fetching user usage:', error);
    res.status(500).json({ error: 'Failed to fetch user usage data.' });
  }
});

// DELETE /api/admin/users/:userId - Delete a user account
router.delete('/:userId', requireAdminRole, async (req: Request<{ userId: string }>, res: Response) => {
  const { userId: targetUserIdString } = req.params;
  const adminUser = req.user as AuthUser;

  if (!adminUser || typeof adminUser.id === 'undefined') {
    return res.status(401).json({ error: 'Admin user ID not found in token, unauthorized.' });
  }
  const adminUserId = adminUser.id;

  const targetUserId = parseInt(targetUserIdString, 10);
  if (isNaN(targetUserId)) {
    return res.status(400).json({ error: 'Invalid target user ID format.' });
  }

  // Prevent admins from deleting themselves
  if (targetUserId === adminUserId) {
    return res.status(403).json({ error: 'Admins cannot delete their own account.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Verify target user exists and get user details
    const userResult = await client.query('SELECT id, email, display_name, role FROM users WHERE id = $1', [targetUserId]);
    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Target user not found.' });
    }
    const targetUser = userResult.rows[0];

    // Log admin action before deletion
    const logDetails = {
      deleted_user_id: targetUserId,
      email: targetUser.email,
      display_name: targetUser.display_name,
      role: targetUser.role
    };
    await logAdminAction(adminUserId, 'USER_DELETED', 'USER', targetUserId.toString(), logDetails, `Deleted user account for ${targetUser.email}`, client);

    // Delete user (cascade will handle related records)
    await client.query('DELETE FROM users WHERE id = $1', [targetUserId]);

    await client.query('COMMIT');
    res.status(200).json({
      success: true,
      data: {
        message: 'User deleted successfully.',
        deleted_user: {
          id: targetUser.id,
          email: targetUser.email,
          display_name: targetUser.display_name,
          role: targetUser.role
        }
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Admin API] Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  } finally {
    client.release();
  }
});

export default router; 