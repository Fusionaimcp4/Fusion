import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'
import { Inter } from "next/font/google"
import { UserProvider } from './contexts/UserContext'
import ChatwootWidget from './components/ChatwootWidget'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Fusion AI',
  description: 'AI innovation studio',
  verification: {
    google: 'zKA7mAZgZzIIosUZHND3Ze8AS_k0KrTE0tnbJf0AD0s',
  },
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
      {
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <div className="flex flex-col h-screen">
            <Navigation />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </UserProvider>
        
        {/* Conditional Chatwoot Widget - only shows on public pages */}
        <ChatwootWidget />
      </body>
    </html>
  )
}

export default RootLayout 