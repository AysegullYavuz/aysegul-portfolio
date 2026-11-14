import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { testimonials } from '../../data/site'
import { ArrowLeft, ArrowRight, QuoteMark } from '../ui/Icons'
import { RevealText } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -80 }),
}

export function Testimonials() {
  const [[index, dir], setPage] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  const go = useCallback(
    (d: number) => setPage(([i]) => [(i + d + total) % total, d]),
    [total],
  )

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 8000)
    return () => clearInterval(t)
  }, [paused, go, index])

  const t = testimonials[index]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="sheet z-10 overflow-hidden bg-ink py-28 text-ivory sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <SectionLabel index="06" label="Testimonials" tone="dark" />
        <RevealText
          id="testimonials-title"
          text="Kind words from *people I’ve built with.*"
          className="display-md mt-10 max-w-[20ch] md:max-w-3xl"
        />

        <div
          className="relative mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="relative lg:col-span-10 lg:col-start-2">
            <QuoteMark className="mb-8 h-12 w-12 text-accent sm:h-16 sm:w-16" />

            <div className="relative min-h-[22rem] sm:min-h-[19rem] lg:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={index}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(1)
                    else if (info.offset.x > 70) go(-1)
                  }}
                  className="cursor-grab active:cursor-grabbing"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                >
                  <blockquote className="font-serif text-[1.9rem] leading-[1.15] tracking-tight text-ivory sm:text-[2.6rem] lg:text-[3.2rem]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <span
                      aria-hidden
                      className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-ink-2 font-serif text-xl text-accent"
                    >
                      {t.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <span>
                      <span className="block text-base font-semibold">{t.name}</span>
                      <span className="block text-sm text-mist">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-14 flex items-center justify-between gap-6 border-t border-white/10 pt-8">
              <div className="flex items-center gap-5">
                <p className="font-serif text-3xl tabular-nums tracking-tight">
                  0{index + 1}
                  <span className="text-mist"> / 0{total}</span>
                </p>
                <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Show testimonial ${i + 1}`}
                      onClick={() => setPage([i, i > index ? 1 : -1])}
                      className="group grid h-6 place-items-center"
                    >
                      <span
                        className={`block h-[3px] rounded-full transition-all duration-700 ease-out-quint ${
                          i === index ? 'w-10 bg-accent' : 'w-4 bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="group grid h-14 w-14 place-items-center rounded-full border border-white/20 text-xl transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
                >
                  <ArrowLeft className="transition-transform duration-500 group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="group grid h-14 w-14 place-items-center rounded-full bg-ivory text-xl text-ink transition-colors duration-500 hover:bg-accent"
                >
                  <ArrowRight className="transition-transform duration-500 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
