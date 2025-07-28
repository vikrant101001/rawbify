'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Send, 
  Sparkles, 
  Type, 
  Zap,
  Maximize2,
  Wand2
} from 'lucide-react'

interface ExpandedTextEditorProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (text: string) => void
  initialText?: string
  placeholder?: string
  isProcessing?: boolean
  hasProcessedData?: boolean
}

const ExpandedTextEditor = ({
  isOpen,
  onClose,
  onSubmit,
  initialText = '',
  placeholder = "Tell me what you'd like me to do with your dataset...",
  isProcessing = false,
  hasProcessedData = false
}: ExpandedTextEditorProps) => {
  const [text, setText] = useState(initialText)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // Update counts when text changes
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
    setWordCount(text.trim() === '' ? 0 : words)
    setCharCount(text.length)
  }, [text])

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Reset text when initial text changes
  useEffect(() => {
    setText(initialText)
  }, [initialText])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, text])

  const handleSubmit = () => {
    if (text.trim() && !isProcessing) {
      onSubmit(text.trim())
      setText('')
      onClose()
    }
  }

  const handleMagicButton = () => {
    // Future feature - for now just a subtle animation
    console.log('✨ Magic button clicked - future feature!')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Type className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Enhanced Editor
                </h2>
                <p className="text-sm text-gray-600">
                  {hasProcessedData ? "Ask questions about your data" : "Describe how you want to transform your data"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Magic Button */}
              <motion.button
                onClick={handleMagicButton}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg flex items-center justify-center transition-all shadow-lg"
                title="AI Assistant (Coming Soon)"
              >
                <Wand2 className="w-5 h-5 text-white" />
              </motion.button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Textarea */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                disabled={isProcessing}
                className={`w-full h-full resize-none border-2 border-gray-200 focus:border-blue-500 focus:outline-none rounded-xl p-6 text-lg leading-relaxed transition-all ${
                  isProcessing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                }`}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  lineHeight: '1.6'
                }}
              />
              
              {/* Floating word count */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
                <span className="font-medium">{wordCount}</span> words • <span className="font-medium">{charCount}</span> characters
              </div>
            </div>

            {/* Quick Suggestions (only show when no processed data) */}
            {!hasProcessedData && text.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                  Quick Suggestions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Clean and standardize column names",
                    "Remove duplicate rows from the dataset",
                    "Generate summary statistics for all columns",
                    "Convert date columns to proper format",
                    "Fill missing values with appropriate defaults"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setText(suggestion)}
                      className="text-sm bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-400 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="hidden sm:inline">💡 Tip: Press </span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                  {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+Enter
                </kbd>
                <span className="hidden sm:inline"> to send</span>
                <span className="sm:hidden">to send</span>
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">
                  Esc
                </kbd>
                <span className="hidden sm:inline"> to close</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={!text.trim() || isProcessing}
                  whileHover={!text.trim() || isProcessing ? {} : { scale: 1.02 }}
                  whileTap={!text.trim() || isProcessing ? {} : { scale: 0.98 }}
                  className={`px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
                    text.trim() && !isProcessing
                      ? hasProcessedData
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : hasProcessedData ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Ask Question</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Transform Data</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExpandedTextEditor 