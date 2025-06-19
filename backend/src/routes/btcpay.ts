import express, { Request, Response, Router } from 'express';
import crypto from 'crypto'; // <-- Import crypto for HMAC
import { verifyToken, User as AuthUser } from '../middleware/auth';
import pool from '../db'; // <-- Import pool for database operations
// Removed: import { OpenAPI, InvoicesService, InvoiceData } from 'btcpay-greenfield-node-client';
// import pool from '../db'; // For potential future use: logging pending transactions

// Check for essential BTCPay environment variables
if (!process.env.BTCPAY_SERVER_URL || !process.env.BTCPAY_API_KEY || !process.env.BTCPAY_STORE_ID) {
  console.error('CRITICAL ERROR: BTCPAY_SERVER_URL, BTCPAY_API_KEY, or BTCPAY_STORE_ID is not set.');
  // Depending on desired behavior, you might want to throw an error to prevent the app from starting
  // or handle this more gracefully. For now, logging and allowing startup.
  // throw new Error('BTCPAY_SERVER_URL, BTCPAY_API_KEY, or BTCPAY_STORE_ID is not set.');
}
if (!process.env.BTCPAY_WEBHOOK_SECRET) { // Check for webhook secret
    console.warn('WARNING: BTCPAY_WEBHOOK_SECRET is not set. Webhook verification will fail.');
}

const BTCPAY_SERVER_URL = process.env.BTCPAY_SERVER_URL as string;
const BTCPAY_API_KEY = process.env.BTCPAY_API_KEY as string;
const BTCPAY_STORE_ID = process.env.BTCPAY_STORE_ID as string;
const BTCPAY_WEBHOOK_SECRET = process.env.BTCPAY_WEBHOOK_SECRET as string;

const router: Router = express.Router();

// POST /api/btcpay/create-invoice
// Creates a BTCPay Server invoice for a user to purchase credits.
router.post('/create-invoice', verifyToken, async (req: Request, res: Response) => {
  // Frontend sends amount in dollars (e.g., 10.50 for $10.50)
  const { amount, currency = 'USD' } = req.body; 
  const authenticatedUser = req.user as AuthUser;
  const userId = authenticatedUser?.id;

  if (!userId) {
    return res.status(403).json({ error: 'User ID not found in token or token invalid.' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount specified. Amount must be a positive number (e.g., 10.50 for $10.50).' });
  }

  const amountMajorUnitString = amount.toFixed(2); // BTCPay API expects amount as string "10.00"

  try {
    const invoiceAPIData = {
      amount: amountMajorUnitString,
      currency: currency.toUpperCase(),
      metadata: {
        app_user_id: userId.toString(),
        credit_amount_dollars: amount.toString(), // Store original dollar amount for webhook
        payment_method: 'btcpay'
      },
      checkout: {
        redirectURL: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/credits?btcpay_payment_status=pending&invoice_id={InvoiceId}`, // {InvoiceId} is a BTCPay placeholder
        // Consider adding speedPolicy, paymentMethods as in your BTIFLIX example if needed
        // paymentMethods: ["BTC-LN"], 
        // speedPolicy: "HighSpeed",
        // expirationMinutes: 10,
      },
      // notificationUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/webhooks/btcpay`, // Prefer global webhook in BTCPay Store settings
    };

    const targetUrl = `${BTCPAY_SERVER_URL}/api/v1/stores/${BTCPAY_STORE_ID}/invoices`;
    console.log('Attempting to create BTCPay invoice at URL:', targetUrl);
    console.log('BTCPay Store ID:', BTCPAY_STORE_ID);
    console.log('BTCPay API Key (first 5 chars):', BTCPAY_API_KEY ? BTCPAY_API_KEY.substring(0, 5) : 'NOT SET');
    console.log('Requesting BTCPay invoice with data:', JSON.stringify(invoiceAPIData, null, 2));

    const btcpayResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${BTCPAY_API_KEY}`
      },
      body: JSON.stringify(invoiceAPIData)
    });

    if (!btcpayResponse.ok) {
      let errorDetails = `BTCPay API responded with status ${btcpayResponse.status}`;
      let errorStatus = btcpayResponse.status || 500;
      try {
        const errorBody = await btcpayResponse.json(); // Try to parse error as JSON
        console.error('BTCPay API error response (parsed JSON):', errorBody);
        errorDetails = errorBody.message || errorBody.detail || JSON.stringify(errorBody);
      } catch (e) {
        try {
            const errorText = await btcpayResponse.text(); // Fallback to text if JSON parse fails
            console.error('BTCPay API error response (text):', errorText);
            errorDetails = errorText.substring(0, 500); // Limit length of text error details
        } catch (textErr) {
            console.error('BTCPay API error response (failed to read text body):', textErr);
            errorDetails = `BTCPay API responded with status ${errorStatus} but body could not be read.`;
        }
      }
      return res.status(errorStatus).json({
        error: 'Failed to create BTCPay invoice via API.',
        details: errorDetails
      });
    }
    
    const responseBody = await btcpayResponse.json();

    if (!responseBody.checkoutLink) {
        console.error('BTCPay invoice created but checkoutLink is missing:', responseBody);
        return res.status(500).json({ error: 'BTCPay invoice created but checkoutLink is missing.' , details: JSON.stringify(responseBody) });
    }

    console.log('BTCPay invoice created successfully. ID:', responseBody.id, 'CheckoutLink:', responseBody.checkoutLink);
    
    // Optional: Log pending transaction in DB here (similar to commented out section previously)

    res.json({ invoiceId: responseBody.id, invoiceUrl: responseBody.checkoutLink });

  } catch (error: any) {
    console.error('Error creating BTCPay invoice (fetch or JSON parsing issue):', error);
    res.status(500).json({ error: 'Internal server error while creating BTCPay invoice.', details: error.message });
  }
});

// POST /webhooks/btcpay
// The actual path this will be mounted at from server.ts is /webhooks/btcpay
// server.ts uses app.use('/webhooks', btcpayRoutes);
// So, this route path within btcpayRoutes should be just '/btcpay'
router.post('/btcpay', async (req: Request, res: Response) => {
  console.log('BTCPay Webhook: Received a request to /webhooks/btcpay (internally /btcpay).');
  // console.log('BTCPay Webhook: Content-Type header:', req.headers['content-type']); // Still useful for debugging
  // console.log('BTCPay Webhook: req.body type:', typeof req.body); // Should be object now
  // console.log('BTCPay Webhook: req.rawBody is Buffer?', Buffer.isBuffer(req.rawBody)); // Should be true

  const sig = req.headers['btcpay-sig'] as string;
  if (!BTCPAY_WEBHOOK_SECRET) {
    console.error('BTCPay Webhook: BTCPAY_WEBHOOK_SECRET is not configured. Cannot verify signature.');
    return res.status(500).send('Webhook secret not configured.');
  }
  if (!sig) {
    console.warn('BTCPay Webhook: Missing BTCPay-Sig header.');
    return res.status(400).send('Missing signature header.');
  }
  if (!req.rawBody) { // Check if rawBody was captured
    console.error('BTCPay Webhook: Raw body not available for signature verification. Check server.ts express.json() verify function.');
    return res.status(500).send('Raw body not available.');
  }

  try {
    const hmac = crypto.createHmac('sha256', BTCPAY_WEBHOOK_SECRET);
    hmac.update(req.rawBody); // Use req.rawBody (Buffer) for HMAC
    const digest = 'sha256=' + hmac.digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(sig))) {
      console.warn('BTCPay Webhook: Invalid signature.', { receivedSig: sig, computedDigest: digest });
      return res.status(400).send('Invalid signature.');
    }
    console.log('BTCPay Webhook: Signature verified successfully.');

    const event = req.body; // req.body is already the parsed JSON object
    console.log('BTCPay Webhook: Parsed event (from req.body):', JSON.stringify(event, null, 2));

    if (event.type === 'InvoiceSettled') {
      console.log(`BTCPay Webhook: InvoiceSettled event for invoiceId: ${event.invoiceId}`);
      const invoiceId = event.invoiceId;
      const metadata = event.metadata; // { app_user_id: string, credit_amount_dollars: string, ... }

      if (!metadata || !metadata.app_user_id || !metadata.credit_amount_dollars) {
        console.error('BTCPay Webhook: Missing required metadata (app_user_id or credit_amount_dollars) in InvoiceSettled event.', metadata);
        return res.status(400).send('Missing required metadata in event.');
      }

      const userId = parseInt(metadata.app_user_id, 10);
      const amountDollars = parseFloat(metadata.credit_amount_dollars);

      if (isNaN(userId) || isNaN(amountDollars) || amountDollars <= 0) {
        console.error('BTCPay Webhook: Invalid user ID or amount in metadata.', metadata);
        return res.status(400).send('Invalid user ID or amount in metadata.');
      }
      const amountCents = Math.round(amountDollars * 100);

      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Idempotency check: Has this transaction already been completed?
        const existingTx = await client.query(
          'SELECT id FROM credit_transactions WHERE provider_transaction_id = $1 AND method = $2 AND status = $3',
          [invoiceId, 'btcpay', 'completed']
        );

        if (existingTx.rows.length > 0) {
          console.log(`BTCPay Webhook: Transaction ${invoiceId} already processed and completed. Skipping.`);
          await client.query('COMMIT'); // Commit to release transaction block, though nothing changed
          return res.status(200).json({ received: true, message: 'Already processed.' });
        }
        
        console.log(`BTCPay Webhook: Processing new completed transaction ${invoiceId} for user ${userId}, amount ${amountCents} cents.`);

        // Update user_credits table (UPSERT)
        const updateUserCreditsQuery = `
          INSERT INTO user_credits (user_id, balance_cents, updated_at)
          VALUES ($1, $2, CURRENT_TIMESTAMP)
          ON CONFLICT (user_id) DO UPDATE SET
            balance_cents = user_credits.balance_cents + EXCLUDED.balance_cents,
            updated_at = CURRENT_TIMESTAMP;
        `;
        await client.query(updateUserCreditsQuery, [userId, amountCents]);
        console.log(`BTCPay Webhook: Updated user_credits for user_id ${userId} by ${amountCents} cents.`);

        // Insert into credit_transactions table
        const insertCreditTransactionQuery = `
          INSERT INTO credit_transactions 
            (user_id, amount_cents, method, status, provider_transaction_id, description)
          VALUES ($1, $2, $3, $4, $5, $6);
        `;
        await client.query(insertCreditTransactionQuery, [
          userId,
          amountCents,
          'btcpay',
          'completed',
          invoiceId,
          `BTCPay invoice ${invoiceId} settled for ${amountDollars.toFixed(2)} USD`
        ]);
        console.log(`BTCPay Webhook: Inserted into credit_transactions for invoiceId ${invoiceId}.`);

        await client.query('COMMIT');
        console.log(`BTCPay Webhook: Successfully processed InvoiceSettled for ${invoiceId}.`);
        res.status(200).json({ received: true, message: 'Webhook processed successfully.' });

      } catch (dbError: any) {
        await client.query('ROLLBACK');
        console.error('BTCPay Webhook: Database error processing InvoiceSettled:', dbError);
        res.status(500).json({ error: 'Database error processing webhook.', details: dbError.message });
      } finally {
        client.release();
      }
    } else {
      console.log(`BTCPay Webhook: Received event type ${event.type}, not processing.`);
      res.status(200).json({ received: true, message: `Event type ${event.type} received, not processed.` });
    }
  } catch (error: any) {
    console.error('BTCPay Webhook: Error processing webhook:', error);
    if (error instanceof SyntaxError) { // JSON parsing error
        return res.status(400).send('Invalid payload format.');
    }
    res.status(500).send('Internal server error processing webhook.');
  }
});

export default router; 