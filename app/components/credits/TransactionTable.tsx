'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import axios from 'axios';
import apiClient from '../../lib/apiClient'; // Import apiClient

// Updated Transaction interface to match backend response
interface Transaction {
  id: number;
  created_at: string;
  description: string;
  amount_dollars: string;
  status: string;
  method: string;
  provider_transaction_id: string | null;
}

interface ApiError {
  error: string;
  details?: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);
  // const [authToken, setAuthToken] = useState<string | null>(null); // Handled by apiClient

  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 5;

  // useEffect(() => {
  //   const token = localStorage.getItem('auth_token'); // Handled by apiClient
  //   setAuthToken(token);
  // }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      // if (!authToken) { // Handled by apiClient
      //   setTransactionsError('Authentication token not found. Please log in.');
      //   setIsLoadingTransactions(false);
      //   setTransactions([]);
      //   return;
      // }

      setIsLoadingTransactions(true);
      setTransactionsError(null);

      try {
        // const response = await axios.get<Transaction[]>('/api/credits/transactions?type=payment', { // Old call
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // });
        const response = await apiClient.get<Transaction[]>('/credits/transactions?type=payment'); // New call
        setTransactions(response.data);
      } catch (err: any) {
        console.error('Error fetching transactions:', err);
        const apiErr = err.response?.data as ApiError | undefined;
        setTransactionsError(apiErr?.error || err.message || 'An unexpected error occurred.');
        setTransactions([]);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    // if (authToken) { // apiClient handles token, so we can call directly
    fetchTransactions();
    // } else {
    //   // No token, don't attempt to fetch
    //   setIsLoadingTransactions(false);
    //   setTransactions([]);
    //   // setTransactionsError('Please log in to view transactions.'); // Optional message
    // }
  }, []); // Removed authToken dependency

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  if (isLoadingTransactions) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2" />
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (transactionsError) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-red-600">Error loading transactions: {transactionsError}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Credit Purchases</h2>
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No credit transactions found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`$${transaction.amount_dollars}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                        `}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="py-3 flex items-center justify-between border-t border-gray-200 mt-4">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {/* Current page number - can expand this to show more page numbers */}
                    <span aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700">
                      {currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionTable; 