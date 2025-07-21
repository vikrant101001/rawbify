'use client'

import { useState } from 'react'
import { Button } from '../components/ui/button'
import UserValidation from '../components/trial/UserValidation'
import FileUpload from '../components/trial/FileUpload'
import PromptInput from '../components/trial/PromptInput'
import DataDownload from '../components/trial/DataDownload'
import { processData, generateDummyExcelData, getDefaultProcessingSummary } from '../services/api'

export default function TrialV1() {
  const [currentStep, setCurrentStep] = useState(0)
  const [validatedUserId, setValidatedUserId] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [processedData, setProcessedData] = useState<Blob | null>(null)
  const [processingSummary, setProcessingSummary] = useState<string[] | undefined>(undefined)

  const handleValidationSuccess = (userId: string) => {
    setValidatedUserId(userId)
    setCurrentStep(1)
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt)
  }

  const handleProceed = async () => {
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
          if (result.processingSummary) {
            setProcessingSummary(result.processingSummary)
          } else {
            setProcessingSummary(getDefaultProcessingSummary())
          }
        } else {
          // Fallback to dummy data on API error
          console.log('API Error, using dummy data:', result.error)
          setProcessedData(generateDummyExcelData())
          setProcessingSummary(getDefaultProcessingSummary())
        }
      } catch (error) {
        console.error('Processing error:', error)
        // Fallback to dummy data
        setProcessedData(generateDummyExcelData())
        setProcessingSummary(getDefaultProcessingSummary())
      } finally {
        setProcessing(false)
        setProcessed(true)
      }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-gray-900">Rawbify</h1>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-full sm:w-auto text-center">
              Trial v1
            </span>
            <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-right">
              Welcome, Waitlist User! 👋
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl sm:max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Experience Rawbify in Action
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your Excel or CSV file, tell us what you want, and get clean, analysis-ready data.
          </p>
        </div>

        {/* Demo Steps */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
          {/* Step 0: User Validation */}
          <UserValidation
            onValidationSuccess={handleValidationSuccess}
            isActive={currentStep === 0}
          />

          {/* Step 1: Upload Data File */}
          <FileUpload
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            isActive={currentStep >= 1}
          />
          {currentStep === 1 && (
            <div className="text-center mt-4">
              <Button 
                onClick={handleProceed} 
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Proceed to Step 2
              </Button>
            </div>
          )}

          {/* Step 2: Enter Prompt */}
          <PromptInput
            prompt={prompt}
            onPromptChange={handlePromptChange}
            isActive={currentStep >= 2}
          />
          {currentStep === 2 && (
            <div className="text-center mt-4">
              <Button 
                onClick={handleProceed} 
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Process Data
              </Button>
            </div>
          )}

          {/* Step 3: Download */}
          <DataDownload
            isActive={currentStep >= 3}
            processing={processing}
            processed={processed}
            processingSummary={processingSummary}
            onDownload={handleDownload}
          />
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Stay Tuned for Trial V2
            </h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
              Get unlimited data processing, advanced AI features, and priority support.
            </p>
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
              Get in Touch
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 