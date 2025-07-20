'use client'

interface DataDownloadProps {
  isActive: boolean
  processing: boolean
  processed: boolean
  processingSummary?: string[]
  onDownload: () => void
}

export default function DataDownload({ 
  isActive, 
  processing, 
  processed, 
  processingSummary, 
  onDownload 
}: DataDownloadProps) {
  return (
    <div className={!isActive ? 'opacity-50' : ''}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
          isActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500'
        }`}>
          3
        </span>
        Download Your Processed Data
      </h3>
      <div className="text-center">
        {isActive && processing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 text-lg">AI is processing your data...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        ) : isActive && processed ? (
          <div className="space-y-6">
            <div className="text-green-600">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium text-lg">Data processed successfully!</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
              <h4 className="font-semibold text-gray-900 mb-2">Processing Summary:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {processingSummary ? (
                  processingSummary.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))
                ) : (
                  <>
                    <li>• Cleaned 8 customer records</li>
                    <li>• Standardized email formats</li>
                    <li>• Added revenue data</li>
                    <li>• Ready for Power BI import</li>
                  </>
                )}
              </ul>
            </div>
            <button 
              onClick={onDownload} 
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Download Processed File
            </button>
          </div>
        ) : (
          <div className="text-gray-400">
            <p>Complete previous steps to process your data</p>
          </div>
        )}
      </div>
    </div>
  )
} 