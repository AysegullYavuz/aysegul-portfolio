import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

export const easeOutQuint = [0.22, 1, 0.36, 1] as const

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'span' | 'article'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as ElementType
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: easeOutQuint }}
    >
      {children}
    </Tag>
  )
}

type RevealTextProps = {
  /** Wrap a phrase in *asterisks* to render it in the italic accent style. */
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  id?: string
  className?: string
  accentClass?: string
  delay?: number
  /** Animate on mount rather than on scroll (hero). */
  immediate?: boolean
  /** For `immediate` headings: hold the animation until true. */
  play?: boolean
}

/** Masked word-by-word headline reveal with italic accent segments. */
export function RevealText({
  text,
  as = 'h2',
  id,
  className = '',
  accentClass = 'italic text-accent',
  delay = 0,
  immediate = false,
  play = true,
}: RevealTextProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as ElementType
  const plain = text.replace(/[*|]/g, ' ').replace(/\s+/g, ' ').trim()

  const words: { word: string; accent: boolean; br: boolean }[] = []
  text.split('|').forEach((line, li, lines) => {
    const start = words.length
    line.split('*').forEach((chunk, i) => {
      chunk
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => words.push({ word, accent: i % 2 === 1, br: false }))
    })
    if (li < lines.length - 1 && words.length > start) words[words.length - 1].br = true
  })

  const viewProps = immediate
    ? { animate: play ? 'show' : 'hidden' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <Tag
      id={id}
      className={className}
      aria-label={plain}
      initial={reduce ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      {...viewProps}
    >
      {words.map(({ word, accent, br }, i) => (
        <span key={`${word}-${i}`} className="contents">
          <span
            aria-hidden
            className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] pr-[0.08em] -mr-[0.08em] align-bottom"
          >
            <motion.span
              className={`inline-block ${accent ? accentClass : ''}`}
              variants={{
                hidden: { y: '115%', rotate: 3 },
                show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: easeOutQuint } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && !br ? '\u00A0' : ''}
          </span>
          {br && <br className="hidden md:block" />}
          {br && <span className="md:hidden"> </span>}
        </span>
      ))}
    </Tag>
  )
}
