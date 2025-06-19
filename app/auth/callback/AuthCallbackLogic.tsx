'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>('Processing authentication...');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store token in localStorage with the consistent name 'auth_token'
      localStorage.setItem('auth_token', token); 
      
      // Get the return URL, if any
      const returnUrl = localStorage.getItem('auth_return_url') || '/';
      
      // Clear the return URL from localStorage
      localStorage.removeItem('auth_return_url');
      
      // Redirect to the return URL or home
      setMessage('Authentication successful! Redirecting...');
      setTimeout(() => {
        router.push(returnUrl);
      }, 1500);
    } else {
      setMessage('Authentication failed. No token received.');
      // Redirect back to login after a delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router, searchParams]);

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
      <p>{message}</p>
      <div className="mt-4">
        <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
} 