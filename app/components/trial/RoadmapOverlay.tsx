'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ArrowRight, 
  Zap, 
  Database, 
  Bot, 
  User,
  Users, 
  Settings, 
  Sparkles,
  Rocket,
  Check,
  Clock,
  Star
} from 'lucide-react'

interface RoadmapOverlayProps {
  isVisible: boolean
  onClose: () => void
  enabled?: boolean
}

// 🎯 EDIT THIS DATA TO CHANGE THE ROADMAP CONTENT
const ROADMAP_DATA = {
  title: "Rawbify Development Roadmap",
  subtitle: "TrialV1 is Single Input → Single Output only",
  description: "We're building the future of data transformation. Here's what's coming next!",
  versions: [
    {
      id: "trial-v1",
      name: "TrialV1",
      status: "current", // current, upcoming, planned
      icon: Zap,
      color: "blue",
      description: "Single input, single output with universal export",
      features: [
        "Single file upload",
        "One-time AI processing",
        "Export to all formats (CSV, Excel, JSON, TSV)",
        "Basic chat interface",
        "Instant download capability"
      ]
    },
    {
      id: "trial-v2", 
      name: "TrialV2",
      status: "upcoming",
      icon: Database,
      color: "purple",
      description: "Multi-input processing with interactive editing",
      features: [
        "Multiple file uploads",
        "Step-by-step transformations",
        "Edit output to create new output",
        "Advanced chat with data memory",
        "Interactive data pipeline builder"
      ]
    },
    {
      id: "launch-v1",
      name: "Launch 1.0", 
      status: "upcoming",
      icon: User,
      color: "green",
      description: "Personal dashboard with workspace management",
      features: [
        "User dashboard & profile",
        "Personal data memory",
        "Workspace organization",
        "Pricing plans & billing",
        "Project history & analytics",
        "Custom preferences"
      ]
    },
    {
      id: "dev-v1",
      name: "Dev v1",
      status: "planned",
      icon: Users,
      color: "orange", 
      description: "Collaboration & team workspace features",
      features: [
        "Shared data projects",
        "Team workspaces",
        "Real-time collaboration",
        "Role-based permissions",
        "Team member management"
      ]
    },
    {
      id: "dev-v2",
      name: "Dev v2",
      status: "planned",
      icon: Bot,
      color: "indigo",
      description: "Advanced analytics & software integrations", 
      features: [
        "Advanced data analytics",
        "API integrations for external software",
        "Custom workflow automation",
        "Performance insights",
        "Third-party connector marketplace"
      ]
    },
    {
      id: "launch-v2",
      name: "Launch 2.0",
      status: "planned",
      icon: Rocket,
      color: "pink",
      description: "Enterprise-grade API & white-label solutions",
      features: [
        "Full-featured API access",
        "Custom branding options",
        "Company policy compliance",
        "Enterprise security standards",
        "White-label deployment",
        "Custom domain support"
      ]
    }
  ]
}

const RoadmapOverlay = ({ 
  isVisible, 
  onClose, 
  enabled = true 
}: RoadmapOverlayProps) => {
  const [animatedVersions, setAnimatedVersions] = useState<string[]>([])

  useEffect(() => {
    if (!isVisible || !enabled) return

    // Animate versions appearing one by one
    const timer = setTimeout(() => {
      ROADMAP_DATA.versions.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedVersions(prev => [...prev, ROADMAP_DATA.versions[index].id])
        }, index * 200)
      })
    }, 500)

    return () => {
      clearTimeout(timer)
      setAnimatedVersions([])
    }
  }, [isVisible, enabled])

  if (!enabled || !isVisible) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-500'
      case 'upcoming': return 'bg-blue-500'
      case 'planned': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current': return 'Live Now'
      case 'upcoming': return 'Coming Soon'
      case 'planned': return 'Planned'
      default: return 'TBD'
    }
  }

  const getVersionColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600', 
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600',
      pink: 'from-pink-500 to-pink-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 rounded-t-2xl">
            <div className="flex items-start justify-between text-white">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold mb-2"
                >
                  {ROADMAP_DATA.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-blue-100 text-lg font-medium mb-1"
                >
                  {ROADMAP_DATA.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-blue-200 text-sm"
                >
                  {ROADMAP_DATA.description}
                </motion.p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Current Limitation Notice */}
          <div className="p-6 bg-yellow-50 border-b border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">Current Limitation</h3>
                <p className="text-sm text-yellow-700">
                  TrialV1 supports only <strong>single input → single output</strong> processing. 
                  For additional transformations, please start a new session or wait for TrialV2!
                </p>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ROADMAP_DATA.versions.map((version, index) => {
                const Icon = version.icon
                const isAnimated = animatedVersions.includes(version.id)
                
                return (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`relative bg-white border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                      version.status === 'current' 
                        ? 'border-green-300 bg-green-50' 
                        : version.status === 'upcoming'
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    {/* Status Badge */}
                    <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(version.status)}`}>
                      {getStatusText(version.status)}
                    </div>

                    {/* Version Header */}
                    <div className="flex items-center space-x-3 mb-4 mt-2">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getVersionColor(version.color)} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{version.name}</h3>
                        <p className="text-sm text-gray-600">{version.description}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm mb-3">Key Features:</h4>
                      {version.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isAnimated ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.1 + featureIndex * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          {version.status === 'current' ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Star className="w-4 h-4 text-gray-400" />
                          )}
                          <span className={`text-sm ${
                            version.status === 'current' ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Connection Line (except for last item) */}
                    {index < ROADMAP_DATA.versions.length - 1 && (
                      <div className="hidden xl:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isAnimated ? { scale: 1 } : {}}
                          transition={{ delay: 0.3 }}
                        >
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center space-x-2 mb-4"
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Stay Tuned!</h3>
              </motion.div>
              <p className="text-gray-600 mb-4">
                We're working hard to bring you these exciting features. Each version will unlock new possibilities for your data transformation workflows.
              </p>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                Got it! Take me back
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default RoadmapOverlay 