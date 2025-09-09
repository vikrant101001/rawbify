'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { useAuth } from '../../contexts/AuthContext'
import authService, { AuthService } from '../../services/authService'
import { Eye, EyeOff, User, Lock, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const { signin, signup } = useAuth()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = (): boolean => {
    // Username validation
    const usernameValidation = AuthService.validateUsername(formData.username)
    if (!usernameValidation.valid) {
      setError(usernameValidation.message || 'Invalid username')
      return false
    }

    // Password validation
    const passwordValidation = AuthService.validatePassword(formData.password)
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Invalid password')
      return false
    }

    // Confirm password validation (signup only)
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const authData = {
        username: formData.username.trim(),
        password: formData.password
      }

      const result = mode === 'signin' 
        ? await signin(authData, rememberMe)
        : await signup(authData, rememberMe)

      if (result.success) {
        setSuccess(mode === 'signin' ? 'Welcome back!' : 'Account created successfully!')
        
        // Close modal after a brief success message
        setTimeout(() => {
          onClose()
          onSuccess?.()
          resetForm()
        }, 1500)
      } else {
        setError(result.message || 'Authentication failed')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ username: '', password: '', confirmPassword: '' })
    setError('')
    setSuccess('')
    setIsLoading(false)
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          )}

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              disabled={isLoading}
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-300">
              Remember me
            </Label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-md">
              <XCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-md">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </Button>

          {/* Mode Switch */}
          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              disabled={isLoading}
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          {/* Trial Access Notice */}
          {mode === 'signup' && (
            <div className="text-center text-xs text-gray-400 bg-gray-800/50 p-3 rounded-md">
              🎉 New accounts get <span className="text-purple-400 font-semibold">free trial access</span> to all features!
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
