import React, { useState, useEffect } from 'react';
import { ModelFilters } from '../../types/models';
import { Switch } from '@headlessui/react';
import { X, Filter, RotateCcw } from 'lucide-react';

interface ModelsSidebarProps {
  filters: ModelFilters;
  onFiltersChange: (filters: ModelFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CONTEXT_MIN = 4000;
const CONTEXT_MAX = 2000000;

const PROVIDERS = [
  { name: 'OpenAI', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Anthropic', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Google AI Studio', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Google Vertex', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Azure', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { name: 'Cohere', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Groq', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'DeepSeek', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  { name: 'xAI', color: 'bg-gray-50 text-gray-700 border-gray-200' },
];

const MODEL_TYPES = [
  { name: 'Chat', value: 'chat' },
  { name: 'Text', value: 'text' },
  { name: 'Vision', value: 'vision' },
  { name: 'Embedding', value: 'embedding' },
];

const defaultFilters: ModelFilters = {
  providers: [],
  modelTypes: [],
  contextRange: [CONTEXT_MIN, CONTEXT_MAX],
  toolSupport: null,
  showActiveOnly: false,
};

const ModelsSidebar: React.FC<ModelsSidebarProps> = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onClose 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (category: keyof ModelFilters, value: string) => {
    const currentFilters = (filters[category] as string[] | undefined) ?? [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...filters,
      [category]: newFilters
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({ ...defaultFilters });
  };

  const formatContextValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Show Active Only Toggle */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Available models only</span>
          <Switch
            checked={filters.showActiveOnly}
            onChange={(value) => onFiltersChange({ ...filters, showActiveOnly: value })}
            className={`${filters.showActiveOnly ? 'bg-indigo-600' : 'bg-gray-200'}
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
              focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span className="sr-only">Show only available models</span>
            <span
              aria-hidden="true"
              className={`${filters.showActiveOnly ? 'translate-x-5' : 'translate-x-0'}
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
                ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>

      {/* Token Limit Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Token Limit (max: {formatContextValue(filters.contextRange?.[1] || CONTEXT_MAX)})
        </label>
        <input
          type="range"
          min={CONTEXT_MIN}
          max={CONTEXT_MAX}
          step={1000}
          value={filters.contextRange?.[1] || CONTEXT_MAX}
          onChange={e =>
            onFiltersChange({
              ...filters,
              contextRange: [CONTEXT_MIN, Number(e.target.value)],
            })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>4K</span>
          <span>32K</span>
          <span>128K</span>
          <span>1M</span>
          <span>2M</span>
        </div>
      </div>

      {/* Tool Support Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">Tool Support</label>
        <div className="flex gap-2">
          <button
            onClick={() => onFiltersChange({ ...filters, toolSupport: null })}
            className={`px-3 py-2 text-xs rounded-md border transition-colors ${
              filters.toolSupport === null
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Any
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, toolSupport: true })}
            className={`px-3 py-2 text-xs rounded-md border transition-colors ${
              filters.toolSupport === true
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            ✓ Required
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, toolSupport: false })}
            className={`px-3 py-2 text-xs rounded-md border transition-colors ${
              filters.toolSupport === false
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            ✗ Not needed
          </button>
        </div>
      </div>

      {/* Providers */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Provider</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {PROVIDERS.map((provider) => (
            <label key={provider.name} className="flex items-center cursor-pointer group">
                             <input
                 type="checkbox"
                 checked={(filters.providers ?? []).includes(provider.name)}
                 onChange={() => handleFilterChange('providers', provider.name)}
                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
               />
              <span className={`text-xs px-2 py-1 rounded border font-medium transition-colors group-hover:opacity-80 ${provider.color}`}>
                {provider.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Model Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Model Type</h3>
        <div className="space-y-2">
          {MODEL_TYPES.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer">
                             <input
                 type="checkbox"
                 checked={(filters.modelTypes ?? []).includes(type.value)}
                 onChange={() => handleFilterChange('modelTypes', type.value)}
                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3"
               />
              <span className="text-sm text-gray-700">{type.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearFilters}
        className="w-full flex items-center justify-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 rounded-lg py-2.5 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Clear all filters
      </button>
    </>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto p-6">
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop sticky sidebar
  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6">
      {sidebarContent}
    </div>
  );
};

export default ModelsSidebar;
