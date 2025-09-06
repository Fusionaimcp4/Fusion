"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db")); // ADD THIS LINE
const auth_1 = require("../middleware/auth"); // Assuming your verifyToken middleware
const router = express_1.default.Router();
// GET /api/user/activity - Fetch user activity metrics and logs
router.get('/activity', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token' });
        }
        let { from, to, page = '1', limit = '20', provider: filterProvider, model: filterModel, apiKeyId: filterApiKeyId // For filtering by app/key name
         } = req.query;
        // Validate and default dates
        const toDate = to ? new Date(to) : new Date();
        const fromDate = from ? new Date(from) : new Date(new Date().setDate(toDate.getDate() - 30));
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
        }
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const offset = (pageNum - 1) * limitNum;
        // Reset queryParams for activity log query, starting with base ones
        const activityQueryParams = [userId, fromDate, toDate];
        let activityParamIndex = 4;
        let activityWhereClause = '';
        if (filterProvider) {
            activityWhereClause += ` AND ul.provider = $${activityParamIndex}`;
            activityQueryParams.push(filterProvider);
            activityParamIndex++;
        }
        if (filterModel) {
            activityWhereClause += ` AND ul.model = $${activityParamIndex}`;
            activityQueryParams.push(filterModel);
            activityParamIndex++;
        }
        if (filterApiKeyId) {
            activityWhereClause += ` AND ul.api_key_id = $${activityParamIndex}`;
            activityQueryParams.push(parseInt(filterApiKeyId, 10));
            activityParamIndex++;
        }
        // Add pagination params last
        activityQueryParams.push(limitNum, offset);
        // Fetch Metrics for the selected date range (fromDate, toDate)
        const overallMetricsResult = await db_1.default.query(`SELECT
         COALESCE(SUM(cost + neuroswitch_fee), 0) AS total_spend, -- Sum of LLM cost and NeuroSwitch fee
         COALESCE(SUM(total_tokens), 0) AS total_tokens,
         COUNT(*) AS total_requests
       FROM usage_logs
       WHERE user_id = $1 AND created_at >= $2 AND created_at <= $3`, [userId, fromDate, toDate]);
        // --- BEGIN: Fetch Current Month Metrics ---
        const currentMonthBaseQueryConditions = `
      user_id = $1
      AND created_at >= date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
      AND created_at < date_trunc('month', CURRENT_TIMESTAMP AT TIME ZONE 'UTC') + interval '1 month'
    `;
        // Current Month - NeuroSwitch Classifier Usage
        const monthlyNeuroSwitchUsageQuery = `
      SELECT
        COUNT(*) AS calls,
        COALESCE(SUM(neuroswitch_fee), 0.0) AS total_cost_dollars
      FROM usage_logs
      WHERE neuroswitch_fee > 0 AND ${currentMonthBaseQueryConditions};
    `;
        const monthlyNeuroSwitchResult = await db_1.default.query(monthlyNeuroSwitchUsageQuery, [userId]);
        // Current Month - Internal API Calls Usage
        const monthlyInternalApiUsageQuery = `
      SELECT
        COUNT(*) AS calls,
        COALESCE(SUM(cost), 0.0) AS total_cost_dollars
      FROM usage_logs
      WHERE api_key_id IS NULL AND cost > 0 AND ${currentMonthBaseQueryConditions};
    `;
        const monthlyInternalApiResult = await db_1.default.query(monthlyInternalApiUsageQuery, [userId]);
        // Current Month - Total Tokens Processed
        const monthlyTokensProcessedQuery = `
      SELECT
        COALESCE(SUM(total_tokens), 0) AS total_tokens
      FROM usage_logs
      WHERE ${currentMonthBaseQueryConditions};
    `;
        const monthlyTokensResult = await db_1.default.query(monthlyTokensProcessedQuery, [userId]);
        // --- END: Fetch Current Month Metrics ---
        const metrics = {
            spend: parseFloat(overallMetricsResult.rows[0].total_spend) || 0,
            tokens: parseInt(overallMetricsResult.rows[0].total_tokens, 10) || 0,
            requests: parseInt(overallMetricsResult.rows[0].total_requests, 10) || 0,
            currentMonthSpendNeuroSwitch: parseFloat(monthlyNeuroSwitchResult.rows[0].total_cost_dollars) || 0,
            currentMonthCallsNeuroSwitch: parseInt(monthlyNeuroSwitchResult.rows[0].calls, 10) || 0,
            currentMonthSpendInternalApi: parseFloat(monthlyInternalApiResult.rows[0].total_cost_dollars) || 0,
            currentMonthCallsInternalApi: parseInt(monthlyInternalApiResult.rows[0].calls, 10) || 0,
            currentMonthTotalTokens: parseInt(monthlyTokensResult.rows[0].total_tokens, 10) || 0,
        };
        // Fetch Activity Logs (paginated)
        const activityResult = await db_1.default.query(`SELECT
         ul.created_at AS timestamp,
         ul.provider,
         ul.model,
         ul.prompt_tokens,
         ul.completion_tokens,
         ul.cost AS llm_provider_cost, 
         ul.neuroswitch_fee, -- Select the logged NeuroSwitch fee
         CAST(ul.response_time AS TEXT) AS response_time_text,
         ul.fallback_reason,
         ul.request_model, 
         ul.api_key_id,    
         uak.key_name AS user_api_key_name,
         uak.key_name AS external_key_name 
       FROM usage_logs ul
       LEFT JOIN user_external_api_keys uak ON ul.api_key_id = uak.id 
       WHERE ul.user_id = $1 AND ul.created_at >= $2 AND ul.created_at <= $3 ${activityWhereClause}
       ORDER BY ul.created_at DESC
       LIMIT $${activityParamIndex} OFFSET $${activityParamIndex + 1}`, activityQueryParams);
        const activity = activityResult.rows.map(row => {
            var _a;
            const rtString = row.response_time_text;
            const mappedResponseTime = (rtString !== null && typeof rtString !== 'undefined' && !isNaN(parseFloat(rtString)))
                ? Math.round(parseFloat(rtString) * 1000)
                : null;
            const llmProviderCost = row.llm_provider_cost ? parseFloat(row.llm_provider_cost) : 0;
            // Use the neuroswitch_fee directly from the database
            const neuroswitchClassifierCost = row.neuroswitch_fee ? parseFloat(row.neuroswitch_fee) : 0;
            // Extract prompt and completion tokens
            const promptTokens = parseInt(row.prompt_tokens, 10) || 0;
            const completionTokens = parseInt(row.completion_tokens, 10) || 0;
            const apiKeyId = row.api_key_id;
            const requestModelLower = (_a = row.request_model) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const neuroswitchFee = parseFloat(row.neuroswitch_fee || 0);
            const fallbackReason = row.fallback_reason;
            let keySource = 'internal';
            let apiKeyName = 'Internal API Key';
            let usageDetailLabel = 'Internal API only'; // Default label
            if (fallbackReason) {
                usageDetailLabel = 'Fallback (external API failed, system used internal fallback)';
                // keySource and apiKeyName might still be relevant if we want to show which key failed
                if (apiKeyId && row.external_key_name) {
                    keySource = 'byoapi_fallback'; // Or a more descriptive source
                    apiKeyName = row.external_key_name + ' (failed)';
                }
                else {
                    keySource = 'internal_fallback';
                    apiKeyName = 'Internal API Key (fallback)';
                }
            }
            else if (apiKeyId) {
                keySource = 'byoapi';
                apiKeyName = row.external_key_name || 'User API Key (Name Missing)';
                if (neuroswitchFee > 0 || requestModelLower === 'neuroswitch') {
                    usageDetailLabel = 'External API + NeuroSwitch';
                }
                else {
                    usageDetailLabel = 'External API only';
                }
            }
            else { // Internal API was used, no fallback
                keySource = 'internal';
                apiKeyName = 'Internal API Key';
                if (neuroswitchFee > 0 || requestModelLower === 'neuroswitch') {
                    usageDetailLabel = 'Internal API + NeuroSwitch';
                }
                else {
                    usageDetailLabel = 'Internal API only';
                }
            }
            return {
                timestamp: row.timestamp.toISOString(),
                provider: row.provider,
                model: row.model,
                prompt_tokens: promptTokens,
                completion_tokens: completionTokens,
                cost: llmProviderCost,
                neuroswitch_cost: neuroswitchClassifierCost, // Use the value from DB
                responseTime: mappedResponseTime,
                finish: row.fallback_reason,
                key_source: keySource,
                api_key_name: apiKeyName,
                request_model: row.request_model,
                usage_detail_label: usageDetailLabel,
            };
        });
        // Fetch total count for pagination (with filters)
        // Reset queryParams for total count, just need user, dates, and filters
        const totalCountQueryParams = [userId, fromDate, toDate];
        let totalCountParamIndex = 4;
        let totalCountWhereClause = '';
        if (filterProvider) {
            totalCountWhereClause += ` AND provider = $${totalCountParamIndex}`;
            totalCountQueryParams.push(filterProvider);
            totalCountParamIndex++;
        }
        if (filterModel) {
            totalCountWhereClause += ` AND model = $${totalCountParamIndex}`;
            totalCountQueryParams.push(filterModel);
            totalCountParamIndex++;
        }
        if (filterApiKeyId) {
            totalCountWhereClause += ` AND api_key_id = $${totalCountParamIndex}`;
            totalCountQueryParams.push(parseInt(filterApiKeyId, 10));
            // totalCountParamIndex++; // No need to increment here as it's the last one for this query
        }
        const totalActivityResult = await db_1.default.query(`SELECT COUNT(*) FROM usage_logs WHERE user_id = $1 AND created_at >= $2 AND created_at <= $3 ${totalCountWhereClause}`, totalCountQueryParams);
        const totalLogs = parseInt(totalActivityResult.rows[0].count, 10);
        const response = {
            metrics,
            activity,
            totalPages: Math.ceil(totalLogs / limitNum),
            currentPage: pageNum,
        };
        // --- Debug Log --- Added
        console.log('[DEBUG] Activity API Response Data:', JSON.stringify(response, null, 2));
        // --- End Debug Log ---
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching user activity:', error);
        res.status(500).json({ error: 'Failed to fetch user activity' });
    }
});
// GET /api/user/activity/export - Export user activity logs as CSV
router.get('/activity/export', auth_1.verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(403).json({ error: 'User ID not found in token' });
        }
        let { from, to, provider: filterProvider, model: filterModel, apiKeyId: filterApiKeyId } = req.query;
        // Parse raw dates
        const toDate = to ? new Date(to) : new Date();
        const fromDate = from ? new Date(from) : new Date(new Date().setDate(toDate.getDate() - 30));
        // Adjust toDate to include the full selected day (23:59:59.999)
        toDate.setHours(23, 59, 59, 999);
        // Validate
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
        }
        const queryParams = [userId, fromDate, toDate];
        let whereClause = '';
        let paramIndex = 4;
        if (filterProvider) {
            whereClause += ` AND ul.provider = $${paramIndex}`;
            queryParams.push(filterProvider);
            paramIndex++;
        }
        if (filterModel) {
            whereClause += ` AND ul.model = $${paramIndex}`;
            queryParams.push(filterModel);
            paramIndex++;
        }
        if (filterApiKeyId) {
            whereClause += ` AND ul.api_key_id = $${paramIndex}`;
            queryParams.push(parseInt(filterApiKeyId, 10));
            paramIndex++;
        }
        // Fetch ALL Activity Logs (no pagination for export)
        const activityResult = await db_1.default.query(`SELECT
         ul.created_at AS timestamp,
         ul.provider,
         ul.model,
         ul.api_key_id,
         ak.name AS app_name,
         ul.prompt_tokens,
         ul.completion_tokens,
         ul.total_tokens AS tokens,
         ul.cost,
         ul.response_time AS responseTime,
         ul.fallback_reason AS finish
       FROM usage_logs ul
       LEFT JOIN api_keys ak ON ul.api_key_id = ak.id AND ul.user_id = ak.user_id
       WHERE ul.user_id = $1 AND ul.created_at >= $2 AND ul.created_at <= $3 ${whereClause}
       ORDER BY ul.created_at DESC`, queryParams);
        // Convert to CSV
        const csvHeader = ["Timestamp", "Provider", "Model", "App/Key Name", "Prompt Tokens", "Completion Tokens", "Total Tokens", "Cost", "Response Time (ms)", "Details (Finish Reason)"].join(',');
        const csvRows = activityResult.rows.map(row => [
            new Date(row.timestamp).toLocaleString(), // Format timestamp
            row.provider || 'N/A',
            row.model || 'N/A',
            row.app_name || 'N/A',
            row.api_key_id || 'N/A',
            row.prompt_tokens || 0,
            row.completion_tokens || 0,
            row.tokens || 0,
            row.cost ? row.cost.toFixed(4) : '0.0000',
            (row.responseTime !== null && typeof row.responseTime !== 'undefined' && !isNaN(parseFloat(row.responseTime.toString()))) ? Math.round(parseFloat(row.responseTime.toString()) * 1000) : 'N/A',
            row.finish || 'N/A'
        ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')); // Escape quotes and wrap in quotes
        const csvData = [csvHeader, ...csvRows].join('\r\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="fusion_activity_export.csv"');
        res.status(200).send(csvData);
    }
    catch (error) {
        console.error('Error exporting user activity:', error);
        res.status(500).json({ error: 'Failed to export user activity' });
    }
});
exports.default = router;
