import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Activity, Shield, Dna } from 'lucide-react'

const stats = [
  { value: '1 in 5', label: 'Women affected by PCOS globally' },
  { value: '70%', label: 'Cases go undiagnosed' },
  { value: '< 60s', label: 'AI screening time' },
]

export default function HeroSection({ onStartAssessment }) {
  const heroRef     = useRef(null)
  const headingRef  = useRef(null)
  const subRef      = useRef(null)
  const statsRef    = useRef(null)
  const badgeRef    = useRef(null)
  const ctaRef      = useRef(null)
  const orb1Ref     = useRef(null)
  const orb2Ref     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to(orb1Ref.current, {
        y: -24, x: 12, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      gsap.to(orb2Ref.current, {
        y: 20, x: -8, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(badgeRef.current,   { opacity: 0, y: 20, duration: 0.6 })
        .from(headingRef.current, { opacity: 0, y: 40, duration: 0.8 },  '-=0.3')
        .from(subRef.current,     { opacity: 0, y: 30, duration: 0.7 },  '-=0.5')
        .from(ctaRef.current,     { opacity: 0, y: 20, duration: 0.6 },  '-=0.4')
        .from(
          statsRef.current.children,
          { opacity: 0, y: 30, stagger: 0.15, duration: 0.6 },
          '-=0.3',
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen hero-mesh flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(194,19,33,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,28,55,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <span className="tag-pill">
            <Shield size={12} />
            AI-Powered Women's Health
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-gray-900">Intelligent</span>{' '}
          <span className="text-gradient">PCOS Screening</span>
          <br />
          <span className="text-gray-900">for Every Woman</span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          FemAI uses clinical biomarkers and machine learning to detect PCOS risk
          in under a minute — then delivers a personalised lifestyle action plan.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onStartAssessment}
            className="btn-primary text-base px-8 py-4 rounded-2xl group"
          >
            <Activity size={18} className="group-hover:animate-pulse" />
            Start Free Screening
          </button>
          <a
            href="#how-it-works"
            className="btn-secondary text-base px-8 py-4 rounded-2xl"
          >
            How It Works
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((s, i) => (
            <div key={i} className="apple-card px-6 py-5 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works anchor */}
      <div id="how-it-works" />
    </section>
  )
}
