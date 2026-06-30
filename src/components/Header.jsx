import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, Sparkles, X } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-900 border-b border-white/10 shadow-lg shadow-emerald-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative mr-2">
                <Sparkles className="h-7 w-7 text-amber-400 animate-pulse group-hover:text-orange-300 transition-colors duration-200 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full group-hover:bg-orange-300/30 transition-colors duration-200"></div>
              </div>
              <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)] group-hover:scale-105 transition-transform duration-200">
                Sallagar
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link to="/" className="relative text-white hover:text-amber-400 px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 group">
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
            <Link to="/blog" className="relative text-white hover:text-amber-400 px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 group">
              <span className="relative z-10">Blog</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
            <Link to="/categories" className="relative text-white hover:text-amber-400 px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 group">
              <span className="relative z-10">Categories</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
            <Link to="/about" className="relative text-white hover:text-amber-400 px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 group">
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
            <Link to="/contact" className="relative text-white hover:text-amber-400 px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 group">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="flex items-center mr-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="ब्लॉग किंवा प्रॉडक्ट्स शोधा..."
                    className="bg-white/10 text-white placeholder-emerald-200/50 border border-white/20 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-48 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="ml-2 p-2 text-white hover:text-amber-400 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              )}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-white hover:text-amber-400 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-white/20"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            <button className="md:hidden p-2.5 text-white hover:text-amber-400 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-white/20">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
