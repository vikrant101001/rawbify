'use client'

interface PromptInputProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  isActive: boolean
}

export default function PromptInput({ prompt, onPromptChange, isActive }: PromptInputProps) {
  return (
    <div className={`mb-8 ${!isActive ? 'opacity-50' : ''}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
          isActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500'
        }`}>
          2
        </span>
        Tell Us What You Want
      </h3>
      <div className="max-w-2xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your desired output:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="e.g., 'Clean this customer data and format it for Power BI analysis. Remove duplicates, standardize email formats, and add a revenue column.'"
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={!isActive}
        />
        <p className="text-sm text-gray-500 mt-2">
          Be specific about what you want to achieve with your data.
        </p>
      </div>
    </div>
  )
} 