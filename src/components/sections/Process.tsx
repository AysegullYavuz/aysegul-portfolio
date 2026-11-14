import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { processSteps } from '../../data/site'
import { Reveal, RevealText, easeOutQuint } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function Process() {
  const [active, setActive] = useState(0)
  const step = processSteps[active]

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="sheet z-10 bg-ivory py-28 text-charcoal sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <SectionLabel index="05" label="Development Process" />
        <RevealText
          id="process-title"
          text="From first conversation to *flawless launch.*"
          className="display-lg mt-10 max-w-[16ch] md:max-w-[20ch]"
          accentClass="italic text-accent-deep"
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Steps list */}
          <ol className="lg:col-span-7" aria-label="Six step development workflow">
            {processSteps.map((s, i) => {
              const isActive = i === active
              return (
                <Reveal as="li" key={s.number} delay={i * 0.05} y={24} className="border-t border-ink/15 last:border-b">
                  <button
                    type="button"
                    id={`process-step-${i}`}
                    aria-expanded={isActive}
                    aria-controls={`process-panel-${i}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative flex w-full items-baseline gap-5 py-6 text-left sm:gap-8 sm:py-8"
                  >
                    <span
                      className={`w-10 flex-none font-serif text-2xl italic transition-colors duration-500 sm:w-14 sm:text-3xl ${
                        isActive ? 'text-accent-deep' : 'text-muted/60'
                      }`}
                    >
                      {s.number}
                    </span>
                    <span
                      className={`flex-1 font-serif text-[1.9rem] leading-none tracking-tight transition-all duration-500 ease-out-quint sm:text-[2.6rem] lg:text-[3rem] ${
                        isActive ? 'translate-x-2 text-ink' : 'text-ink/35 group-hover:text-ink/70'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      aria-hidden
                      className={`relative block h-6 w-6 flex-none self-center transition-transform duration-500 ease-out-quint ${
                        isActive ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full bg-ink" />
                      <span className="absolute left-1/2 top-0 h-full w-px bg-ink" />
                    </span>
                    {/* progress underline */}
                    <span
                      aria-hidden
                      className={`absolute -top-px left-0 h-px bg-accent-deep transition-all duration-1000 ease-out-quint ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>

                  {/* Mobile / tablet inline panel */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`process-panel-${i}`}
                        role="region"
                        aria-labelledby={`process-step-${i}`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: easeOutQuint }}
                      >
                        <div className="pb-8 pl-[3.75rem] sm:pl-[5.5rem]">
                          <p className="text-[1.02rem] leading-relaxed text-muted">{s.description}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {s.outputs.map((o) => (
                              <li key={o} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium">
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </ol>

          {/* Desktop detail card */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div
                className="grain relative overflow-hidden rounded-[1.75rem] bg-ink p-10 text-ivory"
                aria-live="polite"
              >
                <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: easeOutQuint }}
                    className="relative"
                  >
                    <p className="font-serif text-[9rem] italic leading-[0.8] tracking-tighter text-accent">
                      {step.number}
                    </p>
                    <h3 className="display-sm mt-10">{step.title}</h3>
                    <p className="mt-5 text-[1.02rem] leading-relaxed text-mist">{step.description}</p>
                    <p className="eyebrow mt-9 text-ivory/50">Deliverables</p>
                    <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                      {step.outputs.map((o) => (
                        <li key={o} className="flex items-center gap-3 py-3 text-[0.95rem]">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                {/* segmented progress */}
                <div className="relative mt-10 flex gap-1.5" aria-hidden>
                  {processSteps.map((s, i) => (
                    <span key={s.number} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full origin-left bg-accent transition-transform duration-700 ease-out-quint"
                        style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
