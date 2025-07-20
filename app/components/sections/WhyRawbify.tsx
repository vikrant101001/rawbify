'use client'

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function WhyRawbify() {
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>()
  const [leftRef, leftVisible] = useIntersectionObserver<HTMLDivElement>()
  const [rightRef, rightVisible] = useIntersectionObserver<HTMLDivElement>()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className={`text-center mb-16 fade-in-on-scroll ${titleVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Rawbify?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Business data is messy. Cleaning it manually takes hours and kills productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={leftRef}
            className={`fade-in-on-scroll ${leftVisible ? 'visible' : ''}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
            The problem with existing methods
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                Time Factor: Manual processing takes time and Resources
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                Cost Factor: Hiring a lot of Business/Data Analyst even for a simple task.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                Automation: VBA/Alteryx Experts are hard to get by and the licensing is also required
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                Error Factor: Power BI and Tableau reject messy datasets
              </li>
            </ul>
          </div>

          <div 
            ref={rightRef}
            className={`bg-white p-8 rounded-lg shadow-lg fade-in-on-scroll ${rightVisible ? 'visible' : ''}`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Rawbify Solution
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                AI-powered data cleaning and standardization
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                Automatic detection and fixing of common issues
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                Export directly to Power BI and Tableau formats
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                Save hours of manual work with intelligent automation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 