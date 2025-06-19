import React, { Suspense } from 'react';
import VerifyEmailClientContent from './VerifyEmailClientContent'; // Import the new client component

// This main page component can remain a Server Component or be a Client Component if needed for other reasons,
// but the part using client-side hooks is now deferred.
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailClientContent />
    </Suspense>
  );
}

// A simple loading fallback component
const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-lg text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          Email Verification
        </h2>
        <svg className="animate-spin h-8 w-8 text-orange-600 mx-auto mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3 text-center text-sm text-neutral-600">Loading verification status...</p>
      </div>
    </div>
  );
}; 