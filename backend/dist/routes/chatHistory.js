"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// POST /api/chats - Create a new chat or add messages to an existing one
router.post('/', auth_1.verifyToken, async (req, res) => {
    const { chatId, title_suggestion, ui_selected_provider_for_session, user_message_content, assistant_message_content, assistant_message_actual_provider, assistant_message_actual_model_used } = req.body;
    const userId = req.user.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!ui_selected_provider_for_session || !user_message_content || !assistant_message_content || !assistant_message_actual_provider) {
        return res.status(400).json({ error: 'Missing required fields for saving chat history.' });
    }
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        let currentChatId = chatId;
        let chatDetailsResult;
        if (currentChatId === null) {
            const finalTitle = title_suggestion || user_message_content.substring(0, 75);
            const newChatQuery = `
        INSERT INTO chats (user_id, title, ui_selected_provider, created_at, updated_at, last_message_at)
        VALUES ($1, $2, $3, NOW(), NOW(), NOW())
        RETURNING id, title, ui_selected_provider, created_at, updated_at, last_message_at;
      `;
            const newChatResult = await client.query(newChatQuery, [
                userId,
                finalTitle,
                ui_selected_provider_for_session
            ]);
            currentChatId = newChatResult.rows[0].id;
            chatDetailsResult = newChatResult.rows[0];
        }
        else {
            const updateChatQuery = `
        UPDATE chats
        SET ui_selected_provider = $1, updated_at = NOW(), last_message_at = NOW()
        WHERE id = $2 AND user_id = $3
        RETURNING id, title, ui_selected_provider, created_at, updated_at, last_message_at;
      `;
            const updatedChatResult = await client.query(updateChatQuery, [
                ui_selected_provider_for_session,
                currentChatId,
                userId
            ]);
            if (updatedChatResult.rowCount === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({ error: 'Chat not found or user not authorized.' });
            }
            chatDetailsResult = updatedChatResult.rows[0];
        }
        const userMessageQuery = `
      INSERT INTO messages (chat_id, role, content, timestamp)
      VALUES ($1, $2, $3, NOW()) RETURNING id;
    `;
        await client.query(userMessageQuery, [currentChatId, 'user', user_message_content]);
        const assistantMessageQuery = `
      INSERT INTO messages (chat_id, role, content, provider, model_used, timestamp)
      VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id;
    `;
        await client.query(assistantMessageQuery, [
            currentChatId,
            'assistant',
            assistant_message_content,
            assistant_message_actual_provider,
            assistant_message_actual_model_used
        ]);
        await client.query('COMMIT');
        res.status(201).json({
            message: chatId === null ? 'New chat created and messages saved.' : 'Messages added to chat.',
            chat: chatDetailsResult
        });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Error saving chat history:', error);
        res.status(500).json({ error: 'Failed to save chat history' });
    }
    finally {
        client.release();
    }
});
// GET /api/chats - Fetch all chats for the user
router.get('/', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    try {
        const query = `
      SELECT id, user_id, title, ui_selected_provider, created_at, updated_at, last_message_at
      FROM chats
      WHERE user_id = $1
      ORDER BY last_message_at DESC;
    `;
        const result = await db_1.default.query(query, [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching chat list:', error);
        res.status(500).json({ error: 'Failed to fetch chat list' });
    }
});
// GET /api/chats/:chatId - Fetch a specific chat with its messages
router.get('/:chatId', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { chatId } = req.params;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!chatId || isNaN(parseInt(chatId))) {
        return res.status(400).json({ error: 'Invalid chat ID format.' });
    }
    const numericChatId = parseInt(chatId);
    try {
        // First, get the chat details
        const chatQuery = `
      SELECT id, user_id, title, ui_selected_provider, created_at, updated_at, last_message_at
      FROM chats
      WHERE id = $1 AND user_id = $2;
    `;
        const chatResult = await db_1.default.query(chatQuery, [numericChatId, userId]);
        if (chatResult.rows.length === 0) {
            return res.status(404).json({ error: 'Chat not found or user not authorized.' });
        }
        const chatDetails = chatResult.rows[0];
        // Then, get all messages for this chat
        const messagesQuery = `
      SELECT id, chat_id, role, content, provider, model_used, timestamp
      FROM messages
      WHERE chat_id = $1
      ORDER BY timestamp ASC;
    `;
        const messagesResult = await db_1.default.query(messagesQuery, [numericChatId]);
        res.json({
            ...chatDetails,
            messages: messagesResult.rows
        });
    }
    catch (error) {
        console.error('Error fetching specific chat:', error);
        res.status(500).json({ error: 'Failed to fetch specific chat' });
    }
});
// PUT /api/chats/:chatId - Update chat title or UI selected provider
router.put('/:chatId', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { chatId } = req.params;
    const { title, ui_selected_provider } = req.body;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!chatId || isNaN(parseInt(chatId))) {
        return res.status(400).json({ error: 'Invalid chat ID format.' });
    }
    const numericChatId = parseInt(chatId);
    if (!title && !ui_selected_provider) {
        return res.status(400).json({ error: 'No update fields provided (title or ui_selected_provider).' });
    }
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: 'Title must be a non-empty string if provided.' });
    }
    if (ui_selected_provider !== undefined && typeof ui_selected_provider !== 'string') {
        return res.status(400).json({ error: 'UI selected provider must be a string if provided.' });
    }
    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        if (title !== undefined) {
            updates.push(`title = $${paramIndex++}`);
            values.push(title.trim());
        }
        if (ui_selected_provider !== undefined) {
            updates.push(`ui_selected_provider = $${paramIndex++}`);
            values.push(ui_selected_provider);
        }
        values.push(numericChatId);
        values.push(userId);
        const query = `
      UPDATE chats
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex++} AND user_id = $${paramIndex++}
      RETURNING id, user_id, title, ui_selected_provider, created_at, updated_at, last_message_at;
    `;
        const result = await db_1.default.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Chat not found or user not authorized for update.' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating chat:', error);
        res.status(500).json({ error: 'Failed to update chat' });
    }
});
// DELETE /api/chats/:chatId - Delete a chat
router.delete('/:chatId', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { chatId } = req.params;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!chatId || isNaN(parseInt(chatId))) {
        return res.status(400).json({ error: 'Invalid chat ID format.' });
    }
    const numericChatId = parseInt(chatId);
    try {
        const query = `
      DELETE FROM chats
      WHERE id = $1 AND user_id = $2;
    `;
        const result = await db_1.default.query(query, [numericChatId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Chat not found or user not authorized for delete.' });
        }
        res.status(204).send(); // No Content, standard for successful DELETE
    }
    catch (error) {
        console.error('Error deleting chat:', error);
        // Note: If there are messages associated, ON DELETE CASCADE should handle them.
        // If not, and messages table had a strict FK without CASCADE, this could fail here if messages exist.
        // Assuming ON DELETE CASCADE is on messages.chat_id FK as per standard good practice.
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});
// POST /api/chats/messages/:messageId/react - React to a message (like/dislike)
router.post('/messages/:messageId/react', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { messageId } = req.params;
    const { reaction } = req.body;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!messageId || isNaN(parseInt(messageId))) {
        return res.status(400).json({ error: 'Invalid message ID format.' });
    }
    if (!reaction || !['like', 'dislike'].includes(reaction)) {
        return res.status(400).json({ error: 'Reaction must be either "like" or "dislike".' });
    }
    const numericMessageId = parseInt(messageId);
    try {
        // Check if message exists and user has access to it (through chat ownership)
        const messageCheck = await db_1.default.query(`
      SELECT m.id, c.user_id 
      FROM messages m 
      JOIN chats c ON m.chat_id = c.id 
      WHERE m.id = $1
    `, [numericMessageId]);
        if (messageCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Message not found.' });
        }
        if (messageCheck.rows[0].user_id !== userId) {
            return res.status(403).json({ error: 'You can only react to messages in your own chats.' });
        }
        // Upsert the reaction (update if exists, insert if doesn't)
        const upsertQuery = `
      INSERT INTO message_reactions (message_id, user_id, reaction_type) 
      VALUES ($1, $2, $3)
      ON CONFLICT (message_id, user_id) 
      DO UPDATE SET reaction_type = EXCLUDED.reaction_type, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
        const result = await db_1.default.query(upsertQuery, [numericMessageId, userId, reaction]);
        // Get updated reaction counts
        const countsQuery = `
      SELECT 
        reaction_type,
        COUNT(*) as count
      FROM message_reactions 
      WHERE message_id = $1 
      GROUP BY reaction_type
    `;
        const countsResult = await db_1.default.query(countsQuery, [numericMessageId]);
        const counts = countsResult.rows.reduce((acc, row) => {
            acc[row.reaction_type] = parseInt(row.count);
            return acc;
        }, { like: 0, dislike: 0 });
        res.json({
            success: true,
            reaction: result.rows[0],
            counts,
            userReaction: reaction
        });
    }
    catch (error) {
        console.error('Error adding message reaction:', error);
        res.status(500).json({ error: 'Failed to add reaction' });
    }
});
// DELETE /api/chats/messages/:messageId/react - Remove reaction from a message
router.delete('/messages/:messageId/react', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { messageId } = req.params;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!messageId || isNaN(parseInt(messageId))) {
        return res.status(400).json({ error: 'Invalid message ID format.' });
    }
    const numericMessageId = parseInt(messageId);
    try {
        const deleteQuery = `
      DELETE FROM message_reactions 
      WHERE message_id = $1 AND user_id = $2
      RETURNING *
    `;
        const result = await db_1.default.query(deleteQuery, [numericMessageId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No reaction found to remove.' });
        }
        // Get updated reaction counts
        const countsQuery = `
      SELECT 
        reaction_type,
        COUNT(*) as count
      FROM message_reactions 
      WHERE message_id = $1 
      GROUP BY reaction_type
    `;
        const countsResult = await db_1.default.query(countsQuery, [numericMessageId]);
        const counts = countsResult.rows.reduce((acc, row) => {
            acc[row.reaction_type] = parseInt(row.count);
            return acc;
        }, { like: 0, dislike: 0 });
        res.json({
            success: true,
            counts,
            userReaction: null
        });
    }
    catch (error) {
        console.error('Error removing message reaction:', error);
        res.status(500).json({ error: 'Failed to remove reaction' });
    }
});
// GET /api/chats/messages/:messageId/reactions - Get reaction counts and user's reaction
router.get('/messages/:messageId/reactions', auth_1.verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { messageId } = req.params;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token' });
    }
    if (!messageId || isNaN(parseInt(messageId))) {
        return res.status(400).json({ error: 'Invalid message ID format.' });
    }
    const numericMessageId = parseInt(messageId);
    try {
        // Get reaction counts
        const countsQuery = `
      SELECT 
        reaction_type,
        COUNT(*) as count
      FROM message_reactions 
      WHERE message_id = $1 
      GROUP BY reaction_type
    `;
        const countsResult = await db_1.default.query(countsQuery, [numericMessageId]);
        const counts = countsResult.rows.reduce((acc, row) => {
            acc[row.reaction_type] = parseInt(row.count);
            return acc;
        }, { like: 0, dislike: 0 });
        // Get user's reaction
        const userReactionQuery = `
      SELECT reaction_type 
      FROM message_reactions 
      WHERE message_id = $1 AND user_id = $2
    `;
        const userReactionResult = await db_1.default.query(userReactionQuery, [numericMessageId, userId]);
        const userReaction = userReactionResult.rows.length > 0 ? userReactionResult.rows[0].reaction_type : null;
        res.json({
            counts,
            userReaction
        });
    }
    catch (error) {
        console.error('Error fetching message reactions:', error);
        res.status(500).json({ error: 'Failed to fetch reactions' });
    }
});
exports.default = router;
