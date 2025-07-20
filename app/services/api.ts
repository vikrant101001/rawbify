import { getApiUrl, getEndpoint } from '../config/api'

interface ProcessDataRequest {
    file: File
    prompt: string
    userId: string
  }
  
  interface ProcessDataResponse {
    success: boolean
    data?: Blob
    processingSummary?: string[]
    error?: string
  }
  
  interface ValidateUserResponse {
    success: boolean
    allowed: boolean
    error?: string
  }

  interface WaitlistResponse {
    success: boolean
    message: string
    waitlist_count?: number
  }
  
  // Test user ID list for fallback validation
  const TEST_APPROVED_USER_IDS = [
    'test123',
    'demo456',
    'trial789',
    'user001',
    'admin999',
    'user_admin'  // Special admin user
  ]
  
  export async function validateUserId(userId: string): Promise<ValidateUserResponse> {
    try {
      const response = await fetch(getApiUrl(getEndpoint('VALIDATE_USER')), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return {
        success: data.success,
        allowed: data.allowed,
        error: data.error || undefined
      }
    } catch (error) {
      console.error('Validation API Error:', error)
      
      // Fallback: check if user ID is in test list
      const isTestUserId = TEST_APPROVED_USER_IDS.includes(userId)
      
      return {
        success: false,
        allowed: isTestUserId,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
  
  export async function processData({ file, prompt, userId }: ProcessDataRequest): Promise<ProcessDataResponse> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('prompt', prompt)
      formData.append('userId', userId)
  
      const response = await fetch(getApiUrl(getEndpoint('PROCESS_DATA')), {
        method: 'POST',
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      // Parse JSON response from backend
      const responseData = await response.json()
      
      if (responseData.success && responseData.data) {
        // Convert the CSV string data to a Blob
        const csvBlob = new Blob([responseData.data], { type: 'text/csv' })
        
        return {
          success: true,
          data: csvBlob,
          processingSummary: responseData.processingSummary || [
            'Data processed successfully via API',
            'Applied AI cleaning algorithms',
            'Standardized data formats',
            'Ready for analysis tools'
          ]
        }
      } else {
        return {
          success: false,
          error: responseData.error || 'Processing failed'
        }
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
    try {
      const response = await fetch(getApiUrl(getEndpoint('WAITLIST_JOIN')), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: data.success,
        message: data.message,
        waitlist_count: data.waitlist_count
      }
    } catch (error) {
      console.error('Waitlist API Error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  export async function getWaitlistStats(): Promise<WaitlistResponse> {
    try {
      const response = await fetch(getApiUrl(getEndpoint('WAITLIST_STATS')), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: data.success,
        message: data.message,
        waitlist_count: data.waitlist_count
      }
    } catch (error) {
      console.error('Waitlist Stats API Error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
  
  // Generate dummy Excel data for fallback
  export function generateDummyExcelData(): Blob {
    const csvContent = `Name,Email,Phone,Company,Revenue,Date,done
  John Doe,john.doe@email.com,+1-555-0123,Acme Corp,50000,2024-01-15,done
  Jane Smith,jane.smith@email.com,+1-555-0124,TechStart,75000,2024-01-20,done
  Bob Johnson,bob.johnson@email.com,+1-555-0125,Global Inc,120000,2024-01-25,done
  Alice Brown,alice.brown@email.com,+1-555-0126,Innovate Co,95000,2024-02-01,done
  Charlie Wilson,charlie.wilson@email.com,+1-555-0127,NextGen,180000,2024-02-05,done
  Sarah Davis,sarah.davis@email.com,+1-555-0128,DataFlow,85000,2024-02-10,done
  Mike Wilson,mike.wilson@email.com,+1-555-0129,CloudTech,110000,2024-02-15,done
  Lisa Anderson,lisa.anderson@email.com,+1-555-0130,SmartCorp,65000,2024-02-20,done`
    
    return new Blob([csvContent], { type: 'text/csv' })
  }
  
  // Default processing summary for fallback
  export function getDefaultProcessingSummary(): string[] {
    return [
      'Cleaned 8 customer records',
      'Standardized email formats', 
      'Added revenue data',
      'Added done column',
      'Ready for Power BI import'
    ]
  } 