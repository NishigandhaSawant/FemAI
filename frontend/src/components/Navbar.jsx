import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ online: false, loading: true });

  useEffect(() => {
    let isMounted = true;
    const verifyStatus = async () => {
      const res = await checkBackendHealth();
      if (isMounted) {
        setBackendStatus({ online: res.online && res.modelLoaded, loading: false });
      }
    };
    verifyStatus();
    const interval = setInterval(verifyStatus, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Wellness', path: '/wellness' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-fem-bg/90 backdrop-blur-md border-b border-fem-pinkLight/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-fem-pink to-fem-pinkLight flex items-center justify-center shadow-neu-raised-sm group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-fem-text">
                Fem<span className="text-fem-pink">AI</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium tracking-wider uppercase text-fem-textMuted -mt-1">
                PCOS Awareness & Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-fem-cream/60 p-1.5 rounded-full shadow-neu-inset">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                    : 'text-fem-text hover:text-fem-pinkHover hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action & Status */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Backend Indicator */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 shadow-neu-raised-sm text-xs font-medium text-fem-textMuted"
              title={backendStatus.online ? "Linear SVM Model & FastAPI Connected" : "Backend Offline or Disconnected"}
            >
              <span 
                className={`w-2 h-2 rounded-full ${
                  backendStatus.loading 
                    ? 'bg-amber-400 animate-pulse' 
                    : backendStatus.online 
                      ? 'bg-emerald-500' 
                      : 'bg-rose-400'
                }`}
              />
              <span>{backendStatus.loading ? 'Checking...' : backendStatus.online ? 'Model Live' : 'API Offline'}</span>
            </div>

            <Link to="/assessment" className="neu-btn-primary px-5 py-2.5 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Screening
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-fem-cream shadow-neu-raised-sm text-fem-text focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-fem-bg border-b border-fem-pinkLight/60 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive(link.path)
                  ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                  : 'text-fem-text hover:bg-fem-cream'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-fem-pinkLight/40 flex items-center justify-between">
            <span className="text-xs text-fem-textMuted">
              Backend Status: {backendStatus.online ? 'Connected' : 'Offline'}
            </span>
            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="neu-btn-primary px-4 py-2 text-xs"
            >
              Start Screening
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}