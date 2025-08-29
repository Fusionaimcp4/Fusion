"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;

const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Ensures environment variables are loaded from .env

// Initialize Nodemailer transporter for Gmail SMTP
let transporter;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // use TLS
        auth: {
            user: process.env.SMTP_USER, // Gmail address
            pass: process.env.SMTP_PASS  // Gmail app password
        }
    });
} else {
    console.warn("CRITICAL: SMTP_USER or SMTP_PASS not defined in environment variables. Email sending will be disabled.");
}

/**
 * Sends a verification email to the user.
 *
 * @param {string} toEmail - The recipient's email address.
 * @param {string} token - The verification token.
 * @returns {Promise<{ success: boolean; error?: string }>} - An object indicating success or failure.
 */
const sendVerificationEmail = async (toEmail, token) => {
    if (!transporter) {
        const errorMessage = "Email service is not configured. Cannot send verification email.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }

    const senderEmail = process.env.SENDER_EMAIL_ADDRESS || process.env.SMTP_USER;
    if (!senderEmail) {
        const errorMessage = "Sender email address is not configured.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
        const errorMessage = "Frontend URL (FRONTEND_URL) is not configured. Cannot create verification link.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
    }

    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: {
            name: "Fusion AI Team",
            address: senderEmail
        },
        to: toEmail,
        subject: "Verify Your Email Address for Fusion AI",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #f97316; text-align: center;">Welcome to Fusion AI!</h2>
        <p>Thanks for signing up. To complete your registration and activate your account, please click the button below to verify your email address:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #f97316; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
            Verify Email Address
          </a>
        </p>
        <p>If the button above doesn't work, you can copy and paste the following URL into your browser's address bar:</p>
        <p style="word-break: break-all;"><a href="${verificationUrl}" style="color: #f97316;">${verificationUrl}</a></p>
        <p>This verification link is valid for 24 hours. If you don't verify your email within this time, you may need to request a new verification link.</p>
        <p>If you did not create an account with Fusion AI, please disregard this email.</p>
        <br>
        <p>Thank you,</p>
        <p><strong>The Fusion AI Team</strong></p>
      </div>
    `,
        text: `Welcome to Fusion AI!
        
Thanks for signing up. To complete your registration and activate your account, please verify your email address by visiting the following URL:
${verificationUrl}

This verification link is valid for 24 hours.

If you did not create an account with Fusion AI, please disregard this email.

Thank you,
The Fusion AI Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Verification email successfully sent to ${toEmail}`);
        return { success: true };
    } catch (error) {
        console.error(`[EmailService] Error sending verification email to ${toEmail}:`, error.message);
        return { success: false, error: error.message };
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
