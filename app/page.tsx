import Hero from './components/sections/Hero'
import WhyRawbify from './components/sections/WhyRawbify'
import HowItWorks from './components/sections/HowItWorks'
import Waitlist from './components/sections/Waitlist'
import Footer from './components/sections/Footer'
import PopupNotification from './components/ui/PopupNotification'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PopupNotification />
      
      {/* Modern Navigation Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="relative">
                <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto float" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Rawbify
              </span>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-2 sm:gap-6 justify-center sm:justify-end">
              <a 
                href="#waitlist" 
                className="text-gray-700 hover:text-purple-600 transition-all duration-300 w-full sm:w-auto text-center py-2 sm:py-0 font-medium hover:scale-105"
              >
                Join Waitlist
              </a>
              <a 
                href="/trialv1" 
                className="btn-gradient text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 w-full sm:w-auto text-center font-semibold"
              >
                Trial V1 Coming Soon
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content with spacing for fixed header */}
      <div className="pt-20">
        <Hero />
        <WhyRawbify />
        <HowItWorks />
        <div id="waitlist">
          <Waitlist />
        </div>
        <Footer />
      </div>
    </div>
  )
}
