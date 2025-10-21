"use client";

import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useUser, UserProfile } from '@/app/contexts/UserContext'; // Corrected import
import { Dialog, Transition } from '@headlessui/react'; // Using Headless UI for modal
import apiClient from '@/app/lib/apiClient'; // Import apiClient

interface AdminUser {
  id: number;
  email: string;
  display_name: string | null;
  role: string;
  created_at: string;
  last_login: string | null;
  balance_cents: number | null;
}

// Define the expected response structure for the credit adjustment endpoint
interface AdjustCreditsResponse {
  new_balance_cents: number;
  // Potentially other fields like user_id, message, etc.
}

const VALID_ROLES = ['admin', 'pro', 'user', 'sub_user', 'tester'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pageLoading, setPageLoading] = useState(true); // Renamed from 'loading' to avoid conflict with context's loading
  const [error, setError] = useState<string | null>(null);
  const { user: adminUserProfile, isLoadingUser, fetchUserProfile } = useUser(); // Corrected usage
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUserForRole, setSelectedUserForRole] = useState<AdminUser | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [roleChangeSummary, setRoleChangeSummary] = useState<string>('');
  const [roleModalError, setRoleModalError] = useState<string | null>(null);
  const [roleModalLoading, setRoleModalLoading] = useState(false);

  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [selectedUserForCredit, setSelectedUserForCredit] = useState<AdminUser | null>(null);
  const [creditAmountCents, setCreditAmountCents] = useState<string>('');
  const [creditReason, setCreditReason] = useState<string>('');
  const [creditModalError, setCreditModalError] = useState<string | null>(null);
  const [creditModalLoading, setCreditModalLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setPageLoading(true);
        setError(null);
        const response = await apiClient.get<AdminUser[]>('/admin/users');
        const data = response.data;
        setUsers(data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch users');
      } finally {
        setPageLoading(false);
      }
    };

    if (isLoadingUser) {
      return;
    }

    if (adminUserProfile && adminUserProfile.role === 'admin') {
      setError(null);
      fetchUsers();
    } else {
      setPageLoading(false);
      setError("Access Denied. You must be an admin to view this page or your session may have expired.");
    }
  }, [adminUserProfile, isLoadingUser]);

  const openChangeRoleModal = (user: AdminUser) => {
    setSelectedUserForRole(user);
    setNewRole(user.role);
    setRoleChangeSummary('');
    setRoleModalError(null);
    setIsRoleModalOpen(true);
  };

  const handleRoleChangeSubmit = async () => {
    if (!selectedUserForRole || !newRole) {
      setRoleModalError('Selected user or new role is missing.');
      return;
    }
    if (newRole === selectedUserForRole.role) {
      setRoleModalError('New role is the same as the current role.');
      return;
    }
    setRoleModalLoading(true);
    setRoleModalError(null);
    try {
      const response = await apiClient.put(`/admin/users/${selectedUserForRole.id}/role`, {
        role: newRole, summary: roleChangeSummary
      });
      setUsers(users.map(u => u.id === selectedUserForRole.id ? { ...u, role: newRole } : u));
      setIsRoleModalOpen(false);
      setSelectedUserForRole(null);
    } catch (err: any) {
      setRoleModalError(err.response?.data?.error || err.message || 'Failed to update role');
    } finally {
      setRoleModalLoading(false);
    }
  };

  const openAdjustCreditsModal = (user: AdminUser) => {
    setSelectedUserForCredit(user);
    setCreditAmountCents('');
    setCreditReason('');
    setCreditModalError(null);
    setIsCreditModalOpen(true);
  };

  const handleCreditAdjustmentSubmit = async () => {
    if (!selectedUserForCredit) {
      setCreditModalError('Selected user is missing.');
      return;
    }
    const amount = parseInt(creditAmountCents, 10);
    if (isNaN(amount) || amount === 0) {
      setCreditModalError('Invalid amount. Must be a non-zero integer (in cents).');
      return;
    }
    if (creditReason.trim() === '') {
      setCreditModalError('Reason is required.');
      return;
    }

    if (!confirm(`Are you sure you want to adjust credits by ${amount} cents for ${selectedUserForCredit.email}? Reason: ${creditReason}`)) {
      return;
    }

    setCreditModalLoading(true);
    setCreditModalError(null);

    try {
      const response = await apiClient.post<AdjustCreditsResponse>(
        `/admin/users/${selectedUserForCredit.id}/adjust-credits`,
        { amount_cents: amount, reason: creditReason }
      );
      const responseData: AdjustCreditsResponse = response.data;
      setUsers(users.map(u => u.id === selectedUserForCredit.id ? { ...u, balance_cents: responseData.new_balance_cents } : u));
      setIsCreditModalOpen(false);
      setSelectedUserForCredit(null);
    } catch (err: any) {
      setCreditModalError(err.response?.data?.error || err.message || 'Failed to adjust credits');
    } finally {
      setCreditModalLoading(false);
    }
  };

  if (isLoadingUser || pageLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!adminUserProfile || adminUserProfile.role !== 'admin') {
    return <div className="text-red-500 p-4">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits (cents)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.display_name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'pro' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {user.role}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.balance_cents === null ? 'N/A' : user.balance_cents}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                      onClick={() => openChangeRoleModal(user)}
                      className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                      disabled={adminUserProfile?.id === user.id && user.role ==='admin'}
                    >
                      Edit Role
                    </button>
                    <button 
                      onClick={() => openAdjustCreditsModal(user)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Adjust Credits
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && !pageLoading && <p className="text-center text-gray-500 mt-4">No users found.</p>}
      </div>

      <Transition appear show={isRoleModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsRoleModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Change Role for {selectedUserForRole?.email}
                  </Dialog.Title>
                  <div className="mt-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">New Role</label>
                    <select
                      id="role"
                      name="role"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {VALID_ROLES.map(role => (
                        <option key={role} value={role} disabled={selectedUserForRole?.id === adminUserProfile?.id && role !== 'admin' && selectedUserForRole?.role ==='admin'}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="roleChangeSummary" className="block text-sm font-medium text-gray-700">
                      Reason/Summary (Optional)
                    </label>
                    <textarea
                      id="roleChangeSummary"
                      name="roleChangeSummary"
                      rows={3}
                      value={roleChangeSummary}
                      onChange={(e) => setRoleChangeSummary(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., User requested upgrade to Pro tier"
                    />
                  </div>

                  {roleModalError && <p className="mt-2 text-sm text-red-600">{roleModalError}</p>}

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsRoleModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onClick={handleRoleChangeSubmit}
                      disabled={roleModalLoading || newRole === selectedUserForRole?.role}
                    >
                      {roleModalLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isCreditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsCreditModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Adjust Credits for {selectedUserForCredit?.email}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Current Balance: {selectedUserForCredit?.balance_cents === null ? 'N/A' : selectedUserForCredit?.balance_cents} cents.
                      Enter amount in cents. Positive to add, negative to deduct.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-700">Amount (cents)</label>
                      <input
                        type="number"
                        name="creditAmount"
                        id="creditAmount"
                        value={creditAmountCents}
                        onChange={(e) => setCreditAmountCents(e.target.value)}
                        placeholder="e.g., 500 or -250"
                        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="creditReason" className="block text-sm font-medium text-gray-700">Reason (Required)</label>
                      <textarea
                        name="creditReason"
                        id="creditReason"
                        rows={3}
                        value={creditReason}
                        onChange={(e) => setCreditReason(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Refund for service outage, Bonus credits"
                      />
                    </div>
                  </div>

                  {creditModalError && <p className="mt-3 text-sm text-red-600">{creditModalError}</p>}

                  <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" className="btn-secondary" onClick={() => setIsCreditModalOpen(false)}>Cancel</button>
                    <button 
                        type="button" 
                        className="btn-primary disabled:opacity-50"
                        onClick={handleCreditAdjustmentSubmit}
                        disabled={creditModalLoading || creditAmountCents === '' || parseInt(creditAmountCents,10) === 0 || creditReason.trim() === ''}
                    >
                      {creditModalLoading ? 'Adjusting...' : 'Confirm Adjustment'}
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