import { Model, ModelFilters } from '../types/models';

export const filterModels = (models: Model[], filters: ModelFilters): Model[] => {
  return models.filter(model => {
    // Provider filter
    if (filters.providers.length > 0 && !filters.providers.includes(model.provider)) {
      return false;
    }

    // Model type filter (inferred from model capabilities)
    if (filters.modelTypes.length > 0) {
      const modelTypes: string[] = [];
      if (model.supports_vision) modelTypes.push('vision');
      if (model.name.toLowerCase().includes('embedding')) modelTypes.push('embedding');
      if (model.name.toLowerCase().includes('chat') || model.name.toLowerCase().includes('gpt') || model.name.toLowerCase().includes('claude')) modelTypes.push('chat');
      if (!model.supports_vision && !model.name.toLowerCase().includes('embedding')) modelTypes.push('text');
      
      if (!filters.modelTypes.some(type => modelTypes.includes(type))) {
        return false;
      }
    }

    // Context length filter
    if (filters.contextRange) {
      const [minContext, maxContext] = filters.contextRange;
      if (model.context_length_tokens < minContext || model.context_length_tokens > maxContext) {
        return false;
      }
    }

    // Tool support filter
    if (filters.toolSupport !== null) {
      if (filters.toolSupport && !model.supports_tool_use) {
        return false;
      }
      if (!filters.toolSupport && model.supports_tool_use) {
        return false;
      }
    }

    // Show active only filter
    if (filters.showActiveOnly && !model.is_active) {
      return false;
    }

    return true;
  });
}; 