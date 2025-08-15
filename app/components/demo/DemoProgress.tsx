'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

interface DemoProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export default function DemoProgress({ 
  currentStep, 
  totalSteps, 
  className = '' 
}: DemoProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Progress Bar */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Progress:</span>
        <div className="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          
          return (
            <motion.div
              key={index}
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    damping: 15, 
                    stiffness: 300 
                  }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  animate={isCurrent ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(147, 51, 234, 0.4)",
                      "0 0 0 6px rgba(147, 51, 234, 0.1)",
                      "0 0 0 0 rgba(147, 51, 234, 0)"
                    ]
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: isCurrent ? Infinity : 0 
                  }}
                  className="rounded-full"
                >
                  <Circle 
                    className={`w-6 h-6 ${
                      isCurrent 
                        ? 'text-purple-500 fill-purple-100' 
                        : 'text-gray-300'
                    }`} 
                  />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Step Counter */}
      <div className="text-sm font-medium text-gray-600">
        <span className="text-purple-600">{currentStep + 1}</span>
        <span className="text-gray-400"> / </span>
        <span>{totalSteps}</span>
      </div>
    </div>
  )
}
