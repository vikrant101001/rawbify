'use client'

import { Button } from '../ui/button'

export default function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <img src="/rawbify_logo.svg" alt="Rawbify" className="h-14 sm:h-16 w-auto mx-auto" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Raw Data In.
            <br />
            <span className="text-blue-600">BI Ready Out.</span>
          </h1>
          
          <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform messy business data into clean, analysis-ready datasets for Power BI and Tableau in minutes, not hours.
          </p>
          
          <div className="animate-fade-in-delay">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              onClick={scrollToWaitlist}
            >
              Join Waitlist/Trials
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 