'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react';

const navItems = [
  { name: 'Chat', path: '/chat' },
  { name: 'Activity', path: '/dashboard/activity' },
  { name: 'Settings', path: '/dashboard/settings' },
  { name: 'Credits', path: '/dashboard/credits' },
  { name: 'API Keys', path: '/dashboard/api-keys' },
  { name: 'Integrations', path: '/dashboard/provider-keys' },
  { name: 'Provisioning Keys', path: '/dashboard/provisioning' },
  //{ name: 'Integrations', path: '/dashboard/integrations' },
  //{ name: 'Privacy', path: '/dashboard/privacy' },
]

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:h-screen md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          <button 
            onClick={onClose} 
            className="md:hidden p-1 text-gray-600 hover:text-gray-900"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.path
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
} 