import React, { useState, useEffect } from 'react';
import { Model, ModelFilters } from '../types/models';
import ModelsSidebar from '../components/models/ModelsSidebar';
import ModelCard from '../components/models/ModelCard';
import { filterModels } from '../utils/modelFilters';

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<ModelFilters>({
    providers: [],
    modelTypes: [],
    contextRange: [4000, 2000000],
    toolSupport: null,
    showActiveOnly: false,
  });

  useEffect(() => {
    // Fetch models from your API
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data);
        setFilteredModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    const filtered = filterModels(models, filters);
    setFilteredModels(filtered);
  }, [filters, models]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <ModelsSidebar 
            filters={filters} 
            onFiltersChange={setFilters}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Models</h1>
            <p className="text-gray-600 mt-2">
              {filteredModels.length} models available
            </p>
          </div>

          {/* Model grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No models match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelsPage; 