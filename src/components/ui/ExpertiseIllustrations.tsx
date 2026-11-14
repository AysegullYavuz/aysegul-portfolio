import type { ReactElement } from 'react'

/**
 * Line-art illustrations for the expertise cards.
 * Strokes inherit `currentColor`; accents use `text-accent`.
 * Hover animations are driven by the parent `.group`.
 */

const box = '[transform-box:fill-box] [transform-origin:center]'
const move = `transition-transform duration-700 ease-out-quint ${box}`

const frontend = (
  <>
    <rect x="22" y="14" width="196" height="122" rx="10" />
    <path d="M22 38h196" />
    <circle cx="36" cy="26" r="2.5" />
    <circle cx="46" cy="26" r="2.5" />
    <circle cx="56" cy="26" r="2.5" />
    <g className={`${move} group-hover:-translate-y-1`}>
      <rect x="38" y="52" width="104" height="18" rx="3" className="text-accent" />
      <path d="M38 82h88M38 92h72M38 102h96" />
    </g>
    <g className={`${move} group-hover:translate-y-1`}>
      <rect x="156" y="52" width="46" height="62" rx="6" />
      <path d="M164 64h30M164 74h22" />
    </g>
    <g className={`${move} group-hover:translate-x-5 group-hover:translate-y-3`}>
      <path d="m168 92 0 22 6-5 4 9 4-2-4-9h8z" className="fill-current text-accent" strokeWidth="0" />
    </g>
  </>
)

const backend = (
  <>
    {[22, 62, 102].map((y, i) => (
      <g key={y} className={`${move} ${i === 0 ? 'group-hover:-translate-x-2' : i === 2 ? 'group-hover:translate-x-2' : ''}`}>
        <rect x="46" y={y} width="148" height="30" rx="7" />
        <path d={`M62 ${y + 15}h46`} />
        <circle cx="168" cy={y + 15} r="3.5" className="fill-current text-accent transition-opacity duration-500 group-hover:opacity-100" />
        <circle cx="154" cy={y + 15} r="3.5" />
      </g>
    ))}
    <path d="M20 37h26M20 77h26M20 117h26M194 37h26M194 77h26M194 117h26" strokeDasharray="3 4" />
  </>
)

const fullstack = (
  <>
    <g className={`${move} group-hover:translate-y-3`}>
      <path d="m120 96 70-28-70-28-70 28z" className="text-accent" />
    </g>
    <g className={`${move}`}>
      <path d="m50 80 70 28 70-28" />
    </g>
    <g className={`${move} group-hover:-translate-y-3`}>
      <path d="m50 94 70 28 70-28" />
    </g>
    <path d="M120 36v-18M120 18l-5 6M120 18l5 6" strokeDasharray="2 4" />
  </>
)

const database = (
  <>
    <g className={`${move} group-hover:-translate-y-1.5`}>
      <ellipse cx="120" cy="34" rx="62" ry="14" className="text-accent" />
      <path d="M58 34v22c0 8 28 14 62 14s62-6 62-14V34" />
    </g>
    <path d="M58 56v22c0 8 28 14 62 14s62-6 62-14V56" />
    <g className={`${move} group-hover:translate-y-1.5`}>
      <path d="M58 78v22c0 8 28 14 62 14s62-6 62-14V78" />
    </g>
    <path d="M88 44h8M88 66h8M88 88h8" className="text-accent" />
  </>
)

const api = (
  <>
    <rect x="20" y="52" width="42" height="42" rx="9" />
    <rect x="178" y="52" width="42" height="42" rx="9" />
    <circle cx="120" cy="30" r="14" className={`${move} text-accent group-hover:scale-125`} />
    <circle cx="120" cy="116" r="14" className={`${move} group-hover:scale-125`} />
    <path d="M62 66 108 36M62 80l46 30M132 36l46 30M132 110l46-30" strokeDasharray="4 5" className="group-hover:[stroke-dashoffset:-36]" />
    <path d="M33 68l-5 5 5 5M49 68l5 5-5 5M191 68l-5 5 5 5M207 68l5 5-5 5" strokeWidth="1.5" />
  </>
)

const data = (
  <>
    <path d="M24 126h192M24 126V20" />
    {[
      { x: 44, h: 36 },
      { x: 78, h: 56 },
      { x: 112, h: 44 },
      { x: 146, h: 78 },
      { x: 180, h: 96 },
    ].map((b, i) => (
      <rect
        key={b.x}
        x={b.x}
        y={126 - b.h}
        width="20"
        height={b.h}
        rx="3"
        className={`transition-transform duration-700 ease-out-quint [transform-box:fill-box] [transform-origin:bottom] ${
          i === 4 ? 'text-accent' : ''
        } group-hover:scale-y-[1.14]`}
        style={{ transitionDelay: `${i * 50}ms` }}
      />
    ))}
    <path d="M34 82 86 62l34 8 44-30 40-14" className={`${move} text-accent group-hover:-translate-y-2`} strokeDasharray="2 5" />
  </>
)

const map: Record<string, ReactElement> = { frontend, backend, fullstack, database, api, data }

export function ExpertiseIllustration({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 240 150"
      className="illus h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {map[id]}
    </svg>
  )
}
