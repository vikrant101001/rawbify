'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { validateUserId } from '../../services/api'
import { Shield, CheckCircle, AlertTriangle, ArrowRight, Key } from 'lucide-react'

interface UserValidationProps {
  onValidationSuccess: (userId: string) => void
  isActive: boolean
}

export default function UserValidation({ onValidationSuccess, isActive }: UserValidationProps) {
  const [userId, setUserId] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isValidated, setIsValidated] = useState(false)

  const handleValidation = async () => {
    if (!userId.trim()) {
      setValidationError('Please enter your User ID')
      return
    }

    setIsValidating(true)
    setValidationError('')

    try {
      const result = await validateUserId(userId)

      if (result.success && result.allowed) {
        setIsValidated(true)
        onValidationSuccess(userId)
      } else {
        setValidationError(result.error || 'Invalid User ID. Please check your email for the correct ID.')
      }
    } catch (error) {
      setValidationError('Validation failed. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidation()
    }
  }

  return (
    <motion.div 
      className={`mb-12 ${!isActive ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex items-center mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-6 shadow-lg ${
            isValidated 
              ? 'bg-green-500 text-white' 
              : isActive 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gray-300 text-gray-500'
          }`}
          whileHover={{ scale: 1.1 }}
          animate={isActive && !isValidated ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: isActive && !isValidated ? Infinity : 0 }}
        >
          {isValidated ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Shield className="w-6 h-6" />
          )}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Validate Your Access
          </h3>
          <p className="text-gray-600">
            Enter your unique User ID to begin the trial
          </p>
        </div>
      </motion.div>
      
      <div className="max-w-lg mx-auto">
        {!isValidated ? (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="modern-card p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-blue-600" />
                    User ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your User ID from email"
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 text-lg font-medium transition-all duration-300"
                      disabled={!isActive || isValidating}
                    />
                    <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Check your email for the User ID we sent you
                  </p>
                </div>
                
                <motion.button
                  onClick={handleValidation}
                  disabled={!isActive || isValidating || !userId.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-gradient text-white px-6 py-4 rounded-xl font-semibold text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  {isValidating ? (
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Validating...</span>
                    </motion.div>
                  ) : (
                    <>
                      <span>Validate Access</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
            
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="modern-card p-6 bg-red-50 border-2 border-red-200"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 font-semibold mb-2">Access Denied</p>
                    <p className="text-red-700 mb-4">
                      {validationError}
                    </p>
                    <motion.a 
                      href="#waitlist" 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-300"
                      onClick={() => {
                        const waitlistSection = document.getElementById('waitlist')
                        if (waitlistSection) {
                          waitlistSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      Join Waitlist
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="modern-card p-4 bg-blue-50 border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-blue-700 font-medium text-center">
                <span className="text-blue-600">💡 Test User IDs:</span> user_admin
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center modern-card p-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-2xl font-bold text-green-800 mb-3">
                🎉 Access Granted!
              </h4>
              <p className="text-green-700 text-lg mb-4">
                Welcome to Rawbify Trial V1
              </p>
              <div className="bg-white/70 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700">
                  User ID: <span className="text-green-600 font-bold">{userId}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
} 