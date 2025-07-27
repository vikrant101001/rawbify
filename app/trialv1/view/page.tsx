'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  ChevronDown, 
  File, 
  Database, 
  Bot, 
  Send, 
  User, 
  Loader, 
  Brain, 
  Zap,
  ChevronRight,
  Menu,
  X,
  Eye
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { processData } from '../../services/api'

// Chat Sidebar Component
const ChatSidebar = ({ 
  isOpen, 
  onToggle, 
  chatMessages, 
  chatInput, 
  setChatInput, 
  handleSendMessage, 
  isTyping, 
  isProcessing, 
  hasProcessedData 
}: any) => {
  return (
    <div className={`bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-80 lg:w-96' : 'w-12'
    } flex-shrink-0`}>
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Data Assistant</h3>
              {!hasProcessedData && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                  Ready
                </span>
              )}
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isOpen ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <Bot className="w-4 h-4 text-purple-600" />
            )}
          </button>
        </div>

        {isOpen && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    {hasProcessedData ? "Ask me about your data!" : "Ready to process your data!"}
                  </p>
                </div>
              )}
              
              {chatMessages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <Loader className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {isProcessing ? 'Processing data...' : 'Analyzing...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t border-gray-200 ${
              !hasProcessedData ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
            }`}>
              {!hasProcessedData && (
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800 text-sm">Transform Your Data</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tell me what you'd like me to do with your dataset
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder={
                    !hasProcessedData 
                      ? "e.g., Clean this data and remove duplicates..." 
                      : "Ask about your data..."
                  }
                  disabled={isProcessing}
                  rows={2}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all resize-none ${
                    !hasProcessedData 
                      ? 'border-blue-300 focus:ring-blue-500 font-medium' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } ${isProcessing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !chatInput.trim()}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                  className={`px-4 py-3 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                    !hasProcessedData 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  } ${(isProcessing || !chatInput.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : !hasProcessedData ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              
              {/* Quick suggestions */}
              {!hasProcessedData && (
                <div className="mt-3">
                  <span className="text-xs text-gray-600 mb-2 block">Quick suggestions:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Clean column names",
                      "Remove duplicates", 
                      "Create summary stats"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setChatInput(suggestion)}
                        className="text-xs bg-white border border-blue-200 hover:border-blue-400 text-blue-600 px-2 py-1 rounded transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// File Explorer Component
const FileExplorer = ({ 
  isOpen, 
  onToggle, 
  activeFile, 
  setActiveFile, 
  dataState, 
  hasProcessedData 
}: any) => {
  const [inputExpanded, setInputExpanded] = useState(true)
  const [outputExpanded, setOutputExpanded] = useState(true)

  return (
    <div className={`bg-white/80 backdrop-blur-sm border-r border-gray-200 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-12'
    } flex-shrink-0`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isOpen && (
              <h3 className="font-semibold text-gray-800 text-sm">Files</h3>
            )}
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isOpen ? (
                <ChevronRight className="w-4 h-4 text-gray-600 rotate-180" />
              ) : (
                <File className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {/* Input Section */}
            <div>
              <button
                onClick={() => setInputExpanded(!inputExpanded)}
                className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-left text-sm"
              >
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${inputExpanded ? '' : '-rotate-90'}`} />
                <span className="font-medium text-gray-700">Input</span>
              </button>
              {inputExpanded && (
                <div className="ml-6 mt-1">
                  <button
                    onClick={() => setActiveFile('input')}
                    className={`flex items-center space-x-2 w-full p-2 rounded text-left text-sm transition-colors ${
                      activeFile === 'input' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <File className="w-4 h-4" />
                    <span>{dataState.inputFilename}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div>
              <button
                onClick={() => hasProcessedData && setOutputExpanded(!outputExpanded)}
                className={`flex items-center space-x-2 w-full p-2 rounded text-left text-sm transition-colors ${
                  hasProcessedData 
                    ? 'hover:bg-gray-100' 
                    : 'cursor-not-allowed opacity-50'
                }`}
                disabled={!hasProcessedData}
              >
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${outputExpanded && hasProcessedData ? '' : '-rotate-90'}`} />
                <span className="font-medium text-gray-700">Output</span>
                {!hasProcessedData && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    Empty
                  </span>
                )}
              </button>
              {outputExpanded && hasProcessedData && (
                <div className="ml-6 mt-1">
                  <button
                    onClick={() => setActiveFile('output')}
                    className={`flex items-center space-x-2 w-full p-2 rounded text-left text-sm transition-colors ${
                      activeFile === 'output' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    <span>{dataState.outputFilename}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Mobile Menu Component
const MobileMenu = ({ 
  isOpen, 
  onClose, 
  activeFile, 
  setActiveFile, 
  dataState, 
  hasProcessedData,
  onChatToggle
}: any) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="relative w-80 h-full bg-white shadow-xl"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Menu</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Files</h4>
            <button
              onClick={() => {
                setActiveFile('input')
                onClose()
              }}
              className={`w-full p-3 rounded-lg text-left flex items-center space-x-2 ${
                activeFile === 'input' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50'
              }`}
            >
              <File className="w-4 h-4" />
              <span className="text-sm">{dataState.inputFilename}</span>
            </button>
            
            {hasProcessedData && (
              <button
                onClick={() => {
                  setActiveFile('output')
                  onClose()
                }}
                className={`w-full p-3 rounded-lg text-left flex items-center space-x-2 mt-2 ${
                  activeFile === 'output' ? 'bg-green-100 text-green-700' : 'bg-gray-50'
                }`}
              >
                <Database className="w-4 h-4" />
                <span className="text-sm">{dataState.outputFilename}</span>
              </button>
            )}
          </div>
          
          <div>
            <button
              onClick={() => {
                onChatToggle()
                onClose()
              }}
              className="w-full p-3 bg-purple-100 text-purple-700 rounded-lg text-left flex items-center space-x-2"
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm">Data Assistant</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Helper function to convert data array back to CSV File
const dataArrayToFile = (data: any[], filename: string): File => {
  if (data.length === 0) {
    const blob = new Blob([''], { type: 'text/csv' })
    return new (window as any).File([blob], filename, { type: 'text/csv' })
  }
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  return new (window as any).File([blob], filename, { type: 'text/csv' })
}

// Helper function to parse CSV blob back to data array
const parseCsvBlob = async (blob: Blob): Promise<any[]> => {
  const text = await blob.text()
  const lines = text.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) return []
  
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''))
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.replace(/"/g, ''))
    const row: any = { id: index + 1 }
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim() || ''
    })
    return row
  })
  
  return data
}

// Helper function to load real data from localStorage
const loadDataFromStorage = () => {
  try {
    const originalData = JSON.parse(localStorage.getItem('rawbify_original_data') || 'null')
    const processedData = JSON.parse(localStorage.getItem('rawbify_processed_data') || 'null')
    
    return {
      inputData: originalData?.data || [],
      outputData: processedData?.data || [],
      inputFilename: originalData?.filename || 'uploaded_file.csv',
      outputFilename: processedData?.filename || 'processed_file.csv',
      processingSummary: processedData?.summary || [],
      prompt: processedData?.prompt || '',
      userId: originalData?.userId || ''
    }
  } catch (error) {
    console.error('Error loading data from storage:', error)
    return {
      inputData: [],
      outputData: [],
      inputFilename: 'uploaded_file.csv',
      outputFilename: 'processed_file.csv',
      processingSummary: [],
      prompt: '',
      userId: ''
    }
  }
}

export default function DataStudioView() {
  const router = useRouter()
  const [activeFile, setActiveFile] = useState<'input' | 'output'>('input')
  const [selectedCells, setSelectedCells] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState({ name: 'Excel', extension: 'xlsx' })
  const [isProcessing, setIsProcessing] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dataState, setDataState] = useState({
    inputData: [] as any[],
    outputData: [] as any[],
    inputFilename: 'uploaded_file.csv',
    outputFilename: 'processed_file.csv',
    processingSummary: [] as string[],
    prompt: '',
    userId: ''
  })

  const currentData = activeFile === 'input' ? dataState.inputData : dataState.outputData
  const columns = Object.keys(currentData[0] || {})
  const hasProcessedData = dataState.outputData.length > 0

  // Export formats
  const exportFormats = [
    { name: 'CSV', extension: 'csv', description: 'Comma-separated values', icon: FileText },
    { name: 'Excel', extension: 'xlsx', description: 'Microsoft Excel format', icon: Download, recommended: true },
    { name: 'TSV', extension: 'tsv', description: 'Tab-separated values', icon: FileText }
  ]

  // Load data on component mount
  useEffect(() => {
    const loadedData = loadDataFromStorage()
    
    if (loadedData.inputData.length === 0) {
      // If no data found, redirect back to upload
      router.push('/trialv1')
      return
    }
    
    setDataState(loadedData)
    setIsLoading(false)
  }, [router])

  // Process data function
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isProcessing) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)
    setIsProcessing(true)

    try {
      if (!hasProcessedData) {
        // First processing - call the real API
        const inputFile = dataArrayToFile(dataState.inputData, dataState.inputFilename)
        const apiResult = await processData({ 
          file: inputFile, 
          prompt: userMessage.content, 
          userId: dataState.userId 
        })
        
        if (apiResult.success && apiResult.data) {
          // Parse the returned CSV blob back to data array
          const processedData = await parseCsvBlob(apiResult.data)
          
          const processedDataStorage = {
            data: processedData,
            filename: `processed_${dataState.inputFilename}`,
            summary: apiResult.processingSummary || ['Data processed successfully'],
            prompt: userMessage.content,
            userId: dataState.userId
          }
          
          localStorage.setItem('rawbify_processed_data', JSON.stringify(processedDataStorage))
          
          setDataState(prev => ({
            ...prev,
            outputData: processedData,
            outputFilename: `processed_${prev.inputFilename}`,
            processingSummary: apiResult.processingSummary || ['Data processed successfully'],
            prompt: userMessage.content
          }))

          // Auto-switch to output view
          setActiveFile('output')

          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: `Great! I've successfully processed your data based on your request: "${userMessage.content}"\n\nHere's what I accomplished:\n${(apiResult.processingSummary || ['Data processed successfully']).map((item: string) => `• ${item}`).join('\n')}\n\nYour processed data is now ready for download or further analysis. What would you like to explore next?`,
            timestamp: new Date()
          }
          
          setChatMessages(prev => [...prev, assistantMessage])
        } else {
          // Handle API error
          const errorMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: `I apologize, but I encountered an error while processing your data: ${apiResult.error || 'Unknown error'}. Please try again with a different approach.`,
            timestamp: new Date()
          }
          setChatMessages(prev => [...prev, errorMessage])
        }
      } else {
        // Subsequent questions about the data
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: `The Current Version TrialV1 doesnt support multi-output, multi-changes. Stay Tuned for TrialV2. Till then, enjoy the demo.`,
          timestamp: new Date()
        }
        
        setChatMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Processing error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again with a different approach.',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsProcessing(false)
    }
  }

  // Download function
  const handleDownload = () => {
    if (currentData.length === 0) return

    let content = ''
    const headers = columns.join(',')
    const rows = currentData.map(row => 
      columns.map(col => `"${row[col] || ''}"`).join(',')
    ).join('\n')
    
    content = `${headers}\n${rows}`
    
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${activeFile === 'input' ? dataState.inputFilename : dataState.outputFilename}`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    
    setShowDownloadDropdown(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading Data Studio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Rawbify Data Studio
                </h1>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className="text-sm text-gray-600">Trial v1 Preview</span>
              <div className="relative">
                <button
                  onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Excel • xlsx</span>
                </button>
                
                {showDownloadDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-800 mb-3">Download Format</h4>
                      {exportFormats.map((format) => (
                        <button
                          key={format.extension}
                          onClick={() => {
                            setSelectedFormat(format)
                            handleDownload()
                          }}
                          className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <format.icon className="w-5 h-5 text-gray-500" />
                            <div>
                              <div className="font-medium text-gray-900 flex items-center space-x-2">
                                <span>{format.name}</span>
                                {format.recommended && (
                                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                    RECOMMENDED
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">{format.description}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            .{format.extension}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        dataState={dataState}
        hasProcessedData={hasProcessedData}
        onChatToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
      />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* File Explorer - Hidden on mobile */}
        <div className="hidden lg:block">
          <FileExplorer
            isOpen={leftSidebarOpen}
            onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            dataState={dataState}
            hasProcessedData={hasProcessedData}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* File Info Bar */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {activeFile === 'input' ? (
                  <File className="w-4 h-4 text-orange-600" />
                ) : (
                  <Database className="w-4 h-4 text-green-600" />
                )}
                <span className="font-medium text-gray-800 truncate">
                  {activeFile === 'input' ? dataState.inputFilename : dataState.outputFilename}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeFile === 'input' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {activeFile === 'input' ? 'Original' : 'Processed'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="hidden sm:inline">{currentData.length} rows × {columns.length} columns</span>
              <span className="sm:hidden">{currentData.length}×{columns.length}</span>
              {selectedCells.length > 0 && (
                <span className="text-blue-600 font-medium">
                  {selectedCells.length} selected
                </span>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="flex-1 p-4 lg:p-6 overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden flex flex-col">
              {currentData.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Brain className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {activeFile === 'output' ? 'No Processed Data Yet' : 'No Data Available'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {activeFile === 'output' 
                        ? 'Use the chat panel to process your data'
                        : 'Upload a file to get started'
                      }
                    </p>
                    {activeFile === 'output' && (
                      <button
                        onClick={() => setActiveFile('input')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Input Data
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-auto">
                  <table className="w-full">
                    {/* Header */}
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                      <tr>
                        <th className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          #
                        </th>
                        {columns.map((column) => (
                          <th 
                            key={column}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    
                    {/* Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.slice(0, 100).map((row, rowIndex) => (
                        <tr 
                          key={rowIndex}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="w-12 px-4 py-3 text-center text-sm text-gray-500 border-r border-gray-200 bg-gray-50">
                            {rowIndex + 1}
                          </td>
                          {columns.map((column) => (
                            <td 
                              key={column}
                              className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0"
                            >
                              {row[column as keyof typeof row]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <ChatSidebar
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          isTyping={isTyping}
          isProcessing={isProcessing}
          hasProcessedData={hasProcessedData}
        />
      </div>
    </div>
  )
} 