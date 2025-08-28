# Admin Model Sync Implementation

## Overview
This document describes the implementation of the admin model sync functionality that allows administrators to synchronize platform models from the OpenRouter cache into the Fusion AI database.

## Architecture

### Backend Implementation
- **Route**: `POST /api/admin/models/sync`
- **File**: `backend/src/routes/adminApi/models.ts`
- **Authentication**: Uses existing `verifyToken` + `requireAdminRole` middleware (applied at router level)
- **Database**: Uses PostgreSQL with transaction support for atomic operations

### Frontend Implementation
- **File**: `app/admin/settings/page.tsx`
- **Section**: "Model Management" section in admin settings
- **API Client**: Uses existing `apiClient` with JWT authentication

## Key Features

### 🔧 Backend Features
1. **Environment-Based Configuration**
   - Uses `process.env.CACHE_DIR` for cache directory path
   - Defaults to `../cache` relative to backend directory
   - No hardcoded paths - production ready

2. **Proper Authentication**
   - Reuses existing admin middleware stack
   - Extracts admin user ID from authenticated request
   - Full audit trail with admin action logging

3. **Database Safety**
   - Atomic transactions with rollback on errors
   - Preserves existing `is_active` status for models
   - New models default to `is_active: false`

4. **Data Processing**
   - Normalizes model IDs (Anthropic dots→dashes, Gemini ordering)
   - Extracts features (JSON mode, tools, vision support)
   - Converts pricing from per-token to per-million-tokens

5. **Provider Support**
   - OpenAI, Anthropic, Google models
   - Configurable provider mapping
   - Extensible for future providers

### 🎨 Frontend Features
1. **Integrated UI**
   - Follows existing admin settings design patterns
   - Positioned between "Pricing & Billing" and "Feature Flags"
   - Consistent styling with other admin controls

2. **User Experience**
   - Loading state with spinner during sync
   - Success feedback with detailed stats
   - Error handling with auto-clear timeouts
   - Disabled state prevents double-clicks

3. **Feedback System**
   - Shows created/updated/error counts
   - 10-second display for success messages
   - 5-second display for error messages

## API Specification

### Request
```http
POST /api/admin/models/sync
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "action": "sync"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Model sync completed successfully",
  "stats": {
    "created": 19,
    "updated": 60,
    "skipped": 0,
    "errors": 0
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Response (Error)
```json
{
  "error": "Failed to sync models",
  "message": "Cache file not found: /path/to/cache/openrouter-models.json",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

### Models Table Updates
The sync process updates/creates records in the `models` table with:

```sql
-- Existing fields updated:
name, provider, input_cost_per_million_tokens, output_cost_per_million_tokens,
context_length_tokens, supports_json_mode, supports_tool_use, supports_vision,
description, release_date, updated_at

-- Preserved fields:
is_active (maintains existing status for current models)

-- New model defaults:
is_active = false (admin must manually enable)
```

### Admin Action Logging
Successful syncs are logged in `admin_actions_logs`:

```sql
action_type: 'MODELS_SYNC_BULK'
target_entity_type: 'MODELS'
target_entity_id: 'bulk_sync'
details: {
  "created": 19,
  "updated": 60,
  "skipped": 0,
  "errors": 0,
  "total_processed": 79,
  "cache_last_updated": "2025-08-27T21:12:23.567Z"
}
summary: "Platform models synced from OpenRouter cache: 19 created, 60 updated, 0 errors"
```

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: For authentication middleware

### Optional
- `CACHE_DIR`: Custom cache directory path (defaults to `../cache`)

## File Dependencies

### Backend Files
- `backend/src/routes/adminApi/models.ts` - Main implementation
- `backend/src/routes/adminApi/index.ts` - Route registration
- `backend/src/utils/adminLogger.ts` - Admin action logging
- `backend/src/middleware/auth.ts` - JWT verification
- `backend/src/middleware/adminAuth.ts` - Admin role validation

### Frontend Files
- `app/admin/settings/page.tsx` - UI implementation
- `app/lib/apiClient.ts` - HTTP client configuration

### Data Files
- `cache/openrouter-models.json` - Source data for sync

## Usage Workflow

1. **Admin Access**: User must be logged in with admin role
2. **Navigate**: Go to Admin → Settings page
3. **Sync**: Click "Sync Models" button in Model Management section
4. **Feedback**: View real-time status and completion stats
5. **Audit**: Check admin logs for detailed sync history

## Model Processing Logic

### ID Normalization
- **Anthropic**: `claude-3.5-sonnet` → `claude-3-5-sonnet` (dots to dashes)
- **Google**: `gemini-flash-1.5` → `gemini-1.5-flash` (version ordering fix)
- **OpenAI**: Keeps original format

### Feature Detection
- **JSON Mode**: Detects `response_format` or `structured_outputs` parameters
- **Tool Use**: Detects `tool_choice`, `tools` parameters, or "tool" in description
- **Vision**: Detects image input modalities or "vision" in name/modality

### Pricing Conversion
- Converts from per-token pricing to per-million-tokens
- Formula: `per_million = per_token * 1,000,000`

## Security Considerations

1. **Authentication**: Requires valid JWT and admin role
2. **Authorization**: Admin-only endpoint protection
3. **Transactions**: Atomic database operations prevent partial updates
4. **Audit Trail**: All sync operations are logged with admin user attribution
5. **Error Handling**: Graceful failure without exposing internal details

## Maintenance

### Adding New Providers
1. Add provider to `TARGET_PROVIDERS` array
2. Add mapping in `PROVIDER_MAPPING` object
3. Add ID normalization rules if needed

### Extending Features
- Modify `extractFeatures()` function for new capabilities
- Add new supported parameters to detection logic

### Troubleshooting
- Check backend logs for detailed sync progress
- Verify cache file exists and is readable
- Ensure admin user has proper role permissions
- Review admin action logs for sync history

## Performance Considerations

- Processes models sequentially to avoid database lock contention
- Uses database transactions for consistency
- Cache file read is optimized with single file system operation
- No external API calls during sync (uses cached data only)

## Future Enhancements

1. **Batch Processing**: Implement batch upserts for improved performance
2. **Selective Sync**: Allow syncing specific providers or models
3. **Scheduling**: Add automated sync scheduling capabilities
4. **Validation**: Enhanced data validation and sanitization
5. **Backup**: Model data backup before sync operations

---

*Last Updated: January 2024*
*Implementation Status: ✅ Complete and Production Ready*
