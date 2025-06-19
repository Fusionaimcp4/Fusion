"use client";

import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import apiClient from '@/app/lib/apiClient';

interface AdminLog {
  id: number;
  timestamp: string;
  performed_by_user_id: number;
  admin_email: string | null;
  admin_username: string | null;
  action_type: string;
  target_entity_type: string | null;
  target_entity_id: string | null;
  summary: string | null;
  details: any; // JSONB, can be complex
  ip_address: string | null;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalLogs: number;
  limit: number;
}

// Define the expected response structure for the logs endpoint
interface AdminLogsResponse {
  logs: AdminLog[];
  pagination: PaginationInfo;
}

// Define some common action types - ideally, these could come from a shared enum/const with backend
const ACTION_TYPES = [
    'USER_ROLE_UPDATED',
    'USER_CREDIT_ADJUSTMENT',
    'MODEL_PRICE_UPDATED',
    // Add more as they are defined
];

const ENTITY_TYPES = ['USER', 'MODEL', 'API_KEY', 'SETTING']; // Example entity types

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: adminUser, isLoadingUser } = useUser();

  // Filters State
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Record<string, string>>({
    actionType: searchParams.get('actionType') || '',
    adminUserId: searchParams.get('adminUserId') || '',
    targetEntityType: searchParams.get('targetEntityType') || '',
    targetEntityId: searchParams.get('targetEntityId') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    page: searchParams.get('page') || '1',
  });

  // Details Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLogDetails, setSelectedLogDetails] = useState<any>(null);

  const fetchLogs = useCallback(async (currentFilters: Record<string, string>) => {
    setLoading(true);
    setError(null);

    const query = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    query.set('limit', '20'); // Or make this configurable

    try {
      const response = await apiClient.get<AdminLogsResponse>(`/admin/logs?${query.toString()}`);
      const data = response.data;
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch logs');
      setLogs([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoadingUser) return; // Wait for user context to load

    if (adminUser && adminUser.role === 'admin') {
        const currentFiltersFromUrl: Record<string, string> = {};
        searchParams.forEach((value, key) => { currentFiltersFromUrl[key] = value; });
        if (!currentFiltersFromUrl.page) currentFiltersFromUrl.page = '1'; // ensure page is set
        setFilters(currentFiltersFromUrl); // Sync state with URL on initial load/nav
        setError(null); // Clear previous errors
        fetchLogs(currentFiltersFromUrl);
    } else {
      // This implies user is not an admin, or adminUser is null (e.g. token issue detected by UserContext)
      setLoading(false);
      setError("Access Denied. You must be an admin to view this page or your session may have expired.");
    }
  }, [adminUser, isLoadingUser, searchParams, fetchLogs]); // Removed authToken from dependencies

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value, page: '1' })); // Reset to page 1 on filter change
  };

  const applyFilters = () => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) query.set(key, value);
    });
    router.push(`${pathname}?${query.toString()}`);
    // fetchLogs will be called by the useEffect watching searchParams
  };

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams(searchParams);
    query.set('page', newPage.toString());
    router.push(`${pathname}?${query.toString()}`);
  };

  const openDetailsModal = (details: any) => {
    setSelectedLogDetails(details);
    setIsDetailsModalOpen(true);
  };
  
  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === pagination.currentPage}
          className={`px-3 py-1 border rounded-md text-sm font-medium 
            ${i === pagination.currentPage 
              ? 'bg-indigo-600 text-white border-indigo-600' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
        >
          {i}
        </button>
      );
    }
    return (
        <div className="mt-6 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span>
                    {' '}to <span className="font-medium">{Math.min(pagination.currentPage * pagination.limit, pagination.totalLogs)}</span>
                    {' '}of <span className="font-medium">{pagination.totalLogs}</span> results
                </p>
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="btn-secondary px-3 py-1 text-sm disabled:opacity-50"
                >Previous</button>
                {/* {pages} Simplified pagination display for now */}
                <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="btn-secondary px-3 py-1 text-sm disabled:opacity-50"
                >Next</button>
            </div>
        </div>
    );
  };

  if (isLoadingUser) return <div className="text-center p-4">Loading user...</div>;
  if (!adminUser || adminUser.role !== 'admin') {
    return <div className="text-red-500 p-4">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Action Logs</h1>
      
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 border rounded-md">
        <div>
          <label htmlFor="actionType" className="block text-sm font-medium text-gray-700">Action Type</label>
          <select id="actionType" name="actionType" value={filters.actionType} onChange={handleFilterChange} className="mt-1 block w-full input-form">
            <option value="">All</option>
            {ACTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="adminUserId" className="block text-sm font-medium text-gray-700">Admin User ID</label>
          <input type="number" name="adminUserId" id="adminUserId" value={filters.adminUserId} onChange={handleFilterChange} className="mt-1 block w-full input-form" placeholder="e.g., 1"/>
        </div>
        <div>
          <label htmlFor="targetEntityType" className="block text-sm font-medium text-gray-700">Target Entity Type</label>
          <select id="targetEntityType" name="targetEntityType" value={filters.targetEntityType} onChange={handleFilterChange} className="mt-1 block w-full input-form">
            <option value="">All</option>
            {ENTITY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="targetEntityId" className="block text-sm font-medium text-gray-700">Target Entity ID</label>
          <input type="text" name="targetEntityId" id="targetEntityId" value={filters.targetEntityId} onChange={handleFilterChange} className="mt-1 block w-full input-form" placeholder="e.g., 123 or user_abc"/>
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" name="startDate" id="startDate" value={filters.startDate} onChange={handleFilterChange} className="mt-1 block w-full input-form"/>
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input type="date" name="endDate" id="endDate" value={filters.endDate} onChange={handleFilterChange} className="mt-1 block w-full input-form"/>
        </div>
        <div className="col-span-full md:col-span-2 lg:col-span-4 flex justify-end items-end">
            <button onClick={applyFilters} className="btn-primary">Apply Filters</button>
        </div>
      </div>

      {loading && <div className="text-center p-4">Loading logs...</div>}
      {error && <div className="text-red-500 p-4">Error fetching logs: {error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-admin">Timestamp</th>
                <th className="th-admin">Admin</th>
                <th className="th-admin">Action Type</th>
                <th className="th-admin">Target</th>
                <th className="th-admin">Summary</th>
                <th className="th-admin">IP Address</th>
                <th className="th-admin">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="td-admin">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="td-admin">{log.admin_email || log.admin_username || `ID: ${log.performed_by_user_id}`}</td>
                  <td className="td-admin">{log.action_type}</td>
                  <td className="td-admin">{log.target_entity_type ? `${log.target_entity_type} (ID: ${log.target_entity_id || 'N/A'})` : 'N/A'}</td>
                  <td className="td-admin">{log.summary || 'N/A'}</td>
                  <td className="td-admin">{log.ip_address || 'N/A'}</td>
                  <td className="td-admin">
                    <button onClick={() => openDetailsModal(log.details)} className="text-indigo-600 hover:text-indigo-900 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs.length === 0 && <p className="text-center text-gray-500 py-4">No logs found for the selected filters.</p>}
        </div>
      )}
      {!loading && renderPagination()}

      {/* Details Modal */}
      <Transition appear show={isDetailsModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDetailsModalOpen(false)}>
          {/* ... Overlay ... */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Log Details
                  </Dialog.Title>
                  <div className="mt-4">
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                      {JSON.stringify(selectedLogDetails, null, 2)}
                    </pre>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button type="button" className="btn-secondary" onClick={() => setIsDetailsModalOpen(false)}>Close</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
} 