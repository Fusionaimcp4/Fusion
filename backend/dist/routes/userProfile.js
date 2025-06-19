"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// --- Multer Setup for Avatar Uploads ---
const AVATAR_UPLOAD_DIR = path_1.default.join(__dirname, '../../uploads/avatars');
// Ensure the upload directory exists
if (!fs_1.default.existsSync(AVATAR_UPLOAD_DIR)) {
    fs_1.default.mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });
}
const avatarStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, AVATAR_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const userId = req.user.id;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path_1.default.extname(file.originalname);
        cb(null, `user-${userId}-avatar-${uniqueSuffix}${extension}`);
    }
});
const avatarFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Not an image! Please upload an image file.'), false);
    }
};
const uploadAvatar = (0, multer_1.default)({
    storage: avatarStorage,
    fileFilter: avatarFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
// --- End Multer Setup ---
// GET /api/profile - Fetch current user's profile details
router.get('/', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    try {
        const result = await db_1.default.query('SELECT id, email, display_name, avatar_url, created_at, role FROM users WHERE id = $1', [userId]);
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
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});
// PUT /api/profile - Update current user's display name (and potentially other flat fields later)
router.put('/', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    const { displayName } = req.body;
    // Basic validation for displayName
    if (displayName !== undefined && typeof displayName !== 'string' && displayName !== null) {
        return res.status(400).json({ error: 'Display name must be a string or null' });
    }
    try {
        const result = await db_1.default.query('UPDATE users SET display_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, display_name, avatar_url, updated_at', [displayName, userId]);
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
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});
// POST /api/profile/avatar - Upload new user avatar
router.post('/avatar', auth_1.verifyToken, uploadAvatar.single('avatar'), async (req, res) => {
    const userId = req.user.id;
    const anyReq = req;
    if (!anyReq.file) {
        return res.status(400).json({ error: 'No avatar file uploaded.' });
    }
    const avatarPath = `/uploads/avatars/${anyReq.file.filename}`;
    try {
        const result = await db_1.default.query('UPDATE users SET avatar_url = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, display_name, avatar_url, updated_at', [avatarPath, userId]);
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
    }
    catch (error) {
        console.error('Error updating avatar:', error);
        fs_1.default.unlink(anyReq.file.path, (err) => {
            if (err)
                console.error("Error deleting uploaded file after DB error:", err);
        });
        res.status(500).json({ error: 'Failed to update avatar.', details: error.message });
    }
});
// PUT /api/profile/change-password - Change user's password
router.put('/change-password', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required.' });
    }
    if (newPassword.length < 8) { // Consistent with frontend validation
        return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }
    try {
        // Fetch current user's password hash
        const userResult = await db_1.default.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const currentPasswordHash = userResult.rows[0].password_hash;
        // Verify current password
        const isMatch = await bcrypt_1.default.compare(currentPassword, currentPasswordHash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }
        // Hash new password
        const saltRounds = 10;
        const newPasswordHash = await bcrypt_1.default.hash(newPassword, saltRounds);
        // Update password in database
        await db_1.default.query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [newPasswordHash, userId]);
        res.json({ message: 'Password changed successfully!' });
    }
    catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.' });
    }
});
exports.default = router;
