'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, File, Download } from 'lucide-react'

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  isActive: boolean
}

export default function FileUpload({ uploadedFile, onFileUpload, isActive }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (isActive) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (!isActive) return
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      // Check file type
      const allowedTypes = ['.xlsx', '.xls', '.csv']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (allowedTypes.includes(fileExtension)) {
        onFileUpload(file)
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

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
            uploadedFile 
              ? 'bg-green-500 text-white' 
              : isActive 
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' 
                : 'bg-gray-300 text-gray-500'
          }`}
          whileHover={{ scale: 1.1 }}
          animate={isActive && !uploadedFile ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: isActive && !uploadedFile ? Infinity : 0 }}
        >
          {uploadedFile ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Your Data File
          </h3>
          <p className="text-gray-600">
            Drag & drop or browse to upload your Excel or CSV file
          </p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {!uploadedFile ? (
          <motion.div
            className={`modern-card p-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
              isDragOver && isActive
                ? 'border-blue-500 bg-blue-50 scale-105' 
                : isActive 
                  ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={isActive ? { scale: 1.02 } : {}}
            animate={isDragOver ? { scale: 1.05 } : { scale: 1 }}
          >
            <label className={`cursor-pointer block ${!isActive ? 'pointer-events-none' : ''}`}>
              <div className="text-center">
                <motion.div 
                  className={`mx-auto mb-6 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`}
                  animate={isDragOver ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload className="mx-auto h-16 w-16" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    {isDragOver ? 'Drop your file here' : 'Choose a data file'}
                  </p>
                  <p className="text-gray-500 mb-6">
                    or drag and drop it here
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <File className="w-5 h-5 mr-2" />
                    Browse Files
                  </motion.div>
                  
                  <p className="text-sm text-gray-500 mt-6 flex items-center justify-center space-x-4">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1 text-green-600" />
                      Excel (.xlsx, .xls)
                    </span>
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1 text-blue-600" />
                      CSV (.csv)
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>Max 10MB</span>
                  </p>
                </motion.div>
              </div>
              
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                disabled={!isActive}
              />
            </label>
          </motion.div>
        ) : (
          <motion.div 
            className="modern-card p-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    File uploaded successfully! 🎉
                  </h4>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      {uploadedFile.name}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {formatFileSize(uploadedFile.size)}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-600 font-medium">
                        ✓ Valid format
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 rounded-lg font-medium transition-all duration-300"
              >
                Change
              </motion.button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-white/70 rounded-xl"
            >
              <p className="text-sm text-gray-600 text-center">
                Ready to process! Continue to the next step to add your AI prompt.
              </p>
            </motion.div>
            
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
              disabled={!isActive}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
} 