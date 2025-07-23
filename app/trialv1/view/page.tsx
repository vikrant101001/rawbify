'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Eye, FileText, Table, MoreHorizontal, MessageSquare, Send, ChevronRight, ChevronDown, File, Database, Sparkles, Bot, User, Loader, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
      prompt: processedData?.prompt || ''
    }
  } catch (error) {
    console.error('Error loading data from storage:', error)
    return {
      inputData: [],
      outputData: [],
      inputFilename: 'uploaded_file.csv',
      outputFilename: 'processed_file.csv',
      processingSummary: [],
      prompt: ''
    }
  }
}

// Generate initial chat messages based on real data
const getInitialChatMessages = (processingSummary: string[], prompt: string) => [
  {
    id: 1,
    type: 'assistant' as const,
    content: "Hi! I'm your data assistant. I can see you've processed your data successfully. Here's what I accomplished:\n\n" + 
             processingSummary.map(item => `• ${item}`).join('\n') + 
             "\n\nWhat would you like to know about your dataset?",
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: 2,
    type: 'user' as const,
    content: prompt || "What did you do to clean my data?",
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: 3,
    type: 'assistant' as const,
    content: "I processed your data based on your instructions. The transformations are now complete and your data is ready for analysis in Power BI or Tableau. In Trial V2, I'll be able to provide more detailed insights and perform additional analysis!",
    timestamp: new Date(Date.now() - 30000)
  }
]

// Export format configurations
const exportFormats = [
  {
    key: 'csv',
    name: 'CSV',
    description: 'Universal format - works everywhere',
    icon: '📄',
    extension: 'csv',
    mimeType: 'text/csv',
    recommended: false
  },
  {
    key: 'xlsx',
    name: 'Excel',
    description: 'Best for business analysis & reporting',
    icon: '📊',
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    recommended: true
  },
  {
    key: 'json',
    name: 'JSON',
    description: 'Modern data pipelines & APIs',
    icon: '🔗',
    extension: 'json',
    mimeType: 'application/json',
    recommended: false
  },
  {
    key: 'powerbi',
    name: 'Power BI',
    description: 'Direct dashboard integration',
    icon: '⚡',
    extension: 'pbix',
    mimeType: 'application/octet-stream',
    recommended: false
  },
  {
    key: 'parquet',
    name: 'Parquet',
    description: 'High-performance columnar format',
    icon: '🚀',
    extension: 'parquet',
    mimeType: 'application/octet-stream',
    recommended: false
  },
  {
    key: 'tableau',
    name: 'Tableau',
    description: 'Hyper file for Tableau Desktop',
    icon: '📈',
    extension: 'hyper',
    mimeType: 'application/octet-stream',
    recommended: false
  }
]

export default function ViewProcessedData() {
  const router = useRouter()
  const [activeFile, setActiveFile] = useState<'input' | 'output'>('output')
  const [selectedCells, setSelectedCells] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [inputExpanded, setInputExpanded] = useState(true)
  const [outputExpanded, setOutputExpanded] = useState(true)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState(exportFormats[1]) // Default to Excel
  const [dataState, setDataState] = useState({
    inputData: [] as any[],
    outputData: [] as any[],
    inputFilename: 'uploaded_file.csv',
    outputFilename: 'processed_file.csv',
    processingSummary: [] as string[],
    prompt: ''
  })

  const currentData = activeFile === 'input' ? dataState.inputData : dataState.outputData
  const columns = Object.keys(currentData[0] || {})

  // Load real data from localStorage
  useEffect(() => {
    const loadedData = loadDataFromStorage()
    
    // If no data found, redirect back to trial
    if (loadedData.inputData.length === 0 && loadedData.outputData.length === 0) {
      console.log('No data found in localStorage, redirecting to trial')
      router.push('/trialv1')
      return
    }
    
    setDataState(loadedData)
    setChatMessages(getInitialChatMessages(loadedData.processingSummary, loadedData.prompt))
    setIsLoading(false)
  }, [router])

  const generateCSV = () => {
    return [
      columns.join(','),
      ...currentData.map(row => columns.map(col => row[col as keyof typeof row]).join(','))
    ].join('\n')
  }

  const generateJSON = () => {
    return JSON.stringify(currentData, null, 2)
  }

  const generateExcel = () => {
    // For demo purposes, we'll create a simple HTML table that Excel can read
    // In production, you'd use libraries like xlsx or exceljs
    const htmlTable = `
      <table>
        <thead>
          <tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${currentData.map(row => 
            `<tr>${columns.map(col => `<td>${row[col as keyof typeof row] || ''}</td>`).join('')}</tr>`
          ).join('')}
        </tbody>
      </table>
    `
    return htmlTable
  }

  const generatePowerBI = () => {
    // For demo - in production, you'd generate actual .pbix files
    const powerBITemplate = {
      version: "1.0",
      dataModel: {
        tables: [{
          name: activeFile === 'input' ? dataState.inputFilename : dataState.outputFilename,
          columns: columns.map(col => ({ name: col, dataType: "string" })),
          data: currentData
        }]
      },
      reports: [{
        name: "Data Analysis",
        pages: [{
          name: "Overview",
          visualizations: []
        }]
      }]
    }
    return JSON.stringify(powerBITemplate, null, 2)
  }

  const generateParquet = () => {
    // For demo - in production, you'd use parquet libraries
    const parquetMeta = {
      schema: columns.map(col => ({ name: col, type: "UTF8" })),
      data: currentData,
      compression: "SNAPPY",
      format: "PARQUET_1_0"
    }
    return JSON.stringify(parquetMeta, null, 2)
  }

  const generateTableau = () => {
    // For demo - in production, you'd generate actual .hyper files
    const tableauHyper = {
      database: "rawbify_data",
      schema: "Extract",
      table: activeFile === 'input' ? dataState.inputFilename : dataState.outputFilename,
      columns: columns.map(col => ({ name: col, type: "text" })),
      data: currentData,
      metadata: {
        created: new Date().toISOString(),
        source: "Rawbify Data Processing"
      }
    }
    return JSON.stringify(tableauHyper, null, 2)
  }

  const handleDownload = (format = selectedFormat) => {
    let content = ''
    let mimeType = format.mimeType
    let filename = `${activeFile}_data.${format.extension}`

    switch (format.key) {
      case 'csv':
        content = generateCSV()
        break
      case 'xlsx':
        content = generateExcel()
        mimeType = 'application/vnd.ms-excel' // For HTML table that Excel can read
        break
      case 'json':
        content = generateJSON()
        break
      case 'powerbi':
        content = generatePowerBI()
        filename = `${activeFile}_data_powerbi.json` // Demo format
        break
      case 'parquet':
        content = generateParquet()
        filename = `${activeFile}_data_parquet.json` // Demo format
        break
      case 'tableau':
        content = generateTableau()
        filename = `${activeFile}_data_tableau.json` // Demo format
        break
      default:
        content = generateCSV()
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
    
    setShowDownloadDropdown(false)
  }

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cellId = `${rowIndex}-${colIndex}`
    setSelectedCells(prev => 
      prev.includes(cellId) 
        ? prev.filter(id => id !== cellId)
        : [...prev, cellId]
    )
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages((prev: any[]) => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        type: 'assistant' as const,
        content: "I understand you want to analyze that data. In Trial V2, I'll be able to perform real-time data analysis, create visualizations, and suggest optimizations. For now, this is a preview of the chat interface!",
        timestamp: new Date()
      }
             setChatMessages((prev: any[]) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute inset-0 wave-pattern opacity-5"></div>

      {/* Header */}
      <header className="relative glass border-b border-white/20 z-50 flex-shrink-0">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => router.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <motion.img 
                  src="/rawbify_logo.svg" 
                  alt="Rawbify" 
                  className="h-6 w-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Rawbify Data Studio
                </h1>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Trial V2 Preview
              </span>
              
              {/* Enhanced Download Button with Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                  <div className="flex flex-col items-center">
                    <span className="text-xs opacity-90">{selectedFormat.name}</span>
                    <span className="text-xs opacity-75">{selectedFormat.icon}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: showDownloadDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                {/* Download Dropdown */}
                {showDownloadDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                  >
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Choose Export Format
                      </div>
                      
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {exportFormats.map((format) => (
                          <motion.button
                            key={format.key}
                            onClick={() => {
                              setSelectedFormat(format)
                              handleDownload(format)
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                              selectedFormat.key === format.key
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-lg">{format.icon}</span>
                                <div>
                                  <div className="font-medium text-gray-900 flex items-center">
                                    {format.name}
                                    {format.recommended && (
                                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                        Recommended
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600">{format.description}</div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 font-mono">
                                .{format.extension}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500 text-center">
                          💡 Pro tip: Excel format is perfect for business analysis
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 relative min-h-0">
        {/* Left Sidebar - File Explorer */}
        <motion.div
          className={`bg-white/80 backdrop-blur-sm border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
            leftSidebarOpen ? 'w-64' : 'w-12'
          }`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                {leftSidebarOpen && (
                  <h3 className="font-semibold text-gray-800 text-sm">Files</h3>
                )}
                <button
                  onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${leftSidebarOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {leftSidebarOpen && (
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
                  onClick={() => setOutputExpanded(!outputExpanded)}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-left text-sm"
                >
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${outputExpanded ? '' : '-rotate-90'}`} />
                  <span className="font-medium text-gray-700">Output</span>
                </button>
                {outputExpanded && (
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
        </motion.div>

                {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* File Tab & Info */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {activeFile === 'input' ? (
                  <File className="w-4 h-4 text-orange-600" />
                ) : (
                  <Database className="w-4 h-4 text-green-600" />
                )}
                <span className="font-medium text-gray-800">
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
              <span>{currentData.length} rows × {columns.length} columns</span>
              {selectedCells.length > 0 && (
                <span className="text-blue-600 font-medium">
                  {selectedCells.length} selected
                </span>
              )}
            </div>
          </div>

          {/* Excel-like Table */}
                    <div className="flex-1 min-h-0 p-6">
            <div className="modern-card h-full overflow-hidden flex flex-col">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading your data...</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-auto">
                <table className="w-full">
                  {/* Header Row */}
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        #
                      </th>
                      {columns.map((column, index) => (
                        <th 
                          key={column}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Data Rows */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((row, rowIndex) => (
                      <motion.tr 
                        key={rowIndex}
                        className="hover:bg-blue-50 transition-colors duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: rowIndex * 0.02 }}
                      >
                        {/* Row Number */}
                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-400 border-r border-gray-200 bg-gray-50">
                          {rowIndex + 1}
                        </td>
                        
                        {/* Data Cells */}
                        {columns.map((column, colIndex) => {
                          const cellId = `${rowIndex}-${colIndex}`
                          const isSelected = selectedCells.includes(cellId)
                          const value = row[column as keyof typeof row]
                          
                          return (
                            <td 
                              key={column}
                              className={`px-4 py-3 text-sm border-r border-gray-200 last:border-r-0 cursor-pointer transition-all duration-200 ${
                                isSelected ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                              }`}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                              <div className={`${
                                column === 'revenue' ? 'font-semibold text-green-600' :
                                column === 'status' ? 'font-medium text-blue-600' :
                                column === 'email' ? 'text-purple-600' :
                                'text-gray-900'
                              }`}>
                                {value}
                              </div>
                            </td>
                          )
                        })}
                      </motion.tr>
                    ))}
                                      </tbody>
                  </table>
                </div>
               )}
              </div>
            </div>
        </div>

        {/* Right Sidebar - Chat */}
        <motion.div
          className={`bg-white/80 backdrop-blur-sm border-l border-gray-200 flex-shrink-0 transition-all duration-300 ${
            rightSidebarOpen ? 'w-80' : 'w-12'
          }`}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-full flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                {rightSidebarOpen && (
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800 text-sm">Data Assistant</h3>
                  </div>
                )}
                <button
                  onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {rightSidebarOpen && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.type === 'assistant' && <Bot className="w-4 h-4 mt-0.5 text-purple-600" />}
                          {message.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-purple-600" />
                          <Loader className="w-4 h-4 animate-spin text-gray-500" />
                          <span className="text-sm text-gray-500">Analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about your data..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try: "What's the total revenue?" or "Clean phone numbers"
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 