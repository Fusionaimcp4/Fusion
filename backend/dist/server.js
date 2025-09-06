"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Fix passport imports for production deployment
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: MicrosoftStrategy } = require('passport-microsoft');
const { Strategy: AppleStrategy } = require('passport-apple');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const chat_1 = __importDefault(require("./routes/chat"));
const apiKeys_1 = __importDefault(require("./routes/apiKeys"));
const userActivity_1 = __importDefault(require("./routes/userActivity"));
const userProfile_1 = __importDefault(require("./routes/userProfile"));
const chatHistory_1 = __importDefault(require("./routes/chatHistory"));
const stripe_1 = __importDefault(require("./routes/stripe"));
const btcpay_1 = __importDefault(require("./routes/btcpay"));
const credits_1 = __importDefault(require("./routes/credits"));
const auth_1 = require("./middleware/auth");
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
const models_1 = __importDefault(require("./routes/models"));
const userExternalApiKeys_1 = __importDefault(require("./routes/userExternalApiKeys"));
const index_1 = __importDefault(require("./routes/adminApi/index"));
const adminAuth_1 = require("./middleware/adminAuth");
const emailService_1 = require("./services/emailService");
const swagger_1 = require("./config/swagger");
// import provisioningKeyRoutes from './routes/provisioningKeys'; // Commented out
// import subscriptionRoutes from './routes/subscription';       // Commented out
// import integrationsRoutes from './routes/integrations';       // Commented out
// import providerRoutes from './routes/providers'; // Ensuring this is commented out
// import usageLogRoutes from './routes/usageLogs'; // Ensuring this is commented out
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-jwt-secret-CHANGE-THIS';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
if (JWT_SECRET === 'your-fallback-jwt-secret-CHANGE-THIS') {
    console.warn('SECURITY WARNING: Using a default JWT_SECRET. Please set a strong, unique JWT_SECRET in your environment variables for production!');
}
// API Key Generation Function
const generateApiKey = (prefix = 'sk-fusion-') => {
    return prefix + crypto_1.default.randomBytes(28).toString('hex'); // Generates a key similar to sk-fusion-xxxxxxxx...
};
// Definition for generateUserToken
const generateUserToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.display_name,
        role: user.role,
        is_active: user.is_active,
        is_verified: user.is_verified,
        stripe_customer_id: user.stripe_customer_id
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};
// Modified to accept PoolClient for transactions
async function setupNewUserDefaults(userId, dbClient) {
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
            await dbClient.query('INSERT INTO user_settings (user_id, setting_key, setting_value) VALUES ($1, $2, $3) ON CONFLICT (user_id, setting_key) DO NOTHING', [userId, setting.key, setting.value]);
        }
        await dbClient.query('INSERT INTO model_preferences (user_id, default_model) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING', [userId, 'neuroswitch:mix']);
        const apiKey = generateApiKey();
        await dbClient.query('INSERT INTO api_keys (user_id, api_key) VALUES ($1, $2) ON CONFLICT (api_key) DO NOTHING', [userId, apiKey]);
        console.log(`Default settings and API key provisioned for user ID: ${userId}`);
    }
    catch (error) {
        console.error(`Error setting up new user defaults for user ID ${userId}:`, error);
        // Rethrow the error if this setup is critical for a transaction
        throw error;
    }
}
// Middleware
app.use(express_1.default.json({
    verify: (req, res, buf, encoding) => {
        const expressReq = req; // Cast to express.Request to access originalUrl
        if (expressReq.originalUrl && (expressReq.originalUrl.startsWith('/webhooks/stripe') || expressReq.originalUrl.startsWith('/webhooks/btcpay'))) {
            expressReq.rawBody = buf;
        }
    }
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
// Serve Static Files for Avatars
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Session setup
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-fallback-session-secret-CHANGE-THIS',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
}));
if (process.env.SESSION_SECRET === 'your-fallback-session-secret-CHANGE-THIS') {
    console.warn('SECURITY WARNING: Using a default SESSION_SECRET. Please set a strong, unique SESSION_SECRET in your environment variables for production!');
}
// Initialize Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Mount routes
app.use('/api/chat', auth_1.verifyToken, chat_1.default);
app.use('/api/keys', auth_1.verifyToken, apiKeys_1.default);
app.use('/api/user', auth_1.verifyToken, userActivity_1.default);
app.use('/api/profile', auth_1.verifyToken, userProfile_1.default);
app.use('/api/chats', auth_1.verifyToken, chatHistory_1.default);
// Mount the new router for user-provided external API keys
app.use('/api/external-keys', auth_1.verifyToken, userExternalApiKeys_1.default);
// Payment and Webhook Routes
// Stripe API routes (e.g., create-session, billing-portal) - protected
app.use('/api/stripe', auth_1.verifyToken, stripe_1.default);
// BTCPay API routes (e.g., create-invoice) - protected
app.use('/api/btcpay', auth_1.verifyToken, btcpay_1.default);
// Credit management routes (e.g., get balance) - protected
app.use('/api/credits', auth_1.verifyToken, credits_1.default);
// Webhook specific routes - these are typically not behind /api and not protected by user token auth
// The Stripe router itself handles which sub-routes are open (e.g. /webhooks/stripe)
// We mount the entire stripeRoutes again at /webhooks to catch /webhooks/stripe without verifyToken
// A bit of a workaround, better would be to split webhook handlers into separate routers if they grow.
app.use('/webhooks', stripe_1.default); // For /webhooks/stripe (defined inside stripe.ts, without verifyToken)
app.use('/webhooks', btcpay_1.default); // For /webhooks/btcpay (defined inside btcpay.ts, without verifyToken)
// Public routes
app.use('/api/models', models_1.default);
// Swagger API Documentation (Development only)
const shouldEnableSwagger = process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true';
if (shouldEnableSwagger && swagger_1.specs && swagger_1.swaggerUi) {
    // Serve the OpenAPI JSON spec at /swagger.json
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger_1.specs);
    });
    // Serve the Swagger UI at /api-docs
    app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs, {
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
}
else if (shouldEnableSwagger) {
    console.log('⚠️  Swagger packages not available, documentation disabled');
}
// Mount admin routes
app.use('/api/admin', auth_1.verifyToken, adminAuth_1.requireAdminRole, index_1.default);
// Mount new routes
app.use('/api/user', auth_1.verifyToken, userActivity_1.default);
// app.use('/api/providers', verifyToken, providerRoutes); // Commented out - router not defined due to missing file
// app.use('/api/usage-logs', verifyToken, usageLogRoutes); // Commented out - router not defined due to missing file
app.use('/api/user-api-keys', auth_1.verifyToken, apiKeys_1.default); // Corrected from userApiKeysRoutes
// app.use('/api/provisioning-keys', verifyToken, provisioningKeyRoutes); // Commented out - router not defined due to missing file
// app.use('/api/subscription', verifyToken, subscriptionRoutes);       // Commented out - router not defined due to missing file
// app.use('/api/integrations', verifyToken, integrationsRoutes);       // Commented out - router not defined due to missing file
// Serialize/Deserialize User
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const result = await db_1.default.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            done(null, result.rows[0]);
        }
        else {
            done(new Error('User not found during deserialization'), null);
        }
    }
    catch (err) {
        done(err, null);
    }
});
// Configure OAuth Strategies
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport_1.default.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        var _a, _b, _c;
        try {
            // Check if user exists
            const existingUser = await db_1.default.query('SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2', [profile.id, 'google']);
            if (existingUser.rows.length > 0) {
                return done(null, existingUser.rows[0]);
            }
            // Create new user
            const newUserResult = await db_1.default.query('INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *', [((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || '', 'google', profile.id, profile.displayName || ((_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName) || 'Google User']);
            const newUser = newUserResult.rows[0];
            await setupNewUserDefaults(newUser.id, db_1.default);
            return done(null, newUser);
        }
        catch (err) {
            return done(err, false);
        }
    }));
}
// Setup other OAuth providers with similar pattern
// Microsoft
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    passport_1.default.use(new MicrosoftStrategy({
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: '/auth/microsoft/callback',
        scope: ['user.read']
    }, async (_accessToken, _refreshToken, profile, done) => {
        var _a, _b, _c;
        try {
            const existingUser = await db_1.default.query('SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2', [profile.id, 'microsoft']);
            if (existingUser.rows.length > 0) {
                return done(null, existingUser.rows[0]);
            }
            const newUserResult = await db_1.default.query('INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *', [((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || '', 'microsoft', profile.id, profile.displayName || ((_c = profile.name) === null || _c === void 0 ? void 0 : _c.givenName) || 'User']);
            const newUser = newUserResult.rows[0];
            await setupNewUserDefaults(newUser.id, db_1.default);
            return done(null, newUser);
        }
        catch (err) {
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
    passport_1.default.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || 'https://api.mcp4.ai/auth/github/callback'
    }, async (_accessToken, _refreshToken, profile, done) => {
        var _a, _b;
        try {
            const existingUser = await db_1.default.query('SELECT * FROM users WHERE oauth_id = $1 AND oauth_provider = $2', [profile.id, 'github']);
            if (existingUser.rows.length > 0) {
                return done(null, existingUser.rows[0]);
            }
            const email = ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || `${profile.username}@users.noreply.github.com`;
            const displayName = profile.displayName || profile.username || 'GitHub User';
            const newUserResult = await db_1.default.query('INSERT INTO users (email, password_hash, oauth_provider, oauth_id, display_name, is_verified) VALUES ($1, NULL, $2, $3, $4, TRUE) RETURNING *', [email, 'github', profile.id, displayName]);
            const newUser = newUserResult.rows[0];
            await setupNewUserDefaults(newUser.id, db_1.default);
            return done(null, newUser);
        }
        catch (err) {
            return done(err, false);
        }
    }));
}
// Apple, Amazon, LinkedIn, Facebook would follow similar patterns
// They are omitted here for brevity but would be implemented similarly
// Auth Routes
// Google
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const passportUser = req.user; // User from passport
    const payload = {
        id: passportUser.id,
        email: passportUser.email,
        name: passportUser.display_name || passportUser.displayName, // Use display_name or displayName from passport
        stripe_customer_id: passportUser.stripe_customer_id
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your-jwt-secret', { expiresIn: '24h' });
    // Redirect with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
});
// Microsoft
app.get('/auth/microsoft', passport_1.default.authenticate('microsoft'));
app.get('/auth/microsoft/callback', passport_1.default.authenticate('microsoft', { failureRedirect: '/login' }), (req, res) => {
    const passportUser = req.user;
    const payload = {
        id: passportUser.id,
        email: passportUser.email,
        name: passportUser.displayName || passportUser.display_name, // Use displayName or display_name from passport
        stripe_customer_id: passportUser.stripe_customer_id
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your-jwt-secret', { expiresIn: '24h' });
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
});
// GitHub
app.get('/auth/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    const passportUser = req.user;
    const payload = {
        id: passportUser.id,
        email: passportUser.email,
        name: passportUser.display_name || passportUser.displayName,
        stripe_customer_id: passportUser.stripe_customer_id
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your-jwt-secret', { expiresIn: '24h' });
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`);
});
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
app.post('/auth/email/register', async (req, res) => {
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
        const client = await db_1.default.connect();
        try {
            await client.query('BEGIN');
            const existingUserRes = await client.query('SELECT id, email, is_verified FROM users WHERE email = $1', [email.toLowerCase()]);
            if (existingUserRes.rows.length > 0) {
                const existingUser = existingUserRes.rows[0];
                if (existingUser.is_verified) {
                    await client.query('ROLLBACK');
                    return res.status(409).json({ error: 'Email already in use and verified.' });
                }
                else {
                    await client.query('ROLLBACK');
                    return res.status(409).json({
                        error: 'ACCOUNT_EXISTS_UNVERIFIED',
                        message: 'This email is already registered but not verified. Please try logging in to resend the verification email.'
                    });
                }
            }
            const hashedPassword = await bcrypt_1.default.hash(password, BCRYPT_SALT_ROUNDS);
            const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
            const tokenExpiryDate = new Date();
            tokenExpiryDate.setHours(tokenExpiryDate.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);
            const newUserResult = await client.query('INSERT INTO users (email, password_hash, display_name, is_active, is_verified, email_verification_token, email_verification_token_expires_at) VALUES ($1, $2, $3, TRUE, FALSE, $4, $5) RETURNING *', [email.toLowerCase(), hashedPassword, displayName || email.split('@')[0], verificationToken, tokenExpiryDate]);
            const newUser = newUserResult.rows[0];
            await setupNewUserDefaults(newUser.id, client);
            const emailSendResult = await (0, emailService_1.sendVerificationEmail)(newUser.email, verificationToken);
            if (!emailSendResult.success) {
                console.warn(`Verification email sending failed for ${newUser.email} during registration. Error: ${emailSendResult.error}`);
                // Decide if this should be a hard fail or not. For now, registration continues.
            }
            await client.query('COMMIT');
            res.status(201).json({
                success: true,
                message: 'Registration successful. Please check your email to verify your account.'
            });
        }
        catch (err) {
            await client.query('ROLLBACK');
            console.error('Local registration transaction error:', err);
            res.status(500).json({ error: 'Server error during registration' });
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        console.error('Local registration general error:', err);
        res.status(500).json({ error: 'Server error during registration' });
    }
});
// Email Login
app.post('/auth/email/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'INVALID_INPUT', message: 'Email and password are required' });
        }
        const userResult = await db_1.default.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
        }
        let user = userResult.rows[0];
        // Check if password_hash exists (it might be null for OAuth users who never set a local password)
        if (!user.password_hash) {
            return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Login with your social provider or set a password for your account.' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
        }
        if (!user.is_active) {
            return res.status(403).json({ error: 'ACCOUNT_DEACTIVATED', message: 'Your account has been deactivated.' });
        }
        if (!user.is_verified && !user.email_verified_at && !user.email_verification_token) {
            const updateResult = await db_1.default.query('UPDATE users SET is_verified = TRUE, email_verified_at = NOW(), updated_at = NOW() WHERE id = $1 RETURNING *', [user.id]);
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
    }
    catch (err) {
        console.error('Local login error:', err);
        res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Server error during login' });
    }
});
// API Route to verify email token
app.post('/api/auth/verify-email-token', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, error: 'Token is required.', code: 'MISSING_TOKEN' });
    }
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        const userResult = await client.query('SELECT * FROM users WHERE email_verification_token = $1', [token]);
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
        await client.query('UPDATE users SET is_verified = TRUE, email_verified_at = NOW(), email_verification_token = NULL, email_verification_token_expires_at = NULL, updated_at = NOW() WHERE id = $1', [user.id]);
        await client.query('COMMIT');
        res.json({ success: true, message: 'Email successfully verified! You can now log in.' });
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Email verification error:', error);
        res.status(500).json({ success: false, error: 'Server error during email verification.', code: 'SERVER_ERROR' });
    }
    finally {
        client.release();
    }
});
// API Route to resend verification email
app.post('/api/auth/resend-verification', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required.', code: 'MISSING_EMAIL' });
    }
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
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
        const newVerificationToken = crypto_1.default.randomBytes(32).toString('hex');
        const newTokenExpiryDate = new Date();
        newTokenExpiryDate.setHours(newTokenExpiryDate.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);
        await client.query('UPDATE users SET email_verification_token = $1, email_verification_token_expires_at = $2, updated_at = NOW() WHERE id = $3', [newVerificationToken, newTokenExpiryDate, user.id]);
        // Send the new verification email
        const emailSendResult = await (0, emailService_1.sendVerificationEmail)(user.email, newVerificationToken);
        if (!emailSendResult.success) {
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
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error('Resend verification email error:', error);
        res.status(500).json({ success: false, error: 'Server error while resending verification email.', code: 'SERVER_ERROR' });
    }
    finally {
        client.release();
    }
});
// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-jwt-secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
// Example protected route
app.get('/user/profile', auth_1.verifyToken, async (req, res) => {
    try {
        const authUser = req.user;
        // Now authUser includes is_verified and is_active from the token middleware
        // You might want to fetch more details or just return what's in authUser
        const userDbResult = await db_1.default.query('SELECT id, email, display_name, created_at, role, avatar_url, is_active, is_verified, stripe_customer_id FROM users WHERE id = $1', [authUser.id]);
        if (userDbResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        // If you just want to return enriched req.user, you can do that if it has all necessary fields.
        // Otherwise, return the fresh DB query result.
        res.json(userDbResult.rows[0]);
    }
    catch (err) {
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
exports.default = app;
