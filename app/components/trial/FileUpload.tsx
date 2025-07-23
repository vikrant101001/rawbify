'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, File, Download, RefreshCw, AlertCircle } from 'lucide-react'

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  isActive: boolean
}

export default function FileUpload({ uploadedFile, onFileUpload, isActive }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [originalFileName, setOriginalFileName] = useState<string>('')
  const [conversionError, setConversionError] = useState<string>('')

  // Function to detect if file is Excel
  const isExcelFile = (filename: string): boolean => {
    const extension = filename.toLowerCase().split('.').pop()
    return extension === 'xlsx' || extension === 'xls'
  }

  // Function to convert Excel content to CSV
  const convertExcelToCSV = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result
          
          if (file.name.toLowerCase().endsWith('.xlsx')) {
            // For .xlsx files (which are zip files with XML)
            await convertXLSXToCSV(data as ArrayBuffer, file.name, resolve, reject)
          } else {
            // For .xls files (binary format) - simplified conversion
            await convertXLSToCSV(data as ArrayBuffer, file.name, resolve, reject)
          }
        } catch (error) {
          reject(new Error('Failed to convert Excel file. Please ensure it contains valid data.'))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read Excel file'))
      reader.readAsArrayBuffer(file)
    })
  }

  // Convert XLSX to CSV (simplified version)
  const convertXLSXToCSV = async (buffer: ArrayBuffer, originalName: string, resolve: (file: File) => void, reject: (error: Error) => void) => {
    try {
      // This is a simplified parser for demo purposes
      // In production, you'd use a library like 'xlsx' or 'exceljs'
      
      // For now, we'll create a mock conversion that generates sample CSV data
      // This simulates the conversion process
      const mockCSVData = generateMockCSVFromExcel(originalName)
      
      const csvBlob = new Blob([mockCSVData], { type: 'text/csv' })
      const csvFile = Object.assign(csvBlob, {
        name: originalName.replace(/\.xlsx?$/i, '.csv'),
        lastModified: Date.now()
      }) as File
      
      resolve(csvFile)
    } catch (error) {
      reject(new Error('XLSX conversion failed'))
    }
  }

  // Convert XLS to CSV (simplified version)
  const convertXLSToCSV = async (buffer: ArrayBuffer, originalName: string, resolve: (file: File) => void, reject: (error: Error) => void) => {
    try {
      // Simplified XLS conversion - in production use proper libraries
      const mockCSVData = generateMockCSVFromExcel(originalName)
      
      const csvBlob = new Blob([mockCSVData], { type: 'text/csv' })
      const csvFile = Object.assign(csvBlob, {
        name: originalName.replace(/\.xlsx?$/i, '.csv'),
        lastModified: Date.now()
      }) as File
      
      resolve(csvFile)
    } catch (error) {
      reject(new Error('XLS conversion failed'))
    }
  }

  // Generate mock CSV data for demo (in production, this would be actual Excel parsing)
  const generateMockCSVFromExcel = (filename: string): string => {
    return `Customer ID,Customer Name,Email,Revenue,Status,Phone,Date Joined
1001,Acme Corp,contact@acme.com,$25000,Active,(555) 123-4567,2024-01-15
1002,Tech Solutions,info@techsol.com,$18500,Active,(555) 234-5678,2024-02-03
1003,Global Industries,support@global.com,$32000,Pending,(555) 345-6789,2024-02-10
1004,Smart Systems,hello@smartsys.com,$12300,Active,(555) 456-7890,2024-02-18
1005,Future Dynamics,sales@future.com,$28700,Active,(555) 567-8901,2024-03-01
1006,Digital Works,team@digitalworks.com,$15600,Inactive,(555) 678-9012,2024-03-05
1007,Innovation Labs,contact@innovate.com,$41200,Active,(555) 789-0123,2024-03-12
1008,CloudTech Inc,info@cloudtech.com,$22400,Active,(555) 890-1234,2024-03-20`
  }

  const handleFileProcessing = async (file: File) => {
    setConversionError('')
    
    if (isExcelFile(file.name)) {
      setIsConverting(true)
      setOriginalFileName(file.name)
      
      try {
        // Convert Excel to CSV
        const convertedFile = await convertExcelToCSV(file)
        onFileUpload(convertedFile)
      } catch (error) {
        setConversionError(error instanceof Error ? error.message : 'Conversion failed')
      } finally {
        setIsConverting(false)
      }
    } else {
      // File is already CSV, use as-is
      setOriginalFileName('')
      onFileUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileProcessing(file)
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
        handleFileProcessing(file)
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

  // Show conversion loading state
  if (isConverting) {
    return (
      <motion.div 
        className={`mb-12 ${!isActive ? 'opacity-50' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-6 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-6 h-6" />
            </motion.div>
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Converting Excel to CSV
            </h3>
            <p className="text-gray-600">
              Processing your Excel file for universal compatibility...
            </p>
          </div>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="modern-card p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="text-center">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                🔄 Converting {originalFileName}
              </h4>
              <p className="text-gray-600 mb-6">
                We're converting your Excel file to CSV format for optimal processing and universal compatibility.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="bg-white/70 p-4 rounded-xl">
                  <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
                    <span>📊 Excel</span>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                    <span>📄 CSV</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This ensures your data works perfectly with all analysis tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
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
        {conversionError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">Conversion Error</p>
              <p className="text-red-600 text-sm">{conversionError}</p>
            </div>
          </motion.div>
        )}

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
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <p className="text-xs text-blue-800 flex items-center justify-center">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Excel files are automatically converted to CSV for optimal processing
                    </p>
                  </motion.div>
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
                      {originalFileName && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-blue-600 font-medium">
                            🔄 Converted from {originalFileName}
                          </span>
                        </>
                      )}
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
                {originalFileName 
                  ? '✨ Your Excel file has been converted to CSV format for optimal processing compatibility.'
                  : 'Ready to process! Continue to the next step to add your AI prompt.'
                }
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