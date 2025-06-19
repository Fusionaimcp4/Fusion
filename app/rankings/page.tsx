"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  MagnifyingGlassIcon,
  TableCellsIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import RankingsTable from '@/app/components/rankings/RankingsTable';
import RankingsFilters from '@/app/components/rankings/RankingsFilters';
import type { ModelRanking, RankingsFilters as FilterType, RankingsSortOption, RankingsAPIResponse } from '@/types/rankings';

type ViewLayout = 'table' | 'cards' | 'hybrid';

interface ViewOptions {
  layout: ViewLayout;
  showBenchmarks: boolean;
  showPerformance: boolean;
  compactMode: boolean;
  historicalView: boolean;
}

export default function RankingsPage() {
  // State management
  const [models, setModels] = useState<ModelRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalModels, setTotalModels] = useState(0);
  const [lastSync, setLastSync] = useState<string>('');
  
  // Filter and sort state
  const [filters, setFilters] = useState<FilterType>({
    providers: [],
    modalities: [],
    availability: [],
    featured_only: false,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<RankingsSortOption>({
    field: 'composite_rank',
    direction: 'asc',
  });

  // View options
  const [viewOptions, setViewOptions] = useState<ViewOptions>({
    layout: 'table',
    showBenchmarks: false,
    showPerformance: false,
    compactMode: false,
    historicalView: false,
  });

  // Derived data
  const availableProviders = useMemo(() => {
    const providers = new Set(models.map(m => m.provider));
    return Array.from(providers).sort();
  }, [models]);

  // Data fetching
  const fetchRankings = useCallback(async (page = 1, limit = 50) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: currentSort.field,
        order: currentSort.direction,
      });

      if (searchTerm) params.set('search', searchTerm);
      if (filters.providers.length > 0) params.set('providers', filters.providers.join(','));
      if (filters.modalities.length > 0) params.set('modalities', filters.modalities.join(','));
      if (filters.availability.length > 0) params.set('availability', filters.availability.join(','));
      if (filters.min_score !== undefined) params.set('min_score', filters.min_score.toString());
      if (filters.max_score !== undefined) params.set('max_score', filters.max_score.toString());
      if (filters.min_prompt_cost !== undefined) params.set('min_prompt_cost', filters.min_prompt_cost.toString());
      if (filters.max_prompt_cost !== undefined) params.set('max_prompt_cost', filters.max_prompt_cost.toString());
      if (filters.featured_only) params.set('featured_only', 'true');

      const response = await fetch(`/api/rankings?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch rankings data');
      }

      const data: RankingsAPIResponse = await response.json();
      
      setModels(data.models);
      setTotalModels(data.total);
      setTotalPages(Math.ceil(data.total / limit));
      setLastSync(data.last_sync);
      
    } catch (err) {
      console.error('Error fetching rankings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load rankings');
    } finally {
      setLoading(false);
    }
  }, [currentSort, searchTerm, filters]);

  // Refresh data manually
  const refreshData = async () => {
    try {
      // Trigger backend refresh
      const response = await fetch('/api/rankings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ action: 'refresh' }),
      });

      if (response.ok) {
        await fetchRankings(currentPage);
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  };

  // Effects
  useEffect(() => {
    fetchRankings(currentPage);
  }, [fetchRankings, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchRankings(1);
    }
  }, [filters, searchTerm, currentSort]);

  // Event handlers
  const handleSort = (sort: RankingsSortOption) => {
    setCurrentSort(sort);
  };

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleViewOptionChange = (key: keyof ViewOptions, value: any) => {
    setViewOptions(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium mb-2">Error Loading Rankings</div>
            <div className="text-gray-600 mb-4">{error}</div>
            <button
              onClick={() => fetchRankings(currentPage)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Model Rankings</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive rankings with real-time pricing and benchmarks from {totalModels} models
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                Last updated: {new Date(lastSync).toLocaleString()}
              </div>
              <button
                onClick={refreshData}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                title="Refresh data"
              >
                <ArrowPathIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          {/* Search and View Options */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search models or providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* View Options */}
              <div className="flex items-center space-x-4">
                {/* Layout Toggle */}
                <div className="flex rounded-md shadow-sm">
                  <button
                    onClick={() => handleViewOptionChange('layout', 'table')}
                    className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                      viewOptions.layout === 'table'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <TableCellsIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewOptionChange('layout', 'cards')}
                    className={`px-3 py-2 text-sm font-medium border-t border-b ${
                      viewOptions.layout === 'cards'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewOptionChange('layout', 'hybrid')}
                    className={`px-3 py-2 text-sm font-medium rounded-r-md border ${
                      viewOptions.layout === 'hybrid'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <ChartBarIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Toggle Options */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewOptionChange('showBenchmarks', !viewOptions.showBenchmarks)}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      viewOptions.showBenchmarks
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Benchmarks
                  </button>
                  <button
                    onClick={() => handleViewOptionChange('showPerformance', !viewOptions.showPerformance)}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      viewOptions.showPerformance
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => handleViewOptionChange('compactMode', !viewOptions.compactMode)}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      viewOptions.compactMode
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Compact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <RankingsFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableProviders={availableProviders}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {models.length} of {totalModels} models
              {filters.providers.length > 0 && ` • Providers: ${filters.providers.join(', ')}`}
              {filters.featured_only && ` • Featured models only`}
            </div>
            <div>
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {/* Table */}
          <RankingsTable
            models={models}
            loading={loading}
            onSort={handleSort}
            currentSort={currentSort}
            showBenchmarks={viewOptions.showBenchmarks}
            showPerformance={viewOptions.showPerformance}
            compactMode={viewOptions.compactMode}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        pageNum === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
