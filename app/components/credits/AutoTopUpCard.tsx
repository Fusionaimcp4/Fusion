'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
import apiClient from '../../lib/apiClient'; // Import apiClient
import StripeSetupForm from './StripeSetupForm';

interface AutoTopupDetails {
  hasPaymentMethod: boolean;
  isEnabled?: boolean;
  thresholdCents?: number | null;
  topupAmountCents?: number | null;
  last4?: string | null;
  cardBrand?: string | null;
  stripePaymentMethodId?: string | null;
}

const AutoTopUpCard: React.FC = () => {
  const [autoTopupDetails, setAutoTopupDetails] = useState<AutoTopupDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSetupForm, setShowSetupForm] = useState<boolean>(false);

  // State for the configuration form
  const [isAutoTopupEnabled, setIsAutoTopupEnabled] = useState<boolean>(false);
  const [thresholdAmountDollars, setThresholdAmountDollars] = useState<string>('10'); // Default to $10
  const [topupAmountDollars, setTopupAmountDollars] = useState<string>('20'); // Default to $20
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState<boolean>(false); // New state for removal loading

  const fetchAutoTopupDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const token = localStorage.getItem('auth_token'); // Handled by apiClient
      // if (!token) {
      //   setError('Authentication token not found.');
      //   setIsLoading(false);
      //   return;
      // }
      // const response = await axios.get<AutoTopupDetails>('/api/stripe/auto-topup-details', { // Old call
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = await apiClient.get<AutoTopupDetails>('/stripe/auto-topup-details'); // New call
      setAutoTopupDetails(response.data);
      // Populate form state when details are fetched
      if (response.data?.hasPaymentMethod) {
        setIsAutoTopupEnabled(response.data.isEnabled || false);
        setThresholdAmountDollars(response.data.thresholdCents ? (response.data.thresholdCents / 100).toFixed(2) : '10');
        setTopupAmountDollars(response.data.topupAmountCents ? (response.data.topupAmountCents / 100).toFixed(2) : '20');
      }
    } catch (err: any) {
      console.error('Error fetching auto top-up details:', err);
      setError(err.response?.data?.error || 'Failed to fetch auto top-up details.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAutoTopupDetails();
  }, [fetchAutoTopupDetails]);

  const handlePaymentMethodAdded = () => {
    setShowSetupForm(false);
    fetchAutoTopupDetails();
  };

  const handleRemovePaymentMethod = async () => {
    if (!window.confirm('Are you sure you want to remove your saved payment method for auto top-up? This will disable auto top-up.')) {
      return;
    }
    setIsRemoving(true);
    setError(null); // Clear main error, or use a specific error state for removal
    setSettingsError(null); // Clear settings error as well

    try {
      // const token = localStorage.getItem('auth_token'); // Handled by apiClient
      // if (!token) {
      //   setError('Authentication token not found.'); // Or setSettingsError
      //   setIsRemoving(false);
      //   return;
      // }
      // await axios.post('/api/stripe/remove-payment-method', // Old call
      //   {},
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      await apiClient.post('/stripe/remove-payment-method'); // New call
      fetchAutoTopupDetails(); // Refresh details, should show "Add Payment Method" state
    } catch (err: any) {
      console.error('Error removing payment method:', err);
      // Use settingsError for consistency within this card section, or a general error
      setSettingsError(err.response?.data?.error || 'Failed to remove payment method.');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSaveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSettingsError(null);
    setIsSavingSettings(true);

    const thresholdCents = Math.round(parseFloat(thresholdAmountDollars) * 100);
    const topupAmountCents = Math.round(parseFloat(topupAmountDollars) * 100);

    if (isAutoTopupEnabled) {
      if (isNaN(thresholdCents) || thresholdCents < 0) {
        setSettingsError('Threshold amount must be a valid positive number.');
        setIsSavingSettings(false);
        return;
      }
      if (isNaN(topupAmountCents) || topupAmountCents <= 0) {
        setSettingsError('Top-up amount must be a valid positive number greater than 0.');
        setIsSavingSettings(false);
        return;
      }
    }

    try {
      // const token = localStorage.getItem('auth_token'); // Handled by apiClient
      // if (!token) {
      //   setSettingsError('Authentication token not found.');
      //   setIsSavingSettings(false);
      //   return;
      // }
      // await axios.post('/api/stripe/update-auto-topup-settings', // Old call
      //   { 
      //     isEnabled: isAutoTopupEnabled,
      //     thresholdCents: isAutoTopupEnabled ? thresholdCents : null, 
      //     topupAmountCents: isAutoTopupEnabled ? topupAmountCents : null, 
      //   },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      await apiClient.post('/stripe/update-auto-topup-settings', { // New call
        isEnabled: isAutoTopupEnabled,
        thresholdCents: isAutoTopupEnabled ? thresholdCents : null,
        topupAmountCents: isAutoTopupEnabled ? topupAmountCents : null,
      });
      fetchAutoTopupDetails(); // Refresh to show updated settings
      // Optionally show a success message
    } catch (err: any) {
      console.error('Error saving auto top-up settings:', err);
      setSettingsError(err.response?.data?.error || 'Failed to save settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Auto Top-Up</h2>
        <p>Loading auto top-up settings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Auto Top-Up</h2>
      
      {error && <p className="text-sm text-red-500 mb-4">Error loading details: {error}</p>}

      {autoTopupDetails?.hasPaymentMethod ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Saved Payment Method: <span className="font-semibold text-gray-800">{autoTopupDetails.cardBrand} ending in {autoTopupDetails.last4}</span>
          </p>
          
          <form onSubmit={handleSaveSettings} className="space-y-4 mt-4 border-t pt-4">
            {settingsError && <p className="text-sm text-red-500">{settingsError}</p>}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="enableAutoTopup" 
                checked={isAutoTopupEnabled} 
                onChange={(e) => setIsAutoTopupEnabled(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enableAutoTopup" className="ml-2 block text-sm font-medium text-gray-700">
                Enable Auto Top-Up
              </label>
            </div>

            {isAutoTopupEnabled && (
              <>
                <div>
                  <label htmlFor="thresholdAmount" className="block text-sm font-medium text-gray-700">
                    Top-up when balance falls below ($)
                  </label>
                  <input 
                    type="number" 
                    id="thresholdAmount" 
                    value={thresholdAmountDollars} 
                    onChange={(e) => setThresholdAmountDollars(e.target.value)} 
                    min="0" 
                    step="0.01" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., 5.00"
                    required={isAutoTopupEnabled}
                  />
                </div>
                <div>
                  <label htmlFor="topupAmount" className="block text-sm font-medium text-gray-700">
                    Top-up by amount ($)
                  </label>
                  <input 
                    type="number" 
                    id="topupAmount" 
                    value={topupAmountDollars} 
                    onChange={(e) => setTopupAmountDollars(e.target.value)} 
                    min="0.01" 
                    step="0.01" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., 20.00"
                    required={isAutoTopupEnabled}
                  />
                </div>
              </>
            )}
            <button 
              type="submit"
              disabled={isSavingSettings}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50"
            >
              {isSavingSettings ? 'Saving...' : 'Save Settings'}
            </button>
          </form>

          <div className="mt-6 border-t pt-4">
            <button 
              onClick={() => setShowSetupForm(true)} 
              className="w-full mb-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              disabled={isRemoving} // Disable if removal is in progress
            >
              Update Payment Method
            </button>
            <button 
              onClick={handleRemovePaymentMethod}
              disabled={isRemoving || isSavingSettings} // Disable if removing or saving
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm disabled:opacity-50"
            >
              {isRemoving ? 'Removing...' : 'Remove Payment Method'}
            </button>
          </div>
          
          {showSetupForm && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Update Payment Method</h3>
              <StripeSetupForm onSuccess={handlePaymentMethodAdded} />
              <button 
                onClick={() => setShowSetupForm(false)}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Cancel Update
              </button>
            </div>
          )}

        </div>
      ) : (
        <div>
          {!showSetupForm ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                To activate auto-top-up, you'll need to add a payment method that supports offline charging (Stripe only).
              </p>
              <button 
                onClick={() => setShowSetupForm(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                Add a Payment Method
              </button>
            </>
          ) : (
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Add New Payment Method</h3>
              <StripeSetupForm onSuccess={handlePaymentMethodAdded} />
              <button 
                onClick={() => setShowSetupForm(false)}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoTopUpCard; 