"use client";

import React, { useEffect, useState, Fragment } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import { Dialog, Transition, Switch } from '@headlessui/react';
import apiClient from '@/app/lib/apiClient';

interface AdminModel {
  id: number;
  name: string;
  id_string: string;
  provider: string;
  input_cost_per_million_tokens: string;
  output_cost_per_million_tokens: string;
  context_length_tokens: number;
  supports_json_mode?: boolean;
  supports_tool_use?: boolean;
  supports_vision?: boolean;
  description?: string | null;
  release_date?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminModelsPage() {
  const [models, setModels] = useState<AdminModel[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: adminUser, isLoadingUser } = useUser();

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AdminModel | null>(null);
  const [inputCost, setInputCost] = useState<string>('');
  const [outputCost, setOutputCost] = useState<string>('');
  const [modalIsActive, setModalIsActive] = useState<boolean>(true);
  const [editModalError, setEditModalError] = useState<string | null>(null);
  const [editModalLoading, setEditModalLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setPageLoading(true);
        setError(null);
        const response = await apiClient.get<AdminModel[]>('/admin/models');
        const data: AdminModel[] = response.data;
        setModels(data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch models');
      } finally {
        setPageLoading(false);
      }
    };

    if (isLoadingUser) {
      return;
    }

    if (adminUser && adminUser.role === 'admin') {
      setError(null);
      fetchModels();
    } else {
      setPageLoading(false);
      setError("Access Denied. You must be an admin to view this page or your session may have expired.");
    }
  }, [adminUser, isLoadingUser]);

  const openEditModal = (model: AdminModel) => {
    setSelectedModel(model);
    setInputCost(model.input_cost_per_million_tokens || '0');
    setOutputCost(model.output_cost_per_million_tokens || '0');
    setModalIsActive(model.is_active);
    setEditModalError(null);
    setIsEditModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (!selectedModel) {
      setEditModalError('Selected model is missing.');
      return;
    }
    const parsedInputCost = parseFloat(inputCost);
    const parsedOutputCost = parseFloat(outputCost);

    if (isNaN(parsedInputCost) || parsedInputCost < 0) {
      setEditModalError('Invalid input cost. Must be a non-negative number.');
      return;
    }
    if (isNaN(parsedOutputCost) || parsedOutputCost < 0) {
      setEditModalError('Invalid output cost. Must be a non-negative number.');
      return;
    }

    setEditModalLoading(true);
    setEditModalError(null);

    const requestBody = {
      input_cost_per_million_tokens: parsedInputCost,
      output_cost_per_million_tokens: parsedOutputCost,
      is_active: modalIsActive,
    };

    console.log('[AdminModelsPage] Value of modalIsActive before API call:', modalIsActive);
    console.log('[AdminModelsPage] Request body for PUT:', JSON.stringify(requestBody, null, 2));

    try {
      const response = await apiClient.put<{model: AdminModel}>(
        `/admin/models/${selectedModel.id}`,
        requestBody
      );
      const responseData = response.data;
      const updatedModelFromServer = responseData.model;
      console.log("[AdminModelsPage] Full response data (updatedModelFromServer) from PUT:", JSON.stringify(updatedModelFromServer, null, 2));

      setModels(prevModels => {
        const newModels = prevModels.map(m => {
          if (m.id === selectedModel.id) {
            console.log("[AdminModelsPage] Updating model in state - Old model object:", JSON.stringify(m, null, 2));
            console.log("[AdminModelsPage] Updating model in state - New data from backend:", JSON.stringify(updatedModelFromServer, null, 2));
            const mergedModel = { ...m, ...updatedModelFromServer }; 
            console.log("[AdminModelsPage] Updating model in state - Merged model object:", JSON.stringify(mergedModel, null, 2));
            return mergedModel;
          }
          return m;
        });
        console.log("[AdminModelsPage] New models array for state (first 5 items if long):", JSON.stringify(newModels.slice(0,5), null, 2));
        return newModels;
      });
      setIsEditModalOpen(false);
      setSelectedModel(null);
    } catch (err: any) {
      setEditModalError(err.message);
    } finally {
      setEditModalLoading(false);
    }
  };

  if (isLoadingUser || pageLoading) return <div className="text-center p-4">Loading models...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!adminUser || adminUser.role !== 'admin') {
    return <div className="text-red-500 p-4">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Model Configuration</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-admin">ID</th>
                <th className="th-admin">Name</th>
                <th className="th-admin">Provider</th>
                <th className="th-admin">ID String</th>
                <th className="th-admin text-right">Input Cost / Mtok</th>
                <th className="th-admin text-right">Output Cost / Mtok</th>
                <th className="th-admin text-center">Active</th>
                <th className="th-admin">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {models.map((model) => (
                <tr key={model.id}>
                  <td className="td-admin">{model.id}</td>
                  <td className="td-admin font-medium text-gray-900">{model.name}</td>
                  <td className="td-admin">{model.provider}</td>
                  <td className="td-admin">{model.id_string}</td>
                  <td className="td-admin text-right">${parseFloat(model.input_cost_per_million_tokens).toFixed(6)}</td>
                  <td className="td-admin text-right">${parseFloat(model.output_cost_per_million_tokens).toFixed(6)}</td>
                  <td className="td-admin text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${model.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {model.is_active ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="td-admin space-x-2">
                    <button 
                      onClick={() => openEditModal(model)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {models.length === 0 && !pageLoading && <p className="text-center text-gray-500 mt-4">No models found.</p>}
      </div>

      {/* Edit Model Modal */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Edit Model: {selectedModel?.name} ({selectedModel?.provider})
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Model ID String: {selectedModel?.id_string}. All prices are per million tokens.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="inputCost" className="block text-sm font-medium text-gray-700">Input Cost / Million Tokens</label>
                      <input
                        type="number"
                        name="inputCost"
                        id="inputCost"
                        value={inputCost}
                        onChange={(e) => setInputCost(e.target.value)}
                        step="0.000001"
                        min="0"
                        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., 0.50"
                      />
                    </div>
                    <div>
                      <label htmlFor="outputCost" className="block text-sm font-medium text-gray-700">Output Cost / Million Tokens</label>
                      <input
                        type="number"
                        name="outputCost"
                        id="outputCost"
                        value={outputCost}
                        onChange={(e) => setOutputCost(e.target.value)}
                        step="0.000001"
                        min="0"
                        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., 1.50"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Active</span>
                        <Switch
                            checked={modalIsActive}
                            onChange={setModalIsActive}
                            className={`${modalIsActive ? 'bg-indigo-600' : 'bg-gray-200'}
                            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        >
                            <span className="sr-only">Enable this model</span>
                            <span
                                aria-hidden="true"
                                className={`${modalIsActive ? 'translate-x-5' : 'translate-x-0'}
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                     <p className="text-xs text-gray-500">Toggles whether the model is available for use.</p>
                  </div>

                  {editModalError && <p className="mt-3 text-sm text-red-600">{editModalError}</p>}

                  <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                    <button 
                        type="button" 
                        className="btn-primary disabled:opacity-50"
                        onClick={handleModalSubmit}
                        disabled={editModalLoading || inputCost === '' || outputCost === '' || parseFloat(inputCost) < 0 || parseFloat(outputCost) < 0}
                    >
                      {editModalLoading ? 'Saving...' : 'Save Configuration'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// Basic Tailwind classes for table, can be extracted to a global CSS or styles object
// Add these to your global.css or a relevant stylesheet if not already present
// .th-admin { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
// .td-admin { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500; }
 