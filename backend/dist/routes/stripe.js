"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const auth_1 = require("../middleware/auth");
const db_1 = __importDefault(require("../db")); // Assuming your DB pool is exported from here
// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables.');
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20', // Updated API version to stable, cast to any for linter
});
const router = express_1.default.Router();
// POST /api/stripe/create-session
// Creates a Stripe Checkout Session for a user to purchase credits.
router.post('/create-session', auth_1.verifyToken, async (req, res) => {
    const { amount_cents, currency = 'usd' } = req.body; // amount_cents is the smallest currency unit (e.g., 1000 for $10.00)
    const authenticatedUser = req.user;
    const userId = authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token or token invalid.' });
    }
    if (!amount_cents || typeof amount_cents !== 'number' || amount_cents <= 0) {
        return res.status(400).json({ error: 'Invalid amount specified. Amount must be a positive number of cents.' });
    }
    try {
        // 1. Fetch user details from your database
        const userResult = await db_1.default.query('SELECT email, stripe_customer_id FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const userDbInfo = userResult.rows[0];
        let stripeCustomerId = userDbInfo.stripe_customer_id;
        // 2. Create a Stripe customer if one doesn't exist
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: userDbInfo.email,
                metadata: {
                    app_user_id: userId.toString(), // Link Stripe customer to your app user ID
                },
            });
            stripeCustomerId = customer.id;
            // Store the new stripe_customer_id in your database
            await db_1.default.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [stripeCustomerId, userId]);
        }
        // 3. Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: 'Fusion Credits',
                            description: `Purchase of ${amount_cents / 100} ${currency.toUpperCase()} worth of credits`,
                            // images: ['your_product_image_url'], // Optional: Add an image URL
                        },
                        unit_amount: amount_cents, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/credits?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/credits?payment_cancelled=true`,
            client_reference_id: userId.toString(), // Your internal user ID
            metadata: {
                app_user_id: userId.toString(),
                credit_amount_cents: amount_cents.toString(),
                currency: currency.toLowerCase(),
            },
        });
        if (!session.url) {
            return res.status(500).json({ error: 'Failed to create Stripe session URL.' });
        }
        res.json({ sessionId: session.id, url: session.url });
    }
    catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});
// GET /api/stripe/billing-portal
// Redirects a user to their Stripe billing portal to manage subscriptions or payment methods.
router.get('/billing-portal', auth_1.verifyToken, async (req, res) => {
    const authenticatedUser = req.user;
    const userId = authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.id;
    if (!userId) {
        return res.status(403).json({ error: 'User ID not found in token or token invalid.' });
    }
    try {
        // 1. Fetch user's Stripe Customer ID from your database
        const userResult = await db_1.default.query('SELECT stripe_customer_id FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0 || !userResult.rows[0].stripe_customer_id) {
            // This case should ideally not happen if create-session always creates/assigns a customer ID.
            // However, handle it gracefully: perhaps prompt user to make a first purchase or contact support.
            return res.status(404).json({ error: 'Stripe customer ID not found for this user. Please make a purchase first or contact support.' });
        }
        const stripeCustomerId = userResult.rows[0].stripe_customer_id;
        // 2. Create a Stripe Billing Portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/credits`,
        });
        // 3. Redirect the user to the portal session URL
        // Or, return the URL for the frontend to handle the redirect.
        res.json({ url: portalSession.url });
    }
    catch (error) {
        console.error('Error creating Stripe Billing Portal session:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});
// POST /webhooks/stripe (mounted at /webhooks/stripe from server.ts)
// The `express.raw` middleware is removed from here as raw body is captured by global express.json verify function
router.post('/stripe', async (req, res) => {
    var _a, _b;
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not set.');
        return res.status(500).send('Webhook secret not configured.');
    }
    if (!sig) {
        console.warn('Stripe Webhook: Missing Stripe-Signature header.');
        return res.status(400).send('Missing signature header.');
    }
    if (!req.rawBody) { // Check if rawBody was captured by the global verify function
        console.error('Stripe Webhook: Raw body not available for signature verification. Check server.ts express.json() verify function.');
        return res.status(500).send('Raw body not available.');
    }
    let event;
    try {
        // Use req.rawBody for constructing the event
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    }
    catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Processing checkout.session.completed for session ID: ${session.id}`);
            // Ensure payment was successful
            if (session.payment_status === 'paid') {
                const clientReferenceId = session.client_reference_id; // Our app_user_id
                const stripeTransactionId = session.id; // Use checkout session ID as provider_transaction_id
                const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : (_a = session.payment_intent) === null || _a === void 0 ? void 0 : _a.id;
                if (!clientReferenceId) {
                    console.error('Missing client_reference_id in checkout session.', session);
                    return res.status(400).send('Missing client_reference_id');
                }
                const appUserId = parseInt(clientReferenceId, 10);
                const amountCents = ((_b = session.metadata) === null || _b === void 0 ? void 0 : _b.credit_amount_cents) ? parseInt(session.metadata.credit_amount_cents, 10) : null;
                // const currency = session.metadata?.currency || session.currency; // session.currency might not be available, metadata is more reliable if we set it
                if (isNaN(appUserId) || !amountCents || amountCents <= 0) {
                    console.error('Invalid user ID or amount in session metadata.', session.metadata);
                    return res.status(400).send('Invalid metadata in session.');
                }
                const dbClient = await db_1.default.connect();
                try {
                    await dbClient.query('BEGIN');
                    // Idempotency: Check if this transaction has already been processed
                    const existingTx = await dbClient.query('SELECT id FROM credit_transactions WHERE provider_transaction_id = $1 AND method = $2', [stripeTransactionId, 'stripe']);
                    if (existingTx.rows.length > 0) {
                        console.log(`Transaction ${stripeTransactionId} already processed. Skipping.`);
                        await dbClient.query('COMMIT'); // Still commit if it was just a duplicate check
                        return res.status(200).json({ received: true, message: 'Already processed' });
                    }
                    // 1. Add credits to user_credits table
                    const updateUserCreditsQuery = `
            INSERT INTO user_credits (user_id, balance_cents, updated_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (user_id)
            DO UPDATE SET balance_cents = user_credits.balance_cents + $2, updated_at = NOW();
          `;
                    await dbClient.query(updateUserCreditsQuery, [appUserId, amountCents]);
                    // 2. Record the transaction in credit_transactions
                    const insertCreditTransactionQuery = `
            INSERT INTO credit_transactions (user_id, amount_cents, method, status, provider_transaction_id, description)
            VALUES ($1, $2, $3, $4, $5, $6);
          `;
                    await dbClient.query(insertCreditTransactionQuery, [
                        appUserId,
                        amountCents,
                        'stripe',
                        'completed',
                        stripeTransactionId, // or paymentIntentId if preferred
                        `Stripe purchase: ${amountCents / 100} credits via session ${session.id}`
                    ]);
                    await dbClient.query('COMMIT');
                    console.log(`Successfully processed Stripe payment for user ${appUserId}, amount ${amountCents} cents.`);
                }
                catch (dbError) {
                    await dbClient.query('ROLLBACK');
                    console.error('Database error during Stripe webhook processing:', dbError);
                    // Do not send detailed DB errors to Stripe, but log them for yourself.
                    // Stripe will retry if it doesn't get a 2xx response.
                    return res.status(500).send('Internal server error while processing payment.');
                }
                finally {
                    dbClient.release();
                }
            }
            else {
                console.log(`Checkout session ${session.id} not paid. Status: ${session.payment_status}`);
            }
            break;
        // TODO: Handle other event types like payment_intent.succeeded, payment_intent.payment_failed,
        // customer.subscription.deleted, customer.subscription.updated, etc., if you implement subscriptions.
        default:
            console.log(`Unhandled Stripe event type: ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
});
// Endpoint to create a Stripe SetupIntent for saving a payment method
router.post('/create-setup-intent', auth_1.verifyToken, async (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ error: 'User not authenticated' });
    }
    // Ensure email is present for customer creation if needed
    if (!user.email && !user.stripe_customer_id) {
        return res.status(400).json({ error: 'User email is required to create a Stripe customer.' });
    }
    try {
        let stripeCustomerId = user.stripe_customer_id;
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email, // Assert email is present due to check above
                name: user.name || undefined,
                metadata: {
                    app_user_id: user.id.toString(),
                },
            });
            stripeCustomerId = customer.id;
            await db_1.default.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [stripeCustomerId, user.id]);
            // Optionally update req.user or re-fetch user if you need the stripe_customer_id immediately in this request scope elsewhere
        }
        const setupIntent = await stripe.setupIntents.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            metadata: {
                app_user_id: user.id.toString(),
            }
        });
        res.json({ clientSecret: setupIntent.client_secret });
    }
    catch (error) {
        console.error("Error creating SetupIntent:", error);
        res.status(500).json({ error: 'Failed to create SetupIntent', details: error.message });
    }
});
// Endpoint to save payment method details for auto top-up
router.post('/save-payment-method-details', auth_1.verifyToken, async (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ error: 'User not authenticated' });
    }
    const { paymentMethodId } = req.body;
    if (!paymentMethodId) {
        return res.status(400).json({ error: 'paymentMethodId is required' });
    }
    try {
        // Retrieve the payment method from Stripe to get card details
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
        if (!paymentMethod.card) {
            return res.status(400).json({ error: 'Invalid payment method type, card expected.' });
        }
        const cardDetails = paymentMethod.card;
        const last4 = cardDetails.last4;
        const cardBrand = cardDetails.brand;
        // Upsert into user_auto_topup_settings
        const query = `
            INSERT INTO user_auto_topup_settings (user_id, stripe_payment_method_id, last4, card_brand, is_enabled, threshold_cents, topup_amount_cents)
            VALUES ($1, $2, $3, $4, FALSE, NULL, NULL)
            ON CONFLICT (user_id)
            DO UPDATE SET
                stripe_payment_method_id = EXCLUDED.stripe_payment_method_id,
                last4 = EXCLUDED.last4,
                card_brand = EXCLUDED.card_brand,
                is_enabled = FALSE, -- Reset to false when a new card is added
                threshold_cents = NULL,
                topup_amount_cents = NULL,
                updated_at = NOW()
            RETURNING *;
        `;
        await db_1.default.query(query, [user.id, paymentMethodId, last4, cardBrand]);
        res.json({ message: 'Payment method saved successfully for auto top-up.' });
    }
    catch (error) {
        console.error("Error saving payment method details:", error);
        res.status(500).json({ error: 'Failed to save payment method details', details: error.message });
    }
});
// Endpoint to get auto top-up details
router.get('/auto-topup-details', auth_1.verifyToken, async (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ error: 'User not authenticated' });
    }
    try {
        const result = await db_1.default.query('SELECT stripe_payment_method_id, is_enabled, threshold_cents, topup_amount_cents, last4, card_brand FROM user_auto_topup_settings WHERE user_id = $1', [user.id]);
        if (result.rows.length > 0) {
            const settings = result.rows[0];
            // Further check if a payment method is actually set
            if (settings.stripe_payment_method_id) {
                res.json({
                    hasPaymentMethod: true,
                    isEnabled: settings.is_enabled,
                    thresholdCents: settings.threshold_cents,
                    topupAmountCents: settings.topup_amount_cents,
                    last4: settings.last4,
                    cardBrand: settings.card_brand,
                    stripePaymentMethodId: settings.stripe_payment_method_id
                });
            }
            else {
                res.json({ hasPaymentMethod: false }); // Settings row exists, but no PM ID
            }
        }
        else {
            res.json({ hasPaymentMethod: false }); // No settings row found for user
        }
    }
    catch (error) {
        console.error("Error fetching auto top-up details:", error);
        res.status(500).json({ error: 'Failed to fetch auto top-up details', details: error.message });
    }
});
// Endpoint to update auto top-up settings
router.post('/update-auto-topup-settings', auth_1.verifyToken, async (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ error: 'User not authenticated' });
    }
    const { isEnabled, thresholdCents, topupAmountCents } = req.body;
    // Validate inputs
    if (typeof isEnabled !== 'boolean') {
        return res.status(400).json({ error: 'isEnabled (boolean) is required.' });
    }
    if (isEnabled) { // Threshold and top-up amount are only required if auto top-up is being enabled
        if (thresholdCents === undefined || thresholdCents === null || typeof thresholdCents !== 'number' || thresholdCents < 0) {
            return res.status(400).json({ error: 'thresholdCents (positive number) is required when enabling auto top-up.' });
        }
        if (topupAmountCents === undefined || topupAmountCents === null || typeof topupAmountCents !== 'number' || topupAmountCents <= 0) {
            return res.status(400).json({ error: 'topupAmountCents (positive number greater than 0) is required when enabling auto top-up.' });
        }
    }
    try {
        const settingsExistResult = await db_1.default.query('SELECT stripe_payment_method_id FROM user_auto_topup_settings WHERE user_id = $1', [user.id]);
        if (settingsExistResult.rows.length === 0 || !settingsExistResult.rows[0].stripe_payment_method_id) {
            return res.status(400).json({ error: 'No payment method found. Please add a payment method before configuring auto top-up.' });
        }
        // Update the settings
        // If isEnabled is false, we can nullify threshold and topup amounts, or keep them as is for user convenience when re-enabling.
        // For now, let's update them as provided, or nullify if disabling and they are not provided.
        const query = `
      UPDATE user_auto_topup_settings
      SET 
        is_enabled = $1,
        threshold_cents = $2,
        topup_amount_cents = $3,
        updated_at = NOW()
      WHERE user_id = $4
      RETURNING *; 
    `;
        // If disabling, and values are not passed, set them to null. If enabling, they must be passed (validated above).
        const effectiveThreshold = isEnabled ? thresholdCents : (thresholdCents !== undefined ? thresholdCents : null);
        const effectiveTopupAmount = isEnabled ? topupAmountCents : (topupAmountCents !== undefined ? topupAmountCents : null);
        const result = await db_1.default.query(query, [
            isEnabled,
            effectiveThreshold,
            effectiveTopupAmount,
            user.id
        ]);
        if (result.rows.length === 0) {
            // This should ideally not happen if the payment method check passed
            return res.status(404).json({ error: 'Auto top-up settings not found for user, though payment method exists.' });
        }
        res.json({ message: 'Auto top-up settings updated successfully.', settings: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating auto top-up settings:", error);
        res.status(500).json({ error: 'Failed to update auto top-up settings', details: error.message });
    }
});
// Endpoint to remove/unlink payment method for auto top-up
router.post('/remove-payment-method', auth_1.verifyToken, async (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ error: 'User not authenticated' });
    }
    try {
        const query = `
      UPDATE user_auto_topup_settings
      SET 
        stripe_payment_method_id = NULL,
        last4 = NULL,
        card_brand = NULL,
        is_enabled = FALSE,
        threshold_cents = NULL,
        topup_amount_cents = NULL,
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING id; -- Check if a row was actually updated
    `;
        const result = await db_1.default.query(query, [user.id]);
        if (result.rowCount === 0) {
            // This could happen if the user had no settings or no payment method to begin with
            // Or if the user_id doesn't exist in the table (though unlikely if they were authenticated)
            // For simplicity, we can treat it as success (nothing to remove or already removed)
            // Or return a specific message like "No active payment method to remove."
            return res.json({ message: 'No active payment method found or already removed.' });
        }
        res.json({ message: 'Payment method removed successfully from auto top-up settings.' });
    }
    catch (error) {
        console.error("Error removing payment method from auto top-up settings:", error);
        res.status(500).json({ error: 'Failed to remove payment method', details: error.message });
    }
});
exports.default = router;
