'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import authService, { User, AuthResponse, SignupData, SigninData } from '../services/authService'

interface AuthContextType {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasTrialAccess: boolean

  // Actions
  signup: (data: SignupData, remember?: boolean) => Promise<AuthResponse>
  signin: (data: SigninData, remember?: boolean) => Promise<AuthResponse>
  signout: () => void
  
  // Utilities
  getAuthHeader: () => Record<string, string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from storage (only in browser)
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    try {
      const currentUser = authService.getCurrentUser()
      const token = authService.getToken()
      
      if (currentUser && token) {
        setUser(currentUser)
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = async (data: SignupData, remember: boolean = true): Promise<AuthResponse> => {
    setIsLoading(true)
    try {
      const result = await authService.signup(data)
      
      if (result.success && result.user) {
        setUser(result.user)
        
        // Update storage preference (only in browser)
        if (!remember && typeof window !== 'undefined') {
          // Move from localStorage to sessionStorage if "remember me" is unchecked
          const userData = localStorage.getItem('rawbify_user')
          const token = localStorage.getItem('rawbify_token')
          if (userData && token) {
            sessionStorage.setItem('rawbify_user', userData)
            sessionStorage.setItem('rawbify_token', token)
            localStorage.removeItem('rawbify_user')
            localStorage.removeItem('rawbify_token')
          }
        }
      }
      
      return result
    } finally {
      setIsLoading(false)
    }
  }

  const signin = async (data: SigninData, remember: boolean = true): Promise<AuthResponse> => {
    setIsLoading(true)
    try {
      const result = await authService.signin(data)
      
      if (result.success && result.user) {
        setUser(result.user)
        
        // Update storage preference (only in browser)
        if (!remember && typeof window !== 'undefined') {
          // Move from localStorage to sessionStorage if "remember me" is unchecked
          const userData = localStorage.getItem('rawbify_user')
          const token = localStorage.getItem('rawbify_token')
          if (userData && token) {
            sessionStorage.setItem('rawbify_user', userData)
            sessionStorage.setItem('rawbify_token', token)
            localStorage.removeItem('rawbify_user')
            localStorage.removeItem('rawbify_token')
          }
        }
      }
      
      return result
    } finally {
      setIsLoading(false)
    }
  }

  const signout = (): void => {
    authService.signout()
    setUser(null)
  }

  const getAuthHeader = (): Record<string, string> => {
    return authService.getAuthHeader()
  }

  const value: AuthContextType = {
    // State
    user,
    isAuthenticated: user !== null,
    isLoading,
    hasTrialAccess: user?.trial_access_granted || false,

    // Actions
    signup,
    signin,
    signout,

    // Utilities
    getAuthHeader,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
