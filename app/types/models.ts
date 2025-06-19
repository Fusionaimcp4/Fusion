export interface Model {
  id: number;
  name: string;
  id_string: string;
  provider: string;
  input_cost_per_million_tokens: number | string;
  output_cost_per_million_tokens: number | string;
  context_length_tokens: number;
  supports_json_mode: boolean;
  supports_tool_use: boolean;
  supports_vision: boolean;
  description?: string;
  release_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ModelFilters {
  providers: string[];
  modelTypes: string[];  // chat, text, vision, embedding
  contextRange?: [number, number]; // [min, max] tokens
  toolSupport?: boolean | null; // true = must support tools, false = must not support tools, null = doesn't matter
  showActiveOnly: boolean;
}

export type SortOption = 'name' | 'provider' | 'context' | 'price';
export type SortDirection = 'asc' | 'desc'; 