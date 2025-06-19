import { ModelRanking, LLMStatsModel, OpenRouterModel, ArtificialAnalysisModel } from '@/types/rankings';
import { promises as fs } from 'fs';
import path from 'path';

// Cache configuration
const CACHE_TTL = {
  OPENROUTER: 24 * 60 * 60 * 1000, // 24 hours for JSON file cache
  ARTIFICIAL_ANALYSIS: 12 * 60 * 60 * 1000, // 12 hours (disabled)
};

// JSON cache file path
const CACHE_DIR = path.join(process.cwd(), 'cache');
const OPENROUTER_CACHE_FILE = path.join(CACHE_DIR, 'openrouter-models.json');

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface JSONCache {
  data: OpenRouterModel[];
  timestamp: number;
  last_updated: string;
}

class DataCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new DataCache();

// Ensure cache directory exists
async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create cache directory:', error);
  }
}

// Save OpenRouter data to JSON file
async function saveOpenRouterCache(data: OpenRouterModel[]): Promise<void> {
  try {
    await ensureCacheDir();
    const cacheData: JSONCache = {
      data,
      timestamp: Date.now(),
      last_updated: new Date().toISOString(),
    };
    await fs.writeFile(OPENROUTER_CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log(`Saved ${data.length} models to JSON cache`);
  } catch (error) {
    console.error('Failed to save OpenRouter cache:', error);
  }
}

// Load OpenRouter data from JSON file
async function loadOpenRouterCache(): Promise<OpenRouterModel[] | null> {
  try {
    const fileContent = await fs.readFile(OPENROUTER_CACHE_FILE, 'utf-8');
    const cacheData: JSONCache = JSON.parse(fileContent);
    
    // Check if cache is still fresh (within 24 hours)
    const age = Date.now() - cacheData.timestamp;
    if (age < CACHE_TTL.OPENROUTER) {
      console.log(`Using cached OpenRouter data (${Math.round(age / 1000 / 60 / 60)}h old)`);
      return cacheData.data;
    } else {
      console.log('OpenRouter cache is stale, will fetch fresh data');
      return null;
    }
  } catch (error) {
    console.log('No valid OpenRouter cache found, will fetch fresh data');
    return null;
  }
}

// OpenRouter data source (now primary and only active source)
export async function fetchOpenRouterData(): Promise<OpenRouterModel[]> {
  const cacheKey = 'openrouter-models';
  const cached = cache.get<OpenRouterModel[]>(cacheKey);
  
  if (cached) {
    console.log('Using in-memory cached OpenRouter data');
    return cached;
  }

  // Try to load from JSON file cache first
  const fileCache = await loadOpenRouterCache();
  if (fileCache) {
    cache.set(cacheKey, fileCache, CACHE_TTL.OPENROUTER);
    return fileCache;
  }

  try {
    console.log('Fetching fresh OpenRouter data...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'User-Agent': 'Fusion-AI-Rankings/1.0',
      },
      signal: controller.signal,
      next: { revalidate: 86400 }, // 24 hours
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    const models = result.data || [];

    // Save to both memory cache and JSON file
    cache.set(cacheKey, models, CACHE_TTL.OPENROUTER);
    await saveOpenRouterCache(models);

    return models;
  } catch (error) {
    console.error('Failed to fetch OpenRouter data:', error);
    return [];
  }
}

// TODO: Re-enable when API access is granted by ArtificialAnalysis.ai
// ArtificialAnalysis data source (GraphQL) - TEMPORARILY DISABLED
// export async function fetchArtificialAnalysisData(): Promise<ArtificialAnalysisModel[]> {
//   const cacheKey = 'artificial-analysis-models';
//   const cached = cache.get<ArtificialAnalysisModel[]>(cacheKey);
  
//   if (cached) {
//     console.log('Using cached ArtificialAnalysis data');
//     return cached;
//   }

//   try {
//     console.log('Fetching fresh ArtificialAnalysis data...');
    
//     const query = `
//       query GetModels {
//         models {
//           model
//           provider
//           benchmarks {
//             mmlu
//             gsm8k
//             hellaswag
//             arc_challenge
//             truthfulqa
//             big_bench
//           }
//           performance {
//             latency_p50
//             latency_p95
//             throughput
//           }
//         }
//       }
//     `;

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

//     const response = await fetch('https://api.artificialanalysis.ai/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'Fusion-AI-Rankings/1.0',
//         // Add API key from environment if required
//         ...(process.env.ARTIFICIAL_ANALYSIS_API_KEY && {
//           'Authorization': `Bearer ${process.env.ARTIFICIAL_ANALYSIS_API_KEY}`
//         }),
//       },
//       signal: controller.signal,
//       body: JSON.stringify({ query }),
//       next: { revalidate: 43200 }, // 12 hours
//     });

//     clearTimeout(timeoutId);

//     if (!response.ok) {
//       throw new Error(`ArtificialAnalysis API error: ${response.status}`);
//     }

//     const result = await response.json();
//     const models = result.data?.models || [];

//     cache.set(cacheKey, models, CACHE_TTL.ARTIFICIAL_ANALYSIS);
//     return models;
//   } catch (error) {
//     console.error('Failed to fetch ArtificialAnalysis data:', error);
//     // Don't throw here - this is optional data
//     return [];
//   }
// }

// Composite data aggregation - now using OpenRouter as primary source
export async function aggregateModelData(): Promise<ModelRanking[]> {
  const startTime = Date.now();
  console.log('Starting model data aggregation...');

  try {
    // Fetch data only from OpenRouter (primary source)
    const openRouterData = await fetchOpenRouterData();
    const openRouter = openRouterData || [];

    // TODO: Re-enable ArtificialAnalysis when API access is granted
    const artificialAnalysis: ArtificialAnalysisModel[] = [];

    console.log(`Data fetched: ${openRouter.length} OpenRouter models`);

    // Create lookup maps for efficient matching
    const artificialAnalysisMap = new Map(artificialAnalysis.map(m => [m.model.toLowerCase(), m]));

    // Fusion AI featured models
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

    const models: ModelRanking[] = [];
    const processedModels = new Set<string>();

    // Helper function to create a ModelRanking from OpenRouter data
    const createModelRanking = (
      name: string,
      provider: string,
      openRouterModel: OpenRouterModel,
      artificialAnalysisModel?: ArtificialAnalysisModel
    ): ModelRanking => {
      const modelKey = name.toLowerCase();

      // Use benchmarks from ArtificialAnalysis if available (currently empty)
      const benchmarks = {
        ...(artificialAnalysisModel?.benchmarks || {}),
      };

      // Calculate composite score based on available benchmarks
      // Since we don't have benchmark data from OpenRouter, we'll use a basic scoring system
      const benchmarkWeights = {
        mmlu: 0.25,
        gsm8k: 0.20,
        hellaswag: 0.15,
        arc_challenge: 0.15,
        truthfulqa: 0.15,
        big_bench: 0.10,
      };

      let composite_score = 0;
      let totalWeight = 0;

      Object.entries(benchmarkWeights).forEach(([benchmark, weight]) => {
        if (benchmarks[benchmark] !== undefined && benchmarks[benchmark] !== null) {
          composite_score += benchmarks[benchmark] * weight;
          totalWeight += weight;
        }
      });

      // If no benchmarks available, use a simple heuristic based on model features
      if (totalWeight === 0) {
        // Basic scoring based on context length and pricing (inverse relationship)
        const contextScore = Math.min(openRouterModel.context_length / 200000, 1) * 30; // Max 30 points
        const pricingScore = Math.max(0, (1 - parseFloat(openRouterModel.pricing.prompt)) * 20); // Max 20 points
        composite_score = contextScore + pricingScore;
      } else {
        composite_score = composite_score / totalWeight;
      }

      return {
        id: `${provider}-${name}`.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        name,
        provider,
        composite_score,
        composite_rank: 0, // Will be calculated after sorting
        pricing: {
          prompt_cost: parseFloat(openRouterModel.pricing.prompt) * 1000000, // Convert to per 1M tokens
          completion_cost: parseFloat(openRouterModel.pricing.completion) * 1000000,
          currency: 'USD',
        },
        benchmarks,
        metadata: {
          context_length: openRouterModel.context_length || 0,
          release_date: undefined, // Not available from OpenRouter
          modality: openRouterModel.architecture?.modality === 'multimodal' ? 'multimodal' : 'text',
          availability: 'active', // All OpenRouter models are active
          featured: featuredModels.has(modelKey) || featuredModels.has(name.toLowerCase()),
          architecture: openRouterModel.architecture?.tokenizer,
          parameter_count: undefined, // Extract from model name if possible
        },
        performance: artificialAnalysisModel?.performance,
        sources: {
          llm_stats: false, // No longer using LLM-Stats
          openrouter: true,
          artificial_analysis: !!artificialAnalysisModel,
        },
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
    };

    // Process all OpenRouter models
    openRouter.forEach(model => {
      const modelKey = model.name.toLowerCase();
      const artificialAnalysisModel = artificialAnalysisMap.get(modelKey);
      
      // Extract provider from OpenRouter model ID
      const provider = model.id.split('/')[0] || 'Unknown';

      models.push(createModelRanking(
        model.name,
        provider,
        model,
        artificialAnalysisModel
      ));
      
      processedModels.add(modelKey);
    });

    // Add any remaining models from ArtificialAnalysis that weren't processed
    // (Currently empty since ArtificialAnalysis is disabled)
    artificialAnalysis.forEach(model => {
      const modelKey = model.model.toLowerCase();
      if (!processedModels.has(modelKey)) {
        // Would need to create a minimal OpenRouter-like object
        // Skipping for now since artificialAnalysis is empty
      }
    });

    // Sort by composite score and assign ranks
    models.sort((a, b) => b.composite_score - a.composite_score);
    models.forEach((model, index) => {
      model.composite_rank = index + 1;
    });

    const elapsed = Date.now() - startTime;
    console.log(`Model data aggregation completed in ${elapsed}ms. Total models: ${models.length}`);

    return models;
  } catch (error) {
    console.error('Failed to aggregate model data:', error);
    throw error;
  }
}

// Manual refresh function for admin use
export async function refreshModelData(force = false): Promise<void> {
  if (force) {
    cache.clear();
    // Also remove JSON cache file to force fresh fetch
    try {
      await fs.unlink(OPENROUTER_CACHE_FILE);
      console.log('Cleared JSON cache file');
    } catch (error) {
      // File might not exist, that's OK
    }
  }
  
  await aggregateModelData();
}

// Get data source status
export function getDataSourceStatus() {
  const openRouterCache = cache.get('openrouter-models');

  return {
    llm_stats: {
      status: 'disabled',
      last_sync: null,
      note: 'Permanently disabled due to stale data (9+ months old)',
    },
    openrouter: {
      status: openRouterCache ? 'ok' : 'stale', 
      last_sync: openRouterCache ? new Date().toISOString() : null,
    },
    artificial_analysis: {
      status: 'disabled',
      last_sync: null,
      note: 'Temporarily disabled - waiting for API access',
    },
  };
}

// Get cache file info for debugging
export async function getCacheInfo() {
  try {
    const stats = await fs.stat(OPENROUTER_CACHE_FILE);
    const age = Date.now() - stats.mtime.getTime();
    return {
      exists: true,
      lastModified: stats.mtime.toISOString(),
      ageHours: Math.round(age / 1000 / 60 / 60),
      isStale: age > CACHE_TTL.OPENROUTER,
    };
  } catch (error) {
    return {
      exists: false,
      lastModified: null,
      ageHours: null,
      isStale: true,
    };
  }
} 