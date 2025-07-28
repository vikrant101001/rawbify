'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  X, 
  Zap, 
  Users, 
  Building, 
  Crown, 
  Star,
  ArrowRight,
  Globe,
  IndianRupee,
  DollarSign,
  Sparkles,
  Shield,
  Headphones,
  Clock,
  Database,
  Code,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

const PricingCard = ({ 
  plan, 
  isPopular = false, 
  isEnterprise = false,
  currency,
  delay = 0 
}: any) => {
  const price = currency === 'INR' ? plan.priceINR : plan.priceUSD
  const symbol = currency === 'INR' ? '₹' : '$'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
        isPopular 
          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl transform scale-105' 
          : isEnterprise
          ? 'border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
          <Star className="w-4 h-4" />
          <span>Most Popular</span>
        </div>
      )}
      
      {isEnterprise && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
          <Crown className="w-4 h-4" />
          <span>Enterprise</span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          isEnterprise ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
          isPopular ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 
          'bg-gradient-to-r from-blue-500 to-indigo-500'
        }`}>
          <plan.icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 ${isEnterprise ? 'text-white' : 'text-gray-900'}`}>
          {plan.name}
        </h3>
        
        <div className={`text-4xl font-bold mb-2 ${isEnterprise ? 'text-white' : 'text-gray-900'}`}>
          {price === 'Custom' ? (
            <span className="text-2xl">Custom Pricing</span>
          ) : (
            <>
              <span className="text-lg">{symbol}</span>
              {price}
              <span className="text-lg font-normal text-gray-500">/month</span>
            </>
          )}
        </div>
        
        <p className={`${isEnterprise ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          {plan.description}
        </p>
        
        {plan.savings && currency === 'INR' && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
            Save ₹{plan.savings} vs US pricing!
          </div>
        )}
      </div>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature: any, index: number) => (
          <li key={index} className="flex items-start space-x-3">
            {feature.included ? (
              <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                isEnterprise ? 'text-green-400' : 'text-green-500'
              }`} />
            ) : (
              <X className="w-5 h-5 mt-0.5 text-gray-400 flex-shrink-0" />
            )}
            <span className={`${
              isEnterprise ? 'text-gray-300' : 
              feature.included ? 'text-gray-700' : 'text-gray-400'
            } ${feature.highlight ? 'font-semibold' : ''}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          isEnterprise
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
            : isPopular
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {plan.cta}
      </motion.button>
      
      {plan.note && (
        <p className={`text-center text-sm mt-4 ${
          isEnterprise ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {plan.note}
        </p>
      )}
    </motion.div>
  )
}

const FeatureComparisonRow = ({ feature, plans, isHeader = false }: any) => (
  <div className={`grid grid-cols-5 gap-4 py-4 ${
    isHeader ? 'border-b-2 border-gray-300 bg-gray-50 font-bold' : 'border-b border-gray-200'
  }`}>
    <div className={`${isHeader ? 'text-gray-900' : 'text-gray-700'} font-medium`}>
      {feature}
    </div>
    {plans.map((plan: any, index: number) => (
      <div key={index} className="text-center">
        {plan === true ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : plan === false ? (
          <X className="w-5 h-5 text-gray-400 mx-auto" />
        ) : (
          <span className="text-gray-700 font-medium">{plan}</span>
        )}
      </div>
    ))}
  </div>
)

export default function PricingPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')

  const pricingPlans = [
    {
      name: "Starter",
      icon: Zap,
      priceINR: 0,
      priceUSD: 0,
      description: "Perfect for students and personal projects",
      features: [
        { text: "3 file uploads per month", included: true },
        { text: "Up to 1000 rows per file", included: true },
        { text: "Basic AI transformations", included: true },
        { text: "Export to CSV, Excel", included: true },
        { text: "Email support", included: true },
        { text: "Advanced features", included: false },
        { text: "Priority support", included: false },
        { text: "Team collaboration", included: false }
      ],
      cta: "Start Free",
      note: "No credit card required"
    },
    {
      name: "Professional", 
      icon: Database,
      priceINR: 499,
      priceUSD: 15,
      savings: 750,
      description: "For professionals and small teams",
      features: [
        { text: "25 file uploads per month", included: true },
        { text: "Up to 50,000 rows per file", included: true },
        { text: "Advanced AI transformations", included: true, highlight: true },
        { text: "Export to all formats (CSV, Excel, JSON, TSV)", included: true },
        { text: "Priority email support", included: true },
        { text: "Data processing history", included: true },
        { text: "Custom templates", included: true },
        { text: "Team collaboration", included: false }
      ],
      cta: "Start Professional",
      note: "Most popular for professionals"
    },
    {
      name: "Business",
      icon: Users, 
      priceINR: 1299,
      priceUSD: 49,
      savings: 2400,
      description: "For growing teams and businesses",
      features: [
        { text: "Unlimited file uploads", included: true, highlight: true },
        { text: "Unlimited file size", included: true, highlight: true },
        { text: "Advanced AI + Custom workflows", included: true, highlight: true },
        { text: "Export to all formats + API access", included: true },
        { text: "Priority support + Live chat", included: true },
        { text: "Team collaboration (up to 10 users)", included: true, highlight: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Custom integrations", included: true }
      ],
      cta: "Start Business",
      note: "Perfect for growing teams"
    },
    {
      name: "Enterprise",
      icon: Building,
      priceINR: "Custom",
      priceUSD: "Custom", 
      description: "For large organizations with custom needs",
      features: [
        { text: "Everything in Business", included: true },
        { text: "Unlimited team members", included: true, highlight: true },
        { text: "On-premise deployment", included: true, highlight: true },
        { text: "Custom AI model training", included: true, highlight: true },
        { text: "24/7 dedicated support", included: true },
        { text: "SLA guarantee", included: true },
        { text: "Custom integrations & APIs", included: true },
        { text: "Compliance (SOC 2, GDPR)", included: true }
      ],
      cta: "Contact Sales",
      note: "Custom pricing based on requirements"
    }
  ]

  const comparisonFeatures = [
    { feature: "Features", plans: ["Starter", "Professional", "Business", "Enterprise"] },
    { feature: "File uploads/month", plans: ["3", "25", "Unlimited", "Unlimited"] },
    { feature: "Max rows per file", plans: ["1,000", "50,000", "Unlimited", "Unlimited"] },
    { feature: "Export formats", plans: ["CSV, Excel", "All formats", "All + API", "All + Custom"] },
    { feature: "AI transformations", plans: ["Basic", "Advanced", "Advanced+", "Custom AI"] },
    { feature: "Team members", plans: [false, false, "10", "Unlimited"] },
    { feature: "Priority support", plans: [false, true, true, true] },
    { feature: "Live chat support", plans: [false, false, true, true] },
    { feature: "API access", plans: [false, false, true, true] },
    { feature: "Custom integrations", plans: [false, false, true, true] },
    { feature: "On-premise deployment", plans: [false, false, false, true] },
    { feature: "SLA guarantee", plans: [false, false, false, true] }
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
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/pricing" className="text-purple-600 font-semibold">Pricing</Link>
              <Link href="/trialv1" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                Try Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Globe className="w-6 h-6 text-purple-600" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Simple,
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Affordable Pricing
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Designed for the Indian market. Get powerful data transformation at prices that make sense for your business.
            </p>
            
            {/* Currency Switcher */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrency('INR')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      currency === 'INR' 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IndianRupee className="w-4 h-4" />
                    <span className="font-semibold">INR</span>
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      currency === 'USD' 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">USD</span>
                  </button>
                </div>
              </div>
            </div>

            {currency === 'INR' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-xl p-4 mb-8 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-semibold">Special Indian Pricing</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Save up to 70% compared to international pricing!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                isPopular={index === 1}
                isEnterprise={index === 3}
                currency={currency}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect plan for your needs with our detailed feature comparison.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {comparisonFeatures.map((row, index) => (
              <FeatureComparisonRow
                key={index}
                feature={row.feature}
                plans={row.plans}
                isHeader={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="space-y-8">
            {[
              {
                q: "Why is Indian pricing so much cheaper?",
                a: "We believe in making powerful data tools accessible to Indian businesses. Our Indian pricing reflects local purchasing power while maintaining the same world-class features."
              },
              {
                q: "Can I switch between plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated."
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "All paid plans come with a 14-day free trial. No credit card required to start."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, UPI, net banking, and digital wallets for Indian customers. International customers can pay via credit cards and PayPal."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We use enterprise-grade security with end-to-end encryption. Your data never leaves your browser during processing, ensuring complete privacy."
              },
              {
                q: "Do you offer discounts for students or startups?",
                a: "Yes! We offer 50% discounts for students with valid ID and special startup packages. Contact us for details."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
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
              Join thousands of Indian professionals who trust Rawbify for their data transformation needs. 
              Start with our free plan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/trialv1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center space-x-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Start Free Today</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center space-x-2"
              >
                <Headphones className="w-5 h-5" />
                <span>Talk to Sales</span>
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
                The most affordable AI-powered data transformation platform. 
                Made in India, for Indian businesses.
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
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/trialv1" className="hover:text-white transition-colors">Try Now</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Discount</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rawbify. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
