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
      
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">Rawbify</span>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-2 sm:gap-6 justify-center sm:justify-end">
              <a href="#waitlist" className="text-gray-600 hover:text-gray-900 transition-colors w-full sm:w-auto text-center py-2 sm:py-0">
                Join Waitlist
              </a>
              <a href="/trialv1" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center">
                Try Trial
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <Hero />
      <WhyRawbify />
      <HowItWorks />
      <div id="waitlist">
        <Waitlist />
      </div>
      <Footer />
    </div>
  )
}
