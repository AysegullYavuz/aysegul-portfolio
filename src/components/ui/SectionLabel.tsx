import { motion } from 'framer-motion'
import { easeOutQuint } from './Reveal'

/** Small numbered section label with an animated rule — "(01) About". */
export function SectionLabel({
  index,
  label,
  tone = 'light',
  className = '',
}: {
  index: string
  label: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const color = tone === 'dark' ? 'text-mist' : 'text-muted'
  const line = tone === 'dark' ? 'bg-white/20' : 'bg-ink/20'
  return (
    <div className={`flex items-center gap-4 eyebrow ${color} ${className}`}>
      <span className={tone === 'dark' ? 'text-accent' : 'text-accent-deep'}>({index})</span>
      <motion.span
        className={`block h-px w-14 origin-left ${line}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: easeOutQuint }}
      />
      <span>{label}</span>
    </div>
  )
}
