'use client'

import { useState, useEffect, useRef } from 'react'
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
  Eye,
  Maximize2,
  ArrowRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { processData } from '../../services/api'
import ProcessingOverlay from '../../components/trial/ProcessingOverlay'
import ExpandedTextEditor from '../../components/trial/ExpandedTextEditor'
import RoadmapOverlay from '../../components/trial/RoadmapOverlay'

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
  hasProcessedData,
  onExpandEditor
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
                <div className="flex-1 relative">
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
                    className={`w-full pr-12 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all resize-none ${
                      !hasProcessedData 
                        ? 'border-blue-300 focus:ring-blue-500 font-medium' 
                        : 'border-gray-300 focus:ring-purple-500'
                    } ${isProcessing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {/* Expand Button */}
                  <motion.button
                    onClick={onExpandEditor}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors"
                    title="Open full editor"
                  >
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
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

// Enhanced File Explorer Component
const FileExplorer = ({ 
  isOpen, 
  onToggle, 
  activeFile, 
  setActiveFile, 
  dataState, 
  hasProcessedData 
}: any) => {
  const getFileStats = (fileType: 'input' | 'output') => {
    const data = fileType === 'input' ? dataState.inputData : dataState.outputData
    return {
      rows: data.length,
      columns: data.length > 0 ? Object.keys(data[0] || {}).length : 0,
      size: data.length > 0 ? `${Math.round(JSON.stringify(data).length / 1024)} KB` : '0 KB'
    }
  }

  const inputStats = getFileStats('input')
  const outputStats = hasProcessedData ? getFileStats('output') : null

  return (
    <div className={`bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
      isOpen ? 'w-72' : 'w-12'
    } flex-shrink-0 shadow-sm`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <File className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-slate-800">Data Files</h3>
              </div>
            )}
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/70 rounded-lg transition-colors"
            >
              {isOpen ? (
                <ChevronRight className="w-5 h-5 text-slate-600 rotate-180" />
              ) : (
                <File className="w-5 h-5 text-slate-600" />
              )}
            </motion.button>
          </div>
        </div>

        {isOpen && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Tab-style Toggle */}
            <div className="bg-slate-100 p-1 rounded-lg">
              <div className="grid grid-cols-2 gap-1">
                <motion.button
                  onClick={() => setActiveFile('input')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFile === 'input'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  Input
                </motion.button>
                <motion.button
                  onClick={() => hasProcessedData && setActiveFile('output')}
                  whileHover={hasProcessedData ? { scale: 1.02 } : {}}
                  whileTap={hasProcessedData ? { scale: 0.98 } : {}}
                  disabled={!hasProcessedData}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFile === 'output' && hasProcessedData
                      ? 'bg-white text-green-700 shadow-sm'
                      : hasProcessedData
                      ? 'text-slate-600 hover:text-slate-800'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Output
                </motion.button>
              </div>
            </div>

            {/* Input File Card */}
            {activeFile === 'input' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-blue-800 text-sm truncate">
                      {dataState.inputFilename}
                    </h4>
                    <p className="text-xs text-blue-600">Original Dataset</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Active" />
                </div>

                {/* File Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-700">{inputStats.rows}</div>
                    <div className="text-xs text-blue-600">Rows</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-700">{inputStats.columns}</div>
                    <div className="text-xs text-blue-600">Columns</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-700">{inputStats.size}</div>
                    <div className="text-xs text-blue-600">Size</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex items-center space-x-2 text-xs text-blue-600">
                    <Eye className="w-3 h-3" />
                    <span>Viewing original data</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Output File Card */}
            {activeFile === 'output' && hasProcessedData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-green-800 text-sm truncate">
                      {dataState.outputFilename}
                    </h4>
                    <p className="text-xs text-green-600">Processed Dataset</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Active" />
                </div>

                {/* File Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-700">{outputStats?.rows}</div>
                    <div className="text-xs text-green-600">Rows</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-700">{outputStats?.columns}</div>
                    <div className="text-xs text-green-600">Columns</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-700">{outputStats?.size}</div>
                    <div className="text-xs text-green-600">Size</div>
                  </div>
                </div>

                {/* Processing Summary */}
                {dataState.processingSummary.length > 0 && (
                  <div className="pt-2 border-t border-green-200">
                    <div className="text-xs text-green-700 font-medium mb-1">Recent Changes:</div>
                    <div className="text-xs text-green-600 space-y-1">
                      {dataState.processingSummary.slice(0, 2).map((summary: string, index: number) => (
                        <div key={index} className="flex items-start space-x-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="line-clamp-2">{summary}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-2 border-t border-green-200">
                  <div className="flex items-center space-x-2 text-xs text-green-600">
                    <Eye className="w-3 h-3" />
                    <span>Viewing processed data</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Empty Output State */}
            {activeFile === 'output' && !hasProcessedData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-6 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm">No Output Yet</h4>
                  <p className="text-xs text-slate-500 mt-1">Process your data to see results here</p>
                </div>
                <div className="text-xs text-slate-400">
                  Use the chat panel to transform your data
                </div>
              </motion.div>
            )}

            {/* File Comparison (when both exist) */}
            {hasProcessedData && (
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-slate-500" />
                  Quick Compare
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Rows:</span>
                    <span className="font-medium">
                      {inputStats.rows} → {outputStats?.rows} 
                      <span className={`ml-1 ${(outputStats?.rows || 0) >= inputStats.rows ? 'text-green-600' : 'text-orange-600'}`}>
                        ({(outputStats?.rows || 0) >= inputStats.rows ? '+' : ''}{((outputStats?.rows || 0) - inputStats.rows)})
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Columns:</span>
                    <span className="font-medium">
                      {inputStats.columns} → {outputStats?.columns}
                      <span className={`ml-1 ${(outputStats?.columns || 0) >= inputStats.columns ? 'text-green-600' : 'text-orange-600'}`}>
                        ({(outputStats?.columns || 0) >= inputStats.columns ? '+' : ''}{((outputStats?.columns || 0) - inputStats.columns)})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
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
  onChatToggle,
  onShowRoadmap
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
          
          <div className="space-y-2">
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
            
            <motion.button
              onClick={() => {
                onShowRoadmap()
                onClose()
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 rounded-lg text-left flex items-center space-x-2"
            >
              <span className="text-purple-600">✨</span>
              <span className="text-sm font-medium">RoadMap of Rawbify</span>
              <span className="text-purple-600">🚀</span>
            </motion.button>
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
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false)
  const [overlayEnabled, setOverlayEnabled] = useState(true) // Toggle to enable/disable overlay
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [expandedEditorOpen, setExpandedEditorOpen] = useState(false)
  const [showRoadmapOverlay, setShowRoadmapOverlay] = useState(false)
  const pendingProcessResultsRef = useRef<(() => void) | null>(null)
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
    setCurrentPrompt(chatInput.trim())
    setChatInput('')
    setIsProcessing(true)

    // Show appropriate overlay based on whether this is first processing or subsequent question
    if (!hasProcessedData) {
      // First time processing - show processing overlay if enabled
      if (overlayEnabled) {
        setShowProcessingOverlay(true)
      } else {
        setIsTyping(true)
      }
    } else {
      // Subsequent questions - show roadmap overlay
      setShowRoadmapOverlay(true)
      return // Early return for subsequent questions
    }

    // Store API results and timing
    let apiResult: any = null
    let apiError: any = null
    const startTime = Date.now()

    try {
      if (!hasProcessedData) {
        // First processing - call the real API
        const inputFile = dataArrayToFile(dataState.inputData, dataState.inputFilename)
        apiResult = await processData({ 
          file: inputFile, 
          prompt: userMessage.content, 
          userId: dataState.userId 
        })
      } else {
        // Subsequent questions about the data - simulate for timing
        await new Promise(resolve => setTimeout(resolve, 1000))
        apiResult = { 
          success: true, 
          data: null, 
          message: 'The Current Version TrialV1 doesnt support multi-output, multi-changes. Stay Tuned for TrialV2. Till then, enjoy the demo.' 
        }
      }
    } catch (error) {
      console.error('Processing error:', error)
      apiError = error
    }

    const apiDuration = Date.now() - startTime
    const minimumDuration = 5000 // 5 seconds minimum
    const remainingTime = Math.max(0, minimumDuration - apiDuration)

    // Wait for remaining time if needed
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime))
    }

    // Process results after overlay completes (if enabled)
    const processResults = () => {
      try {
        if (apiError) {
          throw apiError
        }

        if (!hasProcessedData && apiResult?.success && apiResult?.data) {
          // Process the successful API result
          parseCsvBlob(apiResult.data).then(processedData => {
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
          })
        } else if (!hasProcessedData && apiResult && !apiResult.success) {
          // Handle API error
          const errorMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: `I apologize, but I encountered an error while processing your data: ${apiResult.error || 'Unknown error'}. Please try again with a different approach.`,
            timestamp: new Date()
          }
          setChatMessages(prev => [...prev, errorMessage])
        } else {
          // Subsequent questions about the data
          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: apiResult?.message || `The Current Version TrialV1 doesnt support multi-output, multi-changes. Stay Tuned for TrialV2. Till then, enjoy the demo.`,
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

    if (!hasProcessedData) {
      // Only process results for first-time processing
      if (overlayEnabled) {
        // Results will be processed when overlay is closed
        pendingProcessResultsRef.current = processResults
      } else {
        // Process results immediately if overlay is disabled
        processResults()
      }
    }
  }

  // Handle overlay completion
  const handleOverlayComplete = () => {
    setShowProcessingOverlay(false)
    // Process the pending results
    if (pendingProcessResultsRef.current) {
      pendingProcessResultsRef.current()
      pendingProcessResultsRef.current = null
    }
  }

  // Handle expanded editor
  const handleExpandEditor = () => {
    setExpandedEditorOpen(true)
  }

  const handleExpandedEditorSubmit = (text: string) => {
    setChatInput(text)
    // Automatically trigger the send message
    setTimeout(() => {
      const event = { key: 'Enter', shiftKey: false, preventDefault: () => {} }
      if (text.trim() && !isProcessing) {
        handleSendMessage()
      }
    }, 100)
  }

  // Handle roadmap overlay close
  const handleRoadmapClose = () => {
    setShowRoadmapOverlay(false)
    setIsProcessing(false)
    
    // Add the "limitation" message to chat
    const limitationMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: `TrialV1 supports only single input → single output processing. For additional transformations, please start a new session or wait for TrialV2! 🚀`,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, limitationMessage])
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
              
              {/* Mobile Roadmap Button */}
              <motion.button
                onClick={() => setShowRoadmapOverlay(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden relative"
              >
                <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-md">
                  <span>✨</span>
                  <span>RoadMap</span>
                  <span>🚀</span>
                </div>
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center - Roadmap Button */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <motion.button
                onClick={() => setShowRoadmapOverlay(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Subtle glow */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-20 blur-sm group-hover:opacity-30 transition-opacity" />
                
                {/* Main button */}
                <div className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <span>✨</span>
                    <span className="text-sm font-bold tracking-wide">RoadMap of Rawbify</span>
                    <span>🚀</span>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className="text-sm text-gray-600">Trial v1 Preview</span>
              
              {/* Overlay Toggle */}
              <button
                onClick={() => setOverlayEnabled(!overlayEnabled)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  overlayEnabled 
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={`${overlayEnabled ? 'Disable' : 'Enable'} processing overlay`}
              >
                {overlayEnabled ? '✨ Overlay ON' : '⚡ Overlay OFF'}
              </button>
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
        onShowRoadmap={() => setShowRoadmapOverlay(true)}
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
          onExpandEditor={handleExpandEditor}
        />
      </div>

      {/* Processing Overlay */}
      <ProcessingOverlay
        isVisible={showProcessingOverlay}
        onComplete={handleOverlayComplete}
        prompt={currentPrompt}
        enabled={overlayEnabled}
      />

      {/* Expanded Text Editor */}
      <ExpandedTextEditor
        isOpen={expandedEditorOpen}
        onClose={() => setExpandedEditorOpen(false)}
        onSubmit={handleExpandedEditorSubmit}
        initialText={chatInput}
        placeholder={
          !hasProcessedData 
            ? "Describe in detail how you want to transform your dataset..." 
            : "Ask detailed questions about your data..."
        }
        isProcessing={isProcessing}
        hasProcessedData={hasProcessedData}
      />

      {/* Roadmap Overlay */}
      <RoadmapOverlay
        isVisible={showRoadmapOverlay}
        onClose={handleRoadmapClose}
        enabled={true}
      />
    </div>
  )
} 