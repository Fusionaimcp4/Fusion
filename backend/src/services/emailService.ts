"use strict";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Ensures environment variables are loaded from .env

// Initialize Nodemailer transporter for Gmail SMTP
let transporter: nodemailer.Transporter | null = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // TLS (use true if port 465)
    auth: {
      user: process.env.SMTP_USER, // Gmail address
      pass: process.env.SMTP_PASS  // Gmail app password
    }
  });
} else {
  console.warn("CRITICAL: SMTP_USER or SMTP_PASS not defined. Email sending will be disabled.");
}

/**
 * Sends a verification email to the user.
 *
 * @param {string} toEmail - The recipient's email address.
 * @param {string} token - The verification token.
 * @returns {Promise<{ success: boolean; error?: string }>}
 */
export const sendVerificationEmail = async (
  toEmail: string,
  token: string
): Promise<{ success: boolean; error?: string }> => {
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
    const errorMessage = "Frontend URL (FRONTEND_URL) is not configured.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  const verificationUrl = `${frontendUrl}/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: {
      name: "Fusion AI ",
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
        <p>If the button above doesn't work, copy & paste this URL into your browser:</p>
        <p style="word-break: break-all;"><a href="${verificationUrl}" style="color: #f97316;">${verificationUrl}</a></p>
        <p>This link is valid for 24 hours.</p>
        <p>If you did not create an account with Fusion AI, please disregard this email.</p>
        <br>
        <p>Thank you,</p>
        <p><strong>The Fusion AI Team</strong></p>
      </div>
    `,
    text: `Welcome to Fusion AI!

Thanks for signing up. Verify your email here:
${verificationUrl}

This link is valid for 24 hours.

If you did not create an account, disregard this email.

- The Fusion AI Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Verification email sent to ${toEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error(`[EmailService] Error sending verification email to ${toEmail}:`, error.message);
    return { success: false, error: error.message };
  }
};
