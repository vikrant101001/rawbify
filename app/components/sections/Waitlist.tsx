'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { joinWaitlist } from '../../services/api'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, Users, Clock, Shield } from 'lucide-react'

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

  const features = [
    {
      icon: Users,
      text: "2,000+ data analysts already waiting",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      text: "Early access to Trial V1",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      text: "Exclusive updates & insights",
      color: "text-green-600"
    }
  ]

  return (
    <section className="py-20 px-2 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="absolute inset-0 wave-pattern opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Mail className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-10">
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Send className="w-10 h-10 text-purple-500" />
        </motion.div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 60 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">Join the </span>
            <span className="gradient-text">Waitlist</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience the future of data cleaning. Get early access and exclusive updates.
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto font-medium bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
            <span className="text-blue-600 font-bold">Trial V1</span> is here as of now (20th July 2025). Join the waitlist to get access to the trial directly through your emails.
          </p>

          <motion.div 
            ref={formRef}
            initial={{ opacity: 0, y: 40 }}
            animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!submitted ? (
              <div className="modern-card p-8 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 text-lg font-medium transition-all duration-300"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-gradient text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4"
                  >
                    <p className="text-red-700 font-medium flex items-center space-x-2">
                      <span>⚠️</span>
                      <span>{error}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="modern-card p-8 max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  🎉 You're on the list!
                </h3>
                <p className="text-green-700 text-lg leading-relaxed">
                  We'll notify you as soon as Rawbify is ready. Thanks for your interest!
                </p>
                
                <div className="mt-6 p-4 bg-white/50 rounded-xl">
                  <p className="text-green-600 font-medium">
                    Keep an eye on your inbox for exclusive updates and early access!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="modern-card p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <p className="text-gray-700 font-medium">
                    {feature.text}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={formVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                Join 2,000+ data analysts already on the waitlist
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 