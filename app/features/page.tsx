'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Database, 
  Bot, 
  Users, 
  Rocket,
  FileText,
  Download,
  Sparkles,
  Shield,
  Clock,
  BarChart3,
  Code,
  Cloud,
  Lock,
  ArrowRight,
  CheckCircle,
  Star,
  Layers,
  Workflow,
  Eye,
  MessageSquare,
  Settings,
  Globe
} from 'lucide-react'
import Link from 'next/link'

const FeatureCard = ({ icon: Icon, title, description, status, color, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`relative p-6 bg-white rounded-xl border border-gray-200 hover:border-${color}-300 hover:shadow-lg transition-all duration-300 group overflow-hidden`}
  >
    {/* Status Badge */}
    {status && (
      <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${
        status === 'live' ? 'bg-green-100 text-green-700' :
        status === 'coming-soon' ? 'bg-blue-100 text-blue-700' :
        'bg-gray-100 text-gray-600'
      }`}>
        {status === 'live' ? '✅ Live' : status === 'coming-soon' ? '🚀 Coming Soon' : '📅 Planned'}
      </div>
    )}
    
    {/* Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    
    <div className="relative">
      <div className={`w-12 h-12 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

const PricingCard = ({ title, price, description, features, highlighted = false, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`relative p-8 rounded-xl border-2 transition-all duration-300 ${
      highlighted 
        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl' 
        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
    }`}
  >
    {highlighted && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-2">{price}</div>
      <p className="text-gray-600">{description}</p>
    </div>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature: string, index: number) => (
        <li key={index} className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
    
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full py-3 rounded-lg font-semibold transition-all ${
        highlighted
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      {highlighted ? 'Start Free Trial' : 'Learn More'}
    </motion.button>
  </motion.div>
)

export default function FeaturesPage() {
  const currentFeatures = [
    {
      icon: Zap,
      title: "AI-Powered Data Processing",
      description: "Transform your data with natural language commands. Simply describe what you want, and our AI handles the complex transformations automatically.",
      status: "live",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Universal File Support", 
      description: "Upload CSV, Excel, JSON, and TSV files. Export to any format you need with just one click.",
      status: "live",
      color: "green"
    },
    {
      icon: Download,
      title: "Instant Export",
      description: "Download your processed data immediately in multiple formats: CSV, Excel, JSON, TSV, and more.",
      status: "live",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Privacy-First Design",
      description: "Your data never leaves your device. All processing happens locally in your browser for complete privacy.",
      status: "live", 
      color: "emerald"
    },
    {
      icon: MessageSquare,
      title: "Conversational Interface",
      description: "Chat with your data using plain English. No coding required - just describe what you want to accomplish.",
      status: "live",
      color: "indigo"
    },
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Process datasets in seconds with our optimized AI engine. Get results faster than traditional tools.",
      status: "live",
      color: "orange"
    }
  ]

  const upcomingFeatures = [
    {
      icon: Database,
      title: "Multi-Step Processing",
      description: "Build complex data pipelines with step-by-step transformations. Edit outputs to create new iterations.",
      status: "coming-soon",
      color: "purple"
    },
    {
      icon: Layers,
      title: "Multiple File Uploads",
      description: "Process multiple datasets simultaneously and create relationships between different data sources.",
      status: "coming-soon", 
      color: "blue"
    },
    {
      icon: Workflow,
      title: "Visual Pipeline Builder",
      description: "Drag-and-drop interface to create complex data workflows with branching logic and conditions.",
      status: "coming-soon",
      color: "green"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share projects with team members, collaborate in real-time, and manage permissions effortlessly.",
      status: "planned",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Built-in data visualization and statistical analysis tools to gain deeper insights from your data.",
      status: "planned",
      color: "indigo"
    },
    {
      icon: Code,
      title: "API Access",
      description: "Integrate Rawbify into your existing workflows with our comprehensive REST API and SDKs.",
      status: "planned",
      color: "red"
    }
  ]

  const useCases = [
    {
      title: "Data Analysts",
      description: "Clean messy datasets, standardize formats, and prepare data for analysis in minutes instead of hours.",
      icon: BarChart3,
      color: "blue"
    },
    {
      title: "Business Professionals", 
      description: "Transform spreadsheets, merge datasets, and create reports without technical expertise.",
      icon: FileText,
      color: "green"
    },
    {
      title: "Researchers",
      description: "Process survey data, clean research datasets, and prepare data for statistical analysis.",
      icon: Eye,
      color: "purple"
    },
    {
      title: "Consultants",
      description: "Quickly analyze client data, create standardized reports, and deliver insights faster.",
      icon: Users,
      color: "orange"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Rawbify
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/features" className="text-purple-600 font-semibold">Features</Link>
              <Link href="/trialv1" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                Try Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Data with
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Simplicity
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the features that make Rawbify the most intuitive data transformation platform. 
              From simple cleaning to complex analytics, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/trialv1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Features */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Now in TrialV1
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These powerful features are ready to use today. Start transforming your data immediately.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exciting new features in development. The future of data transformation is bright.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect For Every Professional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're analyzing data or preparing reports, Rawbify adapts to your workflow.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 bg-gradient-to-br from-${useCase.color}-50 to-white rounded-xl border border-${useCase.color}-200 hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-${useCase.color}-500 to-${useCase.color}-600 rounded-lg flex items-center justify-center mb-4`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Free Trial"
              price="$0"
              description="Perfect for getting started"
              features={[
                "5 file uploads per month",
                "Basic AI transformations", 
                "Standard export formats",
                "Email support"
              ]}
              delay={0}
            />
            <PricingCard
              title="Pro"
              price="$29/mo"
              description="For professional data work"
              features={[
                "Unlimited file uploads",
                "Advanced AI features",
                "All export formats",
                "Priority support",
                "Team collaboration",
                "API access"
              ]}
              highlighted={true}
              delay={0.1}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large organizations"
              features={[
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee",
                "On-premise deployment",
                "Custom training"
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust Rawbify for their data transformation needs. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/trialv1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
                <span className="text-xl font-bold">Rawbify</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most intuitive AI-powered data transformation platform. 
                Transform your data with natural language commands.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/trialv1" className="hover:text-white transition-colors">Try Now</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rawbify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
