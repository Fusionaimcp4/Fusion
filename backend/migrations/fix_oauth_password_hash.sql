-- Migration to allow password_hash to be NULL for OAuth users
-- Run this to fix the Google OAuth login issue

-- Make password_hash nullable for OAuth users
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Update the comment to reflect the change
COMMENT ON COLUMN users.password_hash IS 'Password hash for local accounts; NULL for OAuth-only users'; 