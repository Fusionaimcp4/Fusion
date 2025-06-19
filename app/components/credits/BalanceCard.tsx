'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCcw, Info, Loader2 } from 'lucide-react';
// import axios from 'axios';
import apiClient from '../../lib/apiClient'; // Import apiClient

interface BalanceResponse {
  balance: string; // e.g., "123.4500"
  error?: string;
}

interface ApiError {
  error: string;
  details?: string;
}

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  // const [authToken, setAuthToken] = useState<string | null>(null); // Handled by apiClient

  // useEffect(() => {
  //   const token = localStorage.getItem('auth_token'); // Handled by apiClient
  //   setAuthToken(token);
  // }, []);

  const fetchBalance = async () => {
    // if (!authToken) { // Handled by apiClient
    //   setBalanceError('Authentication token not found. Please log in.');
    //   setIsLoadingBalance(false);
    //   setBalance("0.00"); 
    //   return;
    // }

    setIsLoadingBalance(true);
    setBalanceError(null);

    try {
      // const response = await axios.get<BalanceResponse>('/api/credits/balance', { // Old call
      //   headers: {
      //     Authorization: `Bearer ${authToken}`,
      //   },
      // });
      const response = await apiClient.get<BalanceResponse>('/credits/balance'); // New call
      if (response.data && typeof response.data.balance !== 'undefined') {
        // Assuming balance is a string like "123.4500"
        // Format to 2 decimal places for display, or keep as is if backend guarantees format
        const numericBalance = parseFloat(response.data.balance);
        setBalance(numericBalance.toFixed(2)); // Display as e.g., "123.45"
      } else {
        setBalanceError(response.data.error || 'Failed to fetch balance data.');
      }
    } catch (err: any) {
      console.error('Error fetching balance:', err);
      const apiErr = err.response?.data as ApiError | undefined;
      setBalanceError(apiErr?.error || err.message || 'An unexpected error occurred.');
      setBalance("0.00"); // Fallback display on error
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    // if (authToken) { // apiClient handles token, so we can call directly
    fetchBalance();
    // } else {
    //   // Handle case where token might not be immediately available or user logs out
    //   setBalance("0.00");
    //   setIsLoadingBalance(false);
    //   // setBalanceError("Please log in to see your balance."); // Optional: prompt to log in
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed authToken dependency

  const handleRefreshBalance = () => {
    fetchBalance(); // Re-trigger fetchBalance
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Balance</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefreshBalance}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoadingBalance /* || !authToken */} // authToken check no longer needed here
            title="Refresh balance"
          >
            {isLoadingBalance && !balanceError ? <Loader2 size={20} className="animate-spin" /> : <RefreshCcw size={20} />}
          </button>
          <div className="relative group">
            <Info size={20} className="text-gray-500 cursor-pointer" />
            <div className="absolute z-10 w-64 p-3 right-full mr-2 top-1/2 -translate-y-1/2 text-sm text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Security:</p>
              <p className="mb-2 text-xs">Payments are processed securely by Stripe. We do not store your credit card information. Crypto payments support any wallet type.</p>
              <p className="font-semibold">Pricing:</p>
              <p className="text-xs">See <a href="/pricing" className="underline hover:text-blue-300">pricing per model</a> and fees (5% + $0.35 for credit purchases).</p>
            </div>
          </div>
        </div>
      </div>
      {balanceError && (
        <div className="text-sm text-red-600 bg-red-100 p-3 rounded-md mb-2">
          Error: {balanceError}
        </div>
      )}
      <div className="text-4xl font-bold text-gray-800 mb-2">
        {isLoadingBalance && !balanceError && balance === null ? (
          <span className="text-gray-400">Loading...</span>
        ) : balance !== null ? (
          `$${balance}` // Display fetched balance, already toFixed(2)
        ) : (
          '$0.00' // Fallback or initial state before loading if error or no balance
        )}
      </div>
      {/* Add more details if needed, e.g., last updated time */}
    </div>
  );
};

export default BalanceCard; 