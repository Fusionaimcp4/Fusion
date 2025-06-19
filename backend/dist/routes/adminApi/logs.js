"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../db"));
const router = express_1.default.Router();
// GET /api/admin/logs - Fetch admin action logs with filtering and pagination
router.get('/', async (req, res) => {
    const { actionType, adminUserId, targetEntityType, targetEntityId, startDate, endDate, page = '1', // Default to page 1
    limit = '20' // Default to 20 logs per page
     } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ error: 'Invalid page number.' });
    }
    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) { // Max limit 100 for sanity
        return res.status(400).json({ error: 'Invalid limit. Must be between 1 and 100.' });
    }
    const offset = (pageNumber - 1) * limitNumber;
    let query = `
        SELECT 
            aal.id,
            aal.timestamp,
            aal.admin_user_id,
            admin_user_table.email AS admin_email,
            admin_user_table.display_name AS admin_display_name,
            aal.action_type,
            aal.target_entity_type,
            aal.target_entity_id,
            aal.summary,
            aal.details,
            aal.ip_address
        FROM admin_actions_logs aal
        LEFT JOIN users admin_user_table ON aal.admin_user_id = admin_user_table.id
    `;
    const countQuery = `SELECT COUNT(*) FROM admin_actions_logs aal`; // Base for total count
    const whereClauses = [];
    const queryParams = [];
    let paramIndex = 1;
    if (actionType) {
        whereClauses.push(`aal.action_type = $${paramIndex++}`);
        queryParams.push(actionType);
    }
    if (adminUserId) {
        whereClauses.push(`aal.admin_user_id = $${paramIndex++}`);
        queryParams.push(parseInt(adminUserId, 10));
    }
    if (targetEntityType) {
        whereClauses.push(`aal.target_entity_type = $${paramIndex++}`);
        queryParams.push(targetEntityType);
    }
    if (targetEntityId) {
        whereClauses.push(`aal.target_entity_id = $${paramIndex++}`);
        queryParams.push(targetEntityId);
    }
    if (startDate) {
        whereClauses.push(`aal.timestamp >= $${paramIndex++}`);
        queryParams.push(startDate);
    }
    if (endDate) {
        // Add 1 day to endDate to make it inclusive of the whole day
        const inclusiveEndDate = new Date(endDate);
        inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
        whereClauses.push(`aal.timestamp < $${paramIndex++}`);
        queryParams.push(inclusiveEndDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
    if (whereClauses.length > 0) {
        const whereString = whereClauses.join(' AND ');
        query += ` WHERE ${whereString}`;
        // Important: Add the same WHERE conditions to the countQuery
        // Note: Joins are not strictly needed for COUNT(*) if filters are only on `aal`
        // but if filtering on joined tables (e.g. admin_user.email), they would be.
        // For simplicity, let's assume filters are on aal for count.
        // If joining on admin_user and filtering on admin_user.email, the count query needs the join too.
        // For now, the current filters are on aal, so this simpler count query is okay.
        // To be more robust, construct countQuery WHERE clause similarly if filtering on joined fields.
        let countWhereQuery = `SELECT COUNT(*) FROM admin_actions_logs aal WHERE ${whereString}`;
        // Re-assign countQuery if there are where clauses
        // No, this is wrong, the countQuery should have its own params, or re-use the logic.
        // Let's just rebuild the count query where clause. It's simpler here.
    }
    query += ` ORDER BY aal.timestamp DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    queryParams.push(limitNumber, offset);
    try {
        const logsResult = await db_1.default.query(query, queryParams);
        // Construct and run the total count query with the same filters
        let totalCountQuery = `SELECT COUNT(*) FROM admin_actions_logs aal`;
        const countQueryParams = [];
        let countParamIndex = 1;
        if (whereClauses.length > 0) {
            const whereString = whereClauses.map((clause, index) => {
                // The $N placeholders in whereClauses are based on the main query's paramIndex.
                // We need to remap them for the count query.
                // This is tricky. Simpler: just reuse queryParams up to the point before limit/offset.
                return clause.replace(/\$([0-9]+)/g, (match, n) => `\$${countParamIndex + parseInt(n) - 1 - (actionType ? 0 : 0) - (adminUserId ? 0 : 0) /*this remapping is too complex*/}`);
                // Let's build countQueryParams directly from the original conditions.
            }).join(' AND ');
            // totalCountQuery += ` WHERE ${whereString}`;
        }
        // Rebuild count query params properly
        const cleanCountQueryParams = [];
        let cleanCountQuery = `SELECT COUNT(*) FROM admin_actions_logs aal`;
        const cleanWhereClauses = [];
        let cleanParamIdx = 1;
        if (actionType) {
            cleanWhereClauses.push(`aal.action_type = $${cleanParamIdx++}`);
            cleanCountQueryParams.push(actionType);
        }
        if (adminUserId) {
            cleanWhereClauses.push(`aal.admin_user_id = $${cleanParamIdx++}`);
            cleanCountQueryParams.push(parseInt(adminUserId, 10));
        }
        if (targetEntityType) {
            cleanWhereClauses.push(`aal.target_entity_type = $${cleanParamIdx++}`);
            cleanCountQueryParams.push(targetEntityType);
        }
        if (targetEntityId) {
            cleanWhereClauses.push(`aal.target_entity_id = $${cleanParamIdx++}`);
            cleanCountQueryParams.push(targetEntityId);
        }
        if (startDate) {
            cleanWhereClauses.push(`aal.timestamp >= $${cleanParamIdx++}`);
            cleanCountQueryParams.push(startDate);
        }
        if (endDate) {
            const inclusiveEndDate = new Date(endDate);
            inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
            cleanWhereClauses.push(`aal.timestamp < $${cleanParamIdx++}`);
            cleanCountQueryParams.push(inclusiveEndDate.toISOString().split('T')[0]);
        }
        if (cleanWhereClauses.length > 0) {
            cleanCountQuery += ` WHERE ${cleanWhereClauses.join(' AND ')}`;
        }
        const totalCountResult = await db_1.default.query(cleanCountQuery, cleanCountQueryParams);
        const totalLogs = parseInt(totalCountResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalLogs / limitNumber);
        res.json({
            logs: logsResult.rows,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalLogs,
                limit: limitNumber
            }
        });
    }
    catch (error) {
        console.error('[Admin API] Error fetching admin logs:', error);
        res.status(500).json({ error: 'Failed to fetch admin logs' });
    }
});
exports.default = router;
