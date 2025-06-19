'use client'

import React, { useState, useEffect, useRef } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        hamburgerRef.current && 
        !hamburgerRef.current.contains(event.target as Node) &&
        isMobileSidebarOpen
      ) {
        setIsMobileSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="md:ml-64">
        <header className="fixed left-0 right-0 z-30  backdrop-blur-sm shadow-sm md:hidden p-3 border-b border-gray-200 top-[64px]">
  <button 
    ref={hamburgerRef}
    onClick={() => setIsMobileSidebarOpen(true)}
    className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
    aria-label="Open sidebar"
  >
    <Menu size={24} />
  </button>
</header>

          <div 
            ref={sidebarRef}
            className={`fixed left-0  md:w-64 bg-white transform transition-transform duration-300 ease-in-out z-40 top-[56px] h-[calc(100vh-56px)] ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
          </div>

          {isMobileSidebarOpen && (
            <div 
              className="fixed inset-x-0 bg-black/30 z-30 md:hidden top-[56px] h-[calc(100vh-56px)]"
              onClick={() => setIsMobileSidebarOpen(false)}
            ></div>
          )}

          <main className="pt-[56px] md:pt-0 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
} 