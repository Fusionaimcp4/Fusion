'use client'

import React from 'react'
import ChatLayout from '../components/chat/ChatLayout'
// import ProtectedRoute from '../components/ProtectedRoute' // No longer protecting the entire page load

// This page is now primarily responsible for wrapping the ChatLayout
// with any page-specific context or providers if needed in the future.
function ChatPage() {
  return (
    <ChatLayout />
  )
}

// The page is now directly ChatPage, not wrapped in ProtectedRoute at this level.
// Auth checks will happen inside ChatWindow for send actions.
export default ChatPage; 