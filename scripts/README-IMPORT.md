# Platform Models Import Scripts

This directory contains scripts for importing and syncing AI model data into your internal models database.

## Overview

There are two import approaches available:

1. **`importPlatformModels.ts`** - **Primary/Recommended**: Syncs from OpenRouter JSON cache (daily updates)
2. **`importModels.js`** - **Fallback**: Manual import from CSV files

## Primary Import: `importPlatformModels.ts`

### What It Does

This script reads from the same OpenRouter JSON cache that powers your `/rankings` page and automatically syncs your internal models table with the latest data for **OpenAI**, **Anthropic**, and **Google** providers only.

### Key Features

- ✅ **Reads from Local Cache**: Uses `cache/openrouter-models.json` (no API calls)
- ✅ **Selective Import**: Only OpenAI, Anthropic, and Google models
- ✅ **Safe Upserts**: Preserves existing `is_active` flags set by admins
- ✅ **ID Normalization**: Handles dot-to-dash conversion for Anthropic/OpenAI
- ✅ **Feature Detection**: Auto-detects JSON mode, tool use, and vision support
- ✅ **Detailed Logging**: Shows created/updated/skipped counts with clear status

### Usage

#### Quick Run
```bash
npm run import-platform-models
```

#### Manual Run
```bash
# Compile and run
npx tsc scripts/importPlatformModels.ts --outDir dist --target es2020 --module commonjs --esModuleInterop
node dist/importPlatformModels.js
```

#### Environment Setup
```bash
# Ensure database connection (uses same config as other scripts)
export DATABASE_URL="postgres://user:pass@localhost:5432/aiappdb"
```

### Prerequisites

1. **Cache File Must Exist**: The script requires `cache/openrouter-models.json`
   - Generated automatically when someone visits `/rankings`
   - Refreshes every 24 hours
   - Contains ~324 models from OpenRouter

2. **Database Connection**: Uses same PostgreSQL connection as existing scripts

### Field Mapping

The script maps OpenRouter JSON fields to your database columns:

| OpenRouter Field | Database Column | Notes |
|------------------|-----------------|-------|
| `id` | `id_string` | Normalized with ID rules below |
| `name` | `name` | Display name |
| Provider extracted from `id` | `provider` | Mapped to OpenAI/Anthropic/Google |
| `pricing.prompt` | `input_cost_per_million_tokens` | Converted from per-token to per-million |
| `pricing.completion` | `output_cost_per_million_tokens` | Converted from per-token to per-million |
| `context_length` | `context_length_tokens` | Direct mapping |
| Extracted from `supported_parameters` | `supports_json_mode` | Auto-detected |
| Extracted from params/description | `supports_tool_use` | Auto-detected |
| Extracted from `architecture.input_modalities` | `supports_vision` | Auto-detected |
| `description` | `description` | Optional field |
| `created` timestamp | `release_date` | Converted from Unix timestamp |
| Generated | `updated_at` | Set to current timestamp |
| Generated | `created_at` | Set to current timestamp (new records only) |

### ID Normalization Rules

The script implements your specified normalization:

```typescript
// Examples:
"anthropic/claude-3.5-haiku-20241022" → "anthropic/claude-3-5-haiku-20241022" ✅
"openai/gpt-4.0-turbo" → "openai/gpt-4.0-turbo" ✅ (unchanged)
"google/gemini-flash-1.5" → "google/gemini-1.5-flash" ✅ (reordered)
"google/gemini-pro-1.5" → "google/gemini-1.5-pro" ✅ (reordered)
"google/gemini-2.0-flash-001" → "google/gemini-2.0-flash-001" ✅ (unchanged)
```

### Safety Features

- **`is_active` Preservation**: Never modifies the `is_active` flag (admin-controlled)
- **Upsert Logic**: Updates existing records, creates new ones
- **Provider Filtering**: Only processes target providers (OpenAI, Anthropic, Google)
- **Error Handling**: Continues processing if individual models fail
- **Detailed Logging**: Shows exactly what happened to each model

### Sample Output

```
🚀 Starting platform models import from OpenRouter cache...
📁 Reading from: /path/to/cache/openrouter-models.json
📊 Found 322 total models in cache
📅 Cache last updated: 2025-06-05T16:19:59.429Z
🎯 Filtered to 86 models from target providers:
   • Google: 24 models
   • Anthropic: 25 models
   • OpenAI: 37 models

🔄 Processing models...

🆕 Created: Google: Gemma 1 2B (google/gemma-2b-it)
✅ Updated: OpenAI: GPT-4o (openai/gpt-4o) - is_active: true
✅ Updated: Anthropic: Claude 3.5 Sonnet (anthropic/claude-3-5-sonnet-20240620) - is_active: true

📋 Import Summary:
   ✅ Created: 34
   🔄 Updated: 52
   ⏭️  Skipped: 0
   ❌ Errors:  0
   📊 Total processed: 86

🎉 Import completed successfully!
```

## Fallback Import: `importModels.js`

### What It Does

The original manual import script that reads from CSV files. This remains available as a fallback or override method.

### Usage

```bash
node scripts/importModels.js
```

### Requirements

- Requires `models2.csv` in the project root
- CSV must have specific column format: "Model Name & ID", "Input ($/1M tokens)", etc.

## Automation Recommendations

### Daily Sync (Recommended)

Set up a daily cron job to keep your models table in sync:

```bash
# Add to crontab (runs daily at 3 AM)
0 3 * * * cd /path/to/your/app && npm run import-platform-models >> logs/model-import.log 2>&1
```

### Manual Sync

Run anytime after the rankings cache has been updated:

```bash
npm run import-platform-models
```

## Troubleshooting

### Cache File Not Found

```
❌ Cache file not found: cache/openrouter-models.json
💡 Make sure the rankings page has been loaded to generate the cache file.
```

**Solution**: Visit `/rankings` in your browser to generate the cache file.

### Database Connection Issues

```
❌ Error upserting model: connection refused
```

**Solutions**:
- Check `DATABASE_URL` environment variable
- Ensure PostgreSQL is running
- Verify database credentials

### No Models Processed

```
🎯 Filtered to 0 models from target providers
```

**Causes**:
- Cache file is empty or corrupted
- No models from OpenAI/Anthropic/Google in cache
- Model ID format changed

### Feature Detection Issues

The script auto-detects features from:
- `supported_parameters` array (JSON mode, tools)
- `architecture.input_modalities` (vision)
- Model names and descriptions (vision, tools)

If detection is inaccurate, you can manually adjust via admin interface.

## Database Schema Compatibility

The script is designed to work with your existing models table schema:

```sql
CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    id_string VARCHAR(255) NOT NULL UNIQUE,
    provider VARCHAR(100) NOT NULL,
    input_cost_per_million_tokens DECIMAL(10, 2) NOT NULL,
    output_cost_per_million_tokens DECIMAL(10, 2) NOT NULL,
    context_length_tokens INTEGER NOT NULL,
    supports_json_mode BOOLEAN DEFAULT false,
    supports_tool_use BOOLEAN DEFAULT false,
    supports_vision BOOLEAN DEFAULT false,
    description TEXT,
    release_date DATE,
    is_active BOOLEAN DEFAULT false,  -- ⚠️ NEVER MODIFIED BY SCRIPT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Integration with Your App

### Pricing Engine

The script maintains compatibility with your pricing logic by:
- Converting OpenRouter per-token prices to per-million-token format
- Preserving existing cost calculation methods
- Updating prices daily for accurate billing

### Model Selection UI

Updated models automatically appear in your model selection interfaces:
- New models are created with `is_active: false` (admin must enable)
- Existing models preserve their admin-set `is_active` status
- Model features (JSON, tools, vision) auto-update for better UX

### Admin Interface

The import script works seamlessly with your admin tools:
- Preserves manual configurations (`is_active`, custom descriptions)
- Provides detailed logs for admin review
- Supports both automated and manual refresh workflows

## Best Practices

1. **Run After Rankings Update**: The script depends on the rankings cache, so run it after the cache refreshes (daily)

2. **Monitor Logs**: Check import logs regularly to catch any issues early

3. **Admin Review**: Periodically review newly created models and enable/disable as needed

4. **Backup Before Major Updates**: Consider database backups before large import runs

5. **Test in Staging**: Test the import script in staging before production use

## Future Enhancements

- **Database Caching**: Could extend to use PostgreSQL instead of JSON files for multi-instance deployments
- **Historical Tracking**: Could track pricing changes over time
- **Advanced Feature Detection**: Could improve auto-detection using AI model analysis
- **Webhook Integration**: Could trigger imports automatically when rankings data updates

---

**The platform models import system ensures your internal models table stays synchronized with the latest provider offerings while preserving your custom configurations.** 🚀 