'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Mail, 
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  Star,
  Crown,
  Zap,
  Users,
  Clock,
  Gift,
  CheckCircle
} from 'lucide-react'

interface CinematicScene {
  id: string
  title: string
  subtitle: string
  visual: 'celebration' | 'benefits' | 'urgency' | 'form' | 'success'
  duration: number
  autoNext?: boolean
}

interface DemoWaitlistCTAProps {
  isVisible: boolean
  onClose: () => void
}

export default function DemoWaitlistCTA({ isVisible, onClose }: DemoWaitlistCTAProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const cinematicScenes: CinematicScene[] = [
    {
      id: 'celebration',
      title: 'TRANSFORMATION COMPLETE',
      subtitle: 'You just witnessed the future of data processing',
      visual: 'celebration',
      duration: 3000,
      autoNext: true
    },
    {
      id: 'benefits',
      title: 'RAWBIFY CHANGES EVERYTHING',
      subtitle: 'Join thousands transforming their data workflow',
      visual: 'benefits',
      duration: 4000,
      autoNext: true
    },
    {
      id: 'urgency',
      title: 'LIMITED BETA ACCESS',
      subtitle: 'Be among the first to experience the revolution',
      visual: 'urgency',
      duration: 3000,
      autoNext: true
    },
    {
      id: 'form',
      title: 'SECURE YOUR SPOT',
      subtitle: 'Enter your email to join the exclusive waitlist',
      visual: 'form',
      duration: 0,
      autoNext: false
    }
  ]

  // Auto-progression logic
  useEffect(() => {
    if (!isPlaying || !isVisible) return

    const scene = cinematicScenes[currentScene]
    if (scene?.autoNext && scene.duration > 0) {
      const timer = setTimeout(() => {
        if (currentScene < cinematicScenes.length - 1) {
          setCurrentScene(currentScene + 1)
        }
      }, scene.duration)
      return () => clearTimeout(timer)
    }
  }, [currentScene, isPlaying, isVisible])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      setCurrentScene(cinematicScenes.length) // Move to success scene
      
      // Redirect to main page after showing success
      setTimeout(() => {
        window.location.href = '/'
      }, 4000)
    } catch (error) {
      console.error('Waitlist signup failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    setCurrentScene(cinematicScenes.length - 1) // Go to form
  }

  const renderScene = () => {
    if (isSubmitted) {
      return <SuccessScene />
    }

    const scene = cinematicScenes[currentScene]
    if (!scene) return null

    switch (scene.visual) {
      case 'celebration':
        return <CelebrationScene />
      case 'benefits':
        return <BenefitsScene />
      case 'urgency':
        return <UrgencyScene />
      case 'form':
        return <FormScene email={email} setEmail={setEmail} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      default:
        return <CelebrationScene />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Full Screen Cinema Mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Cinema Controls */}
            <AnimatePresence>
              {showControls && !isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white font-mono text-sm">RAWBIFY CINEMA</span>
                      <div className="text-white/60 text-sm">
                        Scene {currentScene + 1} of {cinematicScenes.length}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={handleSkip}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={onClose}
                        className="text-white hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Cinema Content */}
            <div className="h-screen flex items-center justify-center relative">
              {/* Cinematic Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none"></div>
              
              {renderScene()}
            </div>

            {/* Cinematic Subtitles */}
            {!isSubmitted && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto"
                  >
                    <div className="text-center">
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(59, 130, 246, 0.8)",
                            "0 0 40px rgba(147, 51, 234, 1)",
                            "0 0 20px rgba(59, 130, 246, 0.8)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {cinematicScenes[currentScene]?.title}
                      </motion.h2>
                      
                      <motion.p
                        className="text-xl text-blue-300 font-light italic opacity-90"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {cinematicScenes[currentScene]?.subtitle}
                      </motion.p>

                      {/* Manual Continue Button for non-auto scenes */}
                      {!cinematicScenes[currentScene]?.autoNext && currentScene < cinematicScenes.length - 1 && (
                        <motion.button
                          onClick={() => setCurrentScene(currentScene + 1)}
                          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:from-blue-500 hover:to-purple-500 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <span>Continue</span>
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Progress Bar */}
            {!isSubmitted && (
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="w-full bg-white/10 h-1">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentScene + 1) / cinematicScenes.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Scene Components
function CelebrationScene() {
  return (
    <div className="text-center relative z-10">
      <motion.div
        className="w-48 h-48 mx-auto mb-8 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-48 h-48 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-8xl">🎉</div>
        </motion.div>
        
        {/* Celebration particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              scale: [1, 0],
              opacity: [1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </motion.div>
      
      <motion.div
        className="text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-6xl font-bold mb-4 gradient-text">INCREDIBLE!</div>
        <div className="text-2xl text-blue-300">You just experienced the future</div>
      </motion.div>
    </div>
  )
}

function BenefitsScene() {
  const benefits = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Transform data in seconds' },
    { icon: Users, title: 'Team Ready', desc: 'Collaborate with your team' },
    { icon: Crown, title: 'Enterprise Grade', desc: 'Built for professionals' },
    { icon: Gift, title: 'Early Access', desc: 'Launch discount included' }
  ]

  return (
    <div className="text-center relative z-10 max-w-6xl mx-auto">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-7xl font-bold text-white mb-6">RAWBIFY</div>
        <div className="text-3xl text-blue-300">The Ultimate Data Platform</div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-blue-300">{benefit.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function UrgencyScene() {
  return (
    <div className="text-center relative z-10">
      <motion.div
        className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.3, 1],
          boxShadow: [
            "0 0 50px rgba(239, 68, 68, 0.8)",
            "0 0 100px rgba(245, 101, 101, 1)",
            "0 0 50px rgba(239, 68, 68, 0.8)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Clock className="w-20 h-20 text-white" />
      </motion.div>
      
      <motion.div
        className="text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-6xl font-bold mb-4 text-red-400">LIMITED TIME</div>
        <div className="text-3xl text-orange-300 mb-8">Beta launching Q1 2025</div>
        
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">50%</div>
            <div className="text-red-300">Launch Discount</div>
          </div>
          <div className="bg-orange-500/20 border border-orange-500/40 rounded-2xl p-6">
            <div className="text-4xl font-bold text-orange-400 mb-2">500</div>
            <div className="text-orange-300">Beta Spots</div>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-2xl p-6">
            <div className="text-4xl font-bold text-yellow-400 mb-2">30</div>
            <div className="text-yellow-300">Days Left</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FormScene({ 
  email, 
  setEmail, 
  onSubmit, 
  isSubmitting 
}: { 
  email: string
  setEmail: (email: string) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean 
}) {
  return (
    <div className="text-center relative z-10 max-w-2xl mx-auto">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <Mail className="w-12 h-12 text-white" />
        </div>
        <div className="text-5xl font-bold text-white mb-4">SECURE YOUR ACCESS</div>
        <div className="text-2xl text-green-300">Join the exclusive beta program</div>
      </motion.div>
      
      <motion.form
        onSubmit={onSubmit}
        className="space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-8 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-xl placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex items-center justify-center space-x-3">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>JOINING WAITLIST...</span>
              </>
            ) : (
              <>
                <Star className="w-6 h-6" />
                <span>JOIN EXCLUSIVE WAITLIST</span>
                <ChevronRight className="w-6 h-6" />
              </>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>
      </motion.form>
      
      <motion.div
        className="mt-8 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Launch Q1 2025</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Limited Beta</span>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className="w-4 h-4" />
            <span>50% Discount</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SuccessScene() {
  return (
    <div className="text-center relative z-10">
      <motion.div
        className="w-48 h-48 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: [
            "0 0 50px rgba(34, 197, 94, 0.8)",
            "0 0 100px rgba(16, 185, 129, 1)",
            "0 0 50px rgba(34, 197, 94, 0.8)"
          ]
        }}
        transition={{ duration: 1, boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <CheckCircle className="w-24 h-24 text-white" />
      </motion.div>
      
      <motion.div
        className="text-white text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-7xl font-bold mb-6 text-green-400">SUCCESS!</div>
        <div className="text-3xl text-green-300 mb-8">Welcome to the future of data</div>
        <div className="text-xl text-gray-300">Check your email for confirmation</div>
      </motion.div>
      
      {/* Success particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full"
          animate={{
            x: [0, Math.random() * 600 - 300],
            y: [0, Math.random() * 600 - 300],
            scale: [1, 0],
            opacity: [1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}