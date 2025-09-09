// API Configuration
export const API_CONFIG = {
  // Base URL for API calls - Updated to Vercel deployment
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://rawbify-backend.vercel.app',
  //BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API version
  API_VERSION: 'v1',
  
  // Endpoints
  ENDPOINTS: {
    // Waitlist
    WAITLIST_JOIN: '/api/waitlist/join',
    WAITLIST_STATS: '/api/waitlist/stats',
    
    // User validation (legacy)
    VALIDATE_USER: '/api/validate-user',
    
    // Authentication (new)
    AUTH_SIGNUP: '/api/auth/signup',
    AUTH_SIGNIN: '/api/auth/signin',
    AUTH_ME: '/api/auth/me',
    
    // Data processing
    PROCESS_DATA: '/api/process-data',
  }
} as const

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Helper function to get API endpoint
export const getEndpoint = (key: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return API_CONFIG.ENDPOINTS[key]
} 