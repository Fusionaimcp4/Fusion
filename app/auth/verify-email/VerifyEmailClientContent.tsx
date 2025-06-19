'use client'

import React, { useEffect, useState, Suspense } from 'react'; // Added Suspense here for good measure, though primarily needed in the parent
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// This component contains the actual logic that uses useSearchParams
export default function VerifyEmailClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // useRouter can also trigger this error if used outside Suspense during prerender
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'idle'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      setStatus('verifying');
      setMessage('Verifying your email, please wait...');
      
      const verifyToken = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/verify-email-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          
          const data = await response.json();

          if (response.ok && data.success) {
            setStatus('success');
            setMessage(data.message || 'Email successfully verified! You can now log in.');
          } else {
            setStatus('error');
            // Use the error code from backend if available for more specific messages
            if (data.code === 'ALREADY_VERIFIED') {
                setMessage(data.error || 'This email is already verified.');
            } else if (data.code === 'EXPIRED_TOKEN') {
                setMessage(data.error || 'This verification link has expired. Please request a new one.');
            } else if (data.code === 'INVALID_TOKEN') {
                setMessage(data.error || 'This verification link is invalid.');
            } else {
                setMessage(data.error || 'Invalid or expired verification link. Please try again or request a new one.');
            }
          }
        } catch (error) {
          setStatus('error');
          setMessage('An unexpected error occurred during verification. Please try again later.');
          console.error('Email verification error:', error);
        }
      };

      verifyToken();
    } else {
      setStatus('error');
      setMessage('No verification token found. Please use the link provided in your email. If you need a new link, please try signing up again or use the resend option if available at login.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [token]); // Removed router from deps as it's stable unless you have specific reasons for it

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
            Email Verification
          </h2>
        </div>
        
        {status === 'verifying' && (
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-orange-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-3 text-center text-sm text-neutral-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <svg className="h-12 w-12 text-green-500 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="mt-3 text-center text-md font-medium text-green-700">{message}</p>
            <div className="mt-6">
              <Link href="/" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-3 md:text-lg md:px-10 transition-colors">
                Go to Homepage to Login
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
           <div className="text-center">
            <svg className="h-12 w-12 text-red-500 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="mt-3 text-center text-md font-medium text-red-700">{message}</p>
            <div className="mt-6 space-y-3">
              <Link href="/" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-3 md:text-lg md:px-10 transition-colors">
                Go to Homepage
              </Link>
            </div>
          </div>
        )}
         {status === 'idle' && !token && (
             <div className="text-center">
                <p className="mt-3 text-center text-md font-medium text-neutral-600">{message}</p>
                 <div className="mt-6">
                    <Link href="/" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-3 md:text-lg md:px-10 transition-colors">
                        Go to Homepage
                    </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
} 