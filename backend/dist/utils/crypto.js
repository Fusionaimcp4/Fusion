"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // GCM standard IV length is 12 bytes
const AUTH_TAG_LENGTH = 16; // GCM standard auth tag length
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
let encryptionKeyBuffer;
if (!ENCRYPTION_KEY_HEX || Buffer.from(ENCRYPTION_KEY_HEX, 'hex').length !== 32) {
    console.error('FATAL ERROR: ENCRYPTION_KEY environment variable is not set or is not a 32-byte hex string.');
    // In a production environment, you should throw an error or exit the process to prevent insecure operation.
    // For development, we'll log the error but allow the app to potentially continue, though encryption/decryption will fail.
    // throw new Error('ENCRYPTION_KEY is misconfigured. Application cannot securely run.');
    // Using a zero-filled buffer if key is invalid, which is highly insecure and for placeholder purposes only.
    encryptionKeyBuffer = Buffer.alloc(32);
}
else {
    encryptionKeyBuffer = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');
}
/**
 * Encrypts a plaintext string using AES-256-GCM.
 * @param text The plaintext to encrypt.
 * @returns A string containing the IV, auth tag, and ciphertext, colon-separated and hex-encoded.
 * @throws Error if encryption key is misconfigured or encryption fails.
 */
function encrypt(text) {
    if (Buffer.from(ENCRYPTION_KEY_HEX, 'hex').length !== 32) {
        console.error('Encryption aborted: ENCRYPTION_KEY is not a 32-byte hex string.');
        throw new Error('Encryption key is misconfigured.');
    }
    try {
        const iv = crypto_1.default.randomBytes(IV_LENGTH);
        const cipher = crypto_1.default.createCipheriv(ALGORITHM, encryptionKeyBuffer, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    }
    catch (error) {
        console.error('Encryption failed:', error);
        // Rethrow to allow calling function to handle it, e.g., return a 500 error.
        throw error;
    }
}
/**
 * Decrypts an AES-256-GCM encrypted string.
 * @param encryptedText The hex-encoded string containing IV:AuthTag:Ciphertext.
 * @returns The decrypted plaintext string.
 * @throws Error if decryption key is misconfigured, format is invalid, or decryption fails (e.g., tampered data, wrong key).
 */
function decrypt(encryptedText) {
    if (Buffer.from(ENCRYPTION_KEY_HEX, 'hex').length !== 32) {
        console.error('Decryption aborted: ENCRYPTION_KEY is not a 32-byte hex string.');
        throw new Error('Decryption key is misconfigured.');
    }
    try {
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted text format: Expected IV:AuthTag:EncryptedData');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const authTag = Buffer.from(parts[1], 'hex');
        const encryptedData = parts[2];
        if (iv.length !== IV_LENGTH) {
            throw new Error(`Invalid IV length. Expected ${IV_LENGTH} bytes, got ${iv.length}.`);
        }
        if (authTag.length !== AUTH_TAG_LENGTH) {
            throw new Error(`Invalid authTag length. Expected ${AUTH_TAG_LENGTH} bytes, got ${authTag.length}.`);
        }
        const decipher = crypto_1.default.createDecipheriv(ALGORITHM, encryptionKeyBuffer, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    catch (error) {
        console.error('Decryption failed:', error);
        // Common errors:
        // - "Unsupported state or unable to authenticate data" (often due to wrong key, tampered data, or incorrect authTag)
        // - IV length issues if not handled above.
        // Rethrow to allow calling function to handle it, e.g., log specific error and return appropriate HTTP status.
        throw error;
    }
}
