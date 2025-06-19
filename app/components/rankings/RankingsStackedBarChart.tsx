import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';

// Define an interface for the chart data entries
interface ChartDataEntry {
  date: string;
  [modelName: string]: string | number; // Index signature for dynamic model keys
}

// Define an interface for the categoryMap
interface CategoryMap {
  [modelName: string]: string; // Index signature for model names mapping to categories
}

const categories = [
  'All Categories',
  'Roleplay',
  'Programming',
  'Marketing',
  'Marketing/Seo',
  'Technology',
  'Science',
  'Translation',
  'Legal',
  'Finance',
  'Health',
  'Trivia',
  'Academia',
];

// Generate mock data for 12 months, 6 categories
const models = ['Claude', 'GPT-4', 'Gemini', 'Llama', 'Qwen', 'Mistral'];
const categoryMap: CategoryMap = { // Apply the CategoryMap interface
  Claude: 'Roleplay',
  'GPT-4': 'Programming',
  Gemini: 'Science',
  Llama: 'Technology',
  Qwen: 'Translation',
  Mistral: 'Finance',
};
const months = [
  '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12',
  '2024-01', '2024-02', '2024-03', '2024-04', '2024-05',
];

const mockData = months.map((month, i) => {
  const entry: ChartDataEntry = { date: month }; // Apply the ChartDataEntry interface
  models.forEach(model => {
    // Simulate growth and some randomness
    entry[model] = Math.round((i + 1) * 100 + Math.random() * 100) * (1 + Math.random());
  });
  return entry;
});

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#888888'
];

const RankingsStackedBarChart: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Filter models by category
  const visibleModels = selectedCategory === 'All Categories'
    ? models
    : models.filter(m => categoryMap[m] === selectedCategory);

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-center mb-2">Compare models for all prompts <span title="Mock data, for demo only" className="text-gray-400 cursor-help">ⓘ</span></h2>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border ${selectedCategory === cat ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} transition`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={d => d.replace('-', ' ')} />
          <YAxis tickFormatter={v => v >= 1e12 ? (v/1e12).toFixed(1) + 'T' : v >= 1e9 ? (v/1e9).toFixed(1) + 'B' : v} />
          <Tooltip formatter={v => v.toLocaleString()} />
          <Legend />
          {visibleModels.map((model, idx) => (
            <Bar key={model} dataKey={model} stackId="a" fill={COLORS[idx % COLORS.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingsStackedBarChart; 