import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Animated SVG ring that fills from 0 → value % over ~1.2s
 */
export default function RiskRing({ value = 0, size = 180, stroke = 14 }) {
  const ringRef    = useRef(null)
  const labelRef   = useRef(null)
  const sublabelRef = useRef(null)

  const r      = (size - stroke) / 2
  const circ   = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ

  // Colour thresholds
  const colour =
    value < 40  ? '#22c55e' :   // green
    value < 65  ? '#f59e0b' :   // amber
                  '#c21321'     // crimson

  useEffect(() => {
    // Animate ring stroke
    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: circ },
      {
        strokeDashoffset: offset,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.2,
      },
    )

    // Count-up label
    const proxy = { v: 0 }
    gsap.to(proxy, {
      v: value,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.2,
      onUpdate() {
        if (labelRef.current) {
          labelRef.current.textContent = proxy.v.toFixed(1) + '%'
        }
      },
    })

    // Fade in sub-label
    gsap.from(sublabelRef.current, { opacity: 0, duration: 0.6, delay: 1.2 })
  }, [value, circ, offset])

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={stroke}
        />
        {/* Animated bar */}
        <circle
          ref={ringRef}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}          /* starts empty */
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Centre text */}
        <text
          ref={labelRef}
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          fill={colour}
        >
          0%
        </text>
      </svg>
      <span ref={sublabelRef} className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        Risk Probability
      </span>
    </div>
  )
}
