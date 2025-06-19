// Core model ranking data structure
export interface ModelRanking {
  id: string;
  name: string;
  provider: string;
  composite_score: number;
  composite_rank: number;
  pricing: {
    prompt_cost: number; // per 1M tokens
    completion_cost: number; // per 1M tokens
    currency: string;
  };
  benchmarks: {
    mmlu?: number;
    gsm8k?: number;
    big_bench?: number;
    lmsys_arena?: number;
    mt_bench?: number;
    hellaswag?: number;
    arc_challenge?: number;
    truthfulqa?: number;
    [key: string]: number | undefined; // Future-proof for new benchmarks
  };
  metadata: {
    context_length: number;
    parameter_count?: string;
    release_date?: string;
    architecture?: string;
    modality: 'text' | 'multimodal' | 'code' | 'embedding';
    availability: 'active' | 'inactive' | 'beta' | 'deprecated';
    featured: boolean; // For Fusion AI featured models
  };
  performance?: {
    latency_p50?: number; // ms
    latency_p95?: number; // ms
    throughput?: number; // tokens/sec
  };
  sources: {
    llm_stats?: boolean;
    openrouter?: boolean;
    artificial_analysis?: boolean;
  };
  last_updated: string; // ISO timestamp
  created_at: string;
}

// Historical data for trends
export interface ModelRankingHistory {
  model_id: string;
  date: string;
  composite_rank: number;
  composite_score: number;
  pricing: {
    prompt_cost: number;
    completion_cost: number;
  };
}

// Filter and sort options
export interface RankingsFilters {
  providers: string[];
  modalities: string[];
  availability: string[];
  min_score?: number;
  max_score?: number;
  min_prompt_cost?: number;
  max_prompt_cost?: number;
  featured_only?: boolean;
}

export interface RankingsSortOption {
  field: keyof ModelRanking | 'pricing.prompt_cost' | 'pricing.completion_cost' | string;
  direction: 'asc' | 'desc';
}

// Data source configurations
export interface DataSourceConfig {
  name: string;
  url: string;
  enabled: boolean;
  last_sync?: string;
  refresh_interval: number; // minutes
}

// Admin override capabilities
export interface ModelOverride {
  model_id: string;
  field: string;
  value: any;
  reason: string;
  created_by: string;
  created_at: string;
  active: boolean;
}

// API response types
export interface RankingsAPIResponse {
  models: ModelRanking[];
  total: number;
  page: number;
  limit: number;
  last_sync: string;
  sources_status: Record<string, { status: 'ok' | 'error' | 'stale'; last_sync: string }>;
}

export interface BenchmarkInfo {
  name: string;
  description: string;
  max_score: number;
  higher_is_better: boolean;
  category: 'reasoning' | 'knowledge' | 'coding' | 'safety' | 'multimodal' | 'other';
}

// External API types
export interface LLMStatsModel {
  name: string;
  provider: string;
  pricing: {
    prompt: number;
    completion: number;
  };
  benchmarks: Record<string, number>;
  context_length: number;
  release_date?: string;
  // ... other LLM-Stats fields
}

export interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
  architecture: {
    modality: string;
    tokenizer: string;
    instruct_type?: string;
  };
  top_provider: {
    context_length: number;
    max_completion_tokens: number;
  };
}

export interface ArtificialAnalysisModel {
  model: string;
  provider: string;
  benchmarks: Record<string, number>;
  performance: {
    latency_p50: number;
    latency_p95: number;
    throughput: number;
  };
}

// View configuration
export interface ViewConfig {
  layout: 'table' | 'cards' | 'hybrid';
  columns: string[];
  show_benchmarks: boolean;
  show_pricing: boolean;
  show_performance: boolean;
  compact_mode: boolean;
  historical_view: boolean;
} 