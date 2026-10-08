import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Dumbbell, Moon, Droplets, Apple, Bike, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── Data ────────────────────────────────────────────────────── */

const LOW_PLAN = {
  label: 'Maintenance Plan',
  colour: 'green',
  diet: [
    { icon: Apple,    title: 'Whole-food diet',       desc: 'Focus on high-fibre vegetables, legumes, and complex carbs to maintain stable blood sugar.' },
    { icon: Droplets, title: 'Stay hydrated',          desc: 'Aim for 2.5–3 L water daily. Herbal teas like spearmint and chamomile support hormonal balance.' },
    { icon: Leaf,     title: 'Anti-inflammatory foods', desc: 'Include berries, oily fish, walnuts, and extra-virgin olive oil regularly.' },
  ],
  fitness: [
    { icon: Bike,     title: 'Moderate cardio',        desc: '30–45 min of brisk walking, cycling, or swimming 4–5× per week for cardiovascular health.' },
    { icon: Dumbbell, title: 'Light strength training', desc: '2× per week full-body resistance sessions. Focus on form over load.' },
    { icon: Moon,     title: 'Sleep & recovery',       desc: 'Aim for 7–8 hours quality sleep. Consistent sleep timing regulates cortisol.' },
  ],
}

const MODERATE_PLAN = {
  label: 'Hormonal Balance Plan',
  colour: 'amber',
  diet: [
    { icon: Apple,    title: 'Low-GI eating',          desc: 'Reduce refined carbs and sugars. Prioritise oats, lentils, sweet potato, and quinoa.' },
    { icon: Leaf,     title: 'Seed cycling',           desc: 'Consume flax & pumpkin seeds (follicular phase) then sesame & sunflower (luteal phase).' },
    { icon: Droplets, title: 'Cut inflammatory foods', desc: 'Limit dairy, alcohol, and processed foods. Track how gluten affects your symptoms.' },
  ],
  fitness: [
    { icon: Dumbbell, title: 'Resistance training',    desc: '3× per week. Compound lifts (squats, deadlifts) improve insulin sensitivity significantly.' },
    { icon: Bike,     title: 'Zone 2 cardio',          desc: '20–30 min low-intensity cardio 3–4× per week — enough to speak but not sing.' },
    { icon: Moon,     title: 'Stress reduction',       desc: 'Daily mindfulness, yoga, or breathwork (5 min minimum) to lower cortisol.' },
  ],
}

const HIGH_PLAN = {
  label: 'PCOS Recovery Plan',
  colour: 'crimson',
  diet: [
    { icon: Apple,    title: 'Insulin-resistance diet', desc: 'Strict low-GI approach. Pair every carb with protein + fat. Avoid refined sugars entirely.' },
    { icon: Leaf,     title: 'Anti-androgen foods',     desc: 'Spearmint tea (2 cups/day), flaxseed, and cruciferous vegetables reduce testosterone levels.' },
    { icon: Droplets, title: 'Inositol supplementation',desc: 'Discuss Myo-Inositol (2g) + D-Chiro-Inositol (50mg) with your doctor — well-evidenced for PCOS.' },
  ],
  fitness: [
    { icon: Dumbbell, title: 'Strength-first training', desc: '4× per week resistance training. Prioritise large muscle groups for maximum insulin sensitisation.' },
    { icon: Bike,     title: 'Daily movement',          desc: 'Even 10-min post-meal walks reduce blood sugar spikes — simple and highly effective.' },
    { icon: Moon,     title: 'Sleep as medicine',       desc: 'PCOS is worsened by sleep debt. Target 8 h, avoid screens 60 min before bed.' },
  ],
}

function getPlan(detected, probability) {
  if (!detected && probability < 40) return LOW_PLAN
  if (probability < 65) return MODERATE_PLAN
  return HIGH_PLAN
}

/* ── Card ────────────────────────────────────────────────────── */

function TipCard({ icon: Icon, title, desc, index, colour }) {
  const colourMap = {
    green:  { bg: 'bg-green-50',  border: 'border-green-100',  icon: 'text-green-600',  num: 'bg-green-100  text-green-700'  },
    amber:  { bg: 'bg-amber-50',  border: 'border-amber-100',  icon: 'text-amber-600',  num: 'bg-amber-100  text-amber-700'  },
    crimson:{ bg: 'bg-crimson-50',border: 'border-crimson-100',icon: 'text-crimson-600',num: 'bg-crimson-100 text-crimson-700'},
  }
  const c = colourMap[colour] || colourMap.crimson

  return (
    <div className={`tip-card flex gap-4 ${c.bg} border ${c.border} rounded-2xl p-5`}>
      <div className={`shrink-0 w-9 h-9 ${c.num} rounded-xl flex items-center justify-center text-xs font-bold`}>
        {index + 1}
      </div>
      <div>
        <div className={`flex items-center gap-2 font-semibold text-sm text-gray-800 mb-1`}>
          <Icon size={15} className={c.icon} />
          {title}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────────── */

export default function LifestyleGuidance({ result }) {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)

  const { pcos_detected, risk_probability } = result
  const plan = getPlan(pcos_detected, risk_probability)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(sectionRef.current.querySelectorAll('.tip-card'), {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#f7f7f7]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="tag-pill mb-4 inline-flex">
            <Leaf size={12} />
            Personalised Action Plan
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Your {plan.label}
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Evidence-based recommendations tailored to your risk profile.
            Designed for sustainable hormonal health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Diet */}
          <div className="apple-card-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <Apple size={18} className="text-crimson-600" />
              <h3 className="font-bold text-gray-900 text-lg">Dietary Guidance</h3>
            </div>
            <div className="flex flex-col gap-3">
              {plan.diet.map((tip, i) => (
                <TipCard key={i} {...tip} index={i} colour={plan.colour} />
              ))}
            </div>
          </div>

          {/* Fitness */}
          <div className="apple-card-lg p-6">
            <div className="flex items-center gap-2 mb-5">
              <Dumbbell size={18} className="text-crimson-600" />
              <h3 className="font-bold text-gray-900 text-lg">Movement & Recovery</h3>
            </div>
            <div className="flex flex-col gap-3">
              {plan.fitness.map((tip, i) => (
                <TipCard key={i} {...tip} index={i} colour={plan.colour} />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 apple-card px-6 py-4 flex items-start gap-3">
          <ChevronRight size={15} className="text-crimson-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-400 leading-relaxed">
            This action plan is generated for educational purposes only and does not constitute
            medical advice. Always consult a licensed healthcare professional before making
            significant changes to your diet, supplements, or exercise routine.
          </p>
        </div>
      </div>
    </section>
  )
}
