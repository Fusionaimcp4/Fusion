-- Migration: Add chat_id support to usage_logs for per-chat token tracking
-- This allows tracking token usage per chat session while maintaining backward compatibility

-- Add chat_id foreign key to usage_logs (nullable for backward compatibility)
ALTER TABLE usage_logs 
ADD COLUMN chat_id INTEGER REFERENCES chats(id) ON DELETE SET NULL;

-- Add index for fast per-chat token queries
CREATE INDEX idx_usage_logs_chat_id ON usage_logs(chat_id);

-- Add composite index for optimized per-chat-per-user queries
CREATE INDEX idx_usage_logs_chat_user ON usage_logs(chat_id, user_id);

-- Add comment for documentation
COMMENT ON COLUMN usage_logs.chat_id IS 'Optional reference to chat session. NULL for standalone API calls or historical records.';
