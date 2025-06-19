"use client";

import React, { useState, useEffect } from "react";
import apiClient from "../lib/apiClient";
import ModelCard from "../components/models/ModelCard";
import ModelTable from "../components/models/ModelTable";
import ModelsSidebar from "../components/models/ModelsSidebar";
import { Model, ModelFilters, SortOption, SortDirection } from "../types/models";
import { Filter, ArrowUpDown, RotateCcw, Grid3X3, List } from "lucide-react";

export default function ModelsPage() {
  const [view, setView] = useState<"table" | "card">("table");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<ModelFilters>({
    providers: [],
    modelTypes: [],
    contextRange: [4000, 2000000],
    toolSupport: null,
    showActiveOnly: false,
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await apiClient.get<Model[]>('/models');
        const data = response.data;
        setModels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const filteredModels = models.filter(model => {
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

  // Sort models
  const sortedModels = [...filteredModels].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'provider':
        comparison = a.provider.localeCompare(b.provider);
        break;
      case 'context':
        comparison = a.context_length_tokens - b.context_length_tokens;
        break;
      case 'price':
        const priceA = typeof a.input_cost_per_million_tokens === 'number' 
          ? a.input_cost_per_million_tokens 
          : parseFloat(a.input_cost_per_million_tokens);
        const priceB = typeof b.input_cost_per_million_tokens === 'number' 
          ? b.input_cost_per_million_tokens 
          : parseFloat(b.input_cost_per_million_tokens);
        comparison = priceA - priceB;
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const resetFilters = () => {
    setFilters({
      providers: [],
      modelTypes: [],
      contextRange: [4000, 2000000],
      toolSupport: null,
      showActiveOnly: false,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-lg p-6 h-96">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Skeleton */}
            <main className="flex-1 bg-white rounded-lg shadow-lg">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="animate-pulse">
                  {/* Desktop Table Skeleton */}
                  <div className="hidden md:block space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile Cards Skeleton */}
                  <div className="md:hidden space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <ModelsSidebar 
              filters={filters} 
              onFiltersChange={setFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-lg shadow-lg">
            {/* Sticky Action Bar */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Available Models
                  </h1>
                  
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {sortedModels.length} models
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={`${sortBy}-${sortDirection}`}
                      onChange={(e) => {
                        const [option, direction] = e.target.value.split('-') as [SortOption, SortDirection];
                        setSortBy(option);
                        setSortDirection(direction);
                      }}
                      className="text-xs sm:text-sm px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="name-asc">Name A→Z</option>
                      <option value="name-desc">Name Z→A</option>
                      <option value="provider-asc">Provider A→Z</option>
                      <option value="provider-desc">Provider Z→A</option>
                      <option value="context-asc">Context ↑</option>
                      <option value="context-desc">Context ↓</option>
                      <option value="price-asc">Price ↑</option>
                      <option value="price-desc">Price ↓</option>
                    </select>
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-md transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setView("table")}
                      className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                        view === "table"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView("card")}
                      className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                        view === "card"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {sortedModels.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Filter className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No models found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear all filters
                  </button>
                </div>
              ) : view === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedModels.map(model => (
                    <ModelCard key={model.id} model={model} />
                  ))}
                </div>
              ) : (
                <ModelTable models={sortedModels} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
