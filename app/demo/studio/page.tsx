'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Bot, 
  Send, 
  Loader, 
  Brain, 
  Zap,
  ChevronRight,
  Eye,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Users,
  TrendingUp,
  Star,
  Crown,
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { processData } from '../../services/api'
import DemoWaitlistCTA from '../../components/demo/DemoWaitlistCTA'
import { 
  DEMO_PROMPT, 
  DEMO_USER_ID,
  TRANSFORMATION_STATS,
  SAMPLE_OUTPUT_PREVIEW,
  simulateProcessingDelay
} from '../../utils/demoData'

export default function DemoStudio() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptText, setPromptText] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [processedData, setProcessedData] = useState<any>(null)
  const [showSubtitle, setShowSubtitle] = useState(true)
  const [showWaitlistCTA, setShowWaitlistCTA] = useState(false)
  const [typingIndex, setTypingIndex] = useState(0)

  const phases = [
    {
      id: 'welcome',
      title: 'Data Studio Loaded',
      subtitle: 'Your professional workspace is ready',
      autoNext: true,
      delay: 2000
    },
    {
      id: 'prompt-entry',
      title: 'AI Prompt Assistant',
      subtitle: 'Watch as we automatically enter the transformation request',
      autoNext: false,
      delay: 0
    },
    {
      id: 'processing',
      title: 'AI Transformation',
      subtitle: 'Real-time data processing in action',
      autoNext: false,
      delay: 0
    },
    {
      id: 'results',
      title: 'Transformation Complete',
      subtitle: 'Beautiful, actionable business intelligence',
      autoNext: false,
      delay: 0
    }
  ]

  const subtitleMessages = [
    {
      speaker: "NARRATOR",
      text: "Welcome to Data Studio",
      subtitle: "This is where the magic happens! Professional analysts use this interface to transform raw data into business insights.",
      color: "text-blue-400"
    },
    {
      speaker: "AI ASSISTANT",
      text: "AI Prompt Magic",
      subtitle: "Watch as we automatically enter a sophisticated prompt that tells our AI exactly how to transform your sales data into customer intelligence.",
      color: "text-green-400"
    },
    {
      speaker: "SYSTEM",
      text: "Live Processing",
      subtitle: "Our AI is now analyzing 793 rows of sales data, applying business logic, and creating customer segments. This usually takes 10+ hours manually!",
      color: "text-purple-400"
    },
    {
      speaker: "NARRATOR",
      text: "Amazing Results!",
      subtitle: "793 messy sales records have become 739 clean customer insights! This data is now ready for PowerBI, Tableau, or any dashboard tool.",
      color: "text-yellow-400"
    }
  ]

  // Auto-progression logic
  useEffect(() => {
    const phase = phases[currentPhase]
    if (phase?.autoNext && phase.delay > 0) {
      const timer = setTimeout(() => {
        handleNext()
      }, phase.delay)
      return () => clearTimeout(timer)
    }
  }, [currentPhase])

  // Typing effect for prompt
  useEffect(() => {
    if (currentPhase === 1 && showPrompt) {
      const timer = setInterval(() => {
        if (typingIndex < DEMO_PROMPT.length) {
          setPromptText(DEMO_PROMPT.slice(0, typingIndex + 1))
          setTypingIndex(prev => prev + 1)
        } else {
          clearInterval(timer)
          setTimeout(() => setCurrentPhase(2), 1000)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [showPrompt, typingIndex, currentPhase])

  const handleNext = async () => {
    if (currentPhase === 0) {
      setCurrentPhase(1)
      setTimeout(() => {
        setShowPrompt(true)
      }, 1000)
    } else if (currentPhase === 1) {
      setCurrentPhase(2)
      // Start processing immediately
      await startProcessing()
    } else if (currentPhase === 3) {
      setShowWaitlistCTA(true)
    }
  }

  const startProcessing = async () => {
    setIsProcessing(true)
    
    // Demo Mode: Use pre-generated output for reliable demo experience
    try {
      console.log('🎬 Demo Mode: Simulating Rawbify AI transformation...')
      
      // Show realistic processing time
      await simulateProcessingDelay(3000, 5000)
      
      // Load the pre-generated output file (simulates API response)
      const outputResponse = await fetch('/sample-data/sales_data_output_demo.csv')
      const outputCsv = await outputResponse.text()
      
      // Parse the output CSV into structured data
      const outputLines = outputCsv.split('\n').filter(line => line.trim())
      const outputHeaders = outputLines[0].split(',')
      const outputData = outputLines.slice(1).map((line, index) => {
        const values = line.split(',')
        const row: any = { id: index + 1 }
        outputHeaders.forEach((header, i) => {
          row[header.trim()] = values[i]?.trim() || ''
        })
        return row
      })
      
      console.log('✅ Transformation complete! Generated', outputData.length, 'customer insights')
      
      // Create realistic result object
      const csvBlob = new Blob([outputCsv], { type: 'text/csv' })
      setProcessedData({
        success: true,
        data: csvBlob,
        processedRows: outputData,
        inputRows: 793,
        outputRows: outputData.length,
        processingSummary: [
          `🔄 Processed 793 sales transactions`,
          `👥 Identified ${outputData.length} unique customers`, 
          `📊 Created customer tiers: High (${outputData.filter(r => r.Customer_Tier === 'High').length}), Medium (${outputData.filter(r => r.Customer_Tier === 'Medium').length}), Low (${outputData.filter(r => r.Customer_Tier === 'Low').length})`,
          `💰 Calculated revenue metrics and deal analytics`,
          `📈 Data optimized for PowerBI and Tableau import`
        ]
      })
    } catch (error) {
      // Ultimate fallback
      console.log('⚠️  Demo file unavailable, using static fallback:', error)
      await simulateProcessingDelay(2000, 3000)
      setProcessedData({
        success: true,
        data: SAMPLE_OUTPUT_PREVIEW,
        processingSummary: [
          'Transformed 793 rows into 739 customer insights', 
          'Applied business logic and customer segmentation', 
          'Created customer tiers: High/Medium/Low revenue', 
          'Calculated metrics: Total Revenue, Deal Count, Avg Deal Size',
          'Data optimized for PowerBI and Tableau import'
        ]
      })
    }
    
    setIsProcessing(false)
    setCurrentPhase(3)
    setShowResults(true)
  }

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eye className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Data Studio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              This is where analysts transform data into insights. Watch the AI work its magic!
            </p>
          </motion.div>
        )

      case 1:
        return (
          <div className="space-y-8">
            {/* Chat Interface */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">AI Transformation Assistant</h3>
                  <div className="flex-1"></div>
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-white/80 text-sm">Live</span>
                </div>
              </div>
              
              <div className="p-6 min-h-[300px]">
                <div className="space-y-4">
                  {/* AI Prompt Input */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <Brain className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="font-medium text-gray-800">Transformation Prompt</span>
                      {showPrompt && (
                        <motion.div
                          className="ml-auto flex items-center text-green-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Auto-entering...</span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm min-h-[150px]">
                      {showPrompt ? (
                        <>
                          <span className="text-gray-700">{promptText}</span>
                          <motion.span
                            className="inline-block w-2 h-5 bg-purple-600 ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        </>
                      ) : (
                        <span className="text-gray-400">Prompt will appear here...</span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{TRANSFORMATION_STATS.input.rows}</div>
                      <div className="text-blue-700 font-medium">Input Rows</div>
                      <div className="text-blue-600 text-sm">{TRANSFORMATION_STATS.input.description}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">→</div>
                      <div className="text-purple-700 font-medium">AI Transform</div>
                      <div className="text-purple-600 text-sm">Business Logic</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{TRANSFORMATION_STATS.output.rows}</div>
                      <div className="text-green-700 font-medium">Customer Insights</div>
                      <div className="text-green-600 text-sm">{TRANSFORMATION_STATS.output.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            {/* Processing Animation */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-center">
                <motion.div
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full flex items-center justify-center relative overflow-hidden"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-16 h-16 text-white z-10" />
                  
                  {/* Processing waves */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-4 border-white/30 rounded-full"
                      animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.7
                      }}
                    />
                  ))}
                </motion.div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">AI Processing Your Data</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Transforming 793 sales records into customer intelligence...
                </p>
                
                {/* Processing Steps */}
                <div className="space-y-4 max-w-2xl mx-auto">
                  {[
                    { text: "Analyzing data structure and quality", completed: true },
                    { text: "Grouping sales records by customer", completed: true },
                    { text: "Calculating revenue metrics and segments", completed: isProcessing },
                    { text: "Creating customer intelligence insights", completed: false },
                    { text: "Optimizing for dashboard import", completed: false }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <motion.div
                          className="w-5 h-5 border-2 border-purple-500 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      <span className={`${step.completed ? 'text-green-700' : 'text-gray-600'} font-medium`}>
                        {step.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            {/* Success Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Transformation Complete! 🎉</h2>
              <p className="text-xl text-gray-600">
                Your messy sales data is now beautiful customer intelligence
              </p>
            </motion.div>

            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-red-800">Before: Raw Sales Data</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="text-red-600 font-mono text-sm">793 rows × 15 columns</div>
                    <div className="text-red-700 text-sm">Messy, unorganized transactions</div>
                  </div>
                  <div className="text-red-600 text-sm space-y-1">
                    <div>• Missing values and inconsistent formats</div>
                    <div>• No customer grouping or insights</div>
                    <div>• Raw transactional data</div>
                    <div>• Hours of manual work needed</div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-green-800">After: Customer Intelligence</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-green-600 font-mono text-sm">
                      {processedData?.outputRows || 739} customers × 8 insights
                    </div>
                    <div className="text-green-700 text-sm">Clean, actionable business data</div>
                  </div>
                  <div className="text-green-600 text-sm space-y-1">
                    <div>• Customer tiers and segments</div>
                    <div>• Revenue and performance metrics</div>
                    <div>• Dashboard-ready format</div>
                    <div>• PowerBI/Tableau optimized</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Output Table */}
            {showResults && processedData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <h3 className="text-white font-bold text-lg">Customer Intelligence Results</h3>
                  <p className="text-green-100">Ready for PowerBI, Tableau, or any dashboard tool</p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Customer Tier</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Customer ID</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Total Revenue</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Customer Type</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Deal Count</th>
                          <th className="text-left py-3 px-3 font-semibold text-gray-700">Primary Region</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(processedData?.processedRows || SAMPLE_OUTPUT_PREVIEW).slice(0, 5).map((row: any, index: number) => (
                          <motion.tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <td className="py-3 px-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                row.Customer_Tier === 'High' ? 'bg-green-100 text-green-800' :
                                row.Customer_Tier === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {row.Customer_Tier}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono text-blue-600">{row.Customer_ID}</td>
                            <td className="py-3 px-3 font-bold text-green-600">
                              ${row.Total_Revenue.toLocaleString()}
                            </td>
                            <td className="py-3 px-3">{row.Customer_Type}</td>
                            <td className="py-3 px-3 font-semibold">{row.Deal_Count}</td>
                            <td className="py-3 px-3">{row.Primary_Region}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 text-green-600 font-medium">
                      <CheckCircle className="w-5 h-5" />
                      <span>{processedData?.outputRows || 739} customers ready for analysis</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-800">Data Studio</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✨ Live Demo
              </span>
              <div className="text-sm text-gray-600">
                Phase {currentPhase + 1} of {phases.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderPhaseContent()}
          </motion.div>
        </AnimatePresence>

        {/* Continue Button */}
        {!phases[currentPhase]?.autoNext && currentPhase < phases.length && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={handleNext}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative z-10 flex items-center space-x-3">
                <span>
                  {currentPhase === 1 ? 'Start AI Processing' : 
                   currentPhase === 3 ? 'Get Rawbify Access' : 'Continue'}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Cinematic Subtitles */}
      {showSubtitle && subtitleMessages[currentPhase] && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`font-bold text-lg font-mono ${subtitleMessages[currentPhase].color}`}>
                  {subtitleMessages[currentPhase].speaker}
                </div>
                
                <button
                  onClick={() => setShowSubtitle(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-white text-xl font-medium mb-2">
                {subtitleMessages[currentPhase].text}
              </div>

              <div className="text-gray-300 text-lg italic opacity-90">
                {subtitleMessages[currentPhase].subtitle}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Waitlist CTA */}
      <DemoWaitlistCTA
        isVisible={showWaitlistCTA}
        onClose={() => setShowWaitlistCTA(false)}
      />
    </div>
  )
}
