'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Columns, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  Filter, 
  Calculator,
  Type,
  Play,
  Download,
  Upload,
  Trash2,
  ArrowRight,
  Database,
  Eye,
  Zap,
  MousePointer,
  Move,
  Edit3
} from 'lucide-react'
import BlockConfigModal from './components/BlockConfigModal'

// Block Types with beautiful colors and icons
const BLOCK_TYPES = [
  { 
    id: 'reorder', 
    name: 'Reorder Columns', 
    icon: Columns, 
    color: 'from-blue-500 to-blue-600',
    prompt: 'Reorder columns in this order: ',
    description: 'Drag and drop columns to reorder them'
  },
  { 
    id: 'dates', 
    name: 'Fix Dates', 
    icon: Calendar, 
    color: 'from-green-500 to-green-600',
    prompt: 'Convert all dates to MM/DD/YYYY format',
    description: 'Standardize date formats across your data'
  },
  { 
    id: 'pivot', 
    name: 'Create Pivot', 
    icon: RotateCcw, 
    color: 'from-purple-500 to-purple-600',
    prompt: 'Create pivot table with rows: ',
    description: 'Transform rows into columns for analysis'
  },
  { 
    id: 'add', 
    name: 'Add Column', 
    icon: Plus, 
    color: 'from-orange-500 to-orange-600',
    prompt: 'Add new column: ',
    description: 'Create calculated or derived columns'
  },
  { 
    id: 'clean', 
    name: 'Clean Data', 
    icon: Sparkles, 
    color: 'from-pink-500 to-pink-600',
    prompt: 'Remove duplicates and trim whitespace',
    description: 'Clean messy data automatically'
  },
  { 
    id: 'filter', 
    name: 'Filter Rows', 
    icon: Filter, 
    color: 'from-indigo-500 to-indigo-600',
    prompt: 'Filter rows where: ',
    description: 'Keep only the data you need'
  },
  { 
    id: 'math', 
    name: 'Math Magic', 
    icon: Calculator, 
    color: 'from-red-500 to-red-600',
    prompt: 'Calculate new column: ',
    description: 'Add, subtract, multiply your columns'
  },
  { 
    id: 'rename', 
    name: 'Rename Columns', 
    icon: Type, 
    color: 'from-cyan-500 to-cyan-600',
    prompt: 'Rename column: ',
    description: 'Give your columns better names'
  }
]

// Individual Block Component
const DataBlock = ({ block, onEdit, onDelete, isConnected = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-move"
    >
      {/* Connection Arrow */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-1 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
          >
            <ArrowRight className="w-3 h-3 text-gray-400 rotate-90" />
          </motion.div>
        </motion.div>
      )}
      
      {/* Block Content */}
      <div className={`
        relative bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg
        transition-all duration-300
        ${isHovered ? 'shadow-2xl border-gray-300' : 'shadow-lg'}
        min-w-[280px] max-w-[280px]
      `}>
        {/* Block Icon and Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${block.color} 
            flex items-center justify-center shadow-lg
          `}>
            <block.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{block.name}</h3>
            <p className="text-gray-500 text-sm">{block.description}</p>
          </div>
        </div>
        
        {/* Block Configuration */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-sm text-gray-600 mb-2">Configuration:</div>
          <div className="font-mono text-sm bg-white rounded-lg p-3 border">
            {block.prompt}
            {block.config && <span className="text-blue-600">{block.config}</span>}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(block)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(block.id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Drag Handle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <Move className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Block Palette Component
const BlockPalette = ({ onAddBlock }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <Database className="w-5 h-5 text-blue-600" />
        <span>Data Blocks</span>
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {BLOCK_TYPES.map((blockType) => (
          <motion.button
            key={blockType.id}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddBlock(blockType)}
            className="flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md text-left group"
          >
            <div className={`
              w-10 h-10 rounded-lg bg-gradient-to-br ${blockType.color} 
              flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow
            `}>
              <blockType.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{blockType.name}</div>
              <div className="text-gray-500 text-xs">{blockType.description}</div>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Sample Data Preview
const DataPreview = ({ data, title }) => {
  if (!data) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">Upload a CSV or Excel file to get started</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>{title}</span>
        </h3>
      </div>
      <div className="p-4 max-h-64 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {data.columns?.map((col, idx) => (
                <th key={idx} className="text-left py-2 px-3 font-semibold text-gray-700 bg-gray-50 first:rounded-l-lg last:rounded-r-lg">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows?.slice(0, 5).map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="py-2 px-3 text-gray-800">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.rows?.length > 5 && (
          <div className="text-center text-gray-500 text-xs mt-2">
            ... and {data.rows.length - 5} more rows
          </div>
        )}
      </div>
    </div>
  )
}

export default function RawbifyStudio() {
  const [blocks, setBlocks] = useState([])
  const [inputData, setInputData] = useState(null)
  const [outputData, setOutputData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [editingBlock, setEditingBlock] = useState(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  
  const addBlock = (blockType) => {
    const newBlock = {
      id: Date.now(),
      ...blockType,
      config: null
    }
    setBlocks([...blocks, newBlock])
  }
  
  const deleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId))
  }
  
  const editBlock = (block) => {
    setEditingBlock(block)
    setShowConfigModal(true)
  }
  
  const saveBlockConfig = (updatedBlock) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ))
    setEditingBlock(null)
  }
  
  const runWorkflow = async () => {
    setIsProcessing(true)
    // TODO: Connect to your AI backend
    setTimeout(() => {
      setIsProcessing(false)
      // Mock output data
      setOutputData({
        columns: ['Name', 'Date_Fixed', 'Amount', 'Total'],
        rows: [
          ['John Doe', '01/15/2024', '$1,200', '$1,440'],
          ['Jane Smith', '01/16/2024', '$800', '$960'],
          ['Bob Johnson', '01/17/2024', '$1,500', '$1,800']
        ]
      })
    }, 2000)
  }
  
  // Mock input data
  const mockInputData = {
    columns: ['Name', 'Date', 'Amount'],
    rows: [
      ['John Doe', '1/15/24', '1200'],
      ['Jane Smith', '1/16/24', '800'],
      ['Bob Johnson', '1/17/24', '1500']
    ]
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rawbify Studio
                </h1>
                <p className="text-gray-600 text-sm">Visual Data Transformation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={runWorkflow}
                disabled={blocks.length === 0 || isProcessing}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Run Workflow</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Block Palette */}
          <div className="col-span-3 bg-white rounded-2xl border border-gray-200 p-6 shadow-lg overflow-y-auto">
            <BlockPalette onAddBlock={addBlock} />
          </div>
          
          {/* Center Panel - Workflow Canvas */}
          <div className="col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-lg overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                <MousePointer className="w-5 h-5 text-purple-600" />
                <span>Workflow Canvas</span>
              </h3>
              <div className="text-sm text-gray-500">
                {blocks.length} block{blocks.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {blocks.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">Start Building Your Workflow</h3>
                <p className="text-gray-500 text-sm">Drag blocks from the left panel to create your data transformation pipeline</p>
              </div>
            ) : (
              <div className="space-y-12">
                <AnimatePresence>
                  {blocks.map((block, index) => (
                    <DataBlock
                      key={block.id}
                      block={block}
                      onEdit={editBlock}
                      onDelete={deleteBlock}
                      isConnected={index < blocks.length - 1}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          
          {/* Right Panel - Data Preview */}
          <div className="col-span-4 space-y-6">
            <DataPreview 
              data={mockInputData} 
              title="Input Data" 
            />
            <DataPreview 
              data={outputData} 
              title="Output Preview" 
            />
          </div>
        </div>
      </div>
      
      {/* Block Configuration Modal */}
      <BlockConfigModal
        isOpen={showConfigModal}
        onClose={() => {
          setShowConfigModal(false)
          setEditingBlock(null)
        }}
        onSave={saveBlockConfig}
        block={editingBlock}
      />
    </div>
  )
}
