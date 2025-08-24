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

// Embedded Studio Preview Component
function EmbeddedStudioPreview({ processedData, onShowWaitlist }: { processedData: any; onShowWaitlist: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    // Check if data is already in localStorage (from the real API call)
    const existingOriginalData = localStorage.getItem('rawbify_original_data')
    const existingProcessedData = localStorage.getItem('rawbify_processed_data')
    
    if (existingOriginalData && existingProcessedData) {
      console.log('✅ Found existing data in localStorage, using it for embedded studio')
      
      // Short delay to simulate loading
      setTimeout(() => {
        setIsLoading(false)
        setShowIframe(true)
      }, 1000)
    } else {
      console.log('⚠️  No data found in localStorage, preparing fallback demo data')
      
      // Prepare fallback demo data for the embedded studio
      const demoData = {
        filename: 'sales_data_demo.csv',
        data: [], // Will be populated with our sample data
        headers: ['id', 'sales_id', 'date', 'sales_rep_name', 'region', 'product_category', 'product_name', 'quantity_sold', 'unit_price', 'total_revenue', 'customer_type', 'deal_stage', 'close_date', 'sales_cycle_days', 'commission_rate'],
        userId: 'user_admin'
      }
      
      // Store demo data in localStorage for the embedded studio
      localStorage.setItem('rawbify_original_data', JSON.stringify(demoData))
      
      // Also store the processed data if available
      if (processedData?.processedRows) {
        const processedDataStorage = {
          data: processedData.processedRows,
          filename: 'customer_intelligence.csv',
          summary: processedData.processingSummary || ['Demo transformation completed'],
          prompt: 'Transform sales data into customer intelligence',
          userId: 'user_admin'
        }
        localStorage.setItem('rawbify_processed_data', JSON.stringify(processedDataStorage))
      }
      
      // Short delay to simulate loading
      setTimeout(() => {
        setIsLoading(false)
        setShowIframe(true)
      }, 2000)
    }
  }, [processedData])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white">Transformation Complete!</h2>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-xl text-gray-300 mb-6">
          Now experience the <strong>real Rawbify Data Studio</strong> with your transformed data
        </p>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Live Data Studio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Real Interface</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Working Features</span>
          </div>
        </div>
      </motion.div>

             {/* Embedded Studio Container */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-none"
       >
        {/* Studio Header */}
        <div className="bg-gradient-to-r from-slate-100 to-gray-100 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <img src="/rawbify_logo.svg" alt="Rawbify" className="h-6 w-auto" />
                <span className="font-bold text-gray-800">Rawbify Data Studio</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  LIVE DEMO
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Preview Mode</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>

                 {/* Embedded Studio Content */}
         <div className="relative h-[900px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">Loading Data Studio...</h3>
                <p className="text-gray-300">Preparing your transformed data</p>
                
                <div className="mt-6 space-y-2 max-w-xs mx-auto">
                  {[
                    { text: "Initializing workspace", completed: true },
                    { text: "Loading customer data", completed: true },
                    { text: "Setting up interface", completed: isLoading },
                    { text: "Ready to explore", completed: false }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-500 rounded-full" />
                      )}
                      <span className={step.completed ? 'text-green-300' : 'text-gray-400'}>
                        {step.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : showIframe ? (
            <motion.iframe
              src="/trialv1/view"
              className="w-full h-full border-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              onLoad={() => console.log('Studio loaded successfully')}
            />
          ) : null}
          
          {/* Overlay hint */}
          {showIframe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-medium"
            >
              👆 This is the real Data Studio!
            </motion.div>
          )}
        </div>
      </motion.div>

             {/* Get Rawbify Access Button - Above Studio */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: showIframe ? 1 : 0.5 }}
         className="text-center mb-8"
       >
         <motion.button
           onClick={onShowWaitlist}
           className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-2xl text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 relative overflow-hidden"
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
         >
           <div className="relative z-10 flex items-center space-x-3">
             <span>Get Rawbify Access</span>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </div>
           
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
         </motion.button>
       </motion.div>

       
    </div>
  )
}

// Keep the old component for reference but rename it
function _OriginalEnhancedStudioPreview({ processedData }: { processedData: any }) {
  const [activeTab, setActiveTab] = useState<'data' | 'chart' | 'code'>('data')
  const [downloadLoading, setDownloadLoading] = useState(false)

  const handleDownload = async (format: string) => {
    setDownloadLoading(true)
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDownloadLoading(false)
    
    // Create and download the actual file
    if (processedData?.data) {
      const url = URL.createObjectURL(processedData.data)
      const link = document.createElement('a')
      link.href = url
      link.download = `customer_intelligence.${format}`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Rawbify Data Studio</h2>
              <p className="text-purple-300">Professional data transformation workspace</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{processedData?.outputRows || 30}</div>
            <div className="text-purple-300 text-sm">Customer Insights</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Project Files</span>
            </div>
            <div className="text-sm text-gray-300">
              • sales_data_demo.csv<br/>
              • customer_intelligence.csv<br/>
              • transformation_log.txt
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="font-medium">Team Features</span>
            </div>
            <div className="text-sm text-gray-300">
              • Real-time collaboration<br/>
              • Version history<br/>
              • Share & export
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">AI Assistant</span>
            </div>
            <div className="text-sm text-gray-300">
              • Smart suggestions<br/>
              • Auto-optimization<br/>
              • Error detection
            </div>
          </div>
        </div>
      </motion.div>

      {/* Studio Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Studio Toolbar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="font-medium text-gray-700">customer_intelligence.csv</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                SAVED
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                {[
                  { id: 'data', label: 'Data View', icon: FileText },
                  { id: 'chart', label: 'Charts', icon: BarChart3 },
                  { id: 'code', label: 'Code', icon: Bot }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => handleDownload('csv')}
                  disabled={downloadLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {downloadLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Download CSV</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleDownload('xlsx')}
                  disabled={downloadLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {downloadLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Excel</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Content */}
        <div className="h-96 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'data' && (
              <motion.div
                key="data"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full overflow-auto"
              >
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50">
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
                    {(processedData?.processedRows || SAMPLE_OUTPUT_PREVIEW).slice(0, 8).map((row: any, index: number) => (
                      <motion.tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
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
                          ${typeof row.Total_Revenue === 'number' ? row.Total_Revenue.toLocaleString() : row.Total_Revenue}
                        </td>
                        <td className="py-3 px-3">{row.Customer_Type}</td>
                        <td className="py-3 px-3 font-semibold">{row.Deal_Count}</td>
                        <td className="py-3 px-3">{row.Primary_Region}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'chart' && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Charts & Visualizations</h3>
                  <p className="text-gray-600 mb-4">
                    Interactive charts and dashboards are available in the full studio
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                    <div className="text-sm text-blue-700">
                      <strong>Coming in Full Version:</strong><br/>
                      • Revenue trend charts<br/>
                      • Customer segmentation pie charts<br/>
                      • Regional performance maps<br/>
                      • Interactive dashboards
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <div className="bg-gray-900 rounded-lg p-4 h-full overflow-auto">
                  <div className="text-green-400 font-mono text-sm">
                    <div className="text-gray-500"># Generated transformation code</div>
                    <div className="text-blue-400">import pandas as pd</div>
                    <div className="text-blue-400">import numpy as np</div>
                    <br/>
                    <div className="text-gray-500"># Load and process data</div>
                    <div className="text-white">df = pd.read_csv('sales_data_demo.csv')</div>
                    <br/>
                    <div className="text-gray-500"># Group by customer and calculate metrics</div>
                    <div className="text-white">customer_data = df.groupby('sales_id').agg({`{`}</div>
                    <div className="text-white ml-4">'total_revenue': 'sum',</div>
                    <div className="text-white ml-4">'customer_type': 'first',</div>
                    <div className="text-white ml-4">'deal_count': 'size'</div>
                    <div className="text-white">{`}`})</div>
                    <br/>
                    <div className="text-gray-500"># Create customer tiers</div>
                    <div className="text-white">revenue_quantiles = customer_data['total_revenue'].quantile([0.2, 0.8])</div>
                    <div className="text-white">customer_data['Customer_Tier'] = np.where(</div>
                    <div className="text-white ml-4">customer_data['total_revenue'] {`>=`} revenue_quantiles[0.8], 'High',</div>
                    <div className="text-white ml-4">np.where(customer_data['total_revenue'] {`>=`} revenue_quantiles[0.2], 'Medium', 'Low')</div>
                    <div className="text-white">)</div>
                    <br/>
                    <div className="text-gray-500"># Export results</div>
                    <div className="text-white">customer_data.to_csv('customer_intelligence.csv')</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-2xl p-8 text-white text-center"
      >
        <Star className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-4">Ready for the Full Studio Experience?</h3>
        <p className="text-xl mb-6 text-purple-100">
          This is just a preview! Get access to the complete Rawbify Data Studio with advanced features, 
          team collaboration, and unlimited transformations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">Advanced Analytics</div>
            <div className="text-sm text-purple-200">ML models, forecasting, trends</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">Team Collaboration</div>
            <div className="text-sm text-purple-200">Share, comment, work together</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">API Integration</div>
            <div className="text-sm text-purple-200">Connect your tools & workflows</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

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
  
  // Auto-hide narrator after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

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
      autoNext: true,
      delay: 0 // Will be handled by typing completion
    },
    {
      id: 'processing',
      title: 'AI Transformation',
      subtitle: 'Real-time data processing in action',
      autoNext: true,
      delay: 0 // Will be handled by processing completion
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
        if (currentPhase === 0) {
          // Move from welcome to prompt entry
          setCurrentPhase(1)
          setTimeout(() => {
            setShowPrompt(true)
          }, 1000)
        }
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
          // Auto-move to processing phase after typing completes
          setTimeout(() => {
            setCurrentPhase(2)
            // Start processing immediately
            setTimeout(async () => {
              await startProcessing()
            }, 1000)
          }, 2000) // Wait 2 seconds after typing completes
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [showPrompt, typingIndex, currentPhase])



  const startProcessing = async () => {
    setIsProcessing(true)
    
    try {
      console.log('🚀 Demo Mode: Calling REAL Rawbify API...')
      
      // Load the sample CSV data
      const csvResponse = await fetch('/sample-data/sales_data_demo.csv')
      const csvContent = await csvResponse.text()
      
      // Create a File object from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' })
      const csvFile = new File([csvBlob], 'sales_data_demo.csv', { type: 'text/csv' })
      
      console.log('📤 Calling Rawbify API with:', {
        filename: csvFile.name,
        prompt: DEMO_PROMPT,
        userId: DEMO_USER_ID
      })
      
      // Call the REAL API
      const apiResult = await processData({
        file: csvFile,
        prompt: DEMO_PROMPT,
        userId: DEMO_USER_ID
      })
      
      if (apiResult.success && apiResult.data) {
        console.log('✅ Real API call successful!', apiResult)
        
        // Parse the processed CSV data
        const processedCsv = await apiResult.data.text()
        const outputLines = processedCsv.split('\n').filter(line => line.trim())
        const outputHeaders = outputLines[0].split(',')
        const outputData = outputLines.slice(1).map((line, index) => {
          const values = line.split(',')
          const row: any = { id: index + 1 }
          outputHeaders.forEach((header, i) => {
            row[header.trim()] = values[i]?.trim() || ''
          })
          return row
        })
        
        // Store data in localStorage for the embedded studio
        const originalData = {
          filename: 'sales_data_demo.csv',
          data: csvContent.split('\n').slice(1).filter(line => line.trim()).map((line, index) => {
            const values = line.split(',')
            const row: any = { id: index + 1 }
            const headers = csvContent.split('\n')[0].split(',')
            headers.forEach((header, i) => {
              row[header.trim()] = values[i]?.trim() || ''
            })
            return row
          }),
          headers: csvContent.split('\n')[0].split(','),
          userId: DEMO_USER_ID
        }
        
        console.log('📊 Original data prepared:', {
          rows: originalData.data.length,
          headers: originalData.headers.length,
          sampleRow: originalData.data[0]
        })
        
        const processedDataStorage = {
          data: outputData,
          filename: 'customer_intelligence.csv',
          summary: apiResult.processingSummary || ['Demo transformation completed'],
          prompt: DEMO_PROMPT,
          userId: DEMO_USER_ID
        }
        
        localStorage.setItem('rawbify_original_data', JSON.stringify(originalData))
        localStorage.setItem('rawbify_processed_data', JSON.stringify(processedDataStorage))
        
        console.log('💾 Data stored in localStorage for embedded studio')
        const storedOriginal = localStorage.getItem('rawbify_original_data')
        const storedProcessed = localStorage.getItem('rawbify_processed_data')
        console.log('📋 Original data in localStorage:', storedOriginal ? JSON.parse(storedOriginal) : 'Not found')
        console.log('📋 Processed data in localStorage:', storedProcessed ? JSON.parse(storedProcessed) : 'Not found')
        
        setProcessedData({
          success: true,
          data: apiResult.data,
          processedRows: outputData,
          inputRows: 793,
          outputRows: outputData.length,
          processingSummary: apiResult.processingSummary || [
            `🔄 Processed 793 sales transactions`,
            `👥 Identified ${outputData.length} unique customers`,
            `📊 Applied business logic and customer segmentation`,
            `💰 Calculated revenue metrics and deal analytics`,
            `📈 Data optimized for PowerBI and Tableau import`
          ]
        })
      } else {
        throw new Error(apiResult.error || 'API call failed')
      }
      
    } catch (error) {
      console.error('❌ Real API call failed, falling back to demo data:', error)
      
      // Fallback to demo data
      await simulateProcessingDelay(2000, 3000)
      
              // Load the pre-generated output file as fallback
        try {
          // First load the original sample data
          const originalResponse = await fetch('/sample-data/sales_data_demo.csv')
          const originalCsv = await originalResponse.text()
          
          const originalLines = originalCsv.split('\n').filter(line => line.trim())
          const originalHeaders = originalLines[0].split(',')
          const originalData = originalLines.slice(1).map((line, index) => {
            const values = line.split(',')
            const row: any = { id: index + 1 }
            originalHeaders.forEach((header, i) => {
              row[header.trim()] = values[i]?.trim() || ''
            })
            return row
          })
          
          // Then load the processed output data
          const outputResponse = await fetch('/sample-data/sales_data_output_demo.csv')
          const outputCsv = await outputResponse.text()
          
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
          
          // Store fallback data in localStorage
          const originalDataStorage = {
            filename: 'sales_data_demo.csv',
            data: originalData,
            headers: originalHeaders,
            userId: DEMO_USER_ID
          }
        
        const processedDataStorage = {
          data: outputData,
          filename: 'customer_intelligence.csv',
          summary: ['Demo transformation completed'],
          prompt: DEMO_PROMPT,
          userId: DEMO_USER_ID
        }
        
        localStorage.setItem('rawbify_original_data', JSON.stringify(originalDataStorage))
        localStorage.setItem('rawbify_processed_data', JSON.stringify(processedDataStorage))
        
        console.log('💾 Fallback data stored in localStorage')
        console.log('📋 Fallback original data:', originalDataStorage)
        console.log('📋 Fallback processed data:', processedDataStorage)
        
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
            `📊 Created customer tiers: High/Medium/Low revenue`,
            `💰 Calculated metrics: Total Revenue, Deal Count, Avg Deal Size`,
            `📈 Data optimized for PowerBI and Tableau import`
          ]
        })
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError)
        // Ultimate fallback to static data
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
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to Data Studio</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              This is where analysts transform data into insights. Watch the AI work its magic!
            </p>
          </motion.div>
        )

      case 1:
        return (
          <div className="space-y-8">
            {/* Chat Interface */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
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
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <div className="flex items-center mb-3">
                      <Brain className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="font-medium text-white">Transformation Prompt</span>
                      {showPrompt && (
                        <motion.div
                          className="ml-auto flex items-center text-green-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Auto-entering...</span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 font-mono text-sm min-h-[150px]">
                      {showPrompt ? (
                        <>
                          <span className="text-green-300">{promptText}</span>
                          <motion.span
                            className="inline-block w-2 h-5 bg-purple-400 ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        </>
                      ) : (
                        <span className="text-gray-500">Prompt will appear here...</span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 text-center border border-blue-400/30">
                      <div className="text-2xl font-bold text-blue-400">{TRANSFORMATION_STATS.input.rows}</div>
                      <div className="text-blue-300 font-medium">Input Rows</div>
                      <div className="text-blue-200 text-sm">{TRANSFORMATION_STATS.input.description}</div>
                    </div>
                    <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-400/30">
                      <div className="text-2xl font-bold text-purple-400">→</div>
                      <div className="text-purple-300 font-medium">AI Transform</div>
                      <div className="text-purple-200 text-sm">Business Logic</div>
                    </div>
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 text-center border border-green-400/30">
                      <div className="text-2xl font-bold text-green-400">{TRANSFORMATION_STATS.output.rows}</div>
                      <div className="text-green-300 font-medium">Customer Insights</div>
                      <div className="text-green-200 text-sm">{TRANSFORMATION_STATS.output.description}</div>
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
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
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
                
                <h2 className="text-3xl font-bold text-white mb-4">AI Processing Your Data</h2>
                <p className="text-xl text-gray-300 mb-8">
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
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <motion.div
                          className="w-5 h-5 border-2 border-purple-400 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      <span className={`${step.completed ? 'text-green-300' : 'text-gray-300'} font-medium`}>
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
        return <EmbeddedStudioPreview processedData={processedData} onShowWaitlist={() => setShowWaitlistCTA(true)} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      {/* Header */}
      <header className="relative z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto filter brightness-0 invert" />
              <span className="text-xl font-bold text-white">Data Studio</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-2"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 text-green-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                ✨ Live Demo
              </span>
              <div className="text-sm text-gray-400 font-mono">
                Phase {currentPhase + 1} of {phases.length}
              </div>
            </div>
          </div>
        </div>
      </header>

             {/* Main Content */}
       <main className="relative z-10 max-w-none mx-auto px-6 py-8">
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
