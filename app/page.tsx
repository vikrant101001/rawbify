'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Target, Workflow, Info, Play, Users, LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import AuthModal from './components/auth/AuthModal'
import UserProfile from './components/auth/UserProfile'

type LandingSection = 'hero' | 'why' | 'how' | 'waitlist'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<LandingSection>('hero')
  const [showAuthOverlay, setShowAuthOverlay] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin')
  
  const { user, isAuthenticated, signout } = useAuth()

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isAuthenticated) {
      // User is logged in, go to dashboard
      window.location.href = '/dashboard'
    } else {
      // Show auth options
      setShowAuthOverlay(true)
    }
  }

  const handleAuthOption = (option: 'signin' | 'signup' | 'trial') => {
    setShowAuthOverlay(false)
    
    if (option === 'trial') {
      // Set trial user session and redirect to dashboard
      sessionStorage.setItem('rawbify_trial_user', 'true')
      window.location.href = '/dashboard'
    } else if (option === 'signin') {
      // Show new auth modal for signin
      setAuthModalMode('signin')
      setShowAuthModal(true)
    } else if (option === 'signup') {
      // Show new auth modal for signup
      setAuthModalMode('signup')
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    // Redirect to dashboard after successful authentication
    window.location.href = '/dashboard'
  }

  const renderAuthOverlay = () => (
    <AnimatePresence>
      {showAuthOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAuthOverlay(false)}
          />
          
          {/* Overlay Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 max-w-md w-full mx-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAuthOverlay(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <span className="text-white text-lg">×</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-2">
                Welcome to <span className="text-purple-400">Rawbify</span>
              </h2>
              <p className="text-white/60">
                Choose how you'd like to access your dashboard
              </p>
            </div>

            {/* Authentication Options */}
            <div className="space-y-4">
              {/* Sign In Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('signin')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center space-x-3"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </motion.button>

              {/* Use Trial Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('trial')}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/20 flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Use Trial as Alex Johnson</span>
              </motion.button>

              {/* Sign Up Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('signup')}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 p-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/10 hover:text-white flex items-center justify-center space-x-3"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Up</span>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Already have an account? <span className="text-purple-400 cursor-pointer hover:underline">Sign in</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const renderHeroSection = () => (
    <div className="text-center space-y-8">
      <div>
        <motion.img 
          src="/rawbify_logo.svg" 
          alt="Rawbify" 
          className="h-16 sm:h-20 w-auto mx-auto mb-8"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
        />
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight text-white">
          <span className="text-white">Raw Data In.</span>
          <br />
          <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            BI Ready Out.
          </span>
        </h1>
        
        <p className="text-lg sm:text-2xl text-white/60 mb-12 max-w-4xl mx-auto leading-relaxed">
          Transform messy business data into clean, analysis-ready datasets for 
          <span className="font-semibold text-purple-400"> Power BI</span> and 
          <span className="font-semibold text-cyan-400"> Tableau</span> in minutes, not hours.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#"
              onClick={handleDashboardClick}
              className="inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              <div className="flex items-center justify-center space-x-3">
                <Workflow className="w-5 h-5" />
                <span>Take me to my Rawbify Dashboard</span>
              </div>
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/demo"
              className="inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl hover:shadow-2xl hover:bg-white/20 transform hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
            >
              <div className="flex items-center justify-center space-x-3">
                <motion.div
                  className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
                <span>Show me a Demo</span>
                <motion.div
                  className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{ 
                    x: [0, 3, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )

  const renderWhySection = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-5xl font-light text-white mb-4">
          Why <span className="text-purple-400">Rawbify</span>?
        </h1>
        <p className="text-white/60 text-xl mb-12">
          The smart way to transform your data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">Lightning Fast</h3>
          <p className="text-white/60 text-lg">
            Transform complex datasets in minutes, not hours. Our AI-powered engine processes data 10x faster than traditional methods.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">BI Ready</h3>
          <p className="text-white/60 text-lg">
            Output is perfectly formatted for Power BI and Tableau. No more manual data cleaning or formatting headaches.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">AI Powered</h3>
          <p className="text-white/60 text-lg">
            Advanced AI understands your data structure and automatically applies the right transformations for your specific use case.
          </p>
        </div>
      </div>
    </div>
  )

  const renderHowSection = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-5xl font-light text-white mb-4">
          How <span className="text-purple-400">Rawbify</span> Works
        </h1>
        <p className="text-white/60 text-xl mb-12">
          Simple steps to transform your data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">Upload</h3>
          <p className="text-white/60 text-lg">
            Upload your messy CSV, Excel, or JSON files. We support all common data formats.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">Process</h3>
          <p className="text-white/60 text-lg">
            Our AI analyzes your data and applies intelligent transformations to clean and structure it.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="text-2xl font-medium text-white mb-4">Download</h3>
          <p className="text-white/60 text-lg">
            Download your clean, BI-ready dataset formatted perfectly for Power BI and Tableau.
          </p>
        </div>
      </div>
    </div>
  )

  const renderWaitlistSection = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-5xl font-light text-white mb-4">
          Join the <span className="text-purple-400">Rawbify</span> Waitlist
        </h1>
        <p className="text-white/60 text-xl mb-12">
          Be among the first to experience the future of data transformation
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-medium text-white mb-4">Get Early Access</h2>
          <p className="text-white/60 text-lg mb-8">
            Join 2000+ analysts who are already waiting to transform their data workflow. 
            Get notified when Rawbify launches and receive exclusive early access.
          </p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
            />
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium text-lg">
              Join Waitlist
            </button>
          </div>

          <p className="text-white/40 text-sm mt-6">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'hero': return renderHeroSection();
      case 'why': return renderWhySection();
      case 'how': return renderHowSection();
      case 'waitlist': return renderWaitlistSection();
      default: return renderHeroSection();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements - matching dashboard */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Authentication Overlay */}
      {renderAuthOverlay()}

      {/* Modern Navigation Header - matching dashboard style */}
      <header className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
                <div className="relative">
                  <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rawbify
                </span>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-2 sm:gap-6 justify-center sm:justify-end">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowUserProfile(true)}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user?.username}</span>
                    </button>
                    <a 
                      href="#"
                      onClick={handleDashboardClick}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 font-semibold hover:scale-105"
                    >
                      Dashboard
                    </a>
                  </div>
                ) : (
                  <a 
                    href="#"
                    onClick={handleDashboardClick}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 w-full sm:w-auto text-center font-semibold hover:scale-105"
                  >
                    Take me to my Rawbify Dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className="pt-40 pb-32 px-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">
          {renderCurrentSection()}
        </div>
      </div>

      {/* Floating Navigation Dock - Bottom Center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl px-6 py-4">
          <div className="flex items-center space-x-6">
            {[
              { icon: Sparkles, label: 'Hero', section: 'hero' as LandingSection },
              { icon: Info, label: 'Why Rawbify', section: 'why' as LandingSection },
              { icon: Play, label: 'How It Works', section: 'how' as LandingSection },
              { icon: Users, label: 'Join Waitlist', section: 'waitlist' as LandingSection },
            ].map(({ icon: Icon, label, section }) => (
              <button
                key={label}
                onClick={() => setCurrentSection(section)}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  currentSection === section 
                    ? 'bg-white/20 scale-110' 
                    : 'hover:bg-white/10 hover:scale-105'
                }`}
              >
                <Icon className={`w-6 h-6 transition-colors duration-200 ${
                  currentSection === section ? 'text-white' : 'text-white/60 group-hover:text-white'
                }`} />
                
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
                    {label}
                  </div>
                </div>

                {currentSection === section && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Light Effect - matching dashboard */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full pointer-events-none"></div>

      {/* New Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authModalMode}
        onSuccess={handleAuthSuccess}
      />

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
    </div>
  )
}
