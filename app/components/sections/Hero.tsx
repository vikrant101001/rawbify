'use client'

import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react'

export default function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-hero opacity-10"></div>
      <div className="absolute inset-0 wave-pattern"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-purple-500" />
        </motion.div>
      </div>
      
      <div className="absolute top-40 right-20 opacity-20">
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Zap className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-40 left-20 opacity-20">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Target className="w-7 h-7 text-pink-500" />
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo with enhanced animation */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <motion.img 
              src="/rawbify_logo.svg" 
              alt="Rawbify" 
              className="h-16 sm:h-20 w-auto mx-auto"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
          
          {/* Main Heading with Gradient Text */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900">Raw Data In.</span>
            <br />
            <span className="gradient-text text-6xl sm:text-7xl lg:text-8xl">
              BI Ready Out.
            </span>
          </motion.h1>
          
          {/* Enhanced Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transform messy business data into clean, analysis-ready datasets for 
            <span className="font-semibold text-purple-600"> Power BI</span> and 
            <span className="font-semibold text-blue-600"> Tableau</span> in minutes, not hours.
          </motion.p>
          
          {/* Modern CTA Button 
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="btn-gradient text-lg px-10 py-6 rounded-full font-semibold shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group"
              onClick={scrollToWaitlist}
            >
              Join Waitlist/Trials
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
          */}

          {/* Fascinating Demo Button */}
          <motion.div
            variants={itemVariants}
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/demo"
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 group relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              <motion.div
                className="relative z-10 flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
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
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                <span className="font-bold">Take me to the Demo</span>
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
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </a>
            
            {/* Floating sparkles around the button */}
            <div className="absolute -top-2 -left-2 opacity-60">
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </div>
            <div className="absolute -top-2 -right-2 opacity-60">
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats/Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="modern-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">2000+</div>
              <div className="text-gray-600">Analysts Waiting</div>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">10x</div>
              <div className="text-gray-600">Faster Processing</div>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-gray-600">BI Ready Output</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
} 