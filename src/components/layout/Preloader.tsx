import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../../data/site'

export const PRELOADER_MS = 1900

/** Short branded intro: counter + curtain lift. Calls onDone when the curtain has gone. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / (PRELOADER_MS - 500), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVisible(false)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 text-ivory sm:px-10"
          exit={{
            y: '-100%',
            borderBottomLeftRadius: '50% 12vh',
            borderBottomRightRadius: '50% 12vh',
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between eyebrow text-mist">
            <span>{site.name}</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-end justify-between">
            <p className="font-serif text-2xl italic text-accent sm:text-3xl">Loading experience</p>
            <p className="font-serif text-[clamp(5rem,18vw,16rem)] leading-[0.8] tracking-tighter tabular-nums">
              {count}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
            <div className="h-full bg-accent transition-[width] duration-100" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
