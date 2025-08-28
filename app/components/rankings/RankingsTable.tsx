'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { ModelRanking, RankingsSortOption } from '@/types/rankings';

interface RankingsTableProps {
  models: ModelRanking[];
  loading?: boolean;
  onSort?: (sort: RankingsSortOption) => void;
  currentSort?: RankingsSortOption;
  showBenchmarks?: boolean;
  showPerformance?: boolean;
  compactMode?: boolean;
}

interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  mobileHidden?: boolean;
}

const columns: TableColumn[] = [
  { key: 'composite_rank', label: 'Rank', sortable: true, width: 'w-16' },
  { key: 'name', label: 'Model', sortable: true, width: 'min-w-48' },
  { key: 'provider', label: 'Provider', sortable: true, width: 'w-32', mobileHidden: true },
  { key: 'composite_score', label: 'Score', sortable: true, width: 'w-20' },
  { key: 'pricing.prompt_cost', label: 'Prompt Cost', sortable: true, width: 'w-28', mobileHidden: true },
  { key: 'pricing.completion_cost', label: 'Completion Cost', sortable: true, width: 'w-32', mobileHidden: true },
  { key: 'metadata.context_length', label: 'Context', sortable: true, width: 'w-24', mobileHidden: true },
  { key: 'metadata.availability', label: 'Status', sortable: true, width: 'w-20' },
];

const benchmarkColumns = [
  { key: 'benchmarks.mmlu', label: 'MMLU', sortable: true, width: 'w-16' },
  { key: 'benchmarks.gsm8k', label: 'GSM8K', sortable: true, width: 'w-16' },
  { key: 'benchmarks.hellaswag', label: 'HellaSwag', sortable: true, width: 'w-20' },
  { key: 'benchmarks.arc_challenge', label: 'ARC-C', sortable: true, width: 'w-16' },
];

const performanceColumns = [
  { key: 'performance.latency_p50', label: 'Latency (P50)', sortable: true, width: 'w-24' },
  { key: 'performance.throughput', label: 'Throughput', sortable: true, width: 'w-24' },
];

function getAvailabilityIcon(availability: string) {
  switch (availability) {
    case 'active':
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    case 'inactive':
      return <XCircleIcon className="w-4 h-4 text-red-500" />;
    case 'beta':
      return <ClockIcon className="w-4 h-4 text-yellow-500" />;
    case 'deprecated':
      return <MinusCircleIcon className="w-4 h-4 text-gray-400" />;
    default:
      return <MinusCircleIcon className="w-4 h-4 text-gray-400" />;
  }
}

function formatNumber(value: number | undefined, decimals = 1): string {
  if (value === undefined || value === null) return '—';
  return value.toFixed(decimals);
}

function formatCost(cost: number): string {
  if (cost === 0) return 'Free';
  if (cost < 1) return `$${(cost).toFixed(3)}`;
  return `$${cost.toFixed(2)}`;
}

function formatContextLength(length: number): string {
  if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
  if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
  return length.toString();
}

export default function RankingsTable({
  models,
  loading = false,
  onSort,
  currentSort,
  showBenchmarks = false,
  showPerformance = false,
  compactMode = false,
}: RankingsTableProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const visibleColumns = useMemo(() => {
    let cols = [...columns];
    if (showBenchmarks) {
      cols = [...cols, ...benchmarkColumns];
    }
    if (showPerformance) {
      cols = [...cols, ...performanceColumns];
    }
    return cols;
  }, [showBenchmarks, showPerformance]);

  const handleSort = (columnKey: string) => {
    if (!onSort) return;
    
    const direction = currentSort?.field === columnKey && currentSort?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field: columnKey, direction });
  };

  const getSortIcon = (columnKey: string) => {
    if (currentSort?.field !== columnKey) {
      return <div className="w-4 h-4" />; // Placeholder for alignment
    }
    
    return currentSort.direction === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-blue-600" />
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
          <div className="h-12 bg-gray-50 border-b border-gray-200" />
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-100 bg-white">
              <div className="flex items-center space-x-4 p-4">
                <div className="h-4 bg-gray-200 rounded w-8" />
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.width || ''}
                    ${column.mobileHidden ? 'hidden md:table-cell' : ''}
                    ${compactMode ? 'px-2 py-2' : 'px-4 py-3'}
                  `}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map((model) => (
              <tr
                key={model.id}
                className={`
                  hover:bg-gray-50 transition-colors cursor-pointer
                  ${selectedModel === model.id ? 'bg-blue-50 ring-2 ring-blue-200' : ''}
                `}
                onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
              >
                {/* Rank */}
                <td className={`text-sm font-medium text-gray-900 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">#{model.composite_rank}</span>
                    {model.metadata.featured && (
                      <StarSolidIcon className="w-4 h-4 text-yellow-500" title="Featured by Fusion AI" />
                    )}
                  </div>
                </td>

                {/* Model Name */}
                <td className={`${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{model.name}</div>
                    <div className="text-xs text-gray-500 md:hidden">{model.provider}</div>
                    {model.metadata.parameter_count && (
                      <div className="text-xs text-gray-400">{model.metadata.parameter_count}</div>
                    )}
                  </div>
                </td>

                {/* Provider */}
                <td className={`hidden md:table-cell text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  <div className="flex items-center space-x-2">
                    <span>{model.provider}</span>
                    
                    {model.sources.artificial_analysis && <span className="text-xs text-purple-600" title="ArtificialAnalysis">AA</span>}
                  </div>
                </td>

                {/* Composite Score */}
                <td className={`text-sm text-gray-900 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{formatNumber(model.composite_score)}</span>
                    <div className={`w-16 h-2 bg-gray-200 rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                        style={{ width: `${Math.min(model.composite_score, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Prompt Cost */}
                <td className={`hidden md:table-cell text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  {formatCost(model.pricing.prompt_cost)}
                  <div className="text-xs text-gray-400">per 1M tokens</div>
                </td>

                {/* Completion Cost */}
                <td className={`hidden md:table-cell text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  {formatCost(model.pricing.completion_cost)}
                  <div className="text-xs text-gray-400">per 1M tokens</div>
                </td>

                {/* Context Length */}
                <td className={`hidden md:table-cell text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  {formatContextLength(model.metadata.context_length)}
                </td>

                {/* Status */}
                <td className={`${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                  <div className="flex items-center space-x-2">
                    {getAvailabilityIcon(model.metadata.availability)}
                    <span className="text-xs text-gray-500 capitalize md:hidden">
                      {model.metadata.availability}
                    </span>
                  </div>
                </td>

                {/* Benchmark Columns */}
                {showBenchmarks && benchmarkColumns.map((column) => {
                  const value = column.key.split('.').reduce((obj, key) => obj?.[key], model as any);
                  return (
                    <td key={column.key} className={`text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                      {formatNumber(value)}
                    </td>
                  );
                })}

                {/* Performance Columns */}
                {showPerformance && performanceColumns.map((column) => {
                  const value = column.key.split('.').reduce((obj, key) => obj?.[key], model as any);
                  return (
                    <td key={column.key} className={`text-sm text-gray-500 ${compactMode ? 'px-2 py-2' : 'px-4 py-4'}`}>
                      {column.key.includes('latency') ? `${formatNumber(value)}ms` : formatNumber(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {models.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No models found matching your criteria.</div>
        </div>
      )}
    </div>
  );
} 