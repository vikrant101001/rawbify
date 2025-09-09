'use client'

import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { User, LogOut, Crown, Calendar, Shield } from 'lucide-react'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, signout, hasTrialAccess } = useAuth()

  const handleSignout = () => {
    signout()
    onClose()
  }

  if (!user) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Avatar & Basic Info */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">{user.username}</h3>
              <p className="text-gray-400 text-sm">User ID: {user.id.slice(0, 8)}...</p>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Account Status</span>
              </div>
              <span className="text-green-400 font-medium">
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Trial Access</span>
              </div>
              <span className={`font-medium ${hasTrialAccess ? 'text-purple-400' : 'text-gray-400'}`}>
                {hasTrialAccess ? 'Active' : 'Expired'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Member Since</span>
              </div>
              <span className="text-blue-400 font-medium">
                {formatDate(user.created_at)}
              </span>
            </div>
          </div>

          {/* Trial Access Notice */}
          {hasTrialAccess && (
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-purple-400">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Trial Access Active</span>
              </div>
              <p className="text-purple-300 text-sm mt-2">
                You have access to all Rawbify features. Process unlimited files and enjoy the full experience!
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleSignout}
              variant="outline"
              className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Footer Info */}
          <div className="text-center text-xs text-gray-500">
            <p>Powered by Rawbify • Secure & Private</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
