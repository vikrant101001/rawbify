'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, CheckCircle, Brain, Loader, FileText, Sparkles, Star, TrendingUp, Code, Play, FileCheck } from 'lucide-react'

interface DataDownloadProps {
  isActive: boolean
  processing: boolean
  processed: boolean
  processingSummary?: string[]
  onDownload: () => void
}

export default function DataDownload({ 
  isActive, 
  processing, 
  processed, 
  processingSummary, 
  onDownload 
}: DataDownloadProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const processingSteps = [
    {
      icon: Brain,
      title: "AI analyzing your data structure...",
      description: "Understanding your data format and content",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Code,
      title: "Writing pandas transformation code...",
      description: "Generating custom Python code for your requirements", 
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Play,
      title: "Executing data cleaning pipeline...",
      description: "Running transformations and applying your instructions",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: FileCheck,
      title: "Generating final output file...",
      description: "Preparing your clean data for download",
      color: "from-green-500 to-blue-600"
    }
  ]

  // Cycle through processing steps when processing is active
  useEffect(() => {
    if (processing) {
      setCurrentStep(0)
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % processingSteps.length)
      }, 2500) // Change step every 2.5 seconds

      return () => clearInterval(interval)
    }
  }, [processing, processingSteps.length])

  const defaultSummary = [
    "Cleaned 8 customer records",
    "Standardized email formats",
    "Added revenue data",
    "Ready for Power BI import"
  ]

  const summary = processingSummary || defaultSummary

  return (
    <motion.div 
      className={`${!isActive ? 'opacity-50' : ''}`}
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
            processed 
              ? 'bg-green-500 text-white' 
              : isActive 
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white' 
                : 'bg-gray-300 text-gray-500'
          }`}
          whileHover={{ scale: 1.1 }}
          animate={processing ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: processing ? Infinity : 0 }}
        >
          {processed ? (
            <CheckCircle className="w-6 h-6" />
          ) : processing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-6 h-6" />
            </motion.div>
          ) : (
            <Download className="w-6 h-6" />
          )}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Download Your Processed Data
          </h3>
          <p className="text-gray-600">
            {processing ? 'AI is transforming your data...' : processed ? 'Your data is ready!' : 'Complete previous steps to process your data'}
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isActive && processing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="modern-card p-12 bg-gradient-to-r from-blue-50 to-purple-50">
                {/* AI Processing Animation */}
                <div className="relative mb-8">
                  <motion.div
                    className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Brain className="w-16 h-16 text-white z-10" />
                    
                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        animate={{
                          x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                          y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  {/* Orbiting elements */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="relative w-48 h-48">
                      {[Sparkles, FileText, TrendingUp].map((Icon, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            left: `${50 + 45 * Math.cos(i * 120 * Math.PI / 180)}%`,
                            top: `${50 + 45 * Math.sin(i * 120 * Math.PI / 180)}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <Icon className="w-4 h-4 text-blue-600" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">
                      AI is processing your data...
                    </h4>
                    <p className="text-lg text-gray-600 mb-8">
                      This may take a few moments while we apply your instructions
                    </p>
                    
                    {/* Current Processing Step */}
                    <div className="max-w-lg mx-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ duration: 0.6 }}
                          className="modern-card p-6 bg-white/80 backdrop-blur-sm"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <motion.div
                              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${processingSteps[currentStep].color}`}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {React.createElement(processingSteps[currentStep].icon, {
                                className: "w-6 h-6 text-white"
                              })}
                            </motion.div>
                            <div className="flex-1">
                              <h5 className="text-lg font-bold text-gray-800">
                                {processingSteps[currentStep].title}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {processingSteps[currentStep].description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <motion.div
                              className={`h-2 rounded-full bg-gradient-to-r ${processingSteps[currentStep].color}`}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Step {currentStep + 1} of {processingSteps.length}</span>
                            <span>{Math.round(((currentStep + 1) / processingSteps.length) * 100)}% Complete</span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Step indicators */}
                      <div className="flex justify-center space-x-2 mt-6">
                        {processingSteps.map((_, index) => (
                          <motion.div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentStep 
                                ? 'bg-blue-500 scale-125' 
                                : index < currentStep 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-300'
                            }`}
                            animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
              </div>
            </motion.div>
          ) : isActive && processed ? (
            <motion.div
              key="processed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Success Header */}
              <motion.div
                className="modern-card p-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    🎉 Data processed successfully!
                  </h4>
                  <p className="text-green-700 text-lg">
                    Your data has been transformed and is ready for analysis
                  </p>
                </motion.div>
              </motion.div>

              {/* Processing Summary */}
              <motion.div
                className="modern-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h5 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Processing Summary
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summary.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Download Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <motion.button 
                  onClick={onDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xl font-bold rounded-2xl hover:shadow-xl transition-all duration-300 space-x-3"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Processed File</span>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ⬇️
                  </motion.div>
                </motion.button>
                
                <motion.p
                  className="text-sm text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Your file will be downloaded as CSV format, ready for import into Power BI or Tableau
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="modern-card p-12 bg-gray-50">
                <div className="text-gray-400 mb-4">
                  <FileText className="mx-auto h-16 w-16" />
                </div>
                <p className="text-xl text-gray-500">
                  Complete previous steps to process your data
                </p>
                <p className="text-gray-400 mt-2">
                  Upload your file and add a prompt to get started
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 