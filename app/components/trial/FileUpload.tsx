'use client'

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (file: File) => void
  isActive: boolean
}

export default function FileUpload({ uploadedFile, onFileUpload, isActive }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className={`mb-8 ${!isActive ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
          isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
        }`}>
          1
        </span>
        Upload Your Data File
      </h3>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {!uploadedFile ? (
          <div>
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-500 font-medium">
                Choose a data file
              </span>
              <span className="text-gray-500"> or drag and drop</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Excel files (.xlsx, .xls) and CSV files (.csv) up to 10MB
            </p>
          </div>
        ) : (
          <div className="text-green-600">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{uploadedFile.name}</p>
            <p className="text-sm">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
          </div>
        )}
      </div>
    </div>
  )
} 