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
  Eye,
  Maximize2,
  ArrowRight,
  Home,
  BarChart3,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Layers,
  Grid3X3,
  Table,
  Settings,
  Maximize,
  Minimize,
  RefreshCw,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Play,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Wand2,
  Target,
  Workflow,
  FileSpreadsheet,
  BarChart,
  PieChart,
  LineChart
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

// Mock data for the demonstration
const mockInputData = [
  { id: 1, "Customer ID": "CUST-001", "Customer Name": "Tech Solutions Inc", "Email": "contact@techsolutions.com", "Revenue": "$45,000", "Status": "Active", "Phone": "(555) 123-4567", "Date Joined": "2024-01-15" },
  { id: 2, "Customer ID": "CUST-002", "Customer Name": "Global Industries", "Email": "info@globalind.com", "Revenue": "$78,500", "Status": "Active", "Phone": "(555) 234-5678", "Date Joined": "2024-02-03" },
  { id: 3, "Customer ID": "CUST-003", "Customer Name": "Smart Systems", "Email": "hello@smartsys.com", "Revenue": "$32,000", "Status": "Pending", "Phone": "(555) 345-6789", "Date Joined": "2024-02-10" },
  { id: 4, "Customer ID": "CUST-004", "Customer Name": "Innovation Labs", "Email": "team@innovate.com", "Revenue": "$95,200", "Status": "Active", "Phone": "(555) 456-7890", "Date Joined": "2024-02-18" },
  { id: 5, "Customer ID": "CUST-005", "Customer Name": "Future Dynamics", "Email": "sales@future.com", "Revenue": "$67,800", "Status": "Active", "Phone": "(555) 567-8901", "Date Joined": "2024-03-01" }
]

const mockOutputData = [
  { id: 1, "Customer ID": "CUST-001", "Customer Name": "Tech Solutions Inc", "Customer Segment": "Enterprise", "Revenue": 45000, "Revenue Category": "Mid-tier", "Status": "Active", "Lifetime Value": "$135,000", "Risk Score": "Low" },
  { id: 2, "Customer ID": "CUST-002", "Customer Name": "Global Industries", "Customer Segment": "Enterprise", "Revenue": 78500, "Revenue Category": "High-value", "Status": "Active", "Lifetime Value": "$235,500", "Risk Score": "Low" },
  { id: 3, "Customer ID": "CUST-003", "Customer Name": "Smart Systems", "Customer Segment": "SMB", "Revenue": 32000, "Revenue Category": "Mid-tier", "Status": "Pending", "Lifetime Value": "$96,000", "Risk Score": "Medium" },
  { id: 4, "Customer ID": "CUST-004", "Customer Name": "Innovation Labs", "Customer Segment": "Enterprise", "Revenue": 95200, "Revenue Category": "High-value", "Status": "Active", "Lifetime Value": "$285,600", "Risk Score": "Low" },
  { id: 5, "Customer ID": "CUST-005", "Customer Name": "Future Dynamics", "Customer Segment": "SMB", "Revenue": 67800, "Revenue Category": "Mid-tier", "Status": "Active", "Lifetime Value": "$203,400", "Risk Score": "Low" }
]

const mockProcessingSummary = [
  "Added customer segmentation based on revenue patterns",
  "Categorized revenue into High-value, Mid-tier, and Low-value", 
  "Calculated lifetime value projections using 3x multiplier",
  "Generated risk scores based on status and engagement metrics",
  "Standardized revenue format from currency to numeric values"
]

export default function WorkflowStudio() {
  const router = useRouter()
  const params = useParams()
  const workflowId = params.id as string
  const isMockWorkflow = workflowId === 'mock'
  
  const [activeView, setActiveView] = useState<'overview' | 'data' | 'insights'>('data')
  const [activeDataset, setActiveDataset] = useState<'input' | 'output'>('output')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [showAIChat, setShowAIChat] = useState(false)
  const [workflowData, setWorkflowData] = useState({
    inputData: mockInputData,
    outputData: mockOutputData,
    inputFilename: isMockWorkflow ? 'customer_data.csv' : 'uploaded_data.csv',
    outputFilename: isMockWorkflow ? 'customer_intelligence.csv' : 'processed_data.csv',
    processingSummary: mockProcessingSummary
  })

  // Initialize welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'assistant',
      content: isMockWorkflow 
        ? '✨ Welcome to Rawbify! I\'ve transformed your customer data with AI-powered intelligence. Ready to explore insights or need help with anything?'
        : '✨ Your data transformation is complete! I\'m here to help you understand the results and optimize your workflow.',
      timestamp: new Date()
    }
    setChatMessages([welcomeMessage])
  }, [isMockWorkflow])

  const currentData = activeDataset === 'input' ? workflowData.inputData : workflowData.outputData
  const columns = Object.keys(currentData[0] || {}).filter(key => key !== 'id')
  
  // Filter data based on search
  const filteredData = currentData.filter(row => 
    searchQuery === '' || Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    setTimeout(() => {
      let assistantResponse = ''
      
      if (isMockWorkflow) {
        const mockResponses = [
          "🎯 I can see your customer data has great potential! The segmentation shows 60% Enterprise vs 40% SMB customers. Want me to dive deeper into revenue optimization strategies?",
          "💡 Your high-value customers generate 2.4x more revenue on average. I can help you identify patterns to convert more mid-tier customers to this segment.",
          "📊 The risk analysis shows most customers are low-risk, which is excellent! I can help you create targeted campaigns for the medium-risk accounts.",
          "🚀 Your data is now PowerBI-ready! I can suggest the best visualization strategies for these customer insights."
        ]
        assistantResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      } else {
        const realResponses = [
          "I can help you analyze your data transformations, create custom insights, and optimize your workflow based on the processed results.",
          "Your data shows interesting patterns. Would you like me to dive deeper into specific segments or metrics?",
          "Based on your transformation results, I can suggest additional optimizations or help you understand the business impact.",
          "What specific aspect of your processed data would you like to explore further?"
        ]
        assistantResponse = realResponses[Math.floor(Math.random() * realResponses.length)]
      }
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleExport = () => {
    if (currentData.length === 0) return

    const headers = columns.join(',')
    const rows = currentData.map(row => 
      columns.map(col => `"${row[col as keyof typeof row] || ''}"`).join(',')
    ).join('\n')
    
    const content = `${headers}\n${rows}`
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${activeDataset === 'input' ? workflowData.inputFilename : workflowData.outputFilename}`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    
    setShowExportMenu(false)
  }

  const getMetrics = () => {
    const inputRows = workflowData.inputData.length
    const outputRows = workflowData.outputData.length
    const inputCols = Object.keys(workflowData.inputData[0] || {}).length - 1
    const outputCols = Object.keys(workflowData.outputData[0] || {}).length - 1
    
    return {
      rowsProcessed: outputRows,
      columnsAdded: outputCols - inputCols,
      dataQuality: "98.5%",
      processingTime: "2.3s"
    }
  }

  const metrics = getMetrics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating AI Assistant Button */}
      <motion.button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Ask AI anything about your data ✨
        </div>
      </motion.button>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white/80 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Customer Intelligence Studio
                  </h1>
                  <p className="text-purple-200 text-sm">
                    AI-powered data transformation workspace
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Processing Complete</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-6 text-sm text-purple-200">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                  <Database className="w-4 h-4 text-blue-300" />
                  <span>{metrics.rowsProcessed} rows</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span>+{metrics.columnsAdded} insights</span>
                </div>
              </div>

              {/* Export Button */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 border border-white/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <AnimatePresence>
                  {showExportMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                    >
                      <div className="p-2">
                        <button
                          onClick={handleExport}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <FileSpreadsheet className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">PowerBI Ready CSV</div>
                              <div className="text-sm text-gray-500">Optimized for import</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'data', label: 'Data Studio', icon: Table },
              { id: 'insights', label: 'AI Insights', icon: Brain }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeView === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-t-2xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white border-b-2 border-purple-400'
                      : 'text-purple-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {activeView === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Hero Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Rows Processed', 
                  value: metrics.rowsProcessed, 
                  icon: Database, 
                  gradient: 'from-blue-500 to-cyan-500',
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-400/30'
                },
                { 
                  label: 'AI Insights Added', 
                  value: `+${metrics.columnsAdded}`, 
                  icon: Brain, 
                  gradient: 'from-purple-500 to-pink-500',
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-400/30'
                },
                { 
                  label: 'Data Quality', 
                  value: metrics.dataQuality, 
                  icon: CheckCircle, 
                  gradient: 'from-emerald-500 to-green-500',
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-400/30'
                },
                { 
                  label: 'Processing Time', 
                  value: metrics.processingTime, 
                  icon: Zap, 
                  gradient: 'from-orange-500 to-red-500',
                  bg: 'bg-orange-500/10',
                  border: 'border-orange-400/30'
                }
              ].map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${metric.bg} backdrop-blur-xl rounded-2xl p-6 border ${metric.border} hover:scale-105 transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">{metric.label}</p>
                        <p className="text-white text-3xl font-bold mt-1">{metric.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Transformation Flow */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Transformation Summary</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="grid gap-4">
                  {workflowData.processingSummary.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'data' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Data Controls */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Table className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Data Explorer</h3>
                    </div>
                    
                    {/* Dataset Toggle */}
                    <div className="flex bg-white/10 rounded-2xl p-1 border border-white/20">
                      <button
                        onClick={() => setActiveDataset('input')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activeDataset === 'input'
                            ? 'bg-white text-gray-900 shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        Raw Data
                      </button>
                      <button
                        onClick={() => setActiveDataset('output')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activeDataset === 'output'
                            ? 'bg-white text-gray-900 shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        AI Enhanced
                      </button>
                    </div>
                  </div>

                  {/* Search and Controls */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                      <input
                        type="text"
                        placeholder="Search your data..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm w-64"
                      />
                    </div>
                    
                    <div className="flex bg-white/10 rounded-2xl p-1 border border-white/20">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          viewMode === 'table'
                            ? 'bg-white text-gray-900 shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Table className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          viewMode === 'grid'
                            ? 'bg-white text-gray-900 shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-8 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                          #
                        </th>
                        {columns.map((column) => (
                          <th
                            key={column}
                            className="px-8 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredData.map((row, rowIndex) => (
                        <motion.tr
                          key={rowIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: rowIndex * 0.05 }}
                          className="hover:bg-white/5 transition-all duration-200 group"
                        >
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-white/60">
                            {rowIndex + 1}
                          </td>
                          {columns.map((column) => (
                            <td
                              key={column}
                              className="px-8 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white transition-colors duration-200"
                            >
                              {row[column as keyof typeof row]}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer */}
              <div className="px-8 py-4 bg-white/5 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>
                    Showing {filteredData.length} of {currentData.length} rows
                  </span>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>
                      {activeDataset === 'input' ? workflowData.inputFilename : workflowData.outputFilename}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'insights' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Insights</h3>
              <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                {isMockWorkflow 
                  ? 'Advanced analytics and predictive insights are available in the full Rawbify platform. Unlock the power of AI-driven business intelligence.'
                  : 'Your personalized AI insights and recommendations will appear here based on your processed data patterns.'
                }
              </p>
              
              <button
                onClick={() => setShowAIChat(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 flex items-center space-x-3 mx-auto group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Ask AI for Insights</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAIChat(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Rawbify AI Assistant
                      </h3>
                      <p className="text-purple-100 text-sm">
                        Your intelligent data companion
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIChat(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 text-white/80 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md rounded-2xl px-6 py-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-white text-gray-900 shadow-lg border border-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-sm text-gray-600">AI is analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="px-6 py-6 bg-white border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder="Ask me anything about your data transformation..."
                      className="block w-full border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                      chatInput.trim()
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick AI Prompts - Floating */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3"
      >
        {[
          { text: "Analyze trends", icon: TrendingUp },
          { text: "Find insights", icon: Target },
          { text: "Optimize data", icon: Zap }
        ].map((prompt, index) => (
          <motion.button
            key={prompt.text}
            onClick={() => {
              setChatInput(prompt.text)
              setShowAIChat(true)
            }}
            className="bg-white/10 backdrop-blur-xl text-white/80 hover:text-white px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 border border-white/20 hover:bg-white/20 group"
            whileHover={{ scale: 1.05, x: -5 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + index * 0.1 }}
          >
            <prompt.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>{prompt.text}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
