import React, { useState } from 'react';
import { Model } from '../../types/models';
import { Eye, Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const formatCost = (cost: number | string) => {
    const num = typeof cost === 'number' ? cost : parseFloat(cost);
    return num === 0 ? 'Free' : `$${num.toFixed(2)} / 1M`;
  };

  const formatContextLength = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M tokens`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K tokens`;
    }
    return `${tokens} tokens`;
  };

  const getProviderColor = (provider: string) => {
    const providerLower = provider.toLowerCase();
    if (providerLower.includes('openai')) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (providerLower.includes('anthropic')) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (providerLower.includes('google')) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (providerLower.includes('azure')) return 'text-sky-700 bg-sky-50 border-sky-200';
    if (providerLower.includes('cohere')) return 'text-purple-700 bg-purple-50 border-purple-200';
    if (providerLower.includes('groq')) return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };

  const shouldShowDescription = model.description && model.description.trim().length > 0;
  const truncatedDescription = shouldShowDescription ? truncateDescription(model.description!) : '';
  const shouldTruncate = shouldShowDescription && model.description!.length > 200;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getProviderColor(model.provider)}`}>
            {model.provider}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
          {model.name}
        </h3>
        <p className="text-sm text-gray-500 font-mono">
          {model.id_string}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Context</div>
          <div className="text-sm font-mono text-gray-900">
            {formatContextLength(model.context_length_tokens)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Input Cost</div>
          <div className="text-sm font-mono text-gray-900">
            {formatCost(model.input_cost_per_million_tokens)}
          </div>
        </div>
      </div>

      {/* Description */}
      {shouldShowDescription && (
        <div className="mb-4 relative">
          <div
            className="relative"
            onMouseEnter={() => !isDescriptionExpanded && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {isDescriptionExpanded ? (
              // Expanded view with markdown
              <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {model.description}
                </ReactMarkdown>
              </div>
            ) : (
              // Collapsed view
              <p className="text-sm text-gray-600 leading-relaxed">
                {truncatedDescription}
                {shouldTruncate && '...'}
              </p>
            )}
            
            {shouldTruncate && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {isDescriptionExpanded ? 'Less' : 'More'}
              </button>
            )}

            {/* Desktop Hover Tooltip */}
            {showTooltip && shouldTruncate && (
              <div className="hidden lg:block absolute z-10 bottom-full left-0 mb-2 w-80 max-w-sm">
                <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg">
                  <div className="prose prose-invert prose-xs max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        a: ({ href, children }) => (
                          <a href={href} className="text-blue-300 hover:text-blue-200 underline">
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => (
                          <code className="bg-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {model.description}
                    </ReactMarkdown>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Features</div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 ${model.supports_vision ? 'text-purple-600' : 'text-gray-300'}`}>
            <Eye className="w-4 h-4" />
            <span className="text-xs">Vision</span>
          </div>
          <div className={`flex items-center gap-1 ${model.supports_tool_use ? 'text-green-600' : 'text-gray-300'}`}>
            <Wrench className="w-4 h-4" />
            <span className="text-xs">Tools</span>
          </div>
          {model.supports_json_mode && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
              JSON
            </span>
          )}
        </div>
      </div>

      {/* Output Cost (Footer) */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Output Cost</span>
          <span className="font-mono text-gray-900">
            {formatCost(model.output_cost_per_million_tokens)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
