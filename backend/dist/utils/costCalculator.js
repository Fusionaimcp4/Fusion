"use strict";
// Cost calculation utility for usage-based billing
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLlmProviderCost = calculateLlmProviderCost;
exports.getNeuroSwitchClassifierFee = getNeuroSwitchClassifierFee;
const db_1 = __importDefault(require("../db")); // Import the database pool
// const PRICING: Record<string, Record<string, { input: number; output: number }>> = { ... }; // This should be removed
const DEFAULT_FALLBACK_RATE = { input: 0.002, output: 0.002 }; // Per 1K tokens
const FALLBACK_NEUROSWITCH_CLASSIFIER_FEE_DOLLARS = 0.001; // Fallback if DB config fails
const FALLBACK_PRICING_PRIME_MULTIPLIER = 1.0; // Fallback to no prime
// Fixed-price models that charge per generation (not per token)
// Key format: "provider/model_id_string" → cost in dollars
const FIXED_MODEL_COSTS = {
    'openai/dall-e-3': 0.04, // DALL-E 3 1024x1024 image generation
    'openai/dall-e-3-wide': 0.08, // DALL-E 3 1024x1792 image generation  
    'openai/dall-e-3-tall': 0.08, // DALL-E 3 1792x1024 image generation
    // Future models can be added here:
    // 'google/imagen-2': 0.05,
    // 'openai/whisper-1': 0.006,
    // 'openai/tts-1': 0.015,
};
/**
 * Calculates the cost for LLM provider usage based on input and output tokens,
 * fetching rates from the 'models' database table and applying a global prime.
 * @param neuroSwitchProvider The provider string from NeuroSwitch (e.g., "openai", "claude", "gemini").
 * @param modelIdString The specific model id_string (e.g., "openai/gpt-4o-mini", "anthropic/claude-3-sonnet").
 * @param inputTokens Number of input tokens.
 * @param outputTokens Number of output tokens.
 * @returns The calculated cost with prime, rounded to 6 decimal places, or cost based on fallback rate if not found.
 */
async function calculateLlmProviderCost(neuroSwitchProvider, modelIdString, inputTokens, outputTokens) {
    // Early exit for fixed-price models (image/audio/video generation)
    if (modelIdString) {
        let dbProvider = neuroSwitchProvider.toLowerCase();
        if (dbProvider === 'gemini') {
            dbProvider = 'google';
        }
        else if (dbProvider === 'claude') {
            dbProvider = 'anthropic';
        }
        const fixedKey = `${dbProvider}/${modelIdString.toLowerCase()}`;
        if (FIXED_MODEL_COSTS[fixedKey] !== undefined) {
            const baseCost = FIXED_MODEL_COSTS[fixedKey];
            // Fetch and apply pricing prime (same logic as token-based models)
            let pricingPrimeMultiplier = FALLBACK_PRICING_PRIME_MULTIPLIER;
            try {
                const primeConfig = await db_1.default.query('SELECT value FROM app_config WHERE key = $1', ['pricing_prime_percentage']);
                if (primeConfig.rows.length > 0) {
                    const primePercentage = parseFloat(primeConfig.rows[0].value);
                    if (!isNaN(primePercentage) && primePercentage >= 0) {
                        pricingPrimeMultiplier = 1 + (primePercentage / 100);
                    }
                    else {
                        console.warn(`[costCalculator] Invalid pricing_prime_percentage in app_config: ${primeConfig.rows[0].value}. Using fallback multiplier.`);
                    }
                }
                else {
                    console.warn('[costCalculator] pricing_prime_percentage not found in app_config. Using fallback multiplier.');
                }
            }
            catch (dbError) {
                console.error('[costCalculator] DB error fetching pricing_prime_percentage. Using fallback multiplier.', dbError);
            }
            const finalCost = baseCost * pricingPrimeMultiplier;
            console.log(`[costCalculator] Fixed-price model ${fixedKey}: base=$${baseCost}, prime=${pricingPrimeMultiplier}x, final=$${finalCost.toFixed(6)}`);
            return parseFloat(finalCost.toFixed(6));
        }
    }
    // Continue with normal token-based calculation for all other models
    let baseCost;
    if (!modelIdString) {
        console.warn(`[costCalculator] Model ID string is undefined for provider ${neuroSwitchProvider}. Using default fallback rate for base cost.`);
        baseCost = ((inputTokens / 1000) * DEFAULT_FALLBACK_RATE.input) + ((outputTokens / 1000) * DEFAULT_FALLBACK_RATE.output);
    }
    else {
        let dbProvider = neuroSwitchProvider.toLowerCase();
        if (dbProvider === 'gemini') {
            dbProvider = 'google';
        }
        else if (dbProvider === 'claude') {
            dbProvider = 'anthropic';
        }
        // Construct the full id_string format: "provider/model"
        const fullIdString = `${dbProvider}/${modelIdString.toLowerCase()}`;
        try {
            const result = await db_1.default.query('SELECT input_cost_per_million_tokens, output_cost_per_million_tokens FROM models WHERE LOWER(provider) = LOWER($1) AND LOWER(id_string) = LOWER($2)', [dbProvider, fullIdString]);
            if (result.rows.length > 0) {
                const dbRow = result.rows[0];
                const inputRatePer1k = parseFloat(dbRow.input_cost_per_million_tokens) / 1000;
                const outputRatePer1k = parseFloat(dbRow.output_cost_per_million_tokens) / 1000;
                if (isNaN(inputRatePer1k) || isNaN(outputRatePer1k)) {
                    console.warn(`[costCalculator] Invalid rates in DB for ${fullIdString}. Using fallback for base cost.`);
                    baseCost = ((inputTokens / 1000) * DEFAULT_FALLBACK_RATE.input) + ((outputTokens / 1000) * DEFAULT_FALLBACK_RATE.output);
                }
                else {
                    baseCost = ((inputTokens / 1000) * inputRatePer1k) + ((outputTokens / 1000) * outputRatePer1k);
                }
            }
            else {
                console.warn(`[costCalculator] Pricing not found in DB for ${fullIdString}. Using default fallback rate for base cost.`);
                baseCost = ((inputTokens / 1000) * DEFAULT_FALLBACK_RATE.input) + ((outputTokens / 1000) * DEFAULT_FALLBACK_RATE.output);
            }
        }
        catch (error) {
            console.error(`[costCalculator] DB error fetching pricing for ${fullIdString}. Using fallback for base cost.`, error);
            baseCost = ((inputTokens / 1000) * DEFAULT_FALLBACK_RATE.input) + ((outputTokens / 1000) * DEFAULT_FALLBACK_RATE.output);
        }
    }
    // Fetch and apply pricing prime
    let pricingPrimeMultiplier = FALLBACK_PRICING_PRIME_MULTIPLIER;
    try {
        const primeConfig = await db_1.default.query('SELECT value FROM app_config WHERE key = $1', ['pricing_prime_percentage']);
        if (primeConfig.rows.length > 0) {
            const primePercentage = parseFloat(primeConfig.rows[0].value);
            if (!isNaN(primePercentage) && primePercentage >= 0) {
                pricingPrimeMultiplier = 1 + (primePercentage / 100);
            }
            else {
                console.warn(`[costCalculator] Invalid pricing_prime_percentage in app_config: ${primeConfig.rows[0].value}. Using fallback multiplier.`);
            }
        }
        else {
            console.warn('[costCalculator] pricing_prime_percentage not found in app_config. Using fallback multiplier.');
        }
    }
    catch (dbError) {
        console.error('[costCalculator] DB error fetching pricing_prime_percentage. Using fallback multiplier.', dbError);
    }
    const finalCost = baseCost * pricingPrimeMultiplier;
    return parseFloat(finalCost.toFixed(6));
}
/**
 * Returns the flat fee for using the NeuroSwitch classifier, fetched from app_config.
 * @returns The NeuroSwitch classifier fee in dollars.
 */
async function getNeuroSwitchClassifierFee() {
    try {
        const feeConfig = await db_1.default.query('SELECT value FROM app_config WHERE key = $1', ['neuroswitch_classifier_fee_cents']);
        if (feeConfig.rows.length > 0) {
            const feeCents = parseFloat(feeConfig.rows[0].value);
            if (!isNaN(feeCents) && feeCents >= 0) {
                return feeCents / 100; // Convert cents to dollars
            }
            else {
                console.warn(`[costCalculator] Invalid neuroswitch_classifier_fee_cents in app_config: ${feeConfig.rows[0].value}. Using fallback fee.`);
                return FALLBACK_NEUROSWITCH_CLASSIFIER_FEE_DOLLARS;
            }
        }
        else {
            console.warn('[costCalculator] neuroswitch_classifier_fee_cents not found in app_config. Using fallback fee.');
            return FALLBACK_NEUROSWITCH_CLASSIFIER_FEE_DOLLARS;
        }
    }
    catch (dbError) {
        console.error('[costCalculator] DB error fetching neuroswitch_classifier_fee_cents. Using fallback fee.', dbError);
        return FALLBACK_NEUROSWITCH_CLASSIFIER_FEE_DOLLARS;
    }
}
// Old calculateCost function (to be removed or commented out)
/*
const PRICING_OLD: Record<string, number> = {
  openai: 0.002,
  claude: 0.0025,
  gemini: 0.0018,
  mistral: 0.0015,
};
const PREMIUM_RATE = 0.2; // 20%

export function calculateCost(provider: string, totalTokens: number): number {
  const pricePer1K = PRICING_OLD[provider.toLowerCase()] ?? 0.002; // Default to OpenAI price if unknown
  let cost = ((totalTokens / 1000) * pricePer1K) * (1 + PREMIUM_RATE);
  cost = Math.round(cost * 10000) / 10000; // Round to 4 decimals
  return cost;
}
*/ 
