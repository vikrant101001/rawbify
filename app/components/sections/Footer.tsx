'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 px-2 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="wave-pattern opacity-30"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
                <motion.img 
                  src="/rawbify_logo.svg" 
                  alt="Rawbify" 
                  className="h-10 w-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Rawbify
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-center md:text-left text-lg leading-relaxed max-w-md">
                <span className="gradient-text font-semibold">Raw Data In. BI Ready Out.</span>
                <br />
                Transform your messy business data into clean, analysis-ready datasets for Power BI and Tableau.
              </p>
              <motion.p 
                variants={itemVariants}
                className="text-sm text-gray-400 text-center md:text-left"
              >
                © 2024 Rawbify. All rights reserved.
              </motion.p>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Product
              </h3>
              <ul className="space-y-4 text-gray-300">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-blue-400">
                    Features
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-blue-400">
                    Pricing
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-blue-400">
                    Trial
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-blue-400">
                    API
                  </a>
                </motion.li>
              </ul>
            </motion.div>
            
            {/* Company */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Company
              </h3>
              <ul className="space-y-4 text-gray-300">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-purple-400">
                    About
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-purple-400">
                    Blog
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-purple-400">
                    Careers
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-white transition-colors duration-300 text-lg hover:text-purple-400">
                    Contact
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>
          
          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-700 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center text-gray-400">
                <motion.div 
                  className="flex items-center justify-center space-x-2 text-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Made with</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block"
                  >
                    <Heart className="w-5 h-5 text-red-400 fill-current" />
                  </motion.span>
                  <span>for data analysts everywhere</span>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium"
                >
                  ✨ Coming Soon
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
} 