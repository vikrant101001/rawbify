'use client'

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { motion } from 'framer-motion'
import { Upload, MessageSquare, Download, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    emoji: "📁",
    title: "Upload",
    description: "Upload your raw data files in any format - CSV, Excel, JSON, or database exports.",
    color: "from-blue-500 to-purple-600",
    bgColor: "from-blue-50 to-purple-50"
  },
  {
    icon: MessageSquare,
    emoji: "🤖",
    title: "Prompt and Process",
    description: "Give a prompt of what you want the final data to be and Our AI analyzes your data, identifies issues, and applies intelligent cleaning rules.",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    icon: Download,
    emoji: "📊",
    title: "Export",
    description: "Download clean, analysis-ready data optimized for Power BI and Tableau.",
    color: "from-pink-500 to-red-600",
    bgColor: "from-pink-50 to-red-50"
  }
]

export default function HowItWorks() {
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>()

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

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 px-2 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-purple-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 60 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">How It </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Three simple steps to transform your data from raw to ready
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Desktop Progress Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const [stepRef, stepVisible] = useIntersectionObserver<HTMLDivElement>()
              const Icon = step.icon
              
              return (
                <motion.div 
                  key={index} 
                  ref={stepRef}
                  variants={itemVariants}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group"
                >
                  {/* Step Card */}
                  <div className="modern-card p-8 relative overflow-hidden group-hover:scale-105 transition-all duration-500">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                      {index + 1}
                    </div>
                    
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <motion.div 
                        className={`w-20 h-20 mx-auto bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.1 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      {/* Floating Emoji */}
                      <motion.div
                        className="absolute -top-2 -right-2 text-2xl"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        {step.emoji}
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="w-8 h-8 text-gray-300" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-4">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="transform rotate-90"
                      >
                        <ArrowRight className="w-8 h-8 text-gray-300" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="modern-card p-8 max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Join thousands of data analysts who have already simplified their workflow
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToWaitlist}
                className="btn-gradient text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 group"
              >
                Start Your Journey
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 