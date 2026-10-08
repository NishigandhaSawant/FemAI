import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar            from './components/Navbar'
import HeroSection       from './components/HeroSection'
import AssessmentForm    from './components/AssessmentForm'
import ResultsDashboard  from './components/ResultsDashboard'
import LifestyleGuidance from './components/LifestyleGuidance'
import Footer            from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [view,   setView]   = useState('hero')   // 'hero' | 'form' | 'results'
  const [result, setResult] = useState(null)

  const assessmentRef  = useRef(null)
  const resultsRef     = useRef(null)

  // Scroll to assessment section smoothly
  const scrollTo = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleStartAssessment = () => {
    if (view !== 'form' && view !== 'results') setView('form')
    setTimeout(() => scrollTo(assessmentRef), 80)
  }

  const handleResult = (data) => {
    setResult(data)
    setView('results')
    setTimeout(() => scrollTo(resultsRef), 80)
  }

  const handleRetake = () => {
    setResult(null)
    setView('form')
    setTimeout(() => scrollTo(assessmentRef), 80)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onStartAssessment={handleStartAssessment} />

      {/* Hero — always visible */}
      <HeroSection onStartAssessment={handleStartAssessment} />

      {/* How It Works — minimal divider section */}
      <section id="mission" className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              step: '01',
              title: 'Enter Biomarkers',
              desc: 'Input clinical measurements from your health report — age, BMI, hormones, and follicle counts.',
            },
            {
              step: '02',
              title: 'AI Analysis',
              desc: 'Our trained machine learning model processes your data in milliseconds to compute PCOS risk.',
            },
            {
              step: '03',
              title: 'Get Your Plan',
              desc: 'Receive a personalised dietary and fitness action plan matched to your exact risk level.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-crimson-50 border border-crimson-100 flex items-center justify-center">
                <span className="text-xs font-bold text-crimson-700">{step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Form */}
      {(view === 'form' || view === 'results') && (
        <div ref={assessmentRef}>
          {view === 'form' && (
            <AssessmentForm onResult={handleResult} />
          )}
        </div>
      )}

      {/* Results + Lifestyle */}
      {view === 'results' && result && (
        <div ref={resultsRef}>
          <ResultsDashboard result={result} onRetake={handleRetake} />
          <LifestyleGuidance result={result} />
        </div>
      )}

      <div className="flex-1" />
      <Footer />
    </div>
  )
}
