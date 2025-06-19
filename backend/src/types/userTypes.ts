/**
 * Represents the full user object as stored in the database.
 * This should align with your 'users' table schema in schema.sql.
 */
export interface DbUser {
  id: number;
  email: string; // UNIQUE NOT NULL
  password_hash: string | null; // NOT NULL, but can be placeholder for OAuth users
  display_name?: string | null;
  avatar_url?: string | null;
  is_active: boolean; // DEFAULT TRUE
  is_verified: boolean; // DEFAULT FALSE
  email_verification_token?: string | null;
  email_verification_token_expires_at?: Date | null;
  email_verified_at?: Date | null;
  role: string; // DEFAULT 'user'
  oauth_provider?: string | null; // For OAuth users
  oauth_id?: string | null;       // For OAuth users, unique per provider
  emergency_fallback_tokens_used: number; // DEFAULT 0
  created_at: Date; // DEFAULT CURRENT_TIMESTAMP
  updated_at: Date; // DEFAULT CURRENT_TIMESTAMP
  stripe_customer_id?: string | null; // UNIQUE
  name?: string | null; // From original schema, might be same as display_name or separate
} 