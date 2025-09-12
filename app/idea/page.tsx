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
  Edit3,
  Maximize2,
  PlayCircle,
  StopCircle,
  ArrowUpRight,
  Zap as Lightning,
  Link
} from 'lucide-react'
import BlockConfigModal from './components/BlockConfigModal'
import FullScreenModal from './components/FullScreenModal'

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
  },
]

// Canvas Block Component (draggable and positionable)
const CanvasBlock = ({ block, onEdit, onDelete, onPositionChange, onConnectionStart, onConnectionEnd }: any) => {
  const handleConnectionStart = onConnectionStart || (() => {})
  const handleConnectionEnd = onConnectionEnd || (() => {})
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  // Default position if not set - use a hash of the ID for consistent but spread positioning
  const position = block.position || { 
    x: 100 + (Math.abs(block.id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 3) * 350, 
    y: 100 + Math.floor(Math.abs(block.id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) / 3) % 4 * 250 
  }
  
  return (
    <motion.div
      layout={false}
      drag={!block.isFixed} // Disable drag for fixed blocks
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={false}
      onDragStart={() => !block.isFixed && setIsDragging(true)}
      onDragEnd={(event, info) => {
        if (block.isFixed) return // Don't allow moving fixed blocks
        
        setIsDragging(false)
        // Define workspace boundaries with proper margins
        const MARGIN = 40
        const WORKSPACE_WIDTH = 1000
        const WORKSPACE_HEIGHT = 600
        const blockWidth = 320
        const blockHeight = 200
        
        // Constrain within margins
        const newX = Math.max(MARGIN, Math.min(WORKSPACE_WIDTH - blockWidth - MARGIN, position.x + info.offset.x))
        const newY = Math.max(MARGIN, Math.min(WORKSPACE_HEIGHT - blockHeight - MARGIN, position.y + info.offset.y))

        const newPosition = { x: newX, y: newY }
        onPositionChange(block.id, newPosition)
      }}
      initial={{ opacity: 0, scale: 0.8, x: position.x, y: position.y }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`absolute group ${block.isFixed ? 'cursor-not-allowed' : 'cursor-move'}`}
      style={{ 
        zIndex: isDragging ? 100 : (block.originalType === 'start' || block.originalType === 'end' || block.originalType === 'Start Workflow' || block.originalType === 'End Workflow' ? 20 : 10),
        left: 0,
        top: 0
      }}
    >
      <div className={`
        relative shadow-lg transition-all duration-300 w-80 p-6
        ${block.originalType === 'start' || block.originalType === 'Start Workflow' 
          ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-50 border-4 border-emerald-500 shadow-2xl shadow-emerald-400/50' 
          : block.originalType === 'end' || block.originalType === 'End Workflow'
          ? 'bg-gradient-to-br from-red-50 via-red-100 to-pink-50 border-4 border-red-500 shadow-2xl shadow-red-400/50'
          : 'bg-white rounded-2xl border-2 border-gray-200'
        }
        ${block.originalType === 'start' || block.originalType === 'Start Workflow' 
          ? 'rounded-r-full rounded-l-2xl' // Capsule shape pointing right
          : block.originalType === 'end' || block.originalType === 'End Workflow'
          ? 'rounded-l-full rounded-r-2xl' // Capsule shape pointing left
          : 'rounded-2xl'
        }
        ${isHovered || isDragging 
          ? (block.originalType === 'start' || block.originalType === 'Start Workflow' 
            ? 'shadow-3xl shadow-emerald-500/70 border-emerald-600 scale-105' 
            : block.originalType === 'end' || block.originalType === 'End Workflow'
            ? 'shadow-3xl shadow-red-500/70 border-red-600 scale-105'
            : 'shadow-2xl border-blue-300')
          : 'shadow-lg'
        }
        ${isDragging ? 'rotate-1' : ''}
      `}>
        {/* Block Icon and Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${block.color} 
            flex items-center justify-center shadow-lg
          `}>
            <block.icon className="w-6 h-6 text-white" />
          </div>
            <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
              <span>{block.name}</span>
              {block.isFixed && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                  FIXED
                </span>
              )}
            </h3>
            <p className="text-gray-500 text-sm">{block.description}</p>
          </div>
        </div>
        
        {/* Block Configuration */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-sm text-gray-600 mb-2">Configuration:</div>
          <div className="font-mono text-sm bg-white rounded-lg p-3 border">
            {block.prompt || (block.config && block.config.prompt) || 'No configuration set'}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          {block.originalType !== 'start' && block.originalType !== 'end' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(block)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </motion.button>
          ) : (
            <div className="flex-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-2">
              <block.icon className="w-4 h-4" />
              <span>Workflow Marker</span>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(block.id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Drag Indicator */}
        <div className={`
          absolute top-2 right-2 transition-opacity
          ${isHovered || isDragging ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
            <Move className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        {/* Connection Points */}
        {/* Output Port (Right) - Hidden for End Workflow */}
        {block.originalType !== 'end' && (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              handleConnectionStart(block.id, 'output')
            }}
            className={`
              absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl cursor-pointer
              transition-all duration-300
              opacity-100
              bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500
            `}
            style={{ zIndex: 1000 }}
          >
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3 text-blue-600" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 rounded-full opacity-30"
            />
          </motion.div>
        )}
        
        {/* Input Port (Left) - Hidden for Start Workflow */}
        {block.originalType !== 'start' && (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              handleConnectionEnd(block.id, 'input')
            }}
            className={`
              absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white shadow-xl cursor-pointer
              transition-all duration-300
              opacity-100
              bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500
            `}
            style={{ zIndex: 1000 }}
          >
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <Lightning className="w-3 h-3 text-purple-600" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute inset-0 bg-purple-400 rounded-full opacity-30"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Individual Block Component (for linear view)
const DataBlock = ({ block, onEdit, onDelete, isConnected = false }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{ scale: 1.01 }}
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
            {block.prompt || (block.config && block.config.prompt) || 'No configuration set'}
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
const BlockPalette = ({ onAddBlock, usedBlocks }: any) => {
  // Filter out unique blocks that have already been used
  const availableBlocks = BLOCK_TYPES.filter(blockType => {
    if (!blockType.unique) return true // Always show non-unique blocks
    return !usedBlocks.some(usedBlock => usedBlock.originalType === blockType.id)
  })

  return (
    <div className="space-y-4">
      <div className="text-center pb-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 text-lg flex items-center justify-center space-x-2 mb-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>Data Blocks</span>
        </h3>
        <p className="text-gray-500 text-sm">Drag blocks to the canvas</p>
      </div>
      
      <div className="space-y-2">
        {availableBlocks.map((blockType) => (
          <motion.button
            key={blockType.id}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddBlock(blockType)}
            className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left group"
          >
            <div className={`
              w-10 h-10 rounded-lg bg-gradient-to-br ${blockType.color} 
              flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0
            `}>
              <blockType.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">
                {blockType.name}
                {blockType.unique && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                    Once
                  </span>
                )}
              </div>
              <div className="text-gray-500 text-xs truncate">{blockType.description}</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-blue-600 text-sm font-medium mb-1">💡 Pro Tip</div>
          <div className="text-blue-700 text-xs">
            Click blocks to add them, then drag them around the canvas to organize your workflow
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample Data Preview
const DataPreview = ({ data, title, onExpand }: any) => {
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
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{title}</span>
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExpand}
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg transition-colors text-sm"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Expand</span>
          </motion.button>
        </div>
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
  // Workspace dimensions and margins
  const WORKSPACE_MARGIN = 40
  const WORKSPACE_WIDTH = 1000  // Fixed workspace width
  const WORKSPACE_HEIGHT = 600  // Fixed workspace height
  
  const [blocks, setBlocks] = useState<any[]>([
    // Start Workflow - FIXED at top-left
    {
      id: 'start-workflow',
      name: 'Start Workflow',
      originalType: 'Start Workflow',
      icon: PlayCircle,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Beginning of your data pipeline',
      position: { x: WORKSPACE_MARGIN, y: WORKSPACE_MARGIN },
      config: { prompt: 'Workflow starts here' },
      isFixed: true // Cannot be moved
    },
    // End Workflow - FIXED at bottom-right
    {
      id: 'end-workflow', 
      name: 'End Workflow',
      originalType: 'End Workflow',
      icon: StopCircle,
      color: 'from-red-500 to-red-600',
      description: 'Final step of your data pipeline',
      position: { x: WORKSPACE_WIDTH - 320 - WORKSPACE_MARGIN, y: WORKSPACE_HEIGHT - 200 - WORKSPACE_MARGIN },
      config: { prompt: 'Workflow ends here' },
      isFixed: true // Cannot be moved
    }
  ])
  const [inputData, setInputData] = useState<any>(null)
  const [outputData, setOutputData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [editingBlock, setEditingBlock] = useState<any>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [fullScreenModal, setFullScreenModal] = useState<any>({ isOpen: false, type: null, title: '', data: null })
  // User limits based on subscription type
  const userType = 'basic' // This would come from user auth/subscription
  const blockLimits = {
    basic: 5,
    premium: 15,
    enterprise: 50
  }
  const maxBlocks = blockLimits[userType] || 5
  const [connections, setConnections] = useState<any[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const addBlock = (blockType) => {
    // Count current user blocks (excluding Start and End workflow)
    const currentUserBlocks = blocks.filter(block => 
      !block.isFixed && 
      block.originalType !== 'Start Workflow' && 
      block.originalType !== 'End Workflow'
    ).length
    
    // Check if user has reached their limit
    if (currentUserBlocks >= maxBlocks) {
      alert(`🚀 You've reached your ${userType.toUpperCase()} plan limit of ${maxBlocks} blocks!\n\n💎 Upgrade to Premium for 15 blocks or Enterprise for unlimited blocks!`)
      return
    }
    
    const newBlock = {
      ...blockType,
      id: Date.now() + Math.random(), // Ensure truly unique ID
      originalType: blockType.id, // Keep track of original block type
      config: null,
      // Place new blocks in safe area within margins
      position: {
        x: WORKSPACE_MARGIN + 100 + Math.random() * 300,
        y: WORKSPACE_MARGIN + 100 + Math.random() * 200
      },
      isFixed: false
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
  
  const openFullScreen = (type, title, data = null) => {
    setFullScreenModal({ isOpen: true, type, title, data })
  }
  
  const closeFullScreen = () => {
    setFullScreenModal({ isOpen: false, type: null, title: '', data: null })
  }
  
  const handleConnectionStart = (blockId: any, port: any) => {
    console.log('Connection start:', blockId, port)
    setIsConnecting(true)
    setConnectionStart({ blockId, port })
  }
  
  const handleConnectionEnd = (blockId: any, port: any) => {
    console.log('Connection end:', blockId, port, 'isConnecting:', isConnecting, 'connectionStart:', connectionStart)
    if (isConnecting && connectionStart && connectionStart.blockId !== blockId) {
      // Create new connection
      const newConnection = {
        id: Date.now(),
        from: connectionStart.blockId,
        to: blockId,
        fromPort: connectionStart.port,
        toPort: port
      }
      console.log('Creating connection:', newConnection)
      setConnections([...connections, newConnection])
    }
    setIsConnecting(false)
    setConnectionStart(null)
  }
  
  const deleteConnection = (connectionId) => {
    setConnections(connections.filter(conn => conn.id !== connectionId))
  }
  
  const handleCanvasMouseMove = (e) => {
    if (isConnecting) {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / canvasZoom,
        y: (e.clientY - rect.top) / canvasZoom
      })
    }
  }
  
  const cancelConnection = () => {
    setIsConnecting(false)
    setConnectionStart(null)
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
      <div className="h-[calc(100vh-90px)] flex">
        {/* Left Panel - Block Palette (Narrow Sidebar) */}
        <div className="w-80 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
          <div className="p-4">
            <BlockPalette onAddBlock={addBlock} usedBlocks={blocks} />
          </div>
        </div>
        
        {/* Center Canvas - Free-form Drag & Drop Area */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
          {/* Canvas Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                  <MousePointer className="w-5 h-5 text-purple-600" />
                  <span>Visual Workflow Canvas</span>
                </h3>
                <div className="text-sm text-gray-500">
                  {blocks.filter(b => !b.isFixed).length}/{maxBlocks} blocks • {connections.length} connection{connections.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button className="px-3 py-1 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700">
                    Canvas
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    Code
                  </button>
                </div>
                
                {/* User Plan Info */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {userType.toUpperCase()} PLAN
                </div>
                
                {/* Blocks Remaining */}
                <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm">
                  <span className="text-gray-600">Remaining: </span>
                  <span className="font-bold text-purple-600">
                    {maxBlocks - blocks.filter(b => !b.isFixed).length}/{maxBlocks}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Canvas Area with Visual Margins */}
          <div className="pt-20 pb-6 px-6 h-full overflow-auto" id="canvas-container">
            {/* Workspace with visible boundaries */}
            <div 
              className="relative bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 mx-auto"
              style={{ 
                width: `${WORKSPACE_WIDTH}px`, 
                height: `${WORKSPACE_HEIGHT}px`,
                minHeight: `${WORKSPACE_HEIGHT}px`
              }}
              onMouseMove={handleCanvasMouseMove}
              onClick={isConnecting ? cancelConnection : undefined}
            >
              {/* Margin Indicators */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top margin line */}
                <div 
                  className="absolute left-0 right-0 border-t border-gray-400 border-dashed opacity-50"
                  style={{ top: `${WORKSPACE_MARGIN}px` }}
                />
                {/* Bottom margin line */}
                <div 
                  className="absolute left-0 right-0 border-t border-gray-400 border-dashed opacity-50"
                  style={{ bottom: `${WORKSPACE_MARGIN}px` }}
                />
                {/* Left margin line */}
                <div 
                  className="absolute top-0 bottom-0 border-l border-gray-400 border-dashed opacity-50"
                  style={{ left: `${WORKSPACE_MARGIN}px` }}
                />
                {/* Right margin line */}
                <div 
                  className="absolute top-0 bottom-0 border-l border-gray-400 border-dashed opacity-50"
                  style={{ right: `${WORKSPACE_MARGIN}px` }}
                />
                
                {/* Corner labels */}
                <div className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
                  Safe Zone
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
                  {WORKSPACE_WIDTH}×{WORKSPACE_HEIGHT}
                </div>
              </div>
            {blocks.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8"
                  >
                    <div className="w-32 h-32 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                      <Sparkles className="w-16 h-16 text-gray-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Building Your Workflow</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    Drag blocks from the left sidebar and drop them anywhere on this canvas to create your data transformation pipeline
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Drag blocks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Connect flows</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Configure logic</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <AnimatePresence mode="popLayout">
                  {blocks.map((block, index) => (
                    <CanvasBlock
                      key={block.id}
                      block={block}
                      onEdit={editBlock}
                      onDelete={deleteBlock}
                      onPositionChange={(id, position) => {
                        setBlocks(blocks.map(b => 
                          b.id === id ? { ...b, position } : b
                        ))
                      }}
                      onConnectionStart={handleConnectionStart}
                      onConnectionEnd={handleConnectionEnd}
                    />
                  ))}
                </AnimatePresence>
                
                {/* CLEAN SIMPLE ARROWS */}
                <svg 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ 
                    zIndex: 5,
                    width: '100%',
                    height: '100%',
                    overflow: 'visible'
                  }}
                >
                  <defs>
                    {/* Simple clean arrowhead */}
                    <marker id="cleanArrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,8 L10,4 z" fill="#6366f1" />
                    </marker>
                  </defs>
                  
                  {/* Draw clean connection arrows */}
                  {connections.map((connection) => {
                    const fromBlock = blocks.find(b => b.id === connection.from)
                    const toBlock = blocks.find(b => b.id === connection.to)
                    
                    if (!fromBlock || !toBlock) return null
                    
                    // Connect exactly to the CENTER of port circles - adjusted for zoom
                    const blockWidth = 320  // w-80 = 320px
                    
                    // Fine-tune this value to match the exact port position
                    // Based on block structure: padding + icon area + config area / 2
                    const portVerticalOffset = 120  // Let's try 120px from top
                    
                    // Output port is at: -right-4 top-1/2 (4px outside right edge, vertically centered)
                    const startX = (fromBlock.position?.x || 0) + blockWidth + 4  // 4px outside right edge
                    const startY = (fromBlock.position?.y || 0) + portVerticalOffset  // middle of block content
                    
                    // Input port is at: -left-4 top-1/2 (4px outside left edge, vertically centered)  
                    const endX = (toBlock.position?.x || 0) - 4  // 4px outside left edge
                    const endY = (toBlock.position?.y || 0) + portVerticalOffset  // middle of block content
                    
                    // Calculate arrow end point (stop BEFORE the input port to show arrowhead properly)
                    const arrowLength = 10 // Normal arrowhead length (SVG will scale it)
                    const angle = Math.atan2(endY - startY, endX - startX)
                    const arrowEndX = endX - arrowLength * Math.cos(angle)
                    const arrowEndY = endY - arrowLength * Math.sin(angle)
                    
                    return (
                      <g key={connection.id}>
                        {/* Clean line from output port to just before input port */}
                        <line
                          x1={startX}
                          y1={startY}
                          x2={arrowEndX}
                          y2={arrowEndY}
                          stroke="#6366f1"
                          strokeWidth="3"
                          markerEnd="url(#cleanArrow)"
                          opacity="0.8"
                        />
                        
                        {/* Simple delete button */}
                        <circle
                          cx={(startX + endX) / 2}
                          cy={(startY + endY) / 2}
                          r="10"
                          fill="#ef4444"
                          stroke="white"
                          strokeWidth="2"
                          onClick={() => deleteConnection(connection.id)}
                          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                          opacity="0.9"
                        />
                        <text
                          x={(startX + endX) / 2}
                          y={(startY + endY) / 2 + 4}
                          textAnchor="middle"
                          fontSize="12"
                          fill="white"
                          style={{ pointerEvents: 'none' }}
                        >
                          ×
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            )}
            </div>
          </div>
        </div>
        
        {/* Right Panel - Data Preview (Narrow Sidebar) */}
        <div className="w-96 bg-white border-l border-gray-200 shadow-lg overflow-y-auto">
          <div className="p-4 space-y-6">
            <DataPreview 
              data={mockInputData} 
              title="Input Data"
              onExpand={() => openFullScreen('data', 'Input Data', mockInputData)}
            />
            <DataPreview 
              data={outputData} 
              title="Output Preview"
              onExpand={() => openFullScreen('data', 'Output Preview', outputData)}
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
      
      {/* Full Screen Modal */}
      <FullScreenModal
        isOpen={fullScreenModal.isOpen}
        onClose={closeFullScreen}
        title={fullScreenModal.title}
        type={fullScreenModal.type}
        data={fullScreenModal.data}
      >
        {fullScreenModal.type === 'workflow' && (
          <div className="space-y-12 max-w-4xl mx-auto">
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
      </FullScreenModal>
    </div>
  )
}
