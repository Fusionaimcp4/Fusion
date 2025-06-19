import pool from '../db'; // Or relevant path to db pool

/**
 * Logs an administrative action to the `admin_actions_logs` table.
 * 
 * @param adminUserId The ID of the admin performing the action.
 * @param actionType A string describing the type of action (e.g., 'USER_ROLE_UPDATED').
 * @param targetEntityType Optional type of the entity affected (e.g., 'USER', 'MODEL').
 * @param targetEntityId Optional ID of the entity affected (e.g., user_id as string, model_id_string).
 * @param details Optional JSON object containing details of the change (e.g., old/new values).
 * @param summary Optional summary/reason provided by the admin.
 * @param dbClient Optional database client if called within an existing transaction.
 */
export async function logAdminAction(
    adminUserId: number,
    actionType: string,
    targetEntityType?: string,
    targetEntityId?: string,
    details?: any,
    summary?: string,
    dbClient?: any // Can pass a PoolClient if within a transaction
): Promise<void> {
    const client = dbClient || pool; // Use provided client or default pool
    try {
        await client.query(
            `INSERT INTO admin_actions_logs (admin_user_id, action_type, target_entity_type, target_entity_id, details, summary)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [adminUserId, actionType, targetEntityType, targetEntityId, details ? JSON.stringify(details) : null, summary]
        );
        console.log('[ADMIN ACTION LOGGED]', { adminUserId, actionType, targetEntityType, targetEntityId, details, summary });
    } catch (error) {
        console.error('[Admin Action Logger] Failed to log admin action:', error);
        // Rethrow the error if critical for a transaction, or handle as needed
        // For now, we'll log and absorb it if not part of an explicit transaction managed by the caller.
        // If dbClient is provided, the caller is responsible for transaction rollback on error.
        if (dbClient) throw error; 
    }
} 