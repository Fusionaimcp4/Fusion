'use client'

import React, { useState } from 'react'
import Link from 'next/link' // Keep Link for internal modal switching
import Image from 'next/image'
import { useRouter } from 'next/navigation' // Keep for redirect on success

// TODO: Consider moving OAuth logic/buttons to a shared component if needed
interface OAuthProviderButtonProps {
  providerName: string;
  logoSrc: string;
  onClick: () => void;
}

const OAuthProviderButton: React.FC<OAuthProviderButtonProps> = ({ providerName, logoSrc, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Login with ${providerName}`}
    className="w-10 h-10 inline-flex items-center justify-center border border-neutral-300 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors"
  >
    <Image src={logoSrc} alt={providerName} width={24} height={24} className="w-5 h-5" />
  </button>
)

interface LoginFormProps {
  onSuccess: () => void // Callback after successful login
  onSwitchToSignup: () => void // Callback to switch modal view to signup
  returnUrl?: string // Optional return URL after login
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToSignup, returnUrl = '/' }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState(''); // For general info/success messages
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailLogin, setIsEmailLogin] = useState(false) // State to toggle email form visibility
  const [showResendVerification, setShowResendVerification] = useState(false);

  const handleOAuthLogin = (provider: string) => {
    // Store the return URL before redirecting
    localStorage.setItem('auth_return_url', returnUrl)
    // Redirect to backend OAuth route
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/${provider}`
    // The onSuccess callback will likely be handled by the page detecting the auth token after the redirect
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setInfoMessage('');
    setShowResendVerification(false);

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/email/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      
      if (!response.ok) {
        if (data.error === 'ACCOUNT_NOT_VERIFIED') {
          setError(data.message || 'Please verify your email to activate your account.');
          setShowResendVerification(true);
        } else {
          setError(data.error || 'Login failed. Please check your credentials.')
        }
        return; // Stop execution if login failed
      }
      localStorage.setItem('auth_token', data.token)
      onSuccess() // Call the success callback (likely closes modal)
      // No need to router.push here, the calling component/page can handle refresh/redirect if needed after modal closes
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address above to resend verification.');
      return;
    }
    setError('');
    setInfoMessage('');
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email.');
      }
      setInfoMessage(data.message || 'Verification email resent. Please check your inbox.');
      setShowResendVerification(false); // Optionally hide button after successful resend
    } catch (err: any) {
      setError(err.message || 'Something went wrong while resending the email.');
    } finally {
      setIsLoading(false);
    }
  };

  // Define providers here as they were in the original page
  const oauthProviders = [
    { name: 'Google', logoSrc: '/google-logo.aacb4c7fe7b2200fd0f19101d3e5b6b1.svg', onClick: () => handleOAuthLogin('google') },
    { name: 'Microsoft', logoSrc: '/microsoft-logo.232bed9486815048a01cb94c9e7cd25e.svg', onClick: () => {} },
    { name: 'GitHub', logoSrc: '/github-logo.svg', onClick: () => handleOAuthLogin('github') },
    { name: 'Apple', logoSrc: '/apple-logo.361cc8941957f07da1580885f7440af7.svg', onClick: () => {} },
    // Add other providers back if needed
  ]

  return (
    <div className="w-full space-y-6">
      
      {/* OAuth Buttons Section */}
      <div className="text-center">
        <p className="text-sm text-neutral-600 mb-4">Sign in with your preferred provider:</p>
        <div className="flex justify-center space-x-3">
          {oauthProviders.map((provider) => (
            <OAuthProviderButton
              key={provider.name}
              providerName={provider.name}
              logoSrc={provider.logoSrc}
              onClick={provider.onClick}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center">
        <div className="flex-grow border-t border-neutral-300"></div>
        <span className="px-3 text-xs text-neutral-500 bg-white">OR</span>
        <div className="flex-grow border-t border-neutral-300"></div>
      </div>

      {/* Email Form Section */}
      {!isEmailLogin ? (
        <button
          onClick={() => {
            setIsEmailLogin(true);
            setError('');
            setInfoMessage('');
            setShowResendVerification(false);
          }}
          className="w-full flex justify-center py-2.5 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          Continue with Email
        </button>
      ) : (
        <form className="space-y-4" onSubmit={handleEmailSubmit}>
          <div>
            <label htmlFor="login-email-address" className="sr-only">Email address</label>
            <input
              id="login-email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2.5 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-2.5 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-xs" role="alert">
              {error}
            </div>
          )}
          {infoMessage && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded relative text-xs" role="alert">
              {infoMessage}
            </div>
          )}

          {showResendVerification && (
            <div className="mt-2">
              <button
                type="button"
                onClick={handleResendVerification}
                className="w-full flex justify-center py-2 px-4 border border-orange-500 rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend verification email'}
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                ${isLoading ? 'bg-neutral-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-orange-600'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </div>
           <button 
              type="button"
              onClick={() => {
                setIsEmailLogin(false);
                setError('');
                setInfoMessage('');
                setShowResendVerification(false);
              }}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50"
              disabled={isLoading}
          >
              Back to login options
          </button>
        </form>
      )}

      {/* Switch to Signup Link */}
      <div className="text-xs text-center mt-4">
        <p className="font-light text-neutral-600">
          Don't have an account? {' '}
          <button onClick={() => {
            onSwitchToSignup();
            setError('');
            setInfoMessage('');
            setShowResendVerification(false);
          }} 
          className="font-medium text-orange-600 hover:text-orange-500 underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm 