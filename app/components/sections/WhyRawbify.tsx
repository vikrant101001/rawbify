'use client'

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { motion } from 'framer-motion'
import { Clock, DollarSign, Settings, AlertTriangle, CheckCircle, Zap, Database, Download } from 'lucide-react'

export default function WhyRawbify() {
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>()
  const [leftRef, leftVisible] = useIntersectionObserver<HTMLDivElement>()
  const [rightRef, rightVisible] = useIntersectionObserver<HTMLDivElement>()

  const problems = [
    {
      icon: Clock,
      text: "Time Factor: Manual processing takes time and Resources",
      color: "text-red-500"
    },
    {
      icon: DollarSign,
      text: "Cost Factor: Hiring a lot of Business/Data Analyst even for a simple task.",
      color: "text-red-500"
    },
    {
      icon: Settings,
      text: "Automation: VBA/Alteryx Experts are hard to get by and the licensing is also required",
      color: "text-red-500"
    },
    {
      icon: AlertTriangle,
      text: "Error Factor: Power BI and Tableau reject messy datasets",
      color: "text-red-500"
    }
  ]

  const solutions = [
    {
      icon: Zap,
      text: "AI-powered data cleaning and standardization",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      text: "Automatic detection and fixing of common issues",
      color: "text-green-500"
    },
    {
      icon: Database,
      text: "Export directly to Power BI and Tableau formats",
      color: "text-green-500"
    },
    {
      icon: Download,
      text: "Save hours of manual work with intelligent automation",
      color: "text-green-500"
    }
  ]

  return (
    <section className="py-20 px-2 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
      <div className="absolute top-0 left-0 w-full h-full dot-pattern opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 60 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900">Why </span>
            <span className="gradient-text">Rawbify?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Business data is messy. Cleaning it manually kills productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problems Section */}
          <motion.div 
            ref={leftRef}
            initial={{ opacity: 0, x: -60 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                The problem with existing methods
              </h3>
            </div>
            
            <div className="space-y-6">
              {problems.map((problem, index) => {
                const Icon = problem.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={leftVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {problem.text}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Solutions Section */}
          <motion.div 
            ref={rightRef}
            initial={{ opacity: 0, x: 60 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="modern-card p-8 lg:p-10">
              <div className="text-center lg:text-left mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  <span className="gradient-text">The Rawbify Solution</span>
                </h3>
              </div>
              
              <div className="space-y-6">
                {solutions.map((solution, index) => {
                  const Icon = solution.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-lg font-medium leading-relaxed">
                          {solution.text}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Call-to-action within the solutions card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-gray-700 font-semibold">
                    Ready to transform your data workflow?
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 