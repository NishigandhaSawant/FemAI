import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import {
  User, Scale, Ruler, Activity, Droplet, Eye,
  Clock, Zap, Loader2, ChevronRight, AlertCircle,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FIELDS = [
  {
    key: 'Age (yrs)',
    label: 'Age',
    unit: 'yrs',
    placeholder: '25',
    icon: User,
    min: 12,
    max: 60,
    step: 1,
    type: 'number',
  },
  {
    key: 'Weight (Kg)',
    label: 'Weight',
    unit: 'kg',
    placeholder: '60',
    icon: Scale,
    min: 30,
    max: 200,
    step: 0.1,
    type: 'number',
  },
  {
    key: 'Height(Cm)',
    label: 'Height',
    unit: 'cm',
    placeholder: '165',
    icon: Ruler,
    min: 120,
    max: 220,
    step: 0.1,
    type: 'number',
  },
  {
    key: 'BMI',
    label: 'BMI',
    unit: 'kg/m²',
    placeholder: '22.1',
    icon: Activity,
    min: 10,
    max: 60,
    step: 0.1,
    type: 'number',
  },
  {
    key: 'Cycle length(days)',
    label: 'Cycle Length',
    unit: 'days',
    placeholder: '28',
    icon: Clock,
    min: 15,
    max: 90,
    step: 1,
    type: 'number',
  },
  {
    key: 'Follicle No. (L)',
    label: 'Follicle No. (Left)',
    unit: 'count',
    placeholder: '5',
    icon: Eye,
    min: 0,
    max: 30,
    step: 1,
    type: 'number',
  },
  {
    key: 'Follicle No. (R)',
    label: 'Follicle No. (Right)',
    unit: 'count',
    placeholder: '5',
    icon: Eye,
    min: 0,
    max: 30,
    step: 1,
    type: 'number',
  },
  {
    key: 'FSH(mIU/mL)',
    label: 'FSH',
    unit: 'mIU/mL',
    placeholder: '6.5',
    icon: Droplet,
    min: 0,
    max: 50,
    step: 0.1,
    type: 'number',
  },
  {
    key: 'LH(mIU/mL)',
    label: 'LH',
    unit: 'mIU/mL',
    placeholder: '4.2',
    icon: Droplet,
    min: 0,
    max: 50,
    step: 0.1,
    type: 'number',
  },
  {
    key: 'TSH (mIU/L)',
    label: 'TSH',
    unit: 'mIU/L',
    placeholder: '2.3',
    icon: Zap,
    min: 0,
    max: 20,
    step: 0.01,
    type: 'number',
  },
]

export default function AssessmentForm({ onResult }) {
  const sectionRef  = useRef(null)
  const formRef     = useRef(null)
  const headerRef   = useRef(null)
  const [values, setValues]     = useState({})
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(formRef.current.querySelectorAll('.field-card'), {
        opacity: 0, y: 30, stagger: 0.07, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e })
    if (apiError) setApiError('')
  }

  const validate = () => {
    const errs = {}
    FIELDS.forEach(f => {
      const v = values[f.key]
      if (v === undefined || v === '') {
        errs[f.key] = 'Required'
      } else if (isNaN(Number(v))) {
        errs[f.key] = 'Must be a number'
      } else if (Number(v) < f.min || Number(v) > f.max) {
        errs[f.key] = `${f.min}–${f.max}`
      }
    })
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Shake animation on error
      gsap.fromTo(formRef.current,
        { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' }
      )
      return
    }

    setLoading(true)
    setApiError('')

    const features = {}
    FIELDS.forEach(f => { features[f.key] = Number(values[f.key]) })

    try {
      const { data } = await axios.post('http://127.0.0.1:8000/predict', { features })
      // animate out form then callback
      gsap.to(formRef.current, {
        opacity: 0, y: -20, duration: 0.4, ease: 'power3.in',
        onComplete: () => onResult(data),
      })
    } catch (err) {
      setApiError(
        err?.response?.data?.detail ||
        'Could not reach the FemAI backend. Make sure it is running on port 8000.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="assessment"
      className="py-24 px-4 bg-[#f7f7f7]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="tag-pill mb-4 inline-flex">
            <Activity size={12} />
            Clinical Assessment
          </span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Enter Your Biomarkers
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Provide accurate clinical measurements for the most reliable AI-driven result.
            All data is processed locally and never stored.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="apple-card-lg p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {FIELDS.map(field => {
                const Icon = field.icon
                const hasErr = !!errors[field.key]
                return (
                  <div key={field.key} className="field-card">
                    <label htmlFor={field.key} className="femai-label">
                      {field.label}
                      {field.unit && (
                        <span className="ml-1 text-gray-300 lowercase normal-case tracking-normal font-normal">
                          ({field.unit})
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <Icon size={15} />
                      </span>
                      <input
                        id={field.key}
                        type={field.type}
                        step={field.step}
                        min={field.min}
                        max={field.max}
                        placeholder={field.placeholder}
                        value={values[field.key] ?? ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        className={`femai-input pl-10 ${
                          hasErr
                            ? 'border-crimson-400 ring-1 ring-crimson-300 bg-crimson-50/30'
                            : ''
                        }`}
                        aria-invalid={hasErr}
                        aria-describedby={hasErr ? `${field.key}-err` : undefined}
                      />
                      {hasErr && (
                        <p
                          id={`${field.key}-err`}
                          className="mt-1 text-xs text-crimson-600 font-medium flex items-center gap-1"
                        >
                          <AlertCircle size={11} /> {errors[field.key]}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* API Error */}
            {apiError && (
              <div className="mb-6 flex items-start gap-3 bg-crimson-50 border border-crimson-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-crimson-600 mt-0.5 shrink-0" />
                <p className="text-sm text-crimson-700">{apiError}</p>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-base px-10 py-4 rounded-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analysing…
                  </>
                ) : (
                  <>
                    Run AI Screening
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
