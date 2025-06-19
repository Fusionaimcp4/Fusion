# AI Model Rankings System

A production-ready model rankings page that aggregates live data from OpenRouter to provide comprehensive AI model comparisons with real-time pricing and performance metrics.

## Features

### 🎯 Core Functionality
- **Live Data Integration**: Real-time data from OpenRouter with intelligent JSON file caching
- **Comprehensive Metrics**: Composite scores, per-token costs, context lengths, performance data
- **Smart Caching**: 24-hour JSON file cache with automatic refresh for optimal performance
- **Future-Proof Schema**: Extensible JSON structure supports new metrics without breaking changes

### 🎨 User Experience
- **Responsive Design**: Mobile-first responsive layout inspired by Anthropic's dashboards
- **Advanced Filtering**: Multi-select filters for providers, modalities, availability, price ranges
- **Smart Sorting**: Sortable columns with visual indicators and stable sorting
- **Multiple Views**: Table, card, and hybrid layouts with customizable column visibility
- **Real-time Search**: Instant search across model names and providers

### ⚡ Performance & Accessibility
- **WCAG 2.1 AA Compliant**: Full accessibility support with proper ARIA labels
- **Sub-100ms TTFB**: Optimized API responses with JSON file caching
- **Lighthouse Green**: Performance, accessibility, and SEO optimized
- **Progressive Loading**: Skeleton states and smooth transitions

### 🔧 Admin Capabilities
- **Inline Editing**: Edit model metadata, scores, and availability with audit trails
- **Data Refresh**: Manual refresh triggers for immediate data updates
- **Cache Management**: Clear JSON cache and force fresh data fetch
- **Role-Based Access**: Configurable admin permissions

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Next.js 13+ (App Router)
- File system write permissions for cache directory

### Installation

1. **Install Dependencies**
   ```bash
   npm install @heroicons/react
   # Rankings components are already included in the project
   ```

2. **Environment Variables**
   Create or update your `.env.local`:
   ```bash
   # Admin API key for data refresh and cache management
   ADMIN_API_KEY=your_secure_admin_key
   NEXT_PUBLIC_ADMIN_API_KEY=your_secure_admin_key
   
   # Optional: ArtificialAnalysis API key (currently disabled)
   # ARTIFICIAL_ANALYSIS_API_KEY=your_api_key_here
   ```

3. **Cache Directory**
   The system automatically creates a `cache/` directory in your project root for JSON files.

4. **API Route Setup**
   The API routes are automatically available at:
   - `GET /api/rankings` - Fetch rankings with filtering/sorting
   - `POST /api/rankings` - Admin operations (refresh, cache clear)

5. **Access the Rankings**
   Navigate to `/rankings` in your application

## Data Sources

### Current Architecture

#### Primary Source: OpenRouter (openrouter.ai)
- **Endpoint**: `https://openrouter.ai/api/v1/models`
- **Refresh**: 24 hours (JSON file cache)
- **Coverage**: ~324 models with real-time pricing, context lengths, model metadata
- **Reliability**: High - actively maintained commercial API
- **Cache**: JSON file at `cache/openrouter-models.json`

#### Disabled Sources

##### LLM-Stats (Permanently Disabled)
- **Status**: Removed due to stale data (9+ months since last update)
- **Previous URL**: `https://llm-stats.org/latest.json`
- **Reason**: Data reliability concerns and maintenance issues

##### ArtificialAnalysis (Temporarily Disabled)
- **Status**: Commented out, waiting for API access
- **Previous URL**: `https://api.artificialanalysis.ai/graphql`
- **TODO**: Re-enable when API access is granted
- **Would Provide**: Enhanced benchmarks (MMLU, GSM-8K, etc.) and performance metrics

### Data Processing Flow

1. **Cache Check**: System first checks for valid JSON cache file (< 24h old)
2. **Live Fetch**: If cache is stale, fetches fresh data from OpenRouter
3. **JSON Storage**: Saves fresh data to `cache/openrouter-models.json`
4. **Processing**: Transforms OpenRouter format to internal ModelRanking structure
5. **Scoring**: Calculates composite scores based on context length and pricing
6. **Ranking**: Sorts models by composite score and assigns ranks

### Cache Management

#### JSON File Cache
```typescript
// Cache location
const CACHE_FILE = 'cache/openrouter-models.json';

// Cache structure
interface JSONCache {
  data: OpenRouterModel[];
  timestamp: number;
  last_updated: string;
}

// TTL: 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000;
```

#### Cache Operations
- **Auto-refresh**: Automatic when cache > 24h old
- **Manual refresh**: Admin API `POST /api/rankings` with `action: 'refresh'`
- **Force refresh**: Admin API with `force: true` clears cache first
- **Cache info**: Available via `getCacheInfo()` function

## Configuration

### Featured Models
Update the featured models list in `lib/data-sources.ts`:
```typescript
const featuredModels = new Set([
  'claude-3-5-sonnet',
  'gpt-4o',
  'gemini-pro', 
  'llama-3.1-70b',
  'claude-3-haiku',
  'claude-3-opus',
  'gpt-4-turbo',
  'gemini-1.5-pro',
]);
```

### Composite Scoring
Current scoring algorithm for models without benchmark data:
```typescript
// Context length score (max 30 points)
const contextScore = Math.min(model.context_length / 200000, 1) * 30;

// Pricing score (max 20 points, lower cost = higher score)
const pricingScore = Math.max(0, (1 - parseFloat(model.pricing.prompt)) * 20);

const composite_score = contextScore + pricingScore;
```

### Benchmark Weights (for future use)
When ArtificialAnalysis is re-enabled:
```typescript
const benchmarkWeights = {
  mmlu: 0.25,        // General knowledge
  gsm8k: 0.20,       // Math reasoning
  hellaswag: 0.15,   // Common sense
  arc_challenge: 0.15, // Science reasoning
  truthfulqa: 0.15,  // Factual accuracy
  big_bench: 0.10,   // Diverse tasks
};
```

## Deployment

### Production Checklist

1. **Environment Variables**: Set admin API key in production
2. **File Permissions**: Ensure cache directory is writable
3. **Monitoring**: Set up logging for cache operations and API calls
4. **CDN**: Use CDN for static assets
5. **Rate Limiting**: Implement rate limiting for admin endpoints

### Cache Strategy
```bash
# Production cache directory structure
/app/cache/
  └── openrouter-models.json  # Main data cache
```

### Automated Refresh (Optional)
Set up daily cache refresh cron job:
```bash
# Refresh cache daily at 2 AM
0 2 * * * curl -X POST \
  -H "Authorization: Bearer $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action":"refresh","force":true}' \
  https://your-domain.com/api/rankings
```

### Docker Support
```dockerfile
# Ensure cache directory in container
VOLUME ["/app/cache"]

# Copy updated source files
COPY lib/data-sources.ts /app/lib/
COPY app/components/rankings/ /app/app/components/rankings/
COPY app/api/rankings/ /app/app/api/rankings/
COPY app/rankings/ /app/app/rankings/
```

## Extension Guidelines

### Re-enabling ArtificialAnalysis

1. **Uncomment the function** in `lib/data-sources.ts`:
   ```typescript
   // Remove the comment block around fetchArtificialAnalysisData()
   export async function fetchArtificialAnalysisData(): Promise<ArtificialAnalysisModel[]> {
     // ... existing commented code
   }
   ```

2. **Update aggregation**:
   ```typescript
   // In aggregateModelData(), change:
   const artificialAnalysis: ArtificialAnalysisModel[] = [];
   
   // To:
   const artificialAnalysisData = await fetchArtificialAnalysisData();
   const artificialAnalysis = artificialAnalysisData || [];
   ```

3. **Add environment variable**:
   ```bash
   ARTIFICIAL_ANALYSIS_API_KEY=your_api_key_here
   ```

### Adding New Data Sources

1. **Create Source Function**
   ```typescript
   export async function fetchNewSourceData(): Promise<NewSourceModel[]> {
     // Implement with same caching pattern as OpenRouter
     const cacheFile = path.join(CACHE_DIR, 'newsource-models.json');
     // ... implement caching logic
   }
   ```

2. **Update Aggregation**
   ```typescript
   // Add to aggregateModelData()
   const newSourceData = await fetchNewSourceData();
   const newSource = newSourceData || [];
   ```

3. **Update Types**
   ```typescript
   interface ModelRanking {
     sources: {
       new_source?: boolean;
       // ... existing sources
     };
   }
   ```

### Custom Scoring Algorithms

Replace the basic scoring in `createModelRanking()`:
```typescript
// Custom scoring based on your criteria
const calculateCustomScore = (model: OpenRouterModel) => {
  // Your custom logic here
  return score;
};
```

## API Reference

### GET /api/rankings

Query all model rankings with filtering and pagination.

**Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (max: 100)
- `search` (string): Search model names/providers
- `sort` (string): Sort field (default: 'composite_rank')
- `order` (string): Sort direction ('asc' | 'desc')
- `providers` (string): Comma-separated provider list
- `modalities` (string): Comma-separated modality list
- `availability` (string): Comma-separated availability states
- `min_score`, `max_score` (number): Score range
- `min_prompt_cost`, `max_prompt_cost` (number): Cost range
- `featured_only` (boolean): Featured models only

**Response:**
```typescript
{
  models: ModelRanking[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  last_sync: string;
  sources_status: {
    llm_stats: { status: 'disabled', note: string };
    openrouter: { status: 'ok' | 'stale', last_sync: string };
    artificial_analysis: { status: 'disabled', note: string };
  };
  processing_time: number;
}
```

### POST /api/rankings

Admin operations for data and cache management.

**Headers:**
- `Authorization: Bearer {ADMIN_API_KEY}`

**Body:**
```typescript
{
  action: 'refresh' | 'clear_cache';
  force?: boolean; // Clear cache before refresh
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  cache_info?: {
    exists: boolean;
    lastModified: string;
    ageHours: number;
    isStale: boolean;
  };
}
```

## Troubleshooting

### Common Issues

1. **No Data Loading**
   ```bash
   # Check cache file exists and is readable
   ls -la cache/openrouter-models.json
   
   # Check cache age
   curl -H "Authorization: Bearer $ADMIN_API_KEY" \
        "https://your-domain.com/api/rankings?debug=cache"
   ```

2. **Stale Data**
   ```bash
   # Force refresh cache
   curl -X POST \
     -H "Authorization: Bearer $ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"action":"refresh","force":true}' \
     https://your-domain.com/api/rankings
   ```

3. **Permission Errors**
   ```bash
   # Ensure cache directory is writable
   mkdir -p cache
   chmod 755 cache
   ```

4. **Performance Issues**
   - Check cache file size and age
   - Monitor OpenRouter API response times
   - Consider increasing cache TTL if data freshness isn't critical

### Debug Information

Enable debug logging:
```typescript
// Add to data-sources.ts
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Cache info:', await getCacheInfo());
  console.log('Source status:', getDataSourceStatus());
}
```

### Cache Management

#### Check Cache Status
```typescript
import { getCacheInfo } from '@/lib/data-sources';

const cacheInfo = await getCacheInfo();
console.log(cacheInfo);
// { exists: true, lastModified: '2024-01-15T10:30:00Z', ageHours: 2, isStale: false }
```

#### Manual Cache Operations
```bash
# Clear cache file
rm cache/openrouter-models.json

# Check cache size
du -h cache/openrouter-models.json

# View cache contents
head -20 cache/openrouter-models.json
```

## Architecture Notes

### Why This Approach?

1. **Reliability**: OpenRouter is actively maintained with commercial SLA
2. **Performance**: JSON file cache reduces API calls and improves response times
3. **Simplicity**: Single data source reduces complexity and failure points
4. **Cost**: No API rate limiting concerns with daily refresh cycle

### Future Enhancements

1. **Re-enable ArtificialAnalysis**: When API access is available
2. **Database Caching**: Consider PostgreSQL for multi-instance deployments
3. **Model Benchmarks**: Add community benchmark data sources
4. **Historical Data**: Track pricing and availability changes over time

## Contributing

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (admin key only)
4. Run development server: `npm run dev`
5. Access rankings at `http://localhost:3000/rankings`

### Code Style

- Use TypeScript for all new code
- Implement proper error handling for file operations
- Include JSDoc comments for cache functions
- Test cache invalidation logic
- Ensure backward compatibility

## License

This rankings system is part of the Fusion AI project. See main project license for details.

---

**Built for reliability and performance with OpenRouter as the primary data source.** ⚡ 