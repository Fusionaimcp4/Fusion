import sgMail, { MailDataRequired } from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Ensures environment variables are loaded from .env

// Initialize SendGrid API Key
// It's crucial that SENDGRID_API_KEY is set in your .env file or environment variables.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn(
    'CRITICAL: SENDGRID_API_KEY is not defined in environment variables. Email sending will be disabled.'
  );
  // Optionally, you could throw an error here to prevent the app from starting if email is critical
  // throw new Error('SENDGRID_API_KEY is not defined.');
}

/**
 * Sends a verification email to the user.
 * 
 * @param {string} toEmail - The recipient's email address.
 * @param {string} token - The verification token.
 * @returns {Promise<{ success: boolean; error?: string }>} - An object indicating success or failure.
 */
export const sendVerificationEmail = async (
  toEmail: string,
  token: string
): Promise<{ success: boolean; error?: string }> => {
  // Check if SendGrid is configured before attempting to send
  if (!process.env.SENDGRID_API_KEY) {
    const errorMessage = 'Email service (SendGrid API Key) is not configured. Cannot send verification email.';
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  const senderEmail = process.env.SENDER_EMAIL_ADDRESS;
  if (!senderEmail) {
    const errorMessage = 'Sender email address (SENDER_EMAIL_ADDRESS) is not configured. Cannot send verification email.';
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    const errorMessage = 'Frontend URL (FRONTEND_URL) is not configured. Cannot create verification link.';
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  const verificationUrl = `${frontendUrl}/auth/verify-email?token=${token}`;
  
  // Construct the email message
  // Ensure this MailDataRequired object matches SendGrid's expectations.
  const msg: MailDataRequired = {
    to: toEmail,
    from: {
        email: senderEmail,
        name: 'Fusion AI Team' // Optional: Customize the sender name
    },
    subject: 'Verify Your Email Address for Fusion AI',
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
    text: `
      Welcome to Fusion AI!

      Thanks for signing up. To complete your registration and activate your account, please verify your email address by visiting the following URL:
      ${verificationUrl}

      This verification link is valid for 24 hours.

      If you did not create an account with Fusion AI, please disregard this email.

      Thank you,
      The Fusion AI Team
    `,
    trackingSettings: {
        clickTracking: {
            enable: false, // Optional: disable click tracking for verification links if preferred
            enableText: false
        }
    }
  };

  try {
    await sgMail.send(msg);
    console.log(`[EmailService] Verification email successfully sent to ${toEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error(`[EmailService] Error sending verification email to ${toEmail}:`);
    // Log detailed error from SendGrid if available
    if (error.response && error.response.body && error.response.body.errors) {
      console.error('[EmailService] SendGrid API Error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    // Log the full error object for more context if needed, but be mindful of large objects in logs
    // console.error('[EmailService] Full error object:', error);
    
    // Determine a more specific error message if possible
    let errorMessage = 'Failed to send verification email due to an internal error.';
    if (error.response && error.response.body && error.response.body.errors && error.response.body.errors.length > 0) {
        errorMessage = `SendGrid error: ${error.response.body.errors.map((e: any) => e.message).join(', ')}`;
    }

    return { success: false, error: errorMessage };
  }
}; 