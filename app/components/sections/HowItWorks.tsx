'use client'

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const steps = [
  {
    icon: "📁",
    title: "Upload",
    description: "Upload your raw data files in any format - CSV, Excel, JSON, or database exports."
  },
  {
    icon: "🤖",
    title: "Prompt and Process",
    description: "Give a prompt of what you want the final data to be and Our AI analyzes your data, identifies issues, and applies intelligent cleaning rules."
  },
  {
    icon: "📊",
    title: "Export",
    description: "Download clean, analysis-ready data optimized for Power BI and Tableau."
  }
]

export default function HowItWorks() {
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>()
  const [ctaRef, ctaVisible] = useIntersectionObserver<HTMLDivElement>()

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-14 px-2 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className={`text-center mb-10 sm:mb-16 fade-in-on-scroll ${titleVisible ? 'visible' : ''}`}
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to transform your data from raw to ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const [stepRef, stepVisible] = useIntersectionObserver<HTMLDivElement>()
            return (
              <div 
                key={index} 
                ref={stepRef}
                className={`text-center fade-in-on-scroll ${stepVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl sm:text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
} 