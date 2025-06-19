'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated } from '../utils/auth'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that checks if the user is authenticated.
 * If not, it redirects to the login page.
 * This should be used to wrap any page components that require authentication.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    // Check if the user is authenticated
    const authenticated = isAuthenticated()
    setIsAuthed(authenticated)

    if (!authenticated) {
      // Redirect to login with a return URL
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
    } else {
      setIsLoading(false)
    }
  }, [router, pathname])

  // Show loading state while checking authentication
  if (isLoading && !isAuthed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="ml-2">Checking authentication...</p>
      </div>
    )
  }

  // Render children if authenticated
  return <>{children}</>
} 