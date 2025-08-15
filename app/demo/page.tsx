'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Volume2,
  VolumeX,
  ChevronRight,
  Maximize,
  SkipForward
} from 'lucide-react'
import Link from 'next/link'

export default function DemoWelcome() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      // Show skip option after 3 seconds
      const timer = setTimeout(() => setShowSkip(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying])

  if (!isPlaying) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
        
        {/* Background Video Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                x: [0, Math.random() * 1920],
                y: [0, Math.random() * 1080],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <img src="/rawbify_logo.svg" alt="Rawbify" className="h-20 w-auto mx-auto mb-6" />
            <motion.h1 
              className="text-6xl font-bold text-white mb-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              RAWBIFY
            </motion.h1>
            <motion.p 
              className="text-2xl text-blue-300 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The Data Transformation Chronicles
            </motion.p>
          </motion.div>

          {/* Play Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setIsPlaying(true)}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 60px rgba(147, 51, 234, 0.8)",
                  "0 0 30px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative z-10 flex items-center space-x-4">
                <Play className="w-8 h-8" />
                <span>BEGIN EXPERIENCE</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-gray-400 mt-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            An Interactive Journey • Runtime: 3 minutes • Rated A for Awesome
          </motion.p>
        </div>

        {/* Corner Elements */}
        <div className="absolute top-6 left-6 text-blue-400 font-mono text-sm">
          RAWBIFY STUDIOS
        </div>
        <div className="absolute top-6 right-6 text-blue-400 font-mono text-sm">
          INTERACTIVE DEMO v1.0
        </div>
        <div className="absolute bottom-6 left-6 text-gray-500 text-sm">
          Best experienced with sound
        </div>
        <div className="absolute bottom-6 right-6 text-gray-500 text-sm">
          © 2025 • Premium Experience
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Movie Interface */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10 pointer-events-none"></div>
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-mono text-sm">LIVE DEMO</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <Maximize className="w-5 h-5 text-white hover:text-blue-400 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-20 right-6 z-20"
          >
            <Link href="/demo/guided">
              <motion.button
                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20 hover:bg-white/20 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip Intro</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Movie Content */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <CinematicIntro />
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="w-full bg-white/20 rounded-full h-1">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-white text-sm">
          <span>THE DATA TRANSFORMATION CHRONICLES</span>
          <Link href="/demo/guided">
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Continue →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function CinematicIntro() {
  const [currentScene, setCurrentScene] = useState(0)
  
  const scenes = [
    {
      title: "RAWBIFY STUDIOS PRESENTS",
      subtitle: "",
      duration: 2000
    },
    {
      title: "In a world of messy data...",
      subtitle: "Where spreadsheets ruled with chaos and confusion",
      duration: 3000
    },
    {
      title: "One platform dared to change everything",
      subtitle: "Raw Data In. BI Ready Out.",
      duration: 3000
    },
    {
      title: "Experience the transformation",
      subtitle: "793 rows of chaos become customer intelligence",
      duration: 3000
    },
    {
      title: "RAWBIFY",
      subtitle: "The future of data is here",
      duration: 4000
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1)
      }
    }, scenes[currentScene].duration)

    return () => clearTimeout(timer)
  }, [currentScene, scenes])

  return (
    <div className="text-center relative">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {scenes[currentScene].title}
          </motion.h1>
          
          {scenes[currentScene].subtitle && (
            <motion.p 
              className="text-xl md:text-2xl text-blue-300 font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {scenes[currentScene].subtitle}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Scene Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {scenes.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentScene ? 'bg-white' : 'bg-white/30'
            }`}
            animate={index === currentScene ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 0.5, repeat: index === currentScene ? Infinity : 0 }}
          />
        ))}
      </div>


    </div>
  )
}