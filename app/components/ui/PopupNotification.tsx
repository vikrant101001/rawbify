'use client'

import { useState, useEffect } from 'react'

export default function PopupNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    // Show popup after a short delay
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Start slide-out animation after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsAnimatingOut(true)
      // Remove from DOM after animation completes
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 5500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleClose = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 500)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 ${isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in'}`}>
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm border-l-4 border-blue-400">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold mb-1">Trial V1 Available!</h4>
            <p className="text-xs opacity-90">
              Trial V1 is here as of now (20th July 2025). Join the waitlist to get access to the trial directly through your emails.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 