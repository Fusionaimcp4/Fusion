'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import apiClient from '@/app/lib/apiClient'; // ADD THIS. Adjust path if needed.

interface PurchaseCardProps {}

interface StripeSessionResponse {
  sessionId?: string; // Optional, as create-session returns this but billing-portal does not directly
  url: string;
  error?: string;
}

interface BtcPayInvoiceResponse {
  invoiceUrl: string; // Expecting this from the BTCPay create-invoice endpoint
  error?: string;
}

interface ApiErrorResponse {
  error: string;
  details?: string;
  message?: string; // For 501 errors from placeholders
}

const PurchaseCard: React.FC<PurchaseCardProps> = () => {
  const [useCrypto, setUseCrypto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [amountDollars, setAmountDollars] = useState<number>(10); // Default to $10

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setAuthToken(token);
  }, []);

  const handleAddCredits = async () => {
    setError(null);
    setIsLoading(true);

    if (!authToken) {
      setError('Authentication token not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    if (amountDollars <= 0) {
        setError('Please enter a valid amount greater than $0.');
        setIsLoading(false);
        return;
    }
    // const amountCents = Math.round(amountDollars * 100); // Keep for Stripe, BTCPay might take dollars directly

    if (useCrypto) {
      // BTCPay Flow
      console.log('Initiating BTCPay flow with amount (USD):', amountDollars);
      try {
        const response = await apiClient.post<BtcPayInvoiceResponse>(
          '/btcpay/create-invoice',
          {
            amount: amountDollars, // Sending amount in dollars
            currency: 'USD',
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data && response.data.invoiceUrl) {
          window.location.href = response.data.invoiceUrl;
          return; // Exit after redirect
        } else {
          setError(response.data?.error || 'Failed to retrieve BTCPay invoice URL.');
        }
      } catch (err: any) {
        console.error('BTCPay invoice creation error:', err);
        const apiError = err.response?.data as ApiErrorResponse | undefined;
        setError(apiError?.error || apiError?.message || 'An error occurred while creating the BTCPay invoice.');
      }
      setIsLoading(false); // Ensure loading is stopped if an error occurs before redirect
    } else {
      // Stripe Flow
      const amountCents = Math.round(amountDollars * 100); // Stripe needs cents
      if (amountCents <= 0) { // Ensure calculated cents are positive for Stripe
        setError('Please enter an amount that is at least $0.01.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiClient.post<StripeSessionResponse>(
          '/stripe/create-session',
          {
            amount_cents: amountCents,
            currency: 'usd',
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data && response.data.url) {
          window.location.href = response.data.url;
          return;
        } else {
          setError(response.data?.error || 'Failed to retrieve Stripe session URL.');
        }
      } catch (err: any) {
        console.error('Stripe session creation error:', err);
        const apiError = err.response?.data as ApiErrorResponse | undefined;
        setError(apiError?.error || apiError?.message || 'An error occurred while creating the Stripe session.');
      }
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!authToken) {
        setError('Please log in to manage billing.');
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        const response = await apiClient.get<StripeSessionResponse>('/stripe/billing-portal', {
            // headers: { Authorization: `Bearer ${authToken}` }, // apiClient's interceptor handles Authorization header
        });
        if (response.data && response.data.url) {
            window.location.href = response.data.url;
            return; // Exit after redirect
        } else {
            setError(response.data?.error || 'Failed to retrieve billing portal URL.');
        }
    } catch (err: any) {
        console.error('Billing portal error:', err);
        const apiError = err.response?.data as ApiErrorResponse | undefined;
        setError(apiError?.error || apiError?.message || 'Could not open billing portal.');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Buy Credits</h2>
        <div className="flex items-center">
          <span className={`mr-2 text-sm ${useCrypto ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>Use Card</span>
          <label htmlFor="cryptoToggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                id="cryptoToggle" 
                className="sr-only" 
                checked={useCrypto}
                onChange={() => setUseCrypto(!useCrypto)} 
                disabled={isLoading}
              />
              <div className={`block w-12 h-6 rounded-full ${useCrypto ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${useCrypto ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
          <span className={`ml-2 text-sm ${useCrypto ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Use BTC</span>
        </div>
      </div>

      {/* Amount Input - Now always visible */}
      <div className="space-y-4">
        <div>
          <label htmlFor="amountDollars" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (USD)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amountDollars"
              id="amountDollars"
              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
              placeholder="10.00"
              value={amountDollars}
              onChange={(e) => setAmountDollars(parseFloat(e.target.value) || 0)}
              min="1" // HTML5 validation, good to have but JS validation is key
              step="0.01"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Conditional rendering for payment method specific messages (if any) */}
      {useCrypto && (
        <div className="text-sm text-gray-600">
          <p>You are about to pay with Bitcoin.</p>
        </div>
      )}
      {/* {!useCrypto ? ( null ) : ( ... )} Could also structure like this if Stripe needs a placeholder */}

      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      <button 
        onClick={handleAddCredits}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center disabled:opacity-70"
        disabled={isLoading || !authToken || amountDollars <= 0}
      >
        {isLoading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null} 
        {isLoading ? 'Processing...' : 'Add Credits'}
      </button>

      <div className="flex justify-between text-sm pt-4 border-t border-gray-200">
        <a href="/dashboard/activity" className="text-blue-600 hover:underline flex items-center">
          View Usage <ExternalLink size={14} className="ml-1" />
        </a>
        <button 
            onClick={handleManageBilling}
            className="text-blue-600 hover:underline flex items-center disabled:opacity-70"
            disabled={isLoading || !authToken}
        >
          {isLoading && <Loader2 className="animate-spin mr-1 h-4 w-4" /> } 
          Manage Billing <ExternalLink size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PurchaseCard; 