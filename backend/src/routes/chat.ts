import express, { Request, Response } from 'express';
import axios from 'axios';
import { verifyToken, User as AuthUser } from '../middleware/auth';
import pool from '../db';
import { calculateLlmProviderCost, getNeuroSwitchClassifierFee } from '../utils/costCalculator';
import { decrypt } from '../utils/crypto';
import { uploadBase64Image, uploadFileContent, validateSpacesConfig } from '../utils/storageUploader';

interface NeuroSwitchResponse {
  response: string;
  tokens?: number;
  model?: string;
  model_used?: string;
  provider_used?: string;
  response_time?: number;
  fallback_reason?: string | null;
  token_usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
    max_tokens?: number;
    runtime?: number;
  };
  tool_name?: string;
  file_downloads?: string[];
  // New file/image support fields
  image_url?: string;
  image_base64?: string;
  generated_file_content?: string;
  generated_file_name?: string;
  // Tool calls support fields
  response_structured?: {
    text?: string;
    tool_calls?: Array<{
      id?: string;
      name?: string;
      function?: {
        name?: string;
        arguments?: any;
      };
      input?: any;
      arguments?: any;
    }>;
  };
  tool_calls?: Array<{
    id?: string;
    name?: string;
    function?: {
      name?: string;
      arguments?: any;
    };
    input?: any;
    arguments?: any;
  }>;
}

const router = express.Router();

// Simple pricing map (per 1K tokens, in USD)
const PRICING: Record<string, number> = {
  openai: 0.002,
  claude: 0.0025,
  gemini: 0.0018,
  mistral: 0.0015,
  // Add more as needed
};
const PREMIUM_RATE = 0.2; // 20%

// Log usage to database
async function logUsage(
  userId: number,
  provider: string | null | undefined,
  model: string | null | undefined,
  promptTokens: number | undefined,
  completionTokens: number | undefined,
  totalTokens: number | undefined,
  responseTimeInput: number | null | undefined = 0,
  fallbackReason: string | null = null,
  llmCost: number | null = null,
  apiKeyId: number | null = null,
  requestModel: string | null | undefined,
  neuroswitchFee: number | null = null,
  chatId: number | null = null  // 🆕 NEW: Optional chat_id for per-chat token tracking
) {
  let queryParams: any[] = [];
  try {
    // Ensure responseTime is a number, default to 0 if null or undefined
    const finalResponseTime = (responseTimeInput === null || typeof responseTimeInput === 'undefined') ? 0 : responseTimeInput;
    
    queryParams = [userId, provider, model, promptTokens || 0, completionTokens || 0, totalTokens || 0, finalResponseTime, fallbackReason, llmCost, apiKeyId, requestModel, neuroswitchFee, chatId];
    console.log('Executing logUsage INSERT with params:', queryParams); // Log parameters

    await pool.query(
      `INSERT INTO usage_logs (user_id, provider, model, prompt_tokens, completion_tokens, total_tokens, response_time, fallback_reason, cost, api_key_id, request_model, neuroswitch_fee, chat_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())`,
      queryParams
    );
    console.log('logUsage INSERT successful for user_id:', userId); // Log success
  } catch (error) {
    console.error('Error logging usage to database:', error, 'Parameters were:', queryParams);
  }
}

// Deduct credits and log transaction in user_credits and credit_transactions
async function deductCreditsAndLog(userId: number, cost: number, provider: string, model: string, tokens: number) {
  // Convert cost to cents
  const costCents = Math.round(cost * 100);
  // Deduct credits from user_credits
  await pool.query(
    'UPDATE user_credits SET balance_cents = balance_cents - $1 WHERE user_id = $2',
    [costCents, userId]
  );
  // Log transaction in credit_transactions
  await pool.query(
    `INSERT INTO credit_transactions (user_id, amount_cents, method, status, description, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [userId, -costCents, 'usage', 'completed', `Usage for ${provider}/${model}, ${tokens} tokens`]
  );
}

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a chat message to AI providers
 *     description: |
 *       Process a chat request through Fusion AI's NeuroSwitch™ technology or directly to specific AI providers.
 *       
 *       **NeuroSwitch™ Routing**: When provider is set to "neuroswitch", the system automatically routes your request to the optimal AI provider based on the prompt content, user preferences, and real-time performance metrics.
 *       
 *       **BYOAPI Support**: If you have external API keys configured for specific providers, the system will use your keys for direct billing to your provider accounts.
 *       
 *       **Credit System**: Requests are charged based on token usage. Users with insufficient credits will receive a 402 Payment Required error.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *           examples:
 *             neuroswitch_routing:
 *               summary: NeuroSwitch™ automatic routing
 *               value:
 *                 prompt: "Explain quantum computing in simple terms"
 *                 provider: "neuroswitch"
 *             specific_provider:
 *               summary: Target specific provider
 *               value:
 *                 prompt: "Write a Python function to calculate fibonacci numbers"
 *                 provider: "openai"
 *                 model: "gpt-4"
 *             with_image:
 *               summary: Vision model with image
 *               value:
 *                 prompt: "What do you see in this image?"
 *                 provider: "openai"
 *                 model: "gpt-4-vision-preview"
 *                 image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
 *     responses:
 *       200:
 *         description: Successful chat response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *             examples:
 *               basic_success:
 *                 summary: Basic success response
 *                 value:
 *                   prompt: "Explain quantum computing in simple terms"
 *                   response:
 *                     text: "Quantum computing is a type of computation that harnesses quantum mechanical phenomena..."
 *                   provider: "openai"
 *                   model: "gpt-4"
 *                   tokens:
 *                     input_tokens: 50
 *                     output_tokens: 100
 *                     total_tokens: 150
 *                     runtime: 1234
 *                   cost_charged_to_credits: 0.0012
 *                   neuroswitch_fee_charged_to_credits: 0
 *                   timestamp: "2024-01-01T12:00:00.000Z"
 *                   image_url: null
 *                   file_url: null
 *                   file_name: null
 *                   mime_type: null
 *       400:
 *         description: Bad request - Missing prompt or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_prompt:
 *                 summary: Missing prompt
 *                 value:
 *                   error: "Prompt is required"
 *               invalid_provider:
 *                 summary: Invalid provider
 *                 value:
 *                   error: "Invalid provider specified"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       402:
 *         description: Payment required - Insufficient credits
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Detailed payment required message
 *             examples:
 *               insufficient_credits:
 *                 summary: Insufficient credits
 *                 value:
 *                   error: "Insufficient credits"
 *                   message: "You need at least $0.05 in credits to make this request"
 *               neuroswitch_fee:
 *                 summary: Insufficient credits for NeuroSwitch fee
 *                 value:
 *                   error: "Insufficient Credits for NeuroSwitch Fee"
 *                   message: "You have exhausted your free NeuroSwitch request allowance and do not have enough credits to cover the fee for this request."
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error or provider unavailable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       503:
 *         description: Service unavailable - All providers failed
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     fallback_reason:
 *                       type: string
 *                       description: Reason why providers failed
 */
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { prompt, provider, model: modelFromRequest, image, mode, tools, enable_tools } = req.body;
  console.log('[API Chat] Received request on /api/chat. Provider:', provider, 'Model:', modelFromRequest, 'Prompt:', prompt ? 'Exists' : 'Missing', 'Tools:', tools ? 'Provided' : 'None');
  const user = req.user as AuthUser;
  
  if (!user || typeof user.id === 'undefined') {
    return res.status(401).json({ error: 'Unauthorized: User ID not found in token' });
  }
  const userId = user.id;
  const userRole = user.role; // Store role for easier access

  // Variables to determine if parts of the cost are covered by free allowance
  let isNeuroSwitchFeeCoveredByAllowance = false;
  let internalApiCostPartOfTransactionCoveredByAllowance = 0;

  // --- BEGIN MONTHLY FREE ALLOWANCE CHECKS (for 'tester' role) ---
  if (userRole === 'tester') {
    try {
      const appConfigResult = await pool.query('SELECT key, value FROM app_config WHERE key = ANY($1)', [['limit_internal_api_cost_cents_tester', 'limit_neuroswitch_requests_tester']]);
      const limits: { [key: string]: number } = {};
      appConfigResult.rows.forEach(row => {
        limits[row.key] = parseInt(row.value, 10);
      });

      const internalApiCostLimitCents = limits['limit_internal_api_cost_cents_tester'];
      const neuroswitchRequestsLimit = limits['limit_neuroswitch_requests_tester'];

      const usageQuery = `
        SELECT
          COALESCE(SUM(CASE WHEN api_key_id IS NULL THEN cost ELSE 0 END) * 100, 0) AS current_month_internal_api_cost_cents,
          COALESCE(SUM(CASE WHEN neuroswitch_fee > 0 THEN 1 ELSE 0 END), 0) AS current_month_neuroswitch_requests
        FROM usage_logs
        WHERE user_id = $1
          AND created_at >= date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
          AND created_at < date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') + interval '1 month';
      `;
      const usageResult = await pool.query(usageQuery, [userId]);
      const monthlyUsage = usageResult.rows[0];
      const currentMonthInternalApiCostCents = parseFloat(monthlyUsage.current_month_internal_api_cost_cents);
      const currentMonthNeuroswitchRequests = parseInt(monthlyUsage.current_month_neuroswitch_requests, 10);

      // Check NeuroSwitch Request Allowance (only if the current request is for NeuroSwitch)
      const isCurrentRequestForNeuroSwitch = req.body.provider?.toLowerCase() === 'neuroswitch';
      if (isCurrentRequestForNeuroSwitch && neuroswitchRequestsLimit > 0) {
        if (currentMonthNeuroswitchRequests < neuroswitchRequestsLimit) {
          isNeuroSwitchFeeCoveredByAllowance = true;
          // This request's fee is covered. It will be "used" from the allowance.
        } else {
          // Allowance exhausted, fee must be paid from credits. Check if credits are sufficient.
          const neuroSwitchFeeCents = (await getNeuroSwitchClassifierFee()) * 100;
          const creditResult = await pool.query('SELECT balance_cents FROM user_credits WHERE user_id = $1', [userId]);
          const currentBalanceCents = creditResult.rows.length > 0 ? creditResult.rows[0].balance_cents : 0;
          if (currentBalanceCents < neuroSwitchFeeCents) {
            console.log(`[API Chat Limit] Tester ${userId} exceeded NeuroSwitch request allowance AND has insufficient credits for this request's fee. Allowance: ${neuroswitchRequestsLimit}, Used: ${currentMonthNeuroswitchRequests}, Balance: ${currentBalanceCents}, Fee: ${neuroSwitchFeeCents}`);
            return res.status(402).json({ // 402 Payment Required
              error: 'Insufficient Credits for NeuroSwitch Fee',
              message: 'You have exhausted your free NeuroSwitch request allowance and do not have enough credits to cover the fee for this request.'
            });
          }
        }
      }

      // Check Internal API Cost Allowance state (this informs if upcoming internal costs need credits)
      // This doesn't block here, but influences credit checks later if internal API is used by this request.
      if (internalApiCostLimitCents > 0 && currentMonthInternalApiCostCents >= internalApiCostLimitCents) {
        // Tester has exhausted their free internal API cost allowance.
        // Subsequent internal API costs will need to be covered by credits.
        // This state is implicitly handled by the standard credit check below if it's extended to testers in this scenario.
        console.log(`[API Chat Info] Tester ${userId} has exhausted free internal API cost allowance. Usage: ${currentMonthInternalApiCostCents}, Limit: ${internalApiCostLimitCents}. Subsequent internal costs require credits.`);
      } else if (internalApiCostLimitCents > 0) {
         internalApiCostPartOfTransactionCoveredByAllowance = internalApiCostLimitCents - currentMonthInternalApiCostCents;
         // This is the remaining free allowance for internal API costs this month.
         // The actual LLM cost of *this* transaction will be checked against this later.
      }

    } catch (limitCheckError: any) {
      console.error(`[API Chat Allowance Check] Error checking usage allowances for tester ${userId}: ${limitCheckError.message}`);
      return res.status(500).json({ error: 'Internal server error', details: 'Failed to verify usage allowances.' });
    }
  }
  // --- END MONTHLY FREE ALLOWANCE CHECKS ---

  // --- BEGIN PRE-CHECK FOR INSUFFICIENT CREDITS ---
  // Applies to 'user' role directly.
  // Applies to 'tester' role if their free allowances for the specific cost type of this request are exhausted.
  // 'pro' and 'admin' bypass this explicit pre-check.
  
  let requiresCreditPreCheck = false;
  if (userRole === 'user') {
    requiresCreditPreCheck = true;
  } else if (userRole === 'tester') {
    // For testers, credit pre-check is needed if the cost of THIS transaction isn't covered by an allowance.
    // This is partially handled above for NeuroSwitch fee.
    // For LLM cost, if internalApiCostPartOfTransactionCoveredByAllowance is 0 (meaning allowance exhausted or not applicable),
    // then a credit check is needed if this transaction incurs an LLM cost.
    // This is complex to pre-calculate perfectly here.
    // A simpler approach: if a tester's general free internal API allowance is used up (checked above), 
    // then they are subject to credit checks like a normal user for any internal API cost.
    // The NeuroSwitch specific check is already done.
    // Let's assume for now the 'logUsage' and 'deductCreditsAndLog' will handle the final balance.
    // The main block for 'user' role credit check is below. We might need a modified version for testers
    // if their free internal API allowance is used.

    // Simpler: if tester's internal API allowance is gone, they function like a 'user' for credit purposes for internal API.
    const appConfigResult = await pool.query('SELECT value FROM app_config WHERE key = $1', ['limit_internal_api_cost_cents_tester']);
    const internalApiCostLimitCents = appConfigResult.rows.length > 0 ? parseInt(appConfigResult.rows[0].value, 10) : 0;
    if (internalApiCostLimitCents > 0) { // Only if limit is active
        const usageResult = await pool.query(
            `SELECT COALESCE(SUM(CASE WHEN api_key_id IS NULL THEN cost ELSE 0 END) * 100, 0) AS current_month_internal_api_cost_cents
             FROM usage_logs WHERE user_id = $1 AND created_at >= date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') AND created_at < date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') + interval '1 month'`, [userId]
        );
        const currentMonthInternalApiCostCents = parseFloat(usageResult.rows[0].current_month_internal_api_cost_cents);
        if (currentMonthInternalApiCostCents >= internalApiCostLimitCents) {
            console.log(`[API Chat Credit Pre-Check] Tester ${userId} internal API free allowance exhausted. Applying user-like credit check.`);
            requiresCreditPreCheck = true; // Tester's free internal API quota is gone, treat like a user for credits for internal API costs.
                                       // NeuroSwitch fee already checked above if allowance was gone.
        }
    }
  }

  if (requiresCreditPreCheck) { 
    try {
      const creditResult = await pool.query('SELECT balance_cents FROM user_credits WHERE user_id = $1', [userId]);
      let currentBalanceCents = 0;
      if (creditResult.rows.length > 0) {
        currentBalanceCents = creditResult.rows[0].balance_cents;
      } else {
        console.warn(`[API Chat Pre-Check] No credit record found for user ${userId} (Role: ${userRole}). Assuming 0 cents balance.`);
      }

      // General check: if balance is zero or less, block.
      // Specific cost of *this* request will be handled by deductCreditsAndLog, which might fail if too low.
      // This is a basic "do you have ANY credits" check.
      if (currentBalanceCents <= 0) {
        // Special consideration for tester for NeuroSwitch fee if allowance was used and they passed the specific fee check
        const isCurrentRequestForNeuroSwitch = req.body.provider?.toLowerCase() === 'neuroswitch';
        if (userRole === 'tester' && isCurrentRequestForNeuroSwitch && !isNeuroSwitchFeeCoveredByAllowance) {
          // They passed the specific check for this NeuroSwitch fee, so don't block here based on general zero balance
          // if that check already confirmed they can cover *this* fee.
          console.log(`[API Chat Pre-Check] Tester ${userId} has <=0 balance but passed specific NeuroSwitch fee credit check. Proceeding for this NS request.`);
        } else {
          console.log(`[API Chat Pre-Check] Blocking user ${userId} (Role: ${userRole}) due to insufficient credits (Balance: ${currentBalanceCents} cents).`);
          return res.status(402).json({ 
            error: 'Insufficient Credits',
            message: 'You do not have enough credits to complete this action. Please top up to continue.'
          });
        }
      }
    } catch (dbError: any) {
      console.error(`[API Chat Pre-Check] DB error fetching credits for user ${userId}: ${dbError.message}`);
      return res.status(500).json({ error: 'Internal server error', details: 'Failed to verify credit balance.' });
    }
  }
  // --- END PRE-CHECK FOR INSUFFICIENT CREDITS ---

  // Initialize variables that will be determined within the try block
  let apiKeyIdToLog: number | null = null;
  let modelForCosting: string | undefined = undefined;

  const chatIdFromHeader = req.headers['x-chat-id'] as string | undefined;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt missing' });
  }

  // Validate tools parameter if provided
  if (tools !== undefined && !Array.isArray(tools)) {
    return res.status(400).json({ error: 'tools must be an array' });
  }

  interface HistoryMessage {
    role: 'user' | 'assistant';
    content: string;
  }

  const isProd = process.env.NODE_ENV === 'production';

  let dbHistory: HistoryMessage[] = [];

if (chatIdFromHeader) { // Removed isProd condition
    try {
      const historyResult = await pool.query(
      `
      SELECT m.role, m.content
      FROM messages m
      INNER JOIN chats c ON m.chat_id = c.id
      WHERE m.chat_id = $1 AND c.user_id = $2
      ORDER BY m.timestamp ASC`,
        [parseInt(chatIdFromHeader, 10), userId]
      );
      dbHistory = historyResult.rows.map(msg => ({ role: msg.role as ('user' | 'assistant'), content: msg.content }));
    } catch (dbError: any) {
      console.error(`[API Chat] Error fetching history from DB for chat_id ${chatIdFromHeader}, user_id ${userId}. Proceeding with empty history. Error: ${dbError.message}`);
      // Proceed with empty history if DB fetch fails
      dbHistory = [];
    }
  }

  try {
    const neuroSwitchUrl = process.env.NEUROSWITCH_API_URL || 'http://localhost:5001/chat'; // Default local NeuroSwitch

    const payloadToNeuroSwitch: any = {
      message: prompt,
      history: dbHistory,
      return_token_usage: true,
      return_response_time: true,
      user_context: { user_id: userId },
      ...(image && { image_data: image }),
      ...(mode && { chat_mode: mode }),
      ...(tools && { tools }),
      ...(enable_tools !== undefined && { enable_tools }),
    };
    
    // Headers for NeuroSwitch request
    const neuroSwitchHeaders: Record<string, string> = {
      'Authorization': `Bearer ${process.env.NEUROSWITCH_API_KEY || ''}`,
      'Content-Type': 'application/json'
    };
    if (chatIdFromHeader) {
      neuroSwitchHeaders['X-Session-ID'] = chatIdFromHeader;
    }

    // Define the mapping from provider name (lowercase) to HTTP header name for BYOAPI keys
    const providerHeaderMap: Record<string, string> = {
      'openai': 'X-OpenAI-API-Key',
      'claude': 'X-Claude-API-Key',
      'gemini': 'X-Gemini-API-Key'
      // Add other providers here if they have specific headers for API keys
    };

    // Determine requested_provider and model for NeuroSwitch payload
    if (provider && provider.toLowerCase() === 'neuroswitch') {
      payloadToNeuroSwitch.requested_provider = 'neuroswitch';
      // modelFromRequest should be undefined in this case as per frontend logic
      // If modelFromRequest was present, NeuroSwitch would need to handle it or ignore it.
      // For now, we assume frontend sends provider: 'neuroswitch' and no model field.
    } else if (provider) { // A specific provider (e.g., openai, claude, gemini) was sent
      payloadToNeuroSwitch.requested_provider = provider.toLowerCase();
      if (modelFromRequest) { // A specific model under that provider was also specified
        payloadToNeuroSwitch.model = modelFromRequest;
      } else {
        // If only provider is sent (e.g. provider: 'openai', no model), 
        // NeuroSwitch will use the default for that provider.
        // No specific payloadToNeuroSwitch.model is set here.
      }
    } else {
      // Fallback: If neither 'neuroswitch' nor any other provider is specified by the frontend.
      // This case should ideally not be hit if the frontend always sends a provider.
      console.warn('[API Chat] No provider specified by frontend. Defaulting to NeuroSwitch. Request body:', req.body);
      payloadToNeuroSwitch.requested_provider = 'neuroswitch';
    }

    // --- BYOAPI Logic Adjustment ---
    // This logic adds BYOAPI keys to neuroSwitchHeaders if applicable
    const targetProviderForBYOAPI = payloadToNeuroSwitch.requested_provider?.toLowerCase();

    if (targetProviderForBYOAPI && targetProviderForBYOAPI !== 'neuroswitch') {
      // Scenario 1: A specific provider is targeted (e.g., openai, claude, gemini)
      console.log(`[API Chat] BYOAPI Check: Targeting specific provider: ${targetProviderForBYOAPI}. User ID: ${userId}`);
      try {
        // Fetch the provider ID from the database based on the name
        const providerDbResult = await pool.query('SELECT id, name FROM providers WHERE LOWER(name) = LOWER($1)', [targetProviderForBYOAPI]);
        if (providerDbResult.rows.length > 0) {
          const providerId = providerDbResult.rows[0].id;
          const dbProviderName = providerDbResult.rows[0].name.toLowerCase(); // Use normalized name for map lookup

          // Fetch the user's external API key for this provider
          const externalKeyResult = await pool.query(
            'SELECT encrypted_api_key, is_active FROM user_external_api_keys WHERE user_id = $1 AND provider_id = $2',
            [userId, providerId]
          );

          if (externalKeyResult.rows.length > 0 && externalKeyResult.rows[0].is_active) {
            const encryptedKey = externalKeyResult.rows[0].encrypted_api_key;
            try {
              const decryptedKey = decrypt(encryptedKey);
              const headerName = providerHeaderMap[dbProviderName]; // providerHeaderMap should be defined earlier
              if (headerName) {
                neuroSwitchHeaders[headerName] = decryptedKey;
                console.log(`[API Chat] BYOAPI Success: Using user's active key for ${dbProviderName} via header ${headerName}. User ID: ${userId}`);
              } else {
                console.warn(`[API Chat] BYOAPI Skip: No specific header defined in providerHeaderMap for provider: ${dbProviderName}`);
              }
            } catch (decryptionError) {
              console.error(`[API Chat] BYOAPI Error: Failed to decrypt key for ${dbProviderName}. User ID: ${userId}. Error:`, decryptionError);
            }
          } else {
            console.log(`[API Chat] BYOAPI Skip: No active key found for specific provider ${dbProviderName}. User ID: ${userId}`);
          }
        } else {
          console.warn(`[API Chat] BYOAPI Skip: Provider '${targetProviderForBYOAPI}' not found in DB providers table. Cannot use BYOAPI for this request.`);
        }
      } catch (dbError) {
        console.error('[API Chat] BYOAPI Error: DB error processing specific provider BYOAPI:', dbError);
      }
    } else if (targetProviderForBYOAPI === 'neuroswitch') {
      // Scenario 2: NeuroSwitch is the target, attempt to add all relevant BYOAPI keys
      console.log(`[API Chat] BYOAPI Check: NeuroSwitch targeted. Fetching all relevant active keys for user ${userId}.`);
      const targetProvidersForNeuroSwitchRouting = ['openai', 'claude', 'gemini']; // Providers NeuroSwitch might route to
      try {
        const activeKeysResult = await pool.query(
          `SELECT p.name as provider_db_name, ueak.encrypted_api_key
           FROM user_external_api_keys ueak
           JOIN providers p ON ueak.provider_id = p.id
           WHERE ueak.user_id = $1 AND LOWER(p.name) = ANY($2::text[]) AND ueak.is_active = TRUE`,
          [userId, targetProvidersForNeuroSwitchRouting]
        );

        if (activeKeysResult.rows.length > 0) {
          console.log(`[API Chat] BYOAPI Info: Found ${activeKeysResult.rows.length} active BYOAPI keys for potential NeuroSwitch routing. User ID: ${userId}`);
          for (const row of activeKeysResult.rows) {
            const dbProviderName = row.provider_db_name.toLowerCase();
            const encryptedKey = row.encrypted_api_key;
            try {
              const decryptedKey = decrypt(encryptedKey);
              const headerName = providerHeaderMap[dbProviderName]; // providerHeaderMap should be defined earlier
              if (headerName) {
                neuroSwitchHeaders[headerName] = decryptedKey;
                console.log(`[API Chat] BYOAPI Info: Adding header ${headerName} for provider ${dbProviderName} for NeuroSwitch routing. User ID: ${userId}`);
              }
            } catch (decryptionError) {
              console.error(`[API Chat] BYOAPI Error: Failed to decrypt key for ${dbProviderName} (NeuroSwitch routing). User ID: ${userId}. Error:`, decryptionError);
            }
          }
        } else {
          console.log(`[API Chat] BYOAPI Info: No active BYOAPI keys found for OpenAI, Claude, or Gemini for NeuroSwitch routing. User ID: ${userId}`);
        }
      } catch (dbError) {
        console.error('[API Chat] BYOAPI Error: DB error fetching multiple keys for NeuroSwitch BYOAPI:', dbError);
      }
    }
    // --- End BYOAPI Logic Adjustment ---
    
    console.log('[API Chat] Sending to NeuroSwitch URL:', neuroSwitchUrl);
    console.log('[API Chat] Payload to NeuroSwitch:', JSON.stringify(payloadToNeuroSwitch, null, 2));
    if (tools) {
      console.log(`[API Chat] User ${userId} requested tools:`, tools);
    }
    // console.log('[API Chat] Headers to NeuroSwitch:', neuroSwitchHeaders); // DO NOT log sensitive headers in prod

    const neuroRes = await axios.post<NeuroSwitchResponse>(
      neuroSwitchUrl,
      payloadToNeuroSwitch,
      { headers: neuroSwitchHeaders }
    );

    const data = neuroRes.data;
    // Log the full response for verification
    console.log('NeuroSwitch full response:', JSON.stringify(data, null, 2));

    // Extract token information for logging
    const tokenUsage = data.token_usage;
    const promptTokens = tokenUsage?.input_tokens;
    const completionTokens = tokenUsage?.output_tokens;
    const responseTime = tokenUsage?.runtime ?? data.response_time;
    const totalTokensForLog = tokenUsage?.total_tokens ?? data.tokens ?? undefined;

    // --- Cost calculation ---
    let llmProviderCost: number | null = null;
    let neuroSwitchFeeToLog: number | null = 0; // This is the fee amount itself
    let llmCostToChargeCredits = 0;
    let neuroSwitchFeeToChargeCredits = 0;

    const neuroSwitchActualProvider = data.provider_used;
    const neuroSwitchActualModel = data.model_used;
    const neuroSwitchFallbackReason = data.fallback_reason;

    const currentRequestIsNeuroSwitchType = req.body.provider?.toLowerCase() === 'neuroswitch';

    if (currentRequestIsNeuroSwitchType) {
      neuroSwitchFeeToLog = await getNeuroSwitchClassifierFee(); // Actual fee value
      if (userRole === 'tester' && isNeuroSwitchFeeCoveredByAllowance) {
        // Fee is covered by allowance, so no charge to credits for this part
        neuroSwitchFeeToChargeCredits = 0;
        console.log(`[API Chat Cost] Tester ${userId} NeuroSwitch fee ($${neuroSwitchFeeToLog}) covered by monthly allowance.`);
      } else {
        // Not a tester, or tester's allowance is used up for NeuroSwitch requests
        neuroSwitchFeeToChargeCredits = neuroSwitchFeeToLog;
      }
    }

    // Check if a BYOAPI key was successfully used or if it's an internal transaction/fallback
    if (totalTokensForLog !== undefined && neuroSwitchActualProvider && neuroSwitchActualProvider.toLowerCase() !== 'neuroswitch') {
      const providerNameFromNeuroSwitch = neuroSwitchActualProvider.toLowerCase();
      const providerDbResult = await pool.query('SELECT id FROM providers WHERE LOWER(name) = $1', [providerNameFromNeuroSwitch]);
      let userApiKeyIdForActualProvider: number | null = null;
      if (providerDbResult.rows.length > 0) {
        const providerIdFromDb = providerDbResult.rows[0].id;
        const keyRes = await pool.query(
          'SELECT id FROM user_external_api_keys WHERE user_id = $1 AND provider_id = $2 AND is_active = TRUE',
          [userId, providerIdFromDb]
        );
        if (keyRes.rows.length > 0) userApiKeyIdForActualProvider = keyRes.rows[0].id;
      }

      if (userApiKeyIdForActualProvider && !neuroSwitchFallbackReason) { // SUCCESSFUL BYOAPI
        llmProviderCost = 0;
        apiKeyIdToLog = userApiKeyIdForActualProvider;
        llmCostToChargeCredits = 0; // BYOAPI means no LLM cost to user
        console.log(`[API Chat Cost] BYOAPI SUCCESS. LLM Cost to user: 0.`);
      } else { // INTERNAL KEY OR FALLBACK
        const providerForCosting = neuroSwitchActualProvider.toLowerCase();
        modelForCosting = neuroSwitchActualModel?.toLowerCase();
        // ... (default model assignment logic as before) ...
        if (!modelForCosting && providerForCosting) {
          if (providerForCosting === 'gemini') { modelForCosting = 'gemini-1.5-flash-latest'; }
          else if (providerForCosting === 'claude') { modelForCosting = 'claude-3-haiku-20240307'; }
          else if (providerForCosting === 'openai') { modelForCosting = 'gpt-4o-mini'; }
        }

        if (modelForCosting) {
          llmProviderCost = await calculateLlmProviderCost(
            providerForCosting, modelForCosting, promptTokens || 0, completionTokens || 0
          );
          
          if (userRole === 'tester' && internalApiCostPartOfTransactionCoveredByAllowance > 0) {
            const costInCents = Math.round(llmProviderCost * 100);
            if (costInCents <= internalApiCostPartOfTransactionCoveredByAllowance) {
              llmCostToChargeCredits = 0; // Fully covered by allowance
              console.log(`[API Chat Cost] Tester ${userId} LLM cost ($${llmProviderCost}) fully covered by internal API allowance.`);
            } else {
              llmCostToChargeCredits = (costInCents - internalApiCostPartOfTransactionCoveredByAllowance) / 100;
              console.log(`[API Chat Cost] Tester ${userId} LLM cost ($${llmProviderCost}) partially covered. Charged to credits: $${llmCostToChargeCredits}. Allowance used: ${internalApiCostPartOfTransactionCoveredByAllowance/100}`);
            }
          } else {
            llmCostToChargeCredits = llmProviderCost; // No allowance, or not a tester
          }
        } else {
          llmProviderCost = null; // Cannot determine
          llmCostToChargeCredits = 0; 
        }
        apiKeyIdToLog = null;
      }
    } else if (totalTokensForLog !== undefined && neuroSwitchActualProvider && neuroSwitchActualProvider.toLowerCase() === 'neuroswitch') {
        llmProviderCost = 0; // Only NeuroSwitch fee applies
        llmCostToChargeCredits = 0;
    } else {
      llmProviderCost = null; // Cannot determine
      llmCostToChargeCredits = 0;
    }

    const totalCostToDeductFromCredits = llmCostToChargeCredits + neuroSwitchFeeToChargeCredits;

    if (totalCostToDeductFromCredits > 0) {
      // Final check before deducting, especially if pre-check was skipped or insufficient
      const creditCheckResult = await pool.query('SELECT balance_cents FROM user_credits WHERE user_id = $1', [userId]);
      const finalBalanceCents = creditCheckResult.rows.length > 0 ? creditCheckResult.rows[0].balance_cents : 0;

      if (finalBalanceCents < Math.round(totalCostToDeductFromCredits * 100)) {
        console.error(`[API Chat] CRITICAL: Insufficient final balance for user ${userId} to cover cost ${totalCostToDeductFromCredits}. Balance: ${finalBalanceCents/100}. Attempted deduction might fail or lead to negative balance without proper DB constraints.`);
        // This ideally should have been caught by pre-checks.
        // If not, the DB transaction for deduction might fail if balance_cents cannot go negative.
        // For now, we proceed to attempt deduction, assuming DB handles negative constraints if any.
        // Or, return an error here:
        // return res.status(402).json({ error: 'Insufficient Credits', message: 'Your available balance is not enough to cover the cost of this operation.' });
      }
      
      console.log(`[API Chat] Total cost to deduct from credits: $${totalCostToDeductFromCredits.toFixed(6)}`);
      await deductCreditsAndLog(userId, totalCostToDeductFromCredits, neuroSwitchActualProvider || 'unknown_provider', modelForCosting || neuroSwitchActualModel || 'unknown_model', totalTokensForLog || 0);
    }

    // Determine the model string to log in the database
    // If BYOAPI was successful (apiKeyIdToLog is set), use the actual model NeuroSwitch reported.
    // Otherwise, use the model determined for costing (if any), or fallback to NeuroSwitch's actual model.
    const modelLoggedToDb = (apiKeyIdToLog && neuroSwitchActualModel) 
                            ? neuroSwitchActualModel 
                            : modelForCosting || neuroSwitchActualModel;

    console.log(`[API Chat] FINAL LOGGING PARAMS: neuroSwitchFeeToLog: ${neuroSwitchFeeToLog}, llmProviderCost: ${llmProviderCost}, apiKeyIdToLog: ${apiKeyIdToLog}, requestModel(from frontend): ${req.body.model}, modelLoggedToDb: ${modelLoggedToDb}`);

    // Parse chat_id for token tracking (null for standalone API calls)
    const chatIdNumeric = chatIdFromHeader ? parseInt(chatIdFromHeader, 10) : null;

    await logUsage(
      userId,
      neuroSwitchActualProvider,
      modelLoggedToDb || 'undefined', 
      promptTokens,
      completionTokens,
      totalTokensForLog,
      responseTime,
      neuroSwitchFallbackReason,
      llmProviderCost, // Log the original LLM provider cost, regardless of allowance
      apiKeyIdToLog,
      req.body.model, // request_model from frontend
      neuroSwitchFeeToLog, // Log the original NeuroSwitch fee, regardless of allowance
      chatIdNumeric // 🆕 NEW: Pass chat_id for per-chat token tracking
    );

    // --- File/Image Processing ---
    let processedImageUrl: string | null = null;
    let processedFileUrl: string | null = null;
    let processedFileName: string | null = null;
    let processedMimeType: string | null = null;

    // Validate Spaces configuration
    if ((data.image_base64 || data.generated_file_content) && !validateSpacesConfig()) {
      console.warn('[API Chat] DigitalOcean Spaces not configured. Skipping file upload.');
    } else {
      // Handle image_url (direct URL)
      if (data.image_url) {
        processedImageUrl = data.image_url;
        console.log('[API Chat] Using direct image URL:', processedImageUrl);
      }
      
      // Handle image_base64 (upload to Spaces)
      if (data.image_base64) {
        try {
          const uploadResult = await uploadBase64Image(data.image_base64);
          if (uploadResult.success) {
            processedImageUrl = uploadResult.url!;
            console.log('[API Chat] Uploaded base64 image to Spaces:', processedImageUrl);
          } else {
            console.error('[API Chat] Failed to upload base64 image:', uploadResult.error);
          }
        } catch (error: any) {
          console.error('[API Chat] Error processing base64 image:', error.message);
        }
      }
      
      // Handle generated_file_content (upload file to Spaces)
      if (data.generated_file_content) {
        try {
          const fileName = data.generated_file_name || `generated_file_${Date.now()}`;
          const uploadResult = await uploadFileContent(
            data.generated_file_content,
            fileName
          );
          if (uploadResult.success) {
            processedFileUrl = uploadResult.url!;
            processedFileName = fileName;
            // Determine MIME type from filename or content
            const mime = require('mime-types');
            processedMimeType = mime.lookup(fileName) || 'application/octet-stream';
            console.log('[API Chat] Uploaded generated file to Spaces:', processedFileUrl);
          } else {
            console.error('[API Chat] Failed to upload generated file:', uploadResult.error);
          }
        } catch (error: any) {
          console.error('[API Chat] Error processing generated file:', error.message);
        }
      }
    }
    // --- End File/Image Processing ---

    // --- Tool Calls Conversion Patch ---
    let langchainToolCalls: any[] | undefined = undefined;

    const toolCalls = data.response_structured?.tool_calls || data.tool_calls || [];

    if (Array.isArray(toolCalls) && toolCalls.length > 0) {
      try {
        langchainToolCalls = toolCalls.map((toolCall: any, index: number) => ({
          id: toolCall.id || `call_${Date.now()}_${index}`,
          name: toolCall.name || toolCall.function?.name || 'unknown_tool',
          // LangChain expects 'args', not 'input'
          args: toolCall.input || toolCall.arguments || toolCall.function?.arguments || {},
        }));

        console.log(
          `[Fusion ToolCalls] Converted ${langchainToolCalls.length} tool calls for model: ${neuroSwitchActualModel}`
        );
      } catch (err) {
        console.error('[Fusion ToolCalls] Conversion error:', err);
      }
    }
    // --- End Tool Calls Conversion Patch ---

    const responsePayload = {
      prompt,
      response: {
        text: data.response || data.response_structured?.text || '',
        ...(langchainToolCalls && { tool_calls: langchainToolCalls }),
      },
      provider: neuroSwitchActualProvider,
      model: neuroSwitchActualModel,
      tokens: data.token_usage || { total_tokens: data.tokens },
      // Return the costs that were charged to credits for clarity to frontend if needed
      cost_charged_to_credits: llmCostToChargeCredits,
      neuroswitch_fee_charged_to_credits: neuroSwitchFeeToChargeCredits,
      // Also return original costs before allowance for display/info
      original_llm_cost: llmProviderCost,
      original_neuroswitch_fee: neuroSwitchFeeToLog,
      timestamp: new Date().toISOString(),
      // Add tool information if provided by NeuroSwitch
      tool_name: data.tool_name || null, // Keep existing field; no conflict
      file_downloads: data.file_downloads,
      // Add processed file/image information
      image_url: processedImageUrl,
      file_url: processedFileUrl,
      file_name: processedFileName,
      mime_type: processedMimeType,
    };

    res.json(responsePayload);

  } catch (err: any) {
    console.error('[API Chat] NeuroSwitch or internal error:', err.message);

    if (err.response) {
      return res.status(err.response.status).json({
        error: 'AI service error',
        details: err.response.data
      });
    } else if (err.request) {
      return res.status(503).json({
        error: 'AI service unavailable',
        details: 'The AI service is currently not responding'
      });
    } else {
      return res.status(500).json({
        error: 'Internal server error',
        details: err.message
      });
    }
  }
});

export default router;
