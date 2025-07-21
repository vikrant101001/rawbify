'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-2 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4 justify-center md:justify-start">
              <img src="/rawbify_logo.svg" alt="Rawbify" className="h-8 w-auto" />
              <span className="text-xl font-bold">Rawbify</span>
            </div>
            <p className="text-gray-300 mb-4 text-center md:text-left">
              Raw Data In. BI Ready Out. Transform your messy business data into clean, analysis-ready datasets for Power BI and Tableau.
            </p>
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2024 Rawbify. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Made with ❤️ for data analysts everywhere</p>
        </div>
      </div>
    </footer>
  )
} 