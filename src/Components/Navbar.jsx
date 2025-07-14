import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: 'home', end: true },
    { to: '/reddit', label: 'Reddit', icon: 'reddit', color: 'orange' },
    { to: '/youtube', label: 'YouTube', icon: 'youtube', color: 'red' },
  ];

  const getIcon = (iconName) => {
    const iconProps = "w-5 h-5";
    
    switch (iconName) {
      case 'home':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'reddit':
        return (
          <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.7-.768-1.2-1.446-1.2-.366 0-.714.144-.978.392-1.072-.7-2.548-1.158-4.172-1.21l.722-3.4 2.338.508c.024.702.6 1.266 1.316 1.266.732 0 1.326-.6 1.326-1.334s-.6-1.334-1.326-1.334c-.522 0-.966.306-1.174.744l-2.59-.564c-.11-.024-.228.006-.306.084-.078.084-.108.2-.084.312l-.798 3.726c-1.672.06-3.19.534-4.28 1.246-.264-.246-.612-.39-.978-.39-.678 0-1.278.498-1.446 1.2-.114.48-.006 1.002.318 1.398-.036.204-.06.414-.06.636 0 3.252 3.708 5.898 8.268 5.898s8.268-2.646 8.268-5.898c0-.222-.024-.432-.06-.636.324-.396.432-.918.318-1.398zM9.586 13.2c0-.732.6-1.326 1.332-1.326s1.332.594 1.332 1.326-.6 1.326-1.332 1.326-1.332-.594-1.332-1.326zm4.548 3.528c-.906.906-2.634.906-2.634.906s-1.728 0-2.634-.906c-.114-.114-.114-.294 0-.408.114-.114.294-.114.408 0 .57.57 1.608.57 2.226.57s1.656 0 2.226-.57c.114-.114.294-.114.408 0 .114.114.114.294 0 .408zm-.138-2.202c-.732 0-1.332-.594-1.332-1.326s.6-1.326 1.332-1.326 1.332.594 1.332 1.326-.6 1.326-1.332 1.326z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getActiveStyles = (isActive, color = 'orange') => {
    if (isActive) {
      const colors = {
        orange: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25',
        red: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
      };
      return colors[color] || colors.orange;
    }
    return 'text-gray-300 hover:text-white hover:bg-white/10';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl shadow-black/10' 
          : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent select-none group-hover:opacity-80 transition-opacity duration-300">
                  DevSync
                </span>
                <div className="text-xs text-gray-400 font-medium -mt-1">
                  Content Hub
                </div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/50 ${getActiveStyles(isActive, link.color)}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                        {getIcon(link.icon)}
                      </div>
                      <span>{link.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-20"></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-2 space-y-1 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${getActiveStyles(isActive, link.color)}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                      {getIcon(link.icon)}
                    </div>
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>

      {/* Background overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}