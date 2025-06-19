'use client'

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
// import axios from 'axios'; // Will be replaced by apiClient
import apiClient from '../../lib/apiClient'; // Import apiClient

// Icon components (simple SVGs for now)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.03 3.22.077m3.22-.077L10.875 21m2.438-15.126a2.25 2.25 0 00-2.25-2.25H10.5A2.25 2.25 0 008.25 6v.077c0 .317.012.634.035.941l.074 1.562M4.657 18.318a7.5 7.5 0 0014.686 0M12 6.75h.008v.008H12V6.75zm0 3.75h.008v.008H12v-.008z" />
  </svg>
);

const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400 mr-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NoSymbolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

interface ApiKey {
  id: string; // Changed to string to match typical DB ID types, adjust if yours is number
  name: string;
  api_key: string; // This will be the masked key from GET, full key from POST response
  created_at: string;
  last_used_at?: string | null;
  is_active: boolean; // Ensure this is always present
}

interface ApiKeyActivityLog {
  id: string;
  model: string | null;
  provider: string | null;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number | null;
  fallback_reason: string | null;
  response_time: number | null;
  created_at: string;
}

interface NewlyCreatedKeyInfo {
    name: string;
    apiKey: string;
    message: string;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [showFullKeyModalOpen, setShowFullKeyModalOpen] = useState(false);

  // State for input fields in modals
  const [createModalKeyName, setCreateModalKeyName] = useState('');
  const [editModalKeyName, setEditModalKeyName] = useState('');

  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [newlyCreatedKeyInfo, setNewlyCreatedKeyInfo] = useState<NewlyCreatedKeyInfo | null>(null);
  const [activityLogs, setActivityLogs] = useState<ApiKeyActivityLog[]>([]);

  // const API_BASE_URL = '/api'; // Handled by apiClient
  // const getAuthToken = () => localStorage.getItem('auth_token'); // Handled by apiClient

  const fetchApiKeys = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      // const response = await axios.get<ApiKey[]>(`${API_BASE_URL}/keys`, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await apiClient.get<ApiKey[]>('/keys'); // New call
      setApiKeys(response.data);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while fetching API keys.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to fetch API keys.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setApiKeys([]); // Reset keys on fetch error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const handleCreateKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createModalKeyName.trim()) {
        setError('Key name cannot be empty.');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      // const response = await axios.post<ApiKey & { message: string }>(`${API_BASE_URL}/keys`, // Old call
      //   { name: createModalKeyName.trim() }, 
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      const response = await apiClient.post<ApiKey & { message: string }>('/keys', // New call
        { name: createModalKeyName.trim() } 
      );
      setNewlyCreatedKeyInfo({ name: response.data.name, apiKey: response.data.api_key, message: response.data.message });
      setShowFullKeyModalOpen(true);
      setIsCreateModalOpen(false);
      setCreateModalKeyName(''); // Reset create modal input
      fetchApiKeys(); 
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while creating the API key.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to create API key.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedKey || !editModalKeyName.trim()) {
        setError('Key name cannot be empty or no key selected.');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      // await axios.put(`${API_BASE_URL}/keys/${selectedKey.id}`, // Old call
      //   { name: editModalKeyName.trim() }, 
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      await apiClient.put(`/keys/${selectedKey.id}`, // New call
        { name: editModalKeyName.trim() } 
      );
      setIsEditModalOpen(false);
      setSelectedKey(null);
      setEditModalKeyName(''); // Reset edit modal input
      fetchApiKeys(); 
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while updating the API key.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to update API key.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!selectedKey) return;
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      // await axios.delete(`${API_BASE_URL}/keys/${selectedKey.id}`, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await apiClient.delete(`/keys/${selectedKey.id}`); // New call
      setIsDeleteModalOpen(false);
      setSelectedKey(null);
      fetchApiKeys(); // Refresh list
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while deleting the API key.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to delete API key.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleKeyStatus = async (key: ApiKey) => {
    if (!key) return;
    setIsLoading(true);
    setError(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      
      const newStatus = !key.is_active;
      // await axios.put(`${API_BASE_URL}/keys/${key.id}/status`, // Old call
      //   { isActive: newStatus }, 
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      await apiClient.put(`/keys/${key.id}/status`, // New call
        { isActive: newStatus } 
      );
      // Refresh the list to show the updated status
      fetchApiKeys(); 
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while updating the key status.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to update key status.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchActivity = async (keyId: string) => {
    setIsLoading(true);
    setError(null);
    setActivityLogs([]);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // Handled by apiClient
      // const response = await axios.get<ApiKeyActivityLog[]>(`${API_BASE_URL}/keys/${keyId}/activity`, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await apiClient.get<ApiKeyActivityLog[]>(`/keys/${keyId}/activity`); // New call
      setActivityLogs(response.data);
      setIsActivityModalOpen(true);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while fetching activity logs.';
      const errorAsAny = err as any;
      if (errorAsAny && errorAsAny.isAxiosError) {
        errorMessage = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to fetch activity logs.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => { setCreateModalKeyName(''); setError(null); setIsCreateModalOpen(true); };
  const openEditModal = (key: ApiKey) => { setSelectedKey(key); setEditModalKeyName(key.name); setError(null); setIsEditModalOpen(true); };
  const openDeleteModal = (key: ApiKey) => { setSelectedKey(key); setError(null); setIsDeleteModalOpen(true); };
  const openActivityModal = (key: ApiKey) => { setSelectedKey(key); handleFetchActivity(key.id); };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Simplified Modal to avoid conflict if it's defined elsewhere or to reduce complexity if not needed now.
  // If you have a global Modal component, import and use that instead.
  const Modal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void; title: string }>> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    // Basic modal structure, enhance with your actual modal component or styling
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px', maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (isLoading && !apiKeys.length && !isCreateModalOpen && !isEditModalOpen && !isDeleteModalOpen && !isActivityModalOpen && !showFullKeyModalOpen) {
    return <div className="p-6 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div><p className="mt-2 text-gray-600">Loading API Keys...</p></div>;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
        <p className="text-gray-600 mt-1">
          Manage your API keys for integration with external services.
        </p>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.149 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={openCreateModal}
          disabled={isLoading}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition duration-150 ease-in-out"
        >
          <PlusIcon />
          Create API Key
        </button>
      </div>

      {apiKeys.length === 0 && !isLoading && (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.74-5.74L9 7m6 0a2 2 0 00-2-2M9 7a2 2 0 012-2m0 0V3m0 0a2 2 0 00-2 2m2-2h3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.74-5.74L9 7m6 0a2 2 0 00-2-2M9 7a2 2 0 012-2m0 0V3m0 0a2 2 0 00-2 2m2-2h3" /> 
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No API Keys</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new API key.</p>
        </div>
      )}

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <div key={key.id} className="bg-white shadow-lg rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="md:flex md:justify-between md:items-start">
              <div className="flex-grow mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate" title={key.name}>{key.name}</h2>
                <p className="text-sm text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block font-mono" title={key.api_key}>{key.api_key}</p>
                {!key.is_active && <span className="ml-2 text-xs font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">INACTIVE</span>}
              </div>
              <div className="flex-shrink-0 flex items-center space-x-2 md:ml-4">
                <button 
                  onClick={() => handleToggleKeyStatus(key)} 
                  className={`text-sm p-1.5 rounded flex items-center transition-colors ${
                    key.is_active 
                      ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                  title={key.is_active ? 'Deactivate Key' : 'Activate Key'}
                >
                  {key.is_active ? <NoSymbolIcon className="w-4 h-4 mr-1" /> : <CheckCircleIcon className="w-4 h-4 mr-1" />}
                  {key.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => openActivityModal(key)} className="text-sm text-blue-600 hover:text-blue-800 flex items-center p-1.5 rounded hover:bg-blue-50 transition-colors" title="View Activity"><EyeIcon />Activity</button>
                <button onClick={() => openEditModal(key)} className="text-sm text-gray-600 hover:text-gray-800 flex items-center p-1.5 rounded hover:bg-gray-100 transition-colors" title="Edit Key"><PencilIcon />Edit</button>
                <button onClick={() => openDeleteModal(key)} className="text-sm text-red-600 hover:text-red-800 flex items-center p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete Key"><TrashIcon />Delete</button>
              </div>
            </div>
            <div className="mt-4 border-t pt-4 text-xs text-gray-500 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                    <span className="font-semibold">Status:</span> 
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${key.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {key.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div>
                    <span className="font-semibold">Created:</span> {formatDate(key.created_at)}
                </div>
                <div>
                    <span className="font-semibold">Last Used:</span> {formatDate(key.last_used_at)}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Key Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New API Key">
        <form onSubmit={handleCreateKey}>
          <div className="mb-4">
            <label htmlFor="createKeyNameInput" className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
            <input
              type="text"
              id="createKeyNameInput"
              value={createModalKeyName}
              onChange={(e) => setCreateModalKeyName(e.target.value)}
              placeholder="My Awesome App Key"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {isLoading && isCreateModalOpen ? 'Creating...' : 'Create Key'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Key Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit API Key: ${selectedKey?.name}`}>
        <form onSubmit={handleEditKey}>
          <div className="mb-4">
            <label htmlFor="editKeyNameInput" className="block text-sm font-medium text-gray-700 mb-1">New Key Name</label>
            <input
              type="text"
              id="editKeyNameInput"
              value={editModalKeyName}
              onChange={(e) => setEditModalKeyName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {isLoading && isEditModalOpen ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Key Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="text-gray-600 mb-4">Are you sure you want to delete the API key "<span className="font-semibold">{selectedKey?.name}</span>"? This action cannot be undone.</p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <div className="flex justify-end space-x-3">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={handleDeleteKey} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50">
            {isLoading ? 'Deleting...' : 'Delete Key'}
          </button>
        </div>
      </Modal>

      {/* Show Full API Key Modal */}
      <Modal isOpen={showFullKeyModalOpen} onClose={() => {setShowFullKeyModalOpen(false); setNewlyCreatedKeyInfo(null);}} title="API Key Created Successfully!">
        {newlyCreatedKeyInfo && (
            <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationTriangleIcon />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {newlyCreatedKeyInfo.message}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Name:</label>
                    <p className="text-gray-800 font-semibold bg-gray-100 p-2 rounded-md">{newlyCreatedKeyInfo.name}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your New API Key:</label>
                    <input 
                        type="text" 
                        readOnly 
                        value={newlyCreatedKeyInfo.apiKey}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                    />
                </div>
                <button 
                    onClick={() => {navigator.clipboard.writeText(newlyCreatedKeyInfo.apiKey); alert('API Key copied to clipboard!');}}
                    className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                >
                    Copy Key to Clipboard
                </button>
            </div>
        )}
        <div className="mt-6 flex justify-end">
            <button onClick={() => {setShowFullKeyModalOpen(false); setNewlyCreatedKeyInfo(null);}} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Close</button>
        </div>
      </Modal>

      {/* Activity Log Modal */}
      <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} title={`Activity for ${selectedKey?.name}`}>
        {isLoading && activityLogs.length === 0 && <p>Loading activity...</p>}
        {!isLoading && activityLogs.length === 0 && <p>No activity found for this key.</p>}
        {activityLogs.length > 0 && (
          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {activityLogs.map(log => (
              <div key={log.id} className="p-3 bg-gray-50 rounded-md border border-gray-200 text-xs">
                <p><strong>Date:</strong> {formatDate(log.created_at)}</p>
                {log.model && <p><strong>Model:</strong> {log.model}</p>}
                {log.provider && <p><strong>Provider:</strong> {log.provider}</p>}
                <p><strong>Tokens:</strong> P: {log.prompt_tokens}, C: {log.completion_tokens}, T: {log.total_tokens}</p>
                {log.cost && <p><strong>Cost:</strong> ${log.cost.toFixed(4)}</p>}
                {log.response_time && <p><strong>Response Time:</strong> {log.response_time}ms</p>}
                {log.fallback_reason && <p className="text-orange-600"><strong>Fallback:</strong> {log.fallback_reason}</p>}
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <div className="mt-4 flex justify-end">
            <button onClick={() => setIsActivityModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Close</button>
        </div>
      </Modal>
    </div>
  );
} 