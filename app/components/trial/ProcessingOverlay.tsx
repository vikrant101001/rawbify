'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Database, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  Bot
} from 'lucide-react'

interface ProcessingOverlayProps {
  isVisible: boolean
  onComplete: () => void
  prompt: string
  enabled?: boolean
}

const ProcessingOverlay = ({ 
  isVisible, 
  onComplete, 
  prompt, 
  enabled = true 
}: ProcessingOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const processingSteps = [
    { 
      icon: Brain, 
      title: "Analyzing Data", 
      description: "Understanding your dataset structure and patterns",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      icon: Zap, 
      title: "Processing Request", 
      description: `"${prompt.slice(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      icon: Database, 
      title: "Transforming Data", 
      description: "Applying your requested changes and optimizations",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      icon: Sparkles, 
      title: "Finalizing Output", 
      description: "Preparing your processed data for download",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ]

  useEffect(() => {
    if (!isVisible || !enabled) {
      setCurrentStep(0)
      setIsComplete(false)
      setProgress(0)
      return
    }

    const stepDuration = 1200 // Each step takes 1.2 seconds
    const progressInterval = 50 // Update progress every 50ms

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (processingSteps.length * (stepDuration / progressInterval))
        return Math.min(prev + increment, 100)
      })
    }, progressInterval)

    // Step progression
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, stepDuration)

    // Complete after all steps
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      clearInterval(progressTimer)
      clearInterval(stepTimer)
    }, stepDuration * processingSteps.length)

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
      clearTimeout(completeTimer)
    }
  }, [isVisible, enabled, processingSteps.length])

  if (!enabled || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />
          
          {!isComplete ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <Bot className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Processing Your Data
                </h2>
                <p className="text-gray-600">
                  Please wait while we transform your dataset
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Processing Steps */}
              <div className="space-y-4">
                {processingSteps.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isActive || isCompleted ? 1 : 0.5,
                        x: 0 
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                        isActive ? step.bgColor : isCompleted ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-600' : isActive ? step.color.replace('text-', 'bg-') : 'bg-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <StepIcon className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-white'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isActive ? step.color : isCompleted ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          isActive ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6"
                        >
                          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full" />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </>
          ) : (
            /* Completion State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                🎉 Your Output is Ready!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mb-8"
              >
                Your data has been successfully processed and is ready for download
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto transition-all shadow-lg"
              >
                <span>Click to View Results</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProcessingOverlay 