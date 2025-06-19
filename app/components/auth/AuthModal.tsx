'use client'

import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'login' | 'signup'
  returnUrl?: string // Optional: Where to redirect after successful auth
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login',
  returnUrl
}) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView)

  // Reset view when modal is reopened
  useEffect(() => {
    if (isOpen) {
        setView(initialView);
    }
  }, [isOpen, initialView]);

  const handleSuccess = () => {
    onClose() // Close the modal on successful login/signup
    // Optionally trigger a page refresh or state update to reflect login status
    // For example, using router.refresh() or a global state manager
    window.location.reload(); // Simple refresh for now
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={view === 'login' ? 'Welcome Back!' : 'Create Account'}>
      {view === 'login' ? (
        <LoginForm 
          onSuccess={handleSuccess} 
          onSwitchToSignup={() => setView('signup')}
          returnUrl={returnUrl}
        />
      ) : (
        <SignupForm 
          onSuccess={handleSuccess} 
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </Modal>
  )
}

export default AuthModal 