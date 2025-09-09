/**
 * Authentication Service for Rawbify
 * Handles all authentication-related API calls and token management
 */

import { API_CONFIG, getApiUrl } from '../config/api'

export interface User {
  id: string
  username: string
  created_at: string
  is_active: boolean
  trial_access_granted: boolean
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

export interface SignupData {
  username: string
  password: string
}

export interface SigninData {
  username: string
  password: string
}

class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private user: User | null = null

  private constructor() {
    // Load saved auth data on initialization
    this.loadAuthFromStorage()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.AUTH_SIGNUP), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: AuthResponse = await response.json()

      if (response.ok && result.success && result.user && result.token) {
        // Save auth data
        this.setAuthData(result.user, result.token)
        return result
      } else {
        return {
          success: false,
          message: result.message || 'Signup failed'
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    }
  }

  /**
   * Sign in an existing user
   */
  async signin(data: SigninData): Promise<AuthResponse> {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.AUTH_SIGNIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: AuthResponse = await response.json()

      if (response.ok && result.success && result.user && result.token) {
        // Save auth data
        this.setAuthData(result.user, result.token)
        return result
      } else {
        return {
          success: false,
          message: result.message || 'Invalid username or password'
        }
      }
    } catch (error) {
      console.error('Signin error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      }
    }
  }

  /**
   * Sign out the current user
   */
  signout(): void {
    this.token = null
    this.user = null
    
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rawbify_token')
      localStorage.removeItem('rawbify_user')
      sessionStorage.removeItem('rawbify_token')
      sessionStorage.removeItem('rawbify_user')
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.user
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.token !== null && this.user !== null
  }

  /**
   * Check if user has trial access
   */
  hasTrialAccess(): boolean {
    return this.user?.trial_access_granted || false
  }

  /**
   * Get authentication header for API calls
   */
  getAuthHeader(): Record<string, string> {
    if (this.token) {
      return {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return {}
  }

  /**
   * Save authentication data
   */
  private setAuthData(user: User, token: string, remember: boolean = true): void {
    this.user = user
    this.token = token

    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const storage = remember ? localStorage : sessionStorage
      storage.setItem('rawbify_user', JSON.stringify(user))
      storage.setItem('rawbify_token', token)
    }
  }

  /**
   * Load authentication data from storage
   */
  private loadAuthFromStorage(): void {
    // Only run in browser environment
    if (typeof window === 'undefined') return

    try {
      // Try localStorage first (remember me), then sessionStorage
      const storedUser = localStorage.getItem('rawbify_user') || sessionStorage.getItem('rawbify_user')
      const storedToken = localStorage.getItem('rawbify_token') || sessionStorage.getItem('rawbify_token')

      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser)
        this.token = storedToken
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error)
      // Clear corrupted data
      this.signout()
    }
  }

  /**
   * Validate username format
   */
  static validateUsername(username: string): { valid: boolean; message?: string } {
    if (!username) {
      return { valid: false, message: 'Username is required' }
    }
    if (username.length < 3) {
      return { valid: false, message: 'Username must be at least 3 characters' }
    }
    if (username.length > 50) {
      return { valid: false, message: 'Username must be less than 50 characters' }
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return { valid: false, message: 'Username can only contain letters, numbers, underscore, and dash' }
    }
    return { valid: true }
  }

  /**
   * Validate password format
   */
  static validatePassword(password: string): { valid: boolean; message?: string } {
    if (!password) {
      return { valid: false, message: 'Password is required' }
    }
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' }
    }
    if (password.length > 100) {
      return { valid: false, message: 'Password must be less than 100 characters' }
    }
    return { valid: true }
  }
}

// Export singleton instance
export { AuthService }
export default AuthService.getInstance()
