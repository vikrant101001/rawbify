'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  ChevronRight,
  Maximize,
  User,
  FileText
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DialogueScene {
  id: string
  speaker: 'narrator' | 'ai' | 'user' | 'system'
  text: string
  subtitle: string
  duration: number
  visual: 'welcome' | 'data-preview' | 'ai-thinking' | 'processing' | 'results'
  autoNext?: boolean
}

export default function CinematicDemo() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const dialogueScenes: DialogueScene[] = [
    {
      id: 'intro',
      speaker: 'narrator',
      text: "Welcome to the Data Studio...",
      subtitle: "Where impossible transformations become reality",
      duration: 3000,
      visual: 'welcome',
      autoNext: true
    },
    {
      id: 'data-loaded',
      speaker: 'system',
      text: "Sample data detected: 793 sales records",
      subtitle: "Raw, messy, and filled with potential",
      duration: 3000,
      visual: 'data-preview',
      autoNext: true
    },
    {
      id: 'ai-awakens',
      speaker: 'ai',
      text: "Analyzing data structure...",
      subtitle: "I can see patterns hidden within the chaos",
      duration: 2500,
      visual: 'ai-thinking',
      autoNext: true
    },
    {
      id: 'user-input',
      speaker: 'user',
      text: "Transform this into customer intelligence",
      subtitle: "The human gives me purpose and direction",
      duration: 3000,
      visual: 'ai-thinking',
      autoNext: false
    },
    {
      id: 'ai-processing',
      speaker: 'ai',
      text: "Initiating transformation sequence...",
      subtitle: "Grouping customers, calculating metrics, applying business logic",
      duration: 4000,
      visual: 'processing',
      autoNext: true
    },
    {
      id: 'completion',
      speaker: 'system',
      text: "Transformation complete: 739 customer insights generated",
      subtitle: "From chaos, clarity. From data, intelligence.",
      duration: 3000,
      visual: 'results',
      autoNext: false
    }
  ]

  // Auto-progression logic
  useEffect(() => {
    if (!isPlaying) return

    const scene = dialogueScenes[currentScene]
    if (scene?.autoNext) {
      const timer = setTimeout(() => {
        if (currentScene < dialogueScenes.length - 1) {
          setCurrentScene(currentScene + 1)
        } else {
          // End of scenes, go to studio
          router.push('/demo/studio')
        }
      }, scene.duration)
      return () => clearTimeout(timer)
    }
  }, [currentScene, isPlaying, router])

  // Typing effect for AI dialogue
  useEffect(() => {
    const scene = dialogueScenes[currentScene]
    if (scene?.speaker === 'ai' || scene?.speaker === 'user') {
      setIsTyping(true)
      setTypingText('')
      
      const text = scene.text
      let index = 0
      
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setTypingText(text.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeTimer)
        }
      }, 50)
      
      return () => clearInterval(typeTimer)
    } else {
      setTypingText('')
      setIsTyping(false)
    }
  }, [currentScene])

  const handleNext = () => {
    if (currentScene < dialogueScenes.length - 1) {
      setCurrentScene(currentScene + 1)
    } else {
      router.push('/demo/studio')
    }
  }

  const handleSkip = () => {
    router.push('/demo/studio')
  }

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'narrator': return 'text-blue-400'
      case 'ai': return 'text-green-400'
      case 'user': return 'text-yellow-400'
      case 'system': return 'text-purple-400'
      default: return 'text-white'
    }
  }

  const getSpeakerName = (speaker: string) => {
    switch (speaker) {
      case 'narrator': return 'NARRATOR'
      case 'ai': return 'RAWBIFY AI'
      case 'user': return 'DATA ANALYST'
      case 'system': return 'SYSTEM'
      default: return 'UNKNOWN'
    }
  }

  const renderVisual = () => {
    const scene = dialogueScenes[currentScene]
    
    switch (scene?.visual) {
      case 'welcome':
        return <WelcomeVisual />
      case 'data-preview':
        return <DataPreviewVisual />
      case 'ai-thinking':
        return <AIThinkingVisual />
      case 'processing':
        return <ProcessingVisual />
      case 'results':
        return <ResultsVisual />
      default:
        return <WelcomeVisual />
    }
  }

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none"></div>
      
      {/* Movie Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-mono text-sm">LIVE CINEMA</span>
                <div className="text-white/60 text-sm">
                  Scene {currentScene + 1} of {dialogueScenes.length}
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
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleSkip}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <Maximize className="w-5 h-5 text-white hover:text-blue-400 transition-colors cursor-pointer" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Visual Content */}
      <div className="relative z-10 h-screen">
        {renderVisual()}
      </div>

      {/* Cinematic Dialogue Subtitles */}
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
            {/* Speaker Name */}
            <div className="flex items-center justify-between mb-4">
              <div className={`font-bold text-lg font-mono ${getSpeakerColor(dialogueScenes[currentScene]?.speaker)}`}>
                {getSpeakerName(dialogueScenes[currentScene]?.speaker)}
              </div>
              
              {/* Scene Progress */}
              <div className="flex space-x-1">
                {dialogueScenes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentScene ? 'bg-blue-400' : 
                      index < currentScene ? 'bg-green-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Dialogue */}
            <div className="text-white text-xl md:text-2xl font-medium mb-3">
              {(dialogueScenes[currentScene]?.speaker === 'ai' || dialogueScenes[currentScene]?.speaker === 'user') ? (
                <>
                  {typingText}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-1 h-6 bg-green-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </>
              ) : (
                dialogueScenes[currentScene]?.text
              )}
            </div>

            {/* Subtitle */}
            <div className="text-gray-300 text-lg italic opacity-80 mb-4">
              {dialogueScenes[currentScene]?.subtitle}
            </div>

            {/* Next Button */}
            {!dialogueScenes[currentScene]?.autoNext && (
              <div className="flex justify-end">
                <motion.button
                  onClick={handleNext}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:from-blue-500 hover:to-purple-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>
                    {currentScene < dialogueScenes.length - 1 ? 'Continue' : 'Enter Studio'}
                  </span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="w-full bg-white/10 h-1">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentScene + 1) / dialogueScenes.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}

// Visual Components
function WelcomeVisual() {
  return (
    <div className="h-full flex items-center justify-center relative">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <img src="/rawbify_logo.svg" alt="Rawbify" className="h-16 w-auto" />
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold text-white mb-4"
          animate={{ 
            textShadow: [
              "0 0 30px rgba(59, 130, 246, 0.8)",
              "0 0 60px rgba(147, 51, 234, 1)",
              "0 0 30px rgba(59, 130, 246, 0.8)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          DATA STUDIO
        </motion.h1>
        
        <p className="text-2xl text-blue-300 font-light">
          Where Data Becomes Intelligence
        </p>
      </motion.div>
      
      {/* Background Effects */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: "50%",
            top: "50%"
          }}
        />
      ))}
    </div>
  )
}

function DataPreviewVisual() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <motion.div
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-5xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 text-blue-400 mr-4" />
          <h2 className="text-3xl font-bold text-white">sales_data_demo.csv</h2>
          <span className="ml-auto bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
            793 rows × 15 columns
          </span>
        </div>
        
        <div className="grid grid-cols-6 gap-4 text-white font-mono text-sm">
          {['sales_id', 'sales_rep_name', 'region', 'total_revenue', 'customer_type', '...'].map((header, i) => (
            <motion.div
              key={i}
              className="bg-gray-700/50 p-3 rounded-lg border border-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {header}
            </motion.div>
          ))}
          
          {['S00512', 'Alice Johnson', 'West', '$174,917.55', 'SMB', '...'].map((cell, i) => (
            <motion.div
              key={i}
              className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              {cell}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-400">
          Raw sales data loaded and ready for transformation...
        </div>
      </motion.div>
    </div>
  )
}

function AIThinkingVisual() {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <User className="w-16 h-16 text-white" />
          </motion.div>
          
          {/* Neural network effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              animate={{
                x: [0, Math.cos(i * 30 * Math.PI / 180) * 60],
                y: [0, Math.sin(i * 30 * Math.PI / 180) * 60],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </motion.div>
        
        <motion.h2 
          className="text-4xl font-bold text-green-400 mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI PROCESSING...
        </motion.h2>
        
        <div className="text-white text-lg">
          Analyzing patterns in the data matrix
        </div>
      </motion.div>
    </div>
  )
}

function ProcessingVisual() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center">
        <motion.div
          className="w-48 h-48 mx-auto mb-8 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Central processing core */}
          <motion.div
            className="w-48 h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold text-white font-mono"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                793→739
              </motion.div>
            </div>
          </motion.div>
          
          {/* Data streams */}
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full"
              animate={{
                x: [0, Math.cos(i * 22.5 * Math.PI / 180) * 120],
                y: [0, Math.sin(i * 22.5 * Math.PI / 180) * 120],
                scale: [1, 0.5, 1],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </motion.div>
        
        <motion.h2 
          className="text-5xl font-bold text-white mb-6"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(255, 255, 255, 0.8)",
              "0 0 40px rgba(59, 130, 246, 1)",
              "0 0 20px rgba(255, 255, 255, 0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          TRANSFORMATION IN PROGRESS
        </motion.h2>
        
        <div className="text-blue-300 text-xl font-light">
          Converting raw sales data into customer intelligence...
        </div>
      </div>
    </div>
  )
}

function ResultsVisual() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 50px rgba(34, 197, 94, 0.8)",
              "0 0 100px rgba(16, 185, 129, 1)",
              "0 0 50px rgba(34, 197, 94, 0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-6xl">✨</div>
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold text-white mb-6"
          animate={{ 
            textShadow: [
              "0 0 30px rgba(34, 197, 94, 0.8)",
              "0 0 60px rgba(16, 185, 129, 1)",
              "0 0 30px rgba(34, 197, 94, 0.8)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          TRANSFORMATION COMPLETE
        </motion.h1>
        
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">793</div>
            <div className="text-red-300">Raw Records</div>
            <div className="text-red-200 text-sm">Messy & Unorganized</div>
          </div>
          
          <div className="bg-green-500/20 border border-green-500/40 rounded-2xl p-6">
            <div className="text-4xl font-bold text-green-400 mb-2">739</div>
            <div className="text-green-300">Customer Insights</div>
            <div className="text-green-200 text-sm">Clean & Actionable</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}