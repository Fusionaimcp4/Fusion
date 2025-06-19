"use client";

import React from 'react';
import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the admin panel. Please use the navigation on the left to manage different aspects of the application.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/users" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Manage Users</h2>
          <p className="text-sm text-gray-500">View, edit roles, and adjust credits for users.</p>
        </Link>
        <Link href="/admin/models" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Manage Models</h2>
          <p className="text-sm text-gray-500">View and edit pricing for LLM models.</p>
        </Link>
        <Link href="/admin/logs" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">View Admin Logs</h2>
          <p className="text-sm text-gray-500">Browse and filter administrator actions.</p>
        </Link>
        <Link href="/admin/settings" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Platform Settings</h2>
          <p className="text-sm text-gray-500">Configure global application settings (placeholder).</p>
        </Link>
        {/* Add more quick link cards as needed */}
      </div>
    </div>
  );
} 