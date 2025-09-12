'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Sparkles } from 'lucide-react'

interface BlockConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: any) => void
  block: any
}

export default function BlockConfigModal({ isOpen, onClose, onSave, block }: BlockConfigModalProps) {
  const [config, setConfig] = useState('')
  
  if (!block) return null
  
  const handleSave = () => {
    onSave({ ...block, config })
    onClose()
  }
  
  const getPlaceholder = () => {
    switch (block.id) {
      case 'reorder':
        return 'Name, Date, Amount, Total'
      case 'dates':
        return 'MM/DD/YYYY'
      case 'pivot':
        return 'rows: Region, values: sum(Amount)'
      case 'add':
        return 'Total = Quantity * Price'
      case 'filter':
        return 'Amount > 1000'
      case 'math':
        return 'Total = Quantity * Price'
      case 'rename':
        return 'Customer Name -> Client'
      default:
        return 'Enter configuration...'
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${block.color} flex items-center justify-center`}>
                  <block.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Configure {block.name}</h2>
                  <p className="text-gray-500 text-sm">{block.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Configuration Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Configuration
              </label>
              <div className="relative">
                <textarea
                  value={config}
                  onChange={(e) => setConfig(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none font-mono text-sm"
                />
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Describe what you want this block to do with your data
              </p>
            </div>
            
            {/* Examples */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-2">Examples:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                {block.id === 'reorder' && (
                  <>
                    <div>• Name, Date, Amount</div>
                    <div>• Date, Customer, Total, Status</div>
                  </>
                )}
                {block.id === 'dates' && (
                  <>
                    <div>• MM/DD/YYYY</div>
                    <div>• DD-MM-YYYY</div>
                  </>
                )}
                {block.id === 'add' && (
                  <>
                    <div>• Total = Quantity × Price</div>
                    <div>• Month = extract month from Date</div>
                  </>
                )}
                {block.id === 'filter' && (
                  <>
                    <div>• Amount &gt; 1000</div>
                    <div>• Status = "Active"</div>
                  </>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Block</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
