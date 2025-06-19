import express, { Request, Response } from 'express';
import pool from '../db';
import { verifyToken } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

const router = express.Router();

// --- Multer Setup for Avatar Uploads ---
const AVATAR_UPLOAD_DIR = path.join(__dirname, '../../uploads/avatars');

// Ensure the upload directory exists
if (!fs.existsSync(AVATAR_UPLOAD_DIR)) {
  fs.mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });
}

const avatarStorage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, AVATAR_UPLOAD_DIR);
  },
  filename: function (req: any, file: any, cb: any) {
    const userId = (req.user as { id: number }).id;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `user-${userId}-avatar-${uniqueSuffix}${extension}`);
  }
});

const avatarFileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
// --- End Multer Setup ---

// GET /api/profile - Fetch current user's profile details
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  if (!userId) {
    return res.status(403).json({ error: 'User ID not found in token' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, display_name, avatar_url, created_at, role FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        displayName: result.rows[0].display_name,
        avatarUrl: result.rows[0].avatar_url,
        createdAt: result.rows[0].created_at,
        role: result.rows[0].role,
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT /api/profile - Update current user's display name (and potentially other flat fields later)
router.put('/', verifyToken, async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  if (!userId) {
    return res.status(403).json({ error: 'User ID not found in token' });
  }

  const { displayName } = req.body;

  // Basic validation for displayName
  if (displayName !== undefined && typeof displayName !== 'string' && displayName !== null) {
      return res.status(400).json({ error: 'Display name must be a string or null' });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET display_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, display_name, avatar_url, updated_at',
      [displayName, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or display name not updated' });
    }
    
    const updatedProfile = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        displayName: result.rows[0].display_name,
        avatarUrl: result.rows[0].avatar_url, // This will be the existing avatar_url
        updatedAt: result.rows[0].updated_at,
    };

    res.json({ message: 'Profile updated successfully', user: updatedProfile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// POST /api/profile/avatar - Upload new user avatar
router.post('/avatar', verifyToken, uploadAvatar.single('avatar'), async (req: Request, res: Response) => {
    const userId = (req.user as { id: number }).id;
    const anyReq = req as any; 

    if (!anyReq.file) {
        return res.status(400).json({ error: 'No avatar file uploaded.' });
    }

    const avatarPath = `/uploads/avatars/${anyReq.file.filename}`;

    try {
        const result = await pool.query(
            'UPDATE users SET avatar_url = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, display_name, avatar_url, updated_at',
            [avatarPath, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found while updating avatar.' });
        }
        const updatedProfile = {
            id: result.rows[0].id,
            email: result.rows[0].email,
            displayName: result.rows[0].display_name,
            avatarUrl: result.rows[0].avatar_url,
            updatedAt: result.rows[0].updated_at,
        };
        res.json({ message: 'Avatar updated successfully', user: updatedProfile });
    } catch (error: any) {
        console.error('Error updating avatar:', error);
        fs.unlink(anyReq.file.path, (err) => {
            if (err) console.error("Error deleting uploaded file after DB error:", err);
        });
        res.status(500).json({ error: 'Failed to update avatar.', details: error.message });
    }
});

// PUT /api/profile/change-password - Change user's password
router.put('/change-password', verifyToken, async (req: Request, res: Response) => {
    const userId = (req.user as { id: number }).id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 8) { // Consistent with frontend validation
        return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    try {
        // Fetch current user's password hash
        const userResult = await pool.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const currentPasswordHash = userResult.rows[0].password_hash;

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, currentPasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }

        // Hash new password
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update password in database
        await pool.query(
            'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [newPasswordHash, userId]
        );

        res.json({ message: 'Password changed successfully!' });

    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.' });
    }
});

export default router; 