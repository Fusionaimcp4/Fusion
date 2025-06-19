'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' // Control max width
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Close modal on backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && event.target === modalRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth]

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${maxWidthClass} flex flex-col max-h-[90vh] transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          {title ? (
            <h2 id="modal-title" className="text-lg font-semibold text-neutral-800">
              {title}
            </h2>
          ) : (
            <div /> // Placeholder to keep alignment
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Modal 