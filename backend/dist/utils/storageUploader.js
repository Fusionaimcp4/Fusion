"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSpacesConfig = exports.uploadTempFile = exports.uploadFileContent = exports.uploadBase64Image = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
// Configure DigitalOcean Spaces (S3-compatible)
const spacesEndpoint = new aws_sdk_1.default.Endpoint(process.env.DO_SPACES_ENDPOINT || '');
const s3 = new aws_sdk_1.default.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
    region: 'us-east-1', // DigitalOcean Spaces uses us-east-1 as default
    s3ForcePathStyle: false, // Use virtual-hosted-style URLs
    signatureVersion: 'v4',
});
const BUCKET_NAME = process.env.DO_SPACES_BUCKET || '';
const CDN_ENDPOINT = process.env.DO_SPACES_CDN_ENDPOINT || process.env.DO_SPACES_ENDPOINT || '';
/**
 * Generate a unique filename with timestamp and random hash
 */
const generateUniqueFilename = (originalName, extension) => {
    const timestamp = Date.now();
    const randomHash = crypto_1.default.randomBytes(8).toString('hex');
    if (originalName) {
        const ext = path_1.default.extname(originalName) || extension || '';
        const baseName = path_1.default.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
        return `${timestamp}-${randomHash}-${baseName}${ext}`;
    }
    return `${timestamp}-${randomHash}${extension || ''}`;
};
/**
 * Upload base64 image to DigitalOcean Spaces
 */
const uploadBase64Image = async (base64Data, filename) => {
    try {
        // Parse base64 data URL
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return { success: false, error: 'Invalid base64 image format' };
        }
        const mimeType = matches[1];
        const imageBuffer = Buffer.from(matches[2], 'base64');
        // Determine file extension from MIME type
        const extension = mime_types_1.default.extension(mimeType) || 'bin';
        const uniqueFilename = generateUniqueFilename(filename, `.${extension}`);
        const key = `ai-generated/images/${uniqueFilename}`;
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: imageBuffer,
            ContentType: mimeType,
            ACL: 'public-read',
            CacheControl: 'max-age=31536000', // 1 year cache
        };
        const result = await s3.upload(uploadParams).promise();
        const cdnUrl = result.Location.replace(process.env.DO_SPACES_ENDPOINT || '', CDN_ENDPOINT);
        return { success: true, url: cdnUrl };
    }
    catch (error) {
        console.error('Error uploading base64 image to Spaces:', error);
        return { success: false, error: error.message };
    }
};
exports.uploadBase64Image = uploadBase64Image;
/**
 * Upload file content to DigitalOcean Spaces
 */
const uploadFileContent = async (content, filename, mimeType) => {
    try {
        const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
        // Determine MIME type
        let detectedMimeType = mimeType;
        if (!detectedMimeType && filename) {
            detectedMimeType = mime_types_1.default.lookup(filename) || 'application/octet-stream';
        }
        if (!detectedMimeType) {
            detectedMimeType = 'application/octet-stream';
        }
        const uniqueFilename = generateUniqueFilename(filename);
        const key = `ai-generated/files/${uniqueFilename}`;
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: detectedMimeType,
            ACL: 'public-read',
            CacheControl: 'max-age=31536000', // 1 year cache
            ContentDisposition: filename ? `attachment; filename="${filename}"` : undefined,
        };
        const result = await s3.upload(uploadParams).promise();
        const cdnUrl = result.Location.replace(process.env.DO_SPACES_ENDPOINT || '', CDN_ENDPOINT);
        return { success: true, url: cdnUrl };
    }
    catch (error) {
        console.error('Error uploading file content to Spaces:', error);
        return { success: false, error: error.message };
    }
};
exports.uploadFileContent = uploadFileContent;
/**
 * Upload file from temporary path to DigitalOcean Spaces
 */
const uploadTempFile = async (tempFilePath, filename, mimeType) => {
    try {
        if (!fs_1.default.existsSync(tempFilePath)) {
            return { success: false, error: 'Temporary file not found' };
        }
        const fileBuffer = fs_1.default.readFileSync(tempFilePath);
        const result = await (0, exports.uploadFileContent)(fileBuffer, filename, mimeType);
        // Clean up temp file
        try {
            fs_1.default.unlinkSync(tempFilePath);
        }
        catch (cleanupError) {
            console.warn('Failed to delete temp file:', tempFilePath, cleanupError);
        }
        return result;
    }
    catch (error) {
        console.error('Error uploading temp file to Spaces:', error);
        return { success: false, error: error.message };
    }
};
exports.uploadTempFile = uploadTempFile;
/**
 * Validate DigitalOcean Spaces configuration
 */
const validateSpacesConfig = () => {
    const requiredEnvVars = [
        'DO_SPACES_KEY',
        'DO_SPACES_SECRET',
        'DO_SPACES_BUCKET',
        'DO_SPACES_ENDPOINT'
    ];
    const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missing.length > 0) {
        console.error('Missing DigitalOcean Spaces environment variables:', missing);
        return false;
    }
    // Debug logging to help identify configuration issues
    console.log('DigitalOcean Spaces Configuration:');
    console.log('- Bucket:', process.env.DO_SPACES_BUCKET);
    console.log('- Endpoint:', process.env.DO_SPACES_ENDPOINT);
    console.log('- CDN Endpoint:', process.env.DO_SPACES_CDN_ENDPOINT);
    // Check for common configuration mistakes
    const endpoint = process.env.DO_SPACES_ENDPOINT || '';
    const bucket = process.env.DO_SPACES_BUCKET || '';
    if (endpoint.includes(bucket)) {
        console.warn('⚠️  WARNING: DO_SPACES_ENDPOINT should not include the bucket name!');
        console.warn('   Current endpoint:', endpoint);
        console.warn('   Should be something like: https://sfo3.digitaloceanspaces.com');
        console.warn('   Bucket name should only be in DO_SPACES_BUCKET:', bucket);
    }
    return true;
};
exports.validateSpacesConfig = validateSpacesConfig;
