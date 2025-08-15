'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react'

interface DemoTooltipProps {
  isVisible: boolean
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  onClose: () => void
  showArrow?: boolean
  className?: string
}

export default function DemoTooltip({
  isVisible,
  title,
  content,
  position = 'center',
  onClose,
  showArrow = true,
  className = ''
}: DemoTooltipProps) {
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      case 'left':
        return 'left-4 top-1/2 transform -translate-y-1/2'
      case 'right':
        return 'right-4 top-1/2 transform -translate-y-1/2'
      case 'center':
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }
  }

  const getArrowIcon = () => {
    switch (position) {
      case 'top':
        return <ArrowUp className="w-5 h-5" />
      case 'bottom':
        return <ArrowDown className="w-5 h-5" />
      case 'left':
        return <ArrowLeft className="w-5 h-5" />
      case 'right':
        return <ArrowRight className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 400 
            }}
            className={`fixed ${getPositionStyles()} z-50 ${className}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md mx-4 relative">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-gray-600" />
              </motion.button>

              {/* Header with Icon */}
              <div className="flex items-start space-x-3 mb-4">
                <motion.div
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {showArrow ? getArrowIcon() : <Info className="w-5 h-5" />}
                  <span className="text-white">{showArrow ? getArrowIcon() : <Info className="w-5 h-5" />}</span>
                </motion.div>
                
                <div className="flex-1 pr-8">
                  <motion.h3
                    className="text-lg font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h3>
                </div>
              </div>

              {/* Content */}
              <motion.p
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {content}
              </motion.p>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-purple-300 opacity-30"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Pulse Effect */}
              <motion.div
                className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl"
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
