'use client';

import React, { useState } from 'react';
import { 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import type { RankingsFilters } from '@/types/rankings';

interface RankingsFiltersProps {
  filters: RankingsFilters;
  onFiltersChange: (filters: RankingsFilters) => void;
  availableProviders: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const MODALITIES = [
  { value: 'text', label: 'Text' },
  { value: 'multimodal', label: 'Multimodal' },
  { value: 'code', label: 'Code' },
  { value: 'embedding', label: 'Embedding' },
];

const AVAILABILITY_OPTIONS = [
  { value: 'active', label: 'Active', color: 'text-green-600' },
  { value: 'beta', label: 'Beta', color: 'text-yellow-600' },
  { value: 'inactive', label: 'Inactive', color: 'text-red-600' },
  { value: 'deprecated', label: 'Deprecated', color: 'text-gray-600' },
];

function MultiSelect({ 
  label, 
  options, 
  selected, 
  onSelectionChange,
  className = "",
}: {
  label: string;
  options: Array<{ value: string; label: string; color?: string }>;
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter(s => s !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selected.length === 0
            ? 'All'
            : selected.length === 1
            ? options.find(o => o.value === selected[0])?.label
            : `${selected.length} selected`
          }
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => toggleOption(option.value)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={selected.includes(option.value)}
                  onChange={() => {}} // Handled by onClick
                />
                <span className={`ml-3 block truncate ${option.color || 'text-gray-900'}`}>
                  {option.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatter,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number | undefined, number | undefined];
  onChange: (value: [number | undefined, number | undefined]) => void;
  formatter?: (value: number) => string;
}) {
  const format = formatter || ((v: number) => v.toString());

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={value[0] || ''}
            onChange={(e) => onChange([e.target.value ? parseFloat(e.target.value) : undefined, value[1]])}
            className="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            min={min}
            max={max}
            step={step}
          />
          <input
            type="number"
            placeholder="Max"
            value={value[1] || ''}
            onChange={(e) => onChange([value[0], e.target.value ? parseFloat(e.target.value) : undefined])}
            className="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            min={min}
            max={max}
            step={step}
          />
        </div>
        <div className="text-xs text-gray-500">
          Range: {format(min)} - {format(max)}
        </div>
      </div>
    </div>
  );
}

export default function RankingsFilters({
  filters,
  onFiltersChange,
  availableProviders,
  isOpen,
  onToggle,
}: RankingsFiltersProps) {
  const updateFilters = (updates: Partial<RankingsFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      providers: [],
      modalities: [],
      availability: [],
      featured_only: false,
    });
  };

  const hasActiveFilters = 
    filters.providers.length > 0 ||
    filters.modalities.length > 0 ||
    filters.availability.length > 0 ||
    filters.min_score !== undefined ||
    filters.max_score !== undefined ||
    filters.min_prompt_cost !== undefined ||
    filters.max_prompt_cost !== undefined ||
    filters.featured_only;

  const providerOptions = availableProviders.map(provider => ({
    value: provider,
    label: provider,
  }));

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Filter Toggle Button */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <FunnelIcon className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            {/* Provider Filter */}
            <MultiSelect
              label="Providers"
              options={providerOptions}
              selected={filters.providers}
              onSelectionChange={(providers) => updateFilters({ providers })}
            />

            {/* Modality Filter */}
            <MultiSelect
              label="Modality"
              options={MODALITIES}
              selected={filters.modalities}
              onSelectionChange={(modalities) => updateFilters({ modalities })}
            />

            {/* Availability Filter */}
            <MultiSelect
              label="Availability"
              options={AVAILABILITY_OPTIONS}
              selected={filters.availability}
              onSelectionChange={(availability) => updateFilters({ availability })}
            />

            {/* Featured Only Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.featured_only || false}
                  onChange={(e) => updateFilters({ featured_only: e.target.checked })}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured models only</span>
              </label>
            </div>
          </div>

          {/* Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {/* Score Range */}
            <RangeSlider
              label="Composite Score"
              min={0}
              max={100}
              step={0.1}
              value={[filters.min_score, filters.max_score]}
              onChange={([min, max]) => updateFilters({ min_score: min, max_score: max })}
              formatter={(v) => v.toFixed(1)}
            />

            {/* Cost Range */}
            <RangeSlider
              label="Prompt Cost (per 1M tokens)"
              min={0}
              max={100}
              step={0.01}
              value={[filters.min_prompt_cost, filters.max_prompt_cost]}
              onChange={([min, max]) => updateFilters({ min_prompt_cost: min, max_prompt_cost: max })}
              formatter={(v) => `$${v.toFixed(2)}`}
            />
          </div>
        </div>
      )}
    </div>
  );
} 