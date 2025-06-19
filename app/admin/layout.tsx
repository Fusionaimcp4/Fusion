"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { UserContext } from '@/app/contexts/UserContext'; // Old import
import { useUser } from '@/app/contexts/UserContext'; // Corrected import

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // const userContext = useContext(UserContext); // Old usage
  const { user, isLoadingUser } = useUser(); // Corrected usage
  const router = useRouter();

  useEffect(() => {
    if (isLoadingUser) {
      return; // Wait until user data is loaded
    }
    if (!user || user.role !== 'admin') {
      console.log('User is not admin or not logged in. Redirecting from AdminLayout.');
      router.push('/dashboard'); // Or your main app page if not /dashboard
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser || !user || user.role !== 'admin') {
    // Render nothing or a loading spinner while checking auth / redirecting
    // This prevents flashing the admin content to non-admins
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li><Link href="/admin" className="block py-2 px-3 hover:bg-gray-700 rounded">Dashboard</Link></li>
            <li><Link href="/admin/users" className="block py-2 px-3 hover:bg-gray-700 rounded">Users</Link></li>
            <li><Link href="/admin/models" className="block py-2 px-3 hover:bg-gray-700 rounded">Models</Link></li>
            <li><Link href="/admin/logs" className="block py-2 px-3 hover:bg-gray-700 rounded">Logs</Link></li>
            <li><Link href="/admin/settings" className="block py-2 px-3 hover:bg-gray-700 rounded">Settings</Link></li>
            {/* Add more admin links here */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
} 