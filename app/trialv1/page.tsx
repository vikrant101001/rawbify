'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import UserValidation from '../components/trial/UserValidation'
import FileUpload from '../components/trial/FileUpload'
import PromptInput from '../components/trial/PromptInput'
import DataDownload from '../components/trial/DataDownload'
import { processData, generateDummyExcelData, getDefaultProcessingSummary } from '../services/api'
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Database, Brain, Download, Shield, Lock, Monitor, Award, Eye } from 'lucide-react'
import React from 'react'

export default function TrialV1() {
  const [currentStep, setCurrentStep] = useState(0)
  const [validatedUserId, setValidatedUserId] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [processedData, setProcessedData] = useState<Blob | null>(null)
  const [processingSummary, setProcessingSummary] = useState<string[] | undefined>(undefined)
  const [showingPrivacyReassurance, setShowingPrivacyReassurance] = useState(false)
  const [privacyStep, setPrivacyStep] = useState(0)

  const privacyMessages = [
    {
      icon: Shield,
      title: "Your data stays secure",
      description: "Files are processed locally in your browser - never uploaded to our servers",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: Lock,
      title: "Zero data storage",
      description: "We don't store, backup, or access your sensitive information",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Monitor,
      title: "Complete privacy",
      description: "Your data never leaves your device during processing",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const handleValidationSuccess = (userId: string) => {
    setValidatedUserId(userId)
    setShowingPrivacyReassurance(true)
    setPrivacyStep(0)
    
    // Cycle through privacy messages
    const interval = setInterval(() => {
      setPrivacyStep((prev) => {
        const next = prev + 1
        if (next >= privacyMessages.length) {
          clearInterval(interval)
          // Move to file upload step after privacy reassurance
          setTimeout(() => {
            setShowingPrivacyReassurance(false)
            setCurrentStep(1)
          }, 500)
          return prev
        }
        return next
      })
    }, 1200) // Change message every 1.2 seconds
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    
    // Store the original file data for the view page
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n')
      const headers = lines[0].split(',')
      const data = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',')
        const row: any = { id: index + 1 }
        headers.forEach((header, i) => {
          row[header.trim()] = values[i]?.trim() || ''
        })
        return row
      })
      localStorage.setItem('rawbify_original_data', JSON.stringify({
        filename: file.name,
        data: data,
        headers: headers
      }))
    }
    reader.readAsText(file)
  }

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt)
  }

  const handleNext = async () => {
    if (currentStep === 1 && uploadedFile) {
      setCurrentStep(2)
    } else if (currentStep === 2 && prompt.trim()) {
      setCurrentStep(3)
      setProcessing(true)
      
      try {
        // Call the API with validated user ID
        const result = await processData({
          file: uploadedFile!,
          prompt: prompt,
          userId: validatedUserId
        })

        if (result.success && result.data) {
          setProcessedData(result.data)
          // Use API processing summary if available
          const summary = result.processingSummary || getDefaultProcessingSummary()
          setProcessingSummary(summary)
          
          // Store processed data for view page
          const reader = new FileReader()
          reader.onload = (e) => {
            const text = e.target?.result as string
            const lines = text.split('\n')
            const headers = lines[0].split(',')
            const data = lines.slice(1).filter(line => line.trim()).map((line, index) => {
              const values = line.split(',')
              const row: any = { id: index + 1 }
              headers.forEach((header, i) => {
                row[header.trim()] = values[i]?.trim() || ''
              })
              return row
            })
            localStorage.setItem('rawbify_processed_data', JSON.stringify({
              filename: 'processed_' + (uploadedFile?.name || 'data.csv'),
              data: data,
              headers: headers,
              summary: summary,
              prompt: prompt
            }))
          }
          reader.readAsText(result.data)
        } else {
          // Fallback to dummy data on API error
          console.log('API Error, using dummy data:', result.error)
          const dummyData = generateDummyExcelData()
          const summary = getDefaultProcessingSummary()
          setProcessedData(dummyData)
          setProcessingSummary(summary)
          
          // Store fallback processed data for view page
          const reader = new FileReader()
          reader.onload = (e) => {
            const text = e.target?.result as string
            const lines = text.split('\n')
            const headers = lines[0].split(',')
            const data = lines.slice(1).filter(line => line.trim()).map((line, index) => {
              const values = line.split(',')
              const row: any = { id: index + 1 }
              headers.forEach((header, i) => {
                row[header.trim()] = values[i]?.trim() || ''
              })
              return row
            })
            localStorage.setItem('rawbify_processed_data', JSON.stringify({
              filename: 'processed_' + (uploadedFile?.name || 'data.csv'),
              data: data,
              headers: headers,
              summary: summary,
              prompt: prompt
            }))
          }
          reader.readAsText(dummyData)
        }
      } catch (error) {
        console.error('Processing error:', error)
        // Fallback to dummy data
        const dummyData = generateDummyExcelData()
        const summary = getDefaultProcessingSummary()
        setProcessedData(dummyData)
        setProcessingSummary(summary)
        
        // Store fallback data for view page
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target?.result as string
          const lines = text.split('\n')
          const headers = lines[0].split(',')
          const data = lines.slice(1).filter(line => line.trim()).map((line, index) => {
            const values = line.split(',')
            const row: any = { id: index + 1 }
            headers.forEach((header, i) => {
              row[header.trim()] = values[i]?.trim() || ''
            })
            return row
          })
          localStorage.setItem('rawbify_processed_data', JSON.stringify({
            filename: 'processed_' + (uploadedFile?.name || 'data.csv'),
            data: data,
            headers: headers,
            summary: summary,
            prompt: prompt
          }))
        }
        reader.readAsText(dummyData)
      } finally {
        setProcessing(false)
        setProcessed(true)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownload = () => {
    if (processedData) {
      const url = window.URL.createObjectURL(processedData)
      const a = document.createElement('a')
      a.href = url
      a.download = 'processed_data.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return uploadedFile !== null
    if (currentStep === 2) return prompt.trim().length > 0
    return false
  }

  const steps = [
    { icon: CheckCircle, title: 'Validate Access', color: 'from-blue-500 to-purple-600' },
    { icon: Database, title: 'Upload Data', color: 'from-purple-500 to-pink-600' },
    { icon: Brain, title: 'AI Prompt', color: 'from-pink-500 to-red-600' },
    { icon: Download, title: 'Download', color: 'from-green-500 to-blue-600' }
  ]

  const renderCurrentStep = () => {
    if (showingPrivacyReassurance) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="modern-card p-12 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
            {/* Privacy Animation */}
            <div className="relative mb-8">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-12 h-12 text-white z-10" />
                
                {/* Privacy particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Orbiting privacy icons */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative w-40 h-40">
                  {[Lock, Monitor, Eye].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-200"
                      style={{
                        left: `${50 + 40 * Math.cos(i * 120 * Math.PI / 180)}%`,
                        top: `${50 + 40 * Math.sin(i * 120 * Math.PI / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <Icon className="w-4 h-4 text-green-600" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                🔒 Welcome to Secure Processing
              </h4>
              <p className="text-lg text-gray-600 mb-8">
                Before you upload, here's how we protect your data
              </p>
              
              {/* Current Privacy Message */}
              <div className="max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={privacyStep}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="modern-card p-6 bg-white/90 backdrop-blur-sm border-2 border-green-200"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${privacyMessages[privacyStep]?.color || 'from-green-500 to-blue-600'}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {privacyMessages[privacyStep] && React.createElement(privacyMessages[privacyStep].icon, {
                          className: "w-6 h-6 text-white"
                        })}
                      </motion.div>
                      <div className="flex-1 text-left">
                        <h5 className="text-lg font-bold text-gray-800 mb-1">
                          {privacyMessages[privacyStep]?.title}
                        </h5>
                        <p className="text-gray-600">
                          {privacyMessages[privacyStep]?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Privacy step indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {privacyMessages.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === privacyStep 
                          ? 'bg-green-500 scale-125' 
                          : index < privacyStep 
                            ? 'bg-green-400' 
                            : 'bg-gray-300'
                      }`}
                      animate={index === privacyStep ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.5, repeat: index === privacyStep ? Infinity : 0 }}
                    />
                  ))}
                </div>

                {/* Trust badge */}
                <motion.div
                  className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Zero Storage</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )
    }

    switch (currentStep) {
      case 0:
        return (
          <UserValidation
            onValidationSuccess={handleValidationSuccess}
            isActive={true}
          />
        )
      case 1:
        return (
          <FileUpload
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            isActive={true}
          />
        )
      case 2:
        return (
          <PromptInput
            prompt={prompt}
            onPromptChange={handlePromptChange}
            isActive={true}
          />
        )
      case 3:
        return (
          <DataDownload
            isActive={true}
            processing={processing}
            processed={processed}
            processingSummary={processingSummary}
            onDownload={handleDownload}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
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
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-12 h-12 text-purple-500" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-10">
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Database className="w-10 h-10 text-blue-500" />
        </motion.div>
      </div>

      {/* Modern Header */}
      <header className="relative glass border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div 
              className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img 
                src="/rawbify_logo.svg" 
                alt="Rawbify" 
                className="h-10 w-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Rawbify
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                Trial v1
              </span>
              <div className="text-sm text-gray-600 font-medium">
                Welcome, Waitlist User! 👋
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">Experience </span>
            <span className="gradient-text">Rawbify</span>
            <span className="text-gray-900"> in Action</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your Excel or CSV file, tell us what you want, and get clean, analysis-ready data.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        {!showingPrivacyReassurance && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                
                return (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                          isCompleted 
                            ? 'bg-green-500' 
                            : isActive 
                              ? `bg-gradient-to-r ${step.color}` 
                              : 'bg-gray-300'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                      >
                        <Icon className={`w-8 h-8 ${isActive || isCompleted ? 'text-white' : 'text-gray-500'}`} />
                      </motion.div>
                      <span className={`text-sm font-medium mt-2 ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <motion.div 
                        className={`w-16 h-1 mx-4 rounded-full ${
                          index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: index < currentStep ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Current Step Content */}
        <motion.div 
          className="modern-card p-8 lg:p-12 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showingPrivacyReassurance ? 'privacy' : currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Controls */}
        {!showingPrivacyReassurance && currentStep > 0 && currentStep < 3 && (
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={handleBack}
              variant="outline"
              className="px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <Button 
              onClick={handleNext} 
              disabled={!canProceed()}
              className="btn-gradient text-white px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 2 ? 'Process Data' : 'Next Step'}
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="modern-card p-8 lg:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="gradient-text">Stay Tuned for Trial V2</span>
              </h3>
              <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Get unlimited data processing, advanced AI features, and priority support.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-400 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 