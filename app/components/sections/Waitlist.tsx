'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { joinWaitlist } from '../../services/api'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>()
  const [formRef, formVisible] = useIntersectionObserver<HTMLDivElement>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const result = await joinWaitlist(email)
      
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.message || 'Failed to join waitlist')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <div 
          ref={titleRef}
          className={`fade-in-on-scroll ${titleVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join the Waitlist
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be among the first to experience the future of data cleaning. Get early access and exclusive updates.
          </p>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Trial V1 is here as of now(20th July 2025). Join the waitlist to get access to the trial directly through your emails.
          </p>

          <div 
            ref={formRef}
            className={`fade-in-on-scroll ${formVisible ? 'visible' : ''}`}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </div>
                
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-green-800 font-semibold mb-2">
                  🎉 You're on the list!
                </h3>
                <p className="text-green-700">
                  We'll notify you as soon as Rawbify is ready. Thanks for your interest!
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Join 2,000+ data analysts already on the waitlist</p>
          </div>
        </div>
      </div>
    </section>
  )
} 