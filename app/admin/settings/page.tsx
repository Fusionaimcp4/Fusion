"use client";

import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios'; // To be replaced by apiClient
import apiClient from '@/app/lib/apiClient'; // Import apiClient

interface AppConfigEntry {
  key: string;
  value: string;
  description?: string;
  updated_at?: string; // From API, not directly editable here
}

// Helper to get the auth token
// const getAuthToken = () => localStorage.getItem('auth_token'); // Handled by apiClient

const GENERAL_CONFIG_KEYS = ['limit_internal_api_cost_cents_tester', 'limit_neuroswitch_requests_tester'];
const PRICING_CONFIG_KEYS = ['pricing_prime_percentage', 'neuroswitch_classifier_fee_cents'];

export default function AdminSettingsPage() {
  const [generalConfigs, setGeneralConfigs] = useState<AppConfigEntry[]>([]);
  const [pricingConfigs, setPricingConfigs] = useState<AppConfigEntry[]>([]);
  // For any other configs that don't fit the above, or for a simpler general section
  const [otherConfigs, setOtherConfigs] = useState<AppConfigEntry[]>([]); 

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // const API_BASE_URL = '/api'; // Handled by apiClient

  const fetchConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // apiClient handles this
      // const response = await axios.get<AppConfigEntry[]>(`${API_BASE_URL}/admin/config`, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await apiClient.get<AppConfigEntry[]>('/admin/config'); // New call
      
      const allConfigs = response.data;
      setGeneralConfigs(allConfigs.filter(c => GENERAL_CONFIG_KEYS.includes(c.key)));
      setPricingConfigs(allConfigs.filter(c => PRICING_CONFIG_KEYS.includes(c.key)));
      setOtherConfigs(allConfigs.filter(c => !GENERAL_CONFIG_KEYS.includes(c.key) && !PRICING_CONFIG_KEYS.includes(c.key)));

    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch configuration.';
      setError(errorMessage);
      setGeneralConfigs([]);
      setPricingConfigs([]);
      setOtherConfigs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleInputChange = (key: string, newValue: string, type: 'general' | 'pricing' | 'other') => {
    const setStateAction = (setter: React.Dispatch<React.SetStateAction<AppConfigEntry[]>>) => {
      setter(prevConfigs =>
        prevConfigs.map(config =>
          config.key === key ? { ...config, value: newValue } : config
        )
      );
    };
    if (type === 'general') setStateAction(setGeneralConfigs);
    else if (type === 'pricing') setStateAction(setPricingConfigs);
    else setStateAction(setOtherConfigs);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // const token = getAuthToken(); // Handled by apiClient
      // if (!token) throw new Error('Authentication token not found.'); // apiClient handles this

      // Combine all config groups before sending
      const allConfigsToSave = [...generalConfigs, ...pricingConfigs, ...otherConfigs];
      const payload = allConfigsToSave.map(({ key, value }) => ({ key, value }));

      // await axios.put(`${API_BASE_URL}/admin/config`, payload, { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await apiClient.put('/admin/config', payload); // New call
      setSuccessMessage('Configuration saved successfully!');
      // Re-fetch to ensure data consistency, especially if descriptions change or keys are added/removed by another admin
      await fetchConfig(); 
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to save configuration.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 5000);
    }
  };

  const renderConfigInputs = (configs: AppConfigEntry[], type: 'general' | 'pricing' | 'other') => {
    if (isLoading && configs.length === 0) {
        return (
            <div className="mt-4 p-4 bg-gray-50 rounded-md text-center">
              <p className="text-sm text-gray-500">Loading configuration...</p>
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mt-2"></div>
            </div>
        );
    }
    if (!isLoading && configs.length === 0 && !error) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">No settings found for this section.</p>
        </div>
      );
    }
    return configs.map((config) => (
      <div key={config.key} className="mb-4">
        <label htmlFor={config.key} className="block text-sm font-medium text-gray-700">
          {config.description || config.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        <p className="text-xs text-gray-500 mb-1">Key: <code>{config.key}</code></p>
        <input
          type={config.key.includes('limit') || config.key.includes('cents') || config.key.includes('percentage') ? 'number' : 'text'}
          id={config.key}
          name={config.key}
          value={config.value}
          onChange={(e) => handleInputChange(config.key, e.target.value, type)}
          step={config.key === 'neuroswitch_classifier_fee_cents' ? '0.1' : (config.key.includes('cents') ? '1' : 'any')}
          min="0"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={config.key.includes('limit') || config.key.includes('cents') ? '0' : 'Enter value'}
        />
        {config.key.includes('cents') && (
          <p className="text-xs text-gray-500 mt-1">
            Current value in dollars: ${(parseFloat(config.value) / 100).toFixed(config.key === 'neuroswitch_classifier_fee_cents' ? 3 : 2)} (if applicable)
          </p>
        )}
         {config.key.includes('percentage') && (
          <p className="text-xs text-gray-500 mt-1">
            (e.g., 20 for 20%)
          </p>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Platform Settings</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md" role="alert">
          <p><span className="font-bold">Error:</span> {error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md" role="alert">
          <p>{successMessage}</p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-gray-700 mb-3">General Configuration</h2>
          <p className="text-gray-600 mb-4">
            Configuration for tester allowances and other general platform settings.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            {renderConfigInputs(generalConfigs.concat(otherConfigs), 'general')}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-700 mb-3">Pricing & Billing</h2>
          <p className="text-gray-600 mb-4">
            Controls for global pricing prime and NeuroSwitch classifier fees.
          </p>
           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            {renderConfigInputs(pricingConfigs, 'pricing')}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-700 mb-3">Feature Flags</h2>
          <p className="text-gray-600">
            Manage experimental features or phased rollouts using feature flags directly from the admin panel.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Feature flag management will be implemented in a future phase.</p>
          </div>
        </section>
        
        <div className="flex justify-end pt-4 border-t mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving Settings...' : 'Save All Settings'}
            </button>
        </div>
      </form>
    </div>
  );
} 