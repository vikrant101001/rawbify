'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, MessageSquare, CheckCircle, Lightbulb, Wand2 } from 'lucide-react'

interface PromptInputProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  isActive: boolean
}

export default function PromptInput({ prompt, onPromptChange, isActive }: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const examplePrompts = [
    "Clean this customer data and format it for Power BI analysis. Remove duplicates, standardize email formats, and add a revenue column.",
    "Prepare this sales data for Tableau dashboard. Fix date formats, remove empty rows, and calculate quarterly totals.",
    "Standardize this employee dataset for HR analytics. Normalize department names and add age categories.",
    "Clean financial data for budget analysis. Format currency values and group by cost centers."
  ]

  const [selectedExample, setSelectedExample] = useState(0)

  const handleExampleClick = (example: string) => {
    onPromptChange(example)
  }

  const characterCount = prompt.length
  const maxCharacters = 500

  return (
    <motion.div 
      className={`mb-12 ${!isActive ? 'opacity-50' : ''}`}
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
            prompt.trim() 
              ? 'bg-green-500 text-white' 
              : isActive 
                ? 'bg-gradient-to-r from-pink-500 to-red-600 text-white' 
                : 'bg-gray-300 text-gray-500'
          }`}
          whileHover={{ scale: 1.1 }}
          animate={isActive && !prompt.trim() ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: isActive && !prompt.trim() ? Infinity : 0 }}
        >
          {prompt.trim() ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Brain className="w-6 h-6" />
          )}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Tell Us What You Want
          </h3>
          <p className="text-gray-600">
            Describe your desired output for AI-powered data transformation
          </p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="modern-card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-pink-600" />
                Describe your desired output:
              </label>
              
              <motion.div
                className={`relative transition-all duration-300 ${
                  isFocused ? 'ring-4 ring-pink-500/20' : ''
                }`}
                animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
              >
                <textarea
                  value={prompt}
                  onChange={(e) => onPromptChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="e.g., 'Clean this customer data and format it for Power BI analysis. Remove duplicates, standardize email formats, and add a revenue column.'"
                  className="w-full h-40 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-500 disabled:bg-gray-100 text-lg leading-relaxed resize-none transition-all duration-300"
                  disabled={!isActive}
                  maxLength={maxCharacters}
                />
                
                {/* Character counter */}
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {characterCount}/{maxCharacters}
                </div>
                
                {/* AI Icon in corner */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Wand2 className="w-6 h-6 text-pink-400" />
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="text-sm text-gray-500 mt-3 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Lightbulb className="w-4 h-4 mr-1 text-yellow-500" />
                Be specific about what you want to achieve with your data for best results.
              </motion.p>
            </div>

            {/* Example Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Example Prompts
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {examplePrompts.map((example, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleExampleClick(example)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {example}
                      </p>
                    </div>
                    
                    <motion.div
                      className="mt-3 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Click to use this prompt →
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Processing Preview */}
            {prompt.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="modern-card p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-800">AI Prompt Ready!</h5>
                    <p className="text-sm text-green-600">Your instructions are clear and actionable</p>
                  </div>
                </div>
                
                <div className="bg-white/70 rounded-xl p-4">
                  <p className="text-sm text-gray-700 italic">
                    "{prompt.substring(0, 100)}{prompt.length > 100 ? '...' : ''}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 