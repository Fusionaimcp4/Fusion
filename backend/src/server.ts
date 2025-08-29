import express, { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
// Fix passport imports for production deployment
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: MicrosoftStrategy } = require('passport-microsoft');
const { Strategy: AppleStrategy } = require('passport-apple');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const { Strategy: FacebookStrategy } = require('passport-facebook');
import { Pool, PoolClient, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import chatRoutes from './routes/chat';
import apiKeysRouter from './routes/apiKeys';
import userActivityRouter from './routes/userActivity';
import userProfileRoutes from './routes/userProfile';
import chatHistoryRoutes from './routes/chatHistory';
import stripeRoutes from './routes/stripe';
import btcpayRoutes from './routes/btcpay';
import creditRoutes from './routes/credits';
import { verifyToken, User as AuthUser } from './middleware/auth';
import path from 'path';
import pool from './db';
import http from 'http';
import modelsRouter from './routes/models';
import userExternalApiKeysRouter from './routes/userExternalApiKeys';
import adminApiRouter from './routes/adminApi/index';
import { requireAdminRole } from './middleware/adminAuth';
import { sendVerificationEmail } from './services/emailService';
import { DbUser } from './types/userTypes';
import { specs, swaggerUi } from './config/swagger';
// import provisioningKeyRoutes from './routes/provisioningKeys'; // Commented out
// import subscriptionRoutes from './routes/subscription';       // Commented out
// import integrationsRoutes from './routes/integrations';       // Commented out
// import providerRoutes from './routes/providers'; // Ensuring this is commented out
// import usageLogRoutes from './routes/usageLogs'; // Ensuring this is commented out

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-jwt-secret-CHANGE-THIS';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

if (JWT_SECRET === 'your-fallback-jwt-secret-CHANGE-THIS') {
  console.warn(
    'SECURITY WARNING: Using a default JWT_SECRET. Please set a strong, unique JWT_SECRET in your environment variables for production!'
  );
}

// Extend Express Request type to include rawBody
declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
    }
  }
}

// API Key Generation Function
const generateApiKey = (prefix = 'sk-fusion-'): string => {
  return prefix + crypto.randomBytes(28).toString('hex'); // Generates a key similar to sk-fusion-xxxxxxxx...
};

// Definition for generateUserToken
const generateUserToken = (
    user: Pick<DbUser, 'id' | 'email' | 'role' | 'display_name' | 'is_active' | 'is_verified' | 'stripe_customer_id'>
  ): string => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.display_name, 
        role: user.role,
        is_active: user.is_active,
        is_verified: user.is_verified,
        stripe_customer_id: user.stripe_customer_id
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Modified to accept PoolClient for transactions
async function setupNewUserDefaults(userId: number, dbClient: Pool | PoolClient) {
  try {
    const defaultSettings = [
      { key: 'theme', value: 'light' },
      { key: 'notifications_enabled', value: 'true' },
      { key: 'default_sort', value: 'balanced' },
      { key: 'default_provider', value: 'NeuroSwitch' },
      { key: 'default_model', value: 'neuroswitch:mix' },
      { key: 'token_display_mode', value: 'percentage' },
    ];
    for (const setting of defaultSettings) {
      await dbClient.query(
        'INSERT INTO user_settings (user_id, setting_key, setting_value) VALUES ($1, $2, $3) ON CONFLICT (user_id, setting_key) DO NOTHING',
        [userId, setting.key, setting.value]
      );
    }
    await dbClient.query(
      'INSERT INTO model_preferences (user_id, default_model) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING',
      [userId, 'neuroswitch:mix']
    );
    const apiKey = generateApiKey();
    await dbClient.query(
      'INSERT INTO api_keys (user_id, api_key) VALUES ($1, $2) ON CONFLICT (api_key) DO NOTHING',
      [userId, apiKey]
    );
    console.log(`Default settings and API key provisioned for user ID: ${userId}`);
  } catch (error) {
    console.error(`Error setting up new user defaults for user ID ${userId}:`, error);
    // Rethrow the error if this setup is critical for a transaction
    throw error; 
  }
}

// Middleware
app.use(express.json({
  verify: (req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: BufferEncoding) => {
    const expressReq = req as express.Request; // Cast to express.Request to access originalUrl
    if (expressReq.originalUrl && (expressReq.originalUrl.startsWith('/webhooks/stripe') || expressReq.originalUrl.startsWith('/webhooks/btcpay'))) {
      expressReq.rawBody = buf;
    }
  }
}));

// CORS Configuration - Support both development and production
const allowedOrigins = [
  'http://localhost:3000',     // Local development frontend
  'http://localhost:3001',     // Alternative local port
  'https://fusion.mcp4.ai',    // Production frontend
  process.env.FRONTEND_URL     // Custom frontend URL from environment
].filter(Boolean); // Remove any undefined values

// Log the configuration on startup for debugging
console.log('[CORS] Configured allowed origins:', allowedOrigins);
console.log('[CORS] FRONTEND_URL from env:', process.env.FRONTEND_URL);

app.use(cors({
  origin: ['https://fusion.mcp4.ai', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

// Serve Static Files for Avatars
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-fallback-session-secret-CHANGE-THIS',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
}));
if (process.env.SESSION_SECRET === 'your-fallback-session-secret-CHANGE-THIS') {
    console.warn(
      'SECURITY WARNING: Using a default SESSION_SECRET. Please set a strong, unique SESSION_SECRET in your environment variables for production!'
    );
}

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/api/chat', verifyToken, chatRoutes);
app.use('/api/keys', verifyToken, apiKeysRouter);
app.use('/api/user', verifyToken, userActivityRouter);
app.use('/api/profile', verifyToken, userProfileRoutes);
app.use('/api/chats', verifyToken, chatHistoryRoutes);

// Mount the new router for user-provided external API keys
app.use('/api/external-keys', verifyToken, userExternalApiKeysRouter);

// Payment and Webhook Routes
// Stripe API routes (e.g., create-session, billing-portal) - protected
app.use('/api/stripe', verifyToken, stripeRoutes);
// BTCPay API routes (e.g., create-invoice) - protected
app.use('/api/btcpay', verifyToken, btcpayRoutes);
// Credit management routes (e.g., get balance) - protected
app.use('/api/credits', verifyToken, creditRoutes);

// Webhook specific routes - these are typically not behind /api and not protected by user token auth
// The Stripe router itself handles which sub-routes are open (e.g. /webhooks/stripe)
// We mount the entire stripeRoutes again at /webhooks to catch /webhooks/stripe without verifyToken
// A bit of a workaround, better would be to split webhook handlers into separate routers if they grow.
app.use('/webhooks', stripeRoutes); // For /webhooks/stripe (defined inside stripe.ts, without verifyToken)
app.use('/webhooks', btcpayRoutes); // For /webhooks/btcpay (defined inside btcpay.ts, without verifyToken)

// Public routes
app.use('/api/models', modelsRouter);

// Swagger API Documentation (Development only)
const shouldEnableSwagger = process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true';

if (shouldEnableSwagger && specs && swaggerUi) {
  // Serve the OpenAPI JSON spec at /swagger.json
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Serve the Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Fusion AI API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true, // Keep auth token between page reloads
      displayRequestDuration: true,
      docExpansion: 'list', // Show endpoints collapsed by default
      filter: true, // Enable search filter
      showExtensions: true,
      showCommonExtensions: true
    }
  }));
  
  const swaggerUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  console.log('📚 Swagger UI available at:', `${swaggerUrl}/api-docs`);
  console.log('📄 OpenAPI JSON spec available at:', `${swaggerUrl}/swagger.json`);
} else if (shouldEnableSwagger) {
  console.log('⚠️  Swagger packages not available, documentation disabled');
}

// Mount admin routes
app.use('/api/admin', verifyToken, requireAdminRole, adminApiRouter);

// Mount new routes
app.use('/api/user', verifyToken, userActivityRouter);
// app.use('/api/providers', verifyToken, providerRoutes); // Commented out - router not defined due to missing file
// app.use('/api/usage-logs', verifyToken, usageLogRoutes); // Commented out - router not defined due to missing file
app.use('/api/user-api-keys', verifyToken, apiKeysRouter); // Corrected from userApiKeysRoutes
// app.use('/api/provisioning-keys', verifyToken, provisioningKeyRoutes); // Commented out - router not defined due to missing file
// app.use('/api/subscription', verifyToken, subscriptionRoutes);       // Commented out - router not defined due to missing file
// app.use('/api/integrations', verifyToken, integrationsRoutes);       // Commented out - router not defined due to missing file

// Serialize/Deserialize User
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result: QueryResult<DbUser> = await pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [id]
    );
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error('User not found during deserialization'), null);
    }
  } catch (err) {
    done(err, null);
  }
});

// Configure OAuth Strategies
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      // Check if user exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2',
        [profile.id, 'google']
      );

      if (existingUser.rows.length > 0) {
        return done(null, existingUser.rows[0]);
      }

      // Create new user
      const newUserResult = await pool.query(
        'INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *',
        [profile.emails?.[0]?.value || '', 'google', profile.id, profile.displayName || profile.name?.givenName || 'Google User']
      );
      const newUser = newUserResult.rows[0];
      await setupNewUserDefaults(newUser.id, pool);
      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  }));
}

// Setup other OAuth providers with similar pattern
// Microsoft
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
  passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: '/auth/microsoft/callback',
    scope: ['user.read']
  }, async (_accessToken: string, _refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2',
        [profile.id, 'microsoft']
      );

      if (existingUser.rows.length > 0) {
        return done(null, existingUser.rows[0]);
      }

      const newUserResult = await pool.query(
        'INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *',
        [profile.emails?.[0]?.value || '', 'microsoft', profile.id, profile.displayName || profile.name?.givenName || 'User']
      );
      const newUser = newUserResult.rows[0];
      await setupNewUserDefaults(newUser.id, pool);
      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  }));
}

// Apple
// TODO: Configure Apple OAuth - requires specific setup
// if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
//   passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_CLIENT_ID,
//     teamId: process.env.APPLE_TEAM_ID,
//     keyId: process.env.APPLE_KEY_ID,
//     key: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newlines in env vars
//     callbackURL: '/auth/apple/callback',
//     scope: ['name', 'email']
//   }, async (_req: any, _accessToken: string, _refreshToken: string, _idToken: any, profile: any, done: (error: any, user?: any) => void) => {
//     try {
//       const existingUser = await pool.query(
//         'SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2',
//         [profile.id, 'apple']
//       );

//       if (existingUser.rows.length > 0) {
//         return done(null, existingUser.rows[0]);
//       }

//       const email = profile.email || `${profile.id}@privaterelay.appleid.com`;
//       const displayName = profile.name ? `${profile.name.firstName || ''} ${profile.name.lastName || ''}`.trim() : 'Apple User';
      
//       const newUserResult = await pool.query(
//         'INSERT INTO users (email, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, $2, $3, $4, TRUE) RETURNING *',
//         [email, 'apple', profile.id, displayName || 'Apple User']
//       );
//       const newUser = newUserResult.rows[0];
//       await setupNewUserDefaults(newUser.id, pool);
//       return done(null, newUser);
//     } catch (err) {
//       return done(err, false);
//     }
//   }));
// }

// GitHub
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'https://api.mcp4.ai/auth/github/callback'
  }, async (_accessToken: string, _refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
    try {
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2',
        [profile.id, 'github']
      );

      if (existingUser.rows.length > 0) {
        return done(null, existingUser.rows[0]);
      }

      const email = profile.emails?.[0]?.value || `${profile.username}@users.noreply.github.com`;
      const displayName = profile.displayName || profile.username || 'GitHub User';
      
      const newUserResult = await pool.query(
        'INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *',
        [email, 'github', profile.id, displayName]
      );
      const newUser = newUserResult.rows[0];
      await setupNewUserDefaults(newUser.id, pool);
      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  }));
}

// Apple, Amazon, LinkedIn, Facebook would follow similar patterns
// They are omitted here for brevity but would be implemented similarly

// Auth Routes

// Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const passportUser = req.user as any; // User from passport
    const payload = {
      id: passportUser.id,
      email: passportUser.email, 
      name: passportUser.display_name || passportUser.displayName, // Use display_name or displayName from passport
      stripe_customer_id: passportUser.stripe_customer_id 
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '24h' }
    );
    // Redirect with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
  }
);

// Microsoft
app.get('/auth/microsoft', passport.authenticate('microsoft'));
app.get('/auth/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    const passportUser = req.user as any;
    const payload = {
      id: passportUser.id,
      email: passportUser.email,
      name: passportUser.displayName || passportUser.display_name, // Use displayName or display_name from passport
      stripe_customer_id: passportUser.stripe_customer_id
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
  }
);

// GitHub
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const passportUser = req.user as any;
    const payload = {
      id: passportUser.id,
      email: passportUser.email,
      name: passportUser.display_name || passportUser.displayName,
      stripe_customer_id: passportUser.stripe_customer_id
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
  }
);

// TODO: Add Apple routes when Apple strategy is properly configured
// app.get('/auth/apple', passport.authenticate('apple'));
// app.get('/auth/apple/callback',
//   passport.authenticate('apple', { failureRedirect: '/login' }),
//   (req, res) => {
//     const passportUser = req.user as any;
//     const payload = {
//       id: passportUser.id,
//       email: passportUser.email,
//       name: passportUser.display_name || passportUser.displayName,
//       stripe_customer_id: passportUser.stripe_customer_id
//     };
//     const token = jwt.sign(
//       payload,
//       process.env.JWT_SECRET || 'your-jwt-secret',
//       { expiresIn: '24h' }
//     );
//     res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
//   }
// );

// Routes for other OAuth providers would be similar

// Email Registration
app.post('/auth/email/register', async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const existingUserRes: QueryResult<DbUser> = await client.query(
        'SELECT id, email, is_verified FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingUserRes.rows.length > 0) {
        const existingUser = existingUserRes.rows[0];
        if (existingUser.is_verified) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'Email already in use and verified.' });
        } else {
            await client.query('ROLLBACK');
            return res.status(409).json({
                 error: 'ACCOUNT_EXISTS_UNVERIFIED',
                 message: 'This email is already registered but not verified. Please try logging in to resend the verification email.'
                });
        }
      }

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiryDate = new Date();
      tokenExpiryDate.setHours(tokenExpiryDate.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);

      const newUserResult: QueryResult<DbUser> = await client.query(
        'INSERT INTO users (email, password_hash, display_name, is_active, is_verified, email_verification_token, email_verification_token_expires_at) VALUES ($1, $2, $3, TRUE, FALSE, $4, $5) RETURNING *',
        [email.toLowerCase(), hashedPassword, displayName || email.split('@')[0], verificationToken, tokenExpiryDate]
    );
    const newUser = newUserResult.rows[0];
      
      await setupNewUserDefaults(newUser.id, client);
      const emailSendResult = await sendVerificationEmail(newUser.email, verificationToken);
      if(!emailSendResult.success) {
        console.warn(`Verification email sending failed for ${newUser.email} during registration. Error: ${emailSendResult.error}`);
        // Decide if this should be a hard fail or not. For now, registration continues.
      }
      
      await client.query('COMMIT');
      res.status(201).json({ 
          success: true, 
          message: 'Registration successful. Please check your email to verify your account.' 
        });

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Local registration transaction error:', err);
      res.status(500).json({ error: 'Server error during registration' });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Local registration general error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Email Login
app.post('/auth/email/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'INVALID_INPUT', message: 'Email and password are required' });
    }

    const userResult: QueryResult<DbUser> = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email.toLowerCase()]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
    }
    let user = userResult.rows[0];
    
    // Check if password_hash exists (it might be null for OAuth users who never set a local password)
    if (!user.password_hash) {
        return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Login with your social provider or set a password for your account.'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
    }

    if (!user.is_active) {
        return res.status(403).json({ error: 'ACCOUNT_DEACTIVATED', message: 'Your account has been deactivated.' });
    }

    if (!user.is_verified && !user.email_verified_at && !user.email_verification_token) {
        const updateResult = await pool.query(
            'UPDATE users SET is_verified = TRUE, email_verified_at = NOW(), updated_at = NOW() WHERE id = $1 RETURNING *',
            [user.id]
        );
        user = updateResult.rows[0] || user; // Update user object with new verified status
        console.log(`User ID ${user.id} auto-verified upon login.`);
    }
    
    if (!user.is_verified) {
      return res.status(403).json({ 
          error: 'ACCOUNT_NOT_VERIFIED', 
          message: 'Your email is not verified. Please check your inbox or request a new verification link.' 
        });
    }
    
    const token = generateUserToken(user);
    res.json({ token, userId: user.id, email: user.email, name: user.display_name });

  } catch (err) {
    console.error('Local login error:', err);
    res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server error during login' });
  }
});

// API Route to verify email token
app.post('/api/auth/verify-email-token', async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: 'Token is required.', code: 'MISSING_TOKEN' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userResult: QueryResult<DbUser> = await client.query(
      'SELECT * FROM users WHERE email_verification_token = $1',
      [token]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: 'Invalid verification token.', code: 'INVALID_TOKEN' });
    }

    const user = userResult.rows[0];

    if (user.is_verified && user.email_verified_at) {
      await client.query('ROLLBACK');
      return res.status(200).json({ success: true, message: 'Email is already verified.', code: 'ALREADY_VERIFIED' });
    }

    if (user.email_verification_token_expires_at && new Date(user.email_verification_token_expires_at) < new Date()) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: 'Verification token has expired. Please request a new one.', code: 'EXPIRED_TOKEN' });
    }

    await client.query(
      'UPDATE users SET is_verified = TRUE, email_verified_at = NOW(), email_verification_token = NULL, email_verification_token_expires_at = NULL, updated_at = NOW() WHERE id = $1',
      [user.id]
    );

    await client.query('COMMIT');
    res.json({ success: true, message: 'Email successfully verified! You can now log in.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Email verification error:', error);
    res.status(500).json({ success: false, error: 'Server error during email verification.', code: 'SERVER_ERROR' });
  } finally {
    client.release();
  }
});

// API Route to resend verification email
app.post('/api/auth/resend-verification', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.', code: 'MISSING_EMAIL' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userResult: QueryResult<DbUser> = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
      await client.query('ROLLBACK');
      // Avoid revealing if an email exists or not for non-verified users for security.
      // However, if they are trying to resend, they likely know the email exists.
      // For now, a generic message. Could be debated.
      return res.status(404).json({ success: false, error: 'If an account with this email exists and is not verified, a new verification email will be sent.', code: 'USER_NOT_FOUND_OR_ALREADY_VERIFIED' });
    }

    const user = userResult.rows[0];

    if (user.is_verified && user.email_verified_at) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: 'This email address is already verified.', code: 'ALREADY_VERIFIED' });
    }

    // Generate new token and expiry
    const newVerificationToken = crypto.randomBytes(32).toString('hex');
    const newTokenExpiryDate = new Date();
    newTokenExpiryDate.setHours(newTokenExpiryDate.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);

    await client.query(
      'UPDATE users SET email_verification_token = $1, email_verification_token_expires_at = $2, updated_at = NOW() WHERE id = $3',
      [newVerificationToken, newTokenExpiryDate, user.id]
    );
    
    // Send the new verification email
    const emailSendResult = await sendVerificationEmail(user.email, newVerificationToken);
    if(!emailSendResult.success) {
      // If email sending fails, we should ideally roll back or at least log it prominently.
      // For now, we proceed but the user won't get the email.
      console.warn(`Resend verification email sending failed for ${user.email}. Error: ${emailSendResult.error}`);
      // Consider if this should return an error to the client.
      // If the token was updated in DB but email failed, user is in a state where old link is invalid and new one wasn't sent.
      // It might be better to roll back if email sending fails.
      // For this implementation, let's return success that the process was attempted.
    }

    await client.query('COMMIT');
    res.json({ success: true, message: 'A new verification email has been sent. Please check your inbox.' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Resend verification email error:', error);
    res.status(500).json({ success: false, error: 'Server error while resending verification email.', code: 'SERVER_ERROR' });
  } finally {
    client.release();
  }
});

// JWT Authentication Middleware
export const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret', (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Example protected route
app.get('/user/profile', verifyToken, async (req: Request, res: Response) => {
  try {
    const authUser = req.user as AuthUser;
    // Now authUser includes is_verified and is_active from the token middleware
    // You might want to fetch more details or just return what's in authUser
    const userDbResult: QueryResult<DbUser> = await pool.query(
        'SELECT id, email, display_name, created_at, role, avatar_url, is_active, is_verified, stripe_customer_id FROM users WHERE id = $1',
        [authUser.id]
    );
    if (userDbResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // If you just want to return enriched req.user, you can do that if it has all necessary fields.
    // Otherwise, return the fresh DB query result.
    res.json(userDbResult.rows[0]);
  } catch (err) {
    console.error('User profile fetch error:', err);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// Root path for basic check
app.get('/', (req, res) => res.send('Fusion Backend is Active'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 