import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X, Activity } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Mission',    href: '#mission'    },
  { label: 'Screening',  href: '#assessment' },
  { label: 'Science',    href: '#how-it-works' },
]

export default function Navbar({ onStartAssessment }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef   = useRef(null)
  const logoRef  = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, { opacity: 0, y: -20, duration: 0.7, ease: 'power3.out', delay: 0.1 })
    gsap.from(logoRef.current, { opacity: 0, x: -20, duration: 0.7, ease: 'power3.out', delay: 0.3 })

    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a ref={logoRef} href="/" className="flex items-center gap-2 group" aria-label="FemAI Home">
            <div className="w-8 h-8 bg-gradient-to-br from-crimson-600 to-burgundy-800 rounded-lg flex items-center justify-center shadow-crimson">
              <Activity size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">
              Fem<span className="text-gradient">AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-crimson-700 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onStartAssessment}
              className="hidden sm:inline-flex btn-primary py-2 px-5 text-sm rounded-xl"
            >
              Start Screening
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden glass-nav px-4 pb-4 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 py-2 border-b border-gray-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); onStartAssessment() }} className="btn-primary mt-2 w-full justify-center text-sm py-3 rounded-xl">
              Start Screening
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
