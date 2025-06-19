'use client'

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
// import axios from 'axios'; // Will be replaced by apiClient
import apiClient from '../../lib/apiClient'; // Import apiClient

// --- Icon Components ---
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
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
// --- End Icon Components ---

interface ProviderApiKey {
  id: string;
  key_name: string;
  provider_name: string;
  key_preview: string;
  created_at: string;
  is_active: boolean;
}

const PROVIDER_OPTIONS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Google Gemini' },
  // Add more as supported by NeuroSwitch and desired by users
];

// const API_BASE_URL = '/api'; // Handled by apiClient

// const getAuthToken = () => { // Handled by apiClient
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('auth_token');
//   }
//   return null;
// };

// --- AddProviderKeyForm Component ---
interface AddProviderKeyFormProps {
  isLoadingExternally: boolean;
  onAddKey: (provider: string, keyName: string, apiKey: string) => Promise<void>;
  onClose: () => void;
}

const AddProviderKeyForm: React.FC<AddProviderKeyFormProps> = ({ isLoadingExternally, onAddKey, onClose }) => {
  const [formProviderName, setFormProviderName] = useState<string>(PROVIDER_OPTIONS[0]?.value || '');
  const [formApiKey, setFormApiKey] = useState<string>('');
  const [formKeyName, setFormKeyName] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (!formProviderName || !formApiKey.trim() || !formKeyName.trim()) {
      setFormError('All fields (Provider, API Key, Key Name) are required.');
      return;
    }
    try {
      await onAddKey(formProviderName, formKeyName, formApiKey);
      // Parent (onAddKey) is responsible for closing modal on success
    } catch (err: any) {
      setFormError(err.message || 'Failed to add key. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
        <select
          id="providerName"
          value={formProviderName}
          onChange={(e) => setFormProviderName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
          autoFocus
        >
          {PROVIDER_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">Key Name / Label</label>
        <input
          type="text"
          id="keyName"
          value={formKeyName}
          onChange={(e) => setFormKeyName(e.target.value)}
          placeholder="e.g., My OpenAI Project Key"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
        <input
          type="password" // Use password type for sensitive input
          id="apiKey"
          value={formApiKey}
          onChange={(e) => setFormApiKey(e.target.value)}
          placeholder="Enter your provider API key (e.g., sk-...)"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
          required
        />
      </div>
      {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
        <button type="submit" disabled={isLoadingExternally} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
          {isLoadingExternally ? 'Adding...' : 'Add Key'}
        </button>
      </div>
    </form>
  );
};
// --- End AddProviderKeyForm Component ---

export default function ProviderKeysPage() {
  const [savedKeys, setSavedKeys] = useState<ProviderApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [selectedKeyToDelete, setSelectedKeyToDelete] = useState<ProviderApiKey | null>(null);
  const [selectedKeyToEdit, setSelectedKeyToEdit] = useState<ProviderApiKey | null>(null);
  const [editModalKeyName, setEditModalKeyName] = useState<string>('');

  const fetchSavedKeys = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<ProviderApiKey[]>('/external-keys'); // New call
      setSavedKeys(response.data);
    } catch (err) {
      const errorAsAny = err as any;
      const message = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to fetch provider API keys.';
      setError(message);
      setSavedKeys([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedKeys();
  }, [fetchSavedKeys]);

  const handleAddKeySubmit = async (formProviderName: string, formKeyName: string, formApiKey: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await apiClient.post('/external-keys', // New call
        { provider_name: formProviderName, api_key: formApiKey, key_name: formKeyName }
      );
      setSuccessMessage(`API Key '${formKeyName}' for ${formProviderName} added successfully.`);
      setIsAddModalOpen(false);
      fetchSavedKeys();
    } catch (err) {
      const errorAsAny = err as any;
      const message = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to add API key.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!selectedKeyToDelete) return;
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await apiClient.delete(`/external-keys/${selectedKeyToDelete.id}`); // New call
      setSuccessMessage(`API Key '${selectedKeyToDelete.key_name}' deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedKeyToDelete(null);
      fetchSavedKeys();
    } catch (err) {
      const errorAsAny = err as any;
      const message = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to delete API key.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setError(null);
    setSuccessMessage(null);
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (key: ProviderApiKey) => {
    setSelectedKeyToDelete(key);
    setError(null);
    setSuccessMessage(null);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (key: ProviderApiKey) => {
    setSelectedKeyToEdit(key);
    setEditModalKeyName(key.key_name);
    setError(null);
    setSuccessMessage(null);
    setIsEditModalOpen(true);
  };

  const handleEditKeyNameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedKeyToEdit || !editModalKeyName.trim()) {
      setError('Key name cannot be empty or no key selected for editing.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await apiClient.put(`/external-keys/${selectedKeyToEdit.id}`, // New call
        { key_name: editModalKeyName.trim() }
      );
      setSuccessMessage(`API Key '${editModalKeyName.trim()}' updated successfully.`);
      setIsEditModalOpen(false);
      setSelectedKeyToEdit(null);
      fetchSavedKeys();
    } catch (err) {
      const errorAsAny = err as any;
      const message = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to update API key name.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleKeyStatus = async (keyToToggle: ProviderApiKey) => {
    if (!keyToToggle) return;
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const newStatus = !keyToToggle.is_active;
    try {
      await apiClient.put(`/external-keys/${keyToToggle.id}/status`, // New call
        { isActive: newStatus }
      );
      setSuccessMessage(`Key '${keyToToggle.key_name}' ${newStatus ? 'activated' : 'deactivated'} successfully.`);
      fetchSavedKeys();
    } catch (err) {
      const errorAsAny = err as any;
      const message = errorAsAny.response?.data?.error || errorAsAny.message || 'Failed to update key status.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const Modal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void; title: string }>> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Provider API Keys</h1>
        <p className="text-gray-600 mt-1">
          Manage your API keys for third-party AI providers (OpenAI, Anthropic, Gemini, etc.). Use your own provider API keys to access with automatic fallback to Fusion.
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
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success: </strong>
          <span className="block sm:inline">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage(null)}>
             <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.149 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          disabled={isLoading}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 transition duration-150 ease-in-out"
        >
          <PlusIcon />
          Add New Provider Key
        </button>
      </div>
      
      {isLoading && savedKeys.length === 0 && !isAddModalOpen && (
         <div className="p-6 text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div><p className="mt-2 text-gray-600">Loading Provider Keys...</p></div>
      )}

      {!isLoading && savedKeys.length === 0 && (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.74-5.74L9 7m6 0a2 2 0 00-2-2M9 7a2 2 0 012-2m0 0V3m0 0a2 2 0 00-2 2m2-2h3" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Provider API Keys</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new provider API key.</p>
        </div>
      )}

      <div className="space-y-4">
        {savedKeys.map((key) => (
          <div key={key.id} className="bg-white shadow-lg rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="md:flex md:justify-between md:items-start">
              <div className="flex-grow mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate" title={key.key_name}>{key.key_name}</h2>
                <p className="text-sm text-gray-600">
                  Provider: <span className="font-medium text-indigo-600">{PROVIDER_OPTIONS.find(p => p.value === key.provider_name)?.label || key.provider_name}</span>
                  {!key.is_active && <span className="ml-2 text-xs font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">INACTIVE</span>}
                </p>
                <p className="text-sm text-gray-500 font-mono" title="Key Preview">Preview: {key.key_preview}</p>
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
                  disabled={isLoading}
                >
                  {key.is_active ? <NoSymbolIcon className="w-4 h-4 mr-1" /> : <CheckCircleIcon className="w-4 h-4 mr-1" />}
                  {key.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  onClick={() => openEditModal(key)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center p-1.5 rounded hover:bg-gray-100 transition-colors" 
                  title="Edit Key Name"
                  disabled={isLoading}
                >
                    <PencilIcon />Edit
                </button>
                <button 
                    onClick={() => openDeleteModal(key)} 
                    className="text-sm text-red-600 hover:text-red-800 flex items-center p-1.5 rounded hover:bg-red-50 transition-colors" 
                    title="Delete Key"
                    disabled={isLoading}
                >
                    <TrashIcon />Delete
                </button>
              </div>
            </div>
            <div className="mt-4 border-t pt-4 text-xs text-gray-500 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                    <span className="font-semibold">Status:</span> 
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${key.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {key.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div>
                    <span className="font-semibold">Added:</span> {formatDate(key.created_at)}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Key Modal - Now uses AddProviderKeyForm */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Provider API Key">
        {isAddModalOpen && (
          <AddProviderKeyForm
            isLoadingExternally={isLoading}
            onAddKey={handleAddKeySubmit}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </Modal>

      {/* Edit Key Name Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit Key Name: ${selectedKeyToEdit?.key_name}`}>
        {selectedKeyToEdit && (
          <form onSubmit={handleEditKeyNameSubmit}>
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
            <div className="flex justify-end space-x-3 mt-6">
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Key Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="text-gray-600 mb-4">Are you sure you want to delete the API key "<span className="font-semibold">{selectedKeyToDelete?.key_name}</span>" for provider <span className="font-semibold">{selectedKeyToDelete?.provider_name}</span>? This action cannot be undone.</p>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={handleDeleteKey} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50">
            {isLoading ? 'Deleting...' : 'Delete Key'}
          </button>
        </div>
      </Modal>

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
            <div className="flex-shrink-0">
                <ExclamationTriangleIcon />
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Note on API Keys</h3>
                <div className="mt-2 text-sm text-yellow-700">
                    <p>Your provider API keys are encrypted at rest. They are only decrypted in memory when a request is made to the specific provider you choose, and are passed securely to our NeuroSwitch service. Fusion AI never logs your full API keys.</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
} 
