'use client';

import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios'; // Will be replaced by apiClient
import apiClient from '../../lib/apiClient'; // Import apiClient

// --- Icon Components (can be moved to a separate file later) ---
const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const ArrowDownTrayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const AdjustmentsHorizontalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);
// --- End Icon Components ---

interface MetricData {
  spend: number;
  tokens: number;
  requests: number;

  // New monthly fields from backend
  currentMonthSpendNeuroSwitch: number;
  currentMonthCallsNeuroSwitch: number;
  currentMonthSpendInternalApi: number;
  currentMonthCallsInternalApi: number;
  currentMonthTotalTokens: number;
}

interface ActivityLogEntry {
  timestamp: string;
  provider: string | null;
  model: string | null;
  prompt_tokens: number;
  completion_tokens: number;
  cost?: number | null;
  neuroswitch_cost?: number;
  responseTime?: number | null;
  finish?: string | null;

  key_source?: 'byoapi' | 'internal' | 'fallback' | string;
  api_key_name?: string;
  request_model?: string;
  usage_detail_label: string;
}

// For API Key list in filter dropdown
interface UserApiKey {
  id: string; // Assuming string ID from API keys page
  name: string;
  api_key?: string; // Masked key, not strictly needed for filter dropdown value/label
  is_active?: boolean; // Might be useful to only show active keys for filtering
}

// Define the expected structure of the API response for activity data
interface ActivityApiResponse {
  metrics: MetricData;
  activity: ActivityLogEntry[];
  totalPages: number;
  currentPage: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, isLoading }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 transform transition-all hover:scale-105">
      <h3 className="text-md font-semibold text-gray-500 mb-1">{title}</h3>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          {description && <div className="h-4 bg-gray-200 rounded w-1/2"></div>}
        </div>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </>
      )}
      {/* Optional: Expand icon could go here */}
    </div>
  );
};

// Helper to format date to YYYY-MM-DD for input[type="date"]
const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export default function ActivityPage() {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Default to last 30 days
  const [toDate, setToDate] = useState(formatDateForInput(new Date()));
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [fromDate, setFromDate] = useState(formatDateForInput(thirtyDaysAgo));

  // State for filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterProvider, setFilterProvider] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterApiKeyId, setFilterApiKeyId] = useState<string>(''); // Store ID of the selected API key

  const [userApiKeys, setUserApiKeys] = useState<UserApiKey[]>([]);

  // const API_BASE_URL = '/api'; // Handled by apiClient
  // const getAuthToken = () => localStorage.getItem('auth_token'); // Handled by apiClient

  const fetchActivityData = useCallback(async (page = 1, filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient

      const params: any = {
        from: fromDate,
        to: toDate,
        page,
        limit: 10,
        ...filters // Spread in filter parameters
      };

      // Remove empty filter params
      if (!params.provider) delete params.provider;
      if (!params.model) delete params.model;
      if (!params.apiKeyId) delete params.apiKeyId;

      // const response = await axios.get<ActivityApiResponse>(`${API_BASE_URL}/user/activity`, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      //   params,
      // });
      const response = await apiClient.get<ActivityApiResponse>('/user/activity', { params }); // New call

      setMetrics(response.data.metrics);
      setActivityLogs(response.data.activity);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);

    } catch (err) {
      let errorMessage = 'An unexpected error occurred while fetching activity data.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to fetch activity data.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setMetrics(null); 
      setActivityLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, [fromDate, toDate]); // Add fromDate and toDate as dependencies

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        // const token = getAuthToken(); // Handled by apiClient
        // if (!token) return; // Handled by apiClient
        // const response = await axios.get<UserApiKey[]>(`${API_BASE_URL}/keys`, { // Old call
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const response = await apiClient.get<UserApiKey[]>('/keys'); // New call
        setUserApiKeys(response.data.filter(key => key.is_active !== false)); // Default to active keys or all if is_active undefined
      } catch (err) {
        console.error('Failed to fetch API keys for filter:', err);
        // Optionally set an error state for this failure
      }
    };
    fetchKeys();
  }, []); // Fetch keys on component mount

  useEffect(() => {
    const activeFilters: any = {};
    if (filterProvider) activeFilters.provider = filterProvider;
    if (filterModel) activeFilters.model = filterModel;
    if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
    fetchActivityData(currentPage, activeFilters);
  }, [fetchActivityData, currentPage, filterProvider, filterModel, filterApiKeyId]); // Re-fetch when filters change too
  
  const handleRefresh = () => {
    const activeFilters: any = {};
    if (filterProvider) activeFilters.provider = filterProvider;
    if (filterModel) activeFilters.model = filterModel;
    if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
    fetchActivityData(1, activeFilters); 
  };

  const handleDateChange = () => {
    setCurrentPage(1); 
    const activeFilters: any = {};
    if (filterProvider) activeFilters.provider = filterProvider;
    if (filterModel) activeFilters.model = filterModel;
    if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
    fetchActivityData(1, activeFilters);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1); 
    const activeFilters: any = {};
    if (filterProvider) activeFilters.provider = filterProvider;
    if (filterModel) activeFilters.model = filterModel;
    if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
    
    fetchActivityData(1, activeFilters);
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setFilterProvider('');
    setFilterModel('');
    setFilterApiKeyId('');
    setCurrentPage(1);
    fetchActivityData(1, {}); 
    setIsFilterModalOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
        const activeFilters: any = {};
        if (filterProvider) activeFilters.provider = filterProvider;
        if (filterModel) activeFilters.model = filterModel;
        if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
        fetchActivityData(currentPage - 1, activeFilters);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
        const activeFilters: any = {};
        if (filterProvider) activeFilters.provider = filterProvider;
        if (filterModel) activeFilters.model = filterModel;
        if (filterApiKeyId) activeFilters.apiKeyId = filterApiKeyId;
        fetchActivityData(currentPage + 1, activeFilters);
    }
  };

  const handleExport = () => {
    // const token = getAuthToken(); // No longer directly needed here, fetchAndDownload will get it.
    // ... (existing comments about window.location.href approach) ...

    // Simplest approach for GET, assuming verifyToken can work with session or is relaxed for this:
    // window.location.href = `${API_BASE_URL}/user/activity/export?${params.toString()}`;

    // If the above doesn't pass auth, an alternative (more complex for GET, but standard for POST-like downloads):
    const fetchAndDownload = async () => {
      try {
        // const token = getAuthToken(); // Handled by apiClient
        // if (!token) { // Handled by apiClient
        //     setError('Auth token not found for export. Please log in again.');
        //     return;
        // }

        // Construct query parameters for axios
        const queryParams: any = {
          from: fromDate,
          to: toDate,
        };
        if (filterProvider) queryParams.provider = filterProvider;
        if (filterModel) queryParams.model = filterModel;
        if (filterApiKeyId) queryParams.apiKeyId = filterApiKeyId;

        // const response = await axios.get<Blob>(`${API_BASE_URL}/user/activity/export`, { // Old call
        //   headers: { Authorization: `Bearer ${token}` },
        //   params: queryParams,
        //   responseType: 'blob', 
        // });
        const response = await apiClient.get<Blob>('/user/activity/export', { // New call
          params: queryParams,
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: response.headers['content-disposition'] || 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        
        // Extract filename from content-disposition header if available, otherwise default
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'fusion_activity_export.csv';
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
            if (filenameMatch && filenameMatch.length > 1) {
                filename = filenameMatch[1];
            }
        }
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      } catch (err) {
        console.error('Export failed:', err);
        const errorAsAny = err as any;
        let exportErrorMessage = 'Failed to export activity data.';
        if (errorAsAny && errorAsAny.isAxiosError && errorAsAny.response && errorAsAny.response.data) {
            // If the response is JSON and contains an error message (e.g. from our backend)
            if (typeof errorAsAny.response.data === 'object' && errorAsAny.response.data.error) {
                exportErrorMessage = errorAsAny.response.data.error;
            } else if (errorAsAny.response.status === 401) {
                exportErrorMessage = 'Unauthorized. Please ensure you are logged in.';
            }
        } else if (err instanceof Error) {
            exportErrorMessage = err.message;
        }
        setError(exportErrorMessage);
      }
    };
    fetchAndDownload();
  };

  // Simple Modal Component (can be extracted later)
  const FilterModal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void; title: string; onApply: () => void; onClear: () => void;}>> = 
    ({ isOpen, onClose, title, children, onApply, onClear }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {children}
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClear} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Clear Filters</button>
            <button type="button" onClick={onApply} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Apply Filters</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Activity</h1>
            <p className="text-gray-600 mt-1">See how you've been using models on Fusion AI.</p>
          </div>
          <button 
            onClick={handleRefresh} 
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshIcon />
          </button>
        </div>
      </header>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Spend" 
          value={metrics ? `$${metrics.spend.toFixed(2)}` : '$0.00'} 
          isLoading={isLoading} 
          description={
            metrics ? (
              `This Month: Internal API $${metrics.currentMonthSpendInternalApi.toFixed(2)}, ` +
              `NeuroSwitch Fee $${metrics.currentMonthSpendNeuroSwitch.toFixed(3)}`
            ) : "USD spent"
          }
        />
        <StatCard 
          title="Total Tokens" 
          value={metrics ? metrics.tokens.toLocaleString() : '0'} 
          isLoading={isLoading} 
          description={
            metrics ? 
            `This Month: ${metrics.currentMonthTotalTokens.toLocaleString()} tokens` 
            : "Tokens processed"
          }
        />
        <StatCard 
          title="Total Requests" 
          value={metrics ? metrics.requests.toLocaleString() : '0'} 
          isLoading={isLoading} 
          description={
            metrics ? (
              `This Month: Internal API ${metrics.currentMonthCallsInternalApi} calls, ` +
              `NeuroSwitch ${metrics.currentMonthCallsNeuroSwitch} calls`
            ) : "API calls made"
          }
        />
      </section>

      {/* Date Range Picker & Filters/Export */}
      <section className="mb-8 p-4 bg-white shadow rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From:</label>
            <input 
              type="date" 
              id="fromDate" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To:</label>
            <input 
              type="date" 
              id="toDate" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="lg:col-span-1 flex items-end">
            <button 
                onClick={handleDateChange}
                disabled={isLoading}
                className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition duration-150 ease-in-out"
            >
                Apply Dates
            </button>
          </div>
          <div className="flex space-x-3 items-end justify-self-start lg:justify-self-end mt-4 md:mt-0">
            <button 
              onClick={() => setIsFilterModalOpen(true)} 
              className="flex items-center text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg shadow-sm disabled:opacity-50"
              disabled={isLoading}
            >
              <AdjustmentsHorizontalIcon /> Filters
            </button>
            <button 
              onClick={handleExport} 
              className="flex items-center text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg shadow-sm disabled:opacity-50"
              disabled={isLoading} // Disable if loading, or no data, etc.
            >
              <ArrowDownTrayIcon /> Export
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Activity Logs Table */}
      <section className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Logs</h2>
        {/* Display active filters maybe? */}
        { (filterProvider || filterModel || filterApiKeyId) && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
                Applying Filters: 
                {filterProvider && <span>Provider: <strong>{filterProvider}</strong>; </span>}
                {filterModel && <span>Model: <strong>{filterModel}</strong>; </span>}
                {filterApiKeyId && (
                    <span>App/Key: <strong>{userApiKeys.find(k => k.id === filterApiKeyId)?.name || filterApiKeyId}</strong>; </span>
                )}
                <button onClick={handleClearFilters} className="ml-2 text-blue-500 hover:text-blue-700 font-semibold">(Clear)</button>
            </div>
        )}
        {isLoading && activityLogs.length === 0 ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading activity logs...</p>
          </div>
        ) : !isLoading && activityLogs.length === 0 && !error ? (
          <div className="text-center py-10 px-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Activity Found</h3>
            <p className="mt-1 text-sm text-gray-500">No usage data found for the selected period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider / Model</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App/Key Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens (in/out)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NeuroSwitch Cost</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time (ms)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activityLogs.map((log, index) => {
                  const appOrKeyNameDisplay = log.api_key_name || 'N/A';

                  const neuroSwitchCostDisplay = typeof log.neuroswitch_cost === 'number' 
                    ? `$${log.neuroswitch_cost.toFixed(4)}` 
                    : '$0.0000';

                  const llmProviderCostDisplay = typeof log.cost === 'number' 
                    ? `$${log.cost.toFixed(4)}` 
                    : 'N/A';

                  return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <div>{log.provider || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{log.model || 'N/A'}</div>
                    </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{appOrKeyNameDisplay}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {log.prompt_tokens.toLocaleString()} / {log.completion_tokens.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {neuroSwitchCostDisplay}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {llmProviderCostDisplay}
                      </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{typeof log.responseTime === 'number' ? `${log.responseTime} ms` : 'N/A'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {log.usage_detail_label}
                      </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-between items-center">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages || isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        title="Filter Activity Logs"
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      >
        <div>
          <label htmlFor="filterProvider" className="block text-sm font-medium text-gray-700">Provider</label>
          <input 
            type="text" 
            id="filterProvider" 
            value={filterProvider}
            onChange={(e) => setFilterProvider(e.target.value)}
            placeholder="e.g., OpenAI, Anthropic"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="filterModel" className="block text-sm font-medium text-gray-700">Model</label>
          <input 
            type="text" 
            id="filterModel" 
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            placeholder="e.g., gpt-4, claude-2"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="filterApiKeyId" className="block text-sm font-medium text-gray-700">App/Key Name</label>
          <select 
            id="filterApiKeyId" 
            value={filterApiKeyId}
            onChange={(e) => setFilterApiKeyId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Apps/Keys</option>
            {userApiKeys.map(key => (
              <option key={key.id} value={key.id}>{key.name}</option>
            ))}
          </select>
        </div>
      </FilterModal>

    </div>
  );
} 