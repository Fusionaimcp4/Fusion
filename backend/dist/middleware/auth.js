"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Invalid authorization header format. Expected "Bearer <token>" or "ApiKey <key>".' });
    }
    const scheme = parts[0];
    const tokenOrKey = parts[1];
    if (scheme.toLowerCase() === 'bearer') {
        // JWT Authentication
        if (!tokenOrKey) {
            return res.status(401).json({ error: 'Bearer token missing' });
        }
        try {
            // Ensure JWT_SECRET is defined, otherwise throw a server error.
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                console.error('[Auth] JWT_SECRET is not defined in environment variables.');
                return res.status(500).json({ error: 'Internal server configuration error.' });
            }
            const decoded = jsonwebtoken_1.default.verify(tokenOrKey, jwtSecret); // More specific type for decoded payload
            if (!decoded.id) {
                console.error('[Auth] JWT token does not contain user ID (id).');
                return res.status(401).json({ error: 'Invalid JWT token payload.' });
            }
            // Fetch fresh user details from DB to ensure up-to-date info and existence
            const userResult = await db_1.default.query('SELECT id, email, display_name as name, role, is_active, is_verified, stripe_customer_id FROM users WHERE id = $1 AND is_active = TRUE', [decoded.id]);
            if (userResult.rows.length === 0) {
                // User might be inactive or ID from token is no longer valid
                return res.status(401).json({ error: 'User not found, inactive, or JWT token invalid' });
            }
            req.user = userResult.rows[0]; // pg driver maps rows to objects matching column names.
            return next();
        }
        catch (err) {
            console.error('[Auth] JWT verification error:', err.name, err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired. Please log in again.' });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token. Please log in again.' });
            }
            return res.status(401).json({ error: 'Authentication failed. Please log in again.' });
        }
    }
    else if (scheme.toLowerCase() === 'apikey') {
        // System API Key Authentication
        if (!tokenOrKey) {
            return res.status(401).json({ error: 'ApiKey value missing' });
        }
        try {
            const apiKeyResult = await db_1.default.query('SELECT user_id FROM api_keys WHERE api_key = $1 AND is_active = TRUE', [tokenOrKey]);
            if (apiKeyResult.rows.length === 0) {
                return res.status(401).json({ error: 'Invalid or inactive system API key' });
            }
            const userId = apiKeyResult.rows[0].user_id;
            const userResult = await db_1.default.query('SELECT id, email, display_name as name, role, is_active, is_verified, stripe_customer_id FROM users WHERE id = $1 AND is_active = TRUE', [userId]);
            if (userResult.rows.length === 0) {
                return res.status(401).json({ error: 'User associated with system API key not found or inactive' });
            }
            req.user = userResult.rows[0];
            return next();
        }
        catch (err) {
            console.error('[Auth] System API key authentication error:', err);
            return res.status(500).json({ error: 'Internal server error during API key authentication' });
        }
    }
    else {
        return res.status(401).json({ error: 'Unsupported authentication scheme. Use Bearer (JWT) or ApiKey.' });
    }
};
exports.verifyToken = verifyToken;
