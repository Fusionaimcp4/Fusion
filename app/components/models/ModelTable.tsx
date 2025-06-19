import React, { useState } from 'react';
import { Model } from '../../types/models';
import { ChevronDown, ChevronRight, Eye, Wrench, CheckCircle, XCircle, Info } from 'lucide-react';

interface ModelTableProps {
  models: Model[];
}

const ModelTable: React.FC<ModelTableProps> = ({ models }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const formatCost = (cost: number | string) => {
    const num = typeof cost === 'number' ? cost : parseFloat(cost);
    return num === 0 ? 'Free' : `$${num.toFixed(2)}`;
  };

  const formatContextLength = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K`;
    }
    return `${tokens}`;
  };

  const getProviderColor = (provider: string) => {
    const providerLower = provider.toLowerCase();
    if (providerLower.includes('openai')) return 'text-blue-600 bg-blue-50';
    if (providerLower.includes('anthropic')) return 'text-amber-600 bg-amber-50';
    if (providerLower.includes('google')) return 'text-emerald-600 bg-emerald-50';
    if (providerLower.includes('azure')) return 'text-sky-600 bg-sky-50';
    if (providerLower.includes('cohere')) return 'text-purple-600 bg-purple-50';
    if (providerLower.includes('groq')) return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const toggleRow = (modelId: number) => {
    setExpandedRow(expandedRow === modelId ? null : modelId);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Context
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Input Cost (per 1M)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Output Cost (per 1M)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map((model) => (
              <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500 font-mono max-w-xs truncate">
                      {model.id_string}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProviderColor(model.provider)}`}>
                    {model.provider}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 font-mono">
                    {formatContextLength(model.context_length_tokens)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 font-mono">
                    {formatCost(model.input_cost_per_million_tokens)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 font-mono">
                    {formatCost(model.output_cost_per_million_tokens)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {model.supports_vision ? (
                        <Eye className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-300" />
                      )}
                      {model.supports_tool_use ? (
                        <Wrench className="w-4 h-4 text-green-600" />
                      ) : (
                        <Wrench className="w-4 h-4 text-gray-300" />
                      )}
                      {model.supports_json_mode && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
                          JSON
                        </span>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2 p-4">
        {models.map((model) => (
          <div key={model.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <button
              onClick={() => toggleRow(model.id)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(model.provider)}`}>
                      {model.provider}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {model.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono truncate">
                    {model.id_string}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Context</div>
                    <div className="text-sm font-mono text-gray-900">
                      {formatContextLength(model.context_length_tokens)}
                    </div>
                  </div>
                  {expandedRow === model.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            </button>
            
            {expandedRow === model.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Input Cost</div>
                    <div className="text-sm font-mono text-gray-900">
                      {formatCost(model.input_cost_per_million_tokens)} / 1M tokens
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Output Cost</div>
                    <div className="text-sm font-mono text-gray-900">
                      {formatCost(model.output_cost_per_million_tokens)} / 1M tokens
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-2">Features</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {model.supports_vision ? (
                        <Eye className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-300" />
                      )}
                      <span className="text-xs text-gray-600">Vision</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {model.supports_tool_use ? (
                        <Wrench className="w-4 h-4 text-green-600" />
                      ) : (
                        <Wrench className="w-4 h-4 text-gray-300" />
                      )}
                      <span className="text-xs text-gray-600">Tools</span>
                    </div>
                    {model.supports_json_mode && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                        JSON
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {models.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No models match your current filters.
        </div>
      )}
    </div>
  );
};

export default ModelTable;
