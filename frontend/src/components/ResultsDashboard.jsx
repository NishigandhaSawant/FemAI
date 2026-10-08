import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'
import RiskRing from './RiskRing'

function StatusBanner({ detected, probability }) {
  if (!detected && probability < 40) {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
        <CheckCircle2 size={22} className="text-green-500 shrink-0" />
        <div>
          <p className="font-semibold text-green-800 text-sm">Low Risk — No PCOS Detected</p>
          <p className="text-xs text-green-600 mt-0.5">
            Your markers appear within normal range. Continue healthy habits!
          </p>
        </div>
      </div>
    )
  }
  if (!detected && probability < 65) {
    return (
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <AlertTriangle size={22} className="text-amber-500 shrink-0" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">Moderate Risk — Monitor Closely</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Some markers indicate possible hormonal imbalance. Consult your gynaecologist.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3 bg-crimson-50 border border-crimson-200 rounded-2xl px-5 py-4">
      <XCircle size={22} className="text-crimson-600 shrink-0" />
      <div>
        <p className="font-semibold text-crimson-800 text-sm">High Risk — PCOS Likely Detected</p>
        <p className="text-xs text-crimson-600 mt-0.5">
          Our model detected significant PCOS indicators. Please consult a specialist promptly.
        </p>
      </div>
    </div>
  )
}

function MetricBar({ label, value, max = 100, unit = '%' }) {
  const barRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: '0%' },
      { width: `${(value / max) * 100}%`, duration: 1.2, ease: 'power3.out', delay: 0.3 },
    )
  }, [value, max])

  const pct = (value / max) * 100
  const colour =
    pct < 40 ? 'bg-green-500' :
    pct < 65 ? 'bg-amber-400' :
               'bg-crimson-600'

  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
        <span>{label}</span>
        <span className="text-gray-800 font-semibold">{value}{unit}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div ref={barRef} className={`h-full ${colour} rounded-full`} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function ResultsDashboard({ result, onRetake }) {
  const dashRef = useRef(null)

  const { pcos_detected, risk_probability } = result

  useEffect(() => {
    gsap.from(dashRef.current, {
      opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
    })
    gsap.from(dashRef.current.querySelectorAll('.result-card'), {
      opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease: 'power3.out', delay: 0.2,
    })
  }, [])

  return (
    <section ref={dashRef} className="py-24 px-4 bg-[#fafafa]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="tag-pill mb-4 inline-flex">AI Result</span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Screening Results
          </h2>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Ring */}
          <div className="result-card apple-card p-8 flex flex-col items-center justify-center gap-4">
            <RiskRing value={risk_probability} />
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">
                Confidence Score
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pcos_detected ? 'Positive' : 'Negative'}
              </p>
            </div>
          </div>

          {/* Bar metrics */}
          <div className="result-card apple-card p-6 flex flex-col justify-center gap-5">
            <MetricBar label="PCOS Risk Probability" value={risk_probability} />
            <MetricBar label="Risk Threshold (Clinical)" value={50} />
            <MetricBar label="Model Confidence" value={Math.max(risk_probability, 100 - risk_probability)} />
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                ⚠ This is a screening aid only. Always consult a qualified healthcare professional
                for a formal diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Status banner */}
        <div className="result-card mb-6">
          <StatusBanner detected={pcos_detected} probability={risk_probability} />
        </div>

        {/* Retake */}
        <div className="result-card flex justify-center">
          <button onClick={onRetake} className="btn-secondary gap-2">
            <ArrowRight size={16} />
            Re-take Assessment
          </button>
        </div>
      </div>
    </section>
  )
}
