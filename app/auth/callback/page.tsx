import { Suspense } from 'react';
import AuthCallbackLogic from './AuthCallbackLogic';

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Suspense fallback={
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p>Loading callback...</p>
          <div className="mt-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      }>
        <AuthCallbackLogic />
      </Suspense>
    </div>
  );
} 