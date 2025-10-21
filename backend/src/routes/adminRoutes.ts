import express, { Request, Response } from 'express';
import pool from '../db';
import { verifyToken, User } from '../middleware/auth'; // Assuming User interface is exported from auth

const router = express.Router();

const ALLOWED_ROLES_TO_SET = ['user', 'standard', 'pro', 'admin', 'sub_user', 'tester'];

// Endpoint to change a user's role (admin only)
router.put('/users/:targetUserId/role', verifyToken, async (req: Request, res: Response) => {
  const requestingUser = req.user as User;
  const { targetUserId } = req.params;
  const { newRole } = req.body;

  if (!requestingUser || typeof requestingUser.id === 'undefined') {
    // This case should ideally be caught by verifyToken itself if token is invalid or user deleted
    return res.status(401).json({ error: 'Unauthorized: Requesting user not found or token invalid.' });
  }

  if (requestingUser.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Only admins can change user roles.' });
  }

  if (!newRole || typeof newRole !== 'string') {
    return res.status(400).json({ error: 'Invalid request: newRole is required and must be a string.' });
  }

  if (!ALLOWED_ROLES_TO_SET.includes(newRole)) {
    return res.status(400).json({ error: `Invalid role. Must be one of: ${ALLOWED_ROLES_TO_SET.join(', ')}` });
  }

  const targetUserIdNum = parseInt(targetUserId, 10);
  if (isNaN(targetUserIdNum)) {
    return res.status(400).json({ error: 'Invalid targetUserId format.'});
  }

  // Optional: Add logic to prevent admins from easily changing their own role to non-admin,
  // or to prevent promotion to admin if that should be even more restricted.
  // For example, an admin cannot demote themselves via this endpoint:
  if (targetUserIdNum === requestingUser.id && newRole !== 'admin') {
     return res.status(400).json({ error: 'Admins cannot demote themselves via this endpoint. Use database tools for critical changes or implement a separate, more explicit mechanism.' });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, display_name, role',
      [newRole, targetUserIdNum]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Target user not found.' });
    }
    res.json({ message: 'User role updated successfully.', user: result.rows[0] });
  } catch (dbError: any) {
    console.error("Error updating user role:", dbError);
    // Check for specific DB errors if needed, e.g., foreign key violations, etc.
    res.status(500).json({ error: 'Database error while updating role.', details: dbError.message });
  }
});

// Future: Add other admin-specific routes here, e.g., list users
// router.get('/users', verifyToken, async (req: Request, res: Response) => { ... });

export default router; 