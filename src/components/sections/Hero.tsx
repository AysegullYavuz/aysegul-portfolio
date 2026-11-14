import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { heroStats, site } from '../../data/site'
import { Button } from '../ui/Button'
import { ArrowRight } from '../ui/Icons'
import { RevealText, easeOutQuint } from '../ui/Reveal'
import { scrollToTarget } from '../../lib/scroll'

/** Delay (s) before hero choreography starts once the page is ready. */
const START = 0.05

function CodeCard() {
  return (
    <div
      aria-hidden
      className="hidden w-[19.5rem] rounded-2xl border border-white/10 bg-ink/55 p-5 font-mono text-[0.78rem] leading-relaxed text-ivory/70 backdrop-blur-md xl:block"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 text-[0.68rem] text-mist">engineer.ts</span>
      </div>
      <p>
        <span className="text-accent">const</span> <span className="text-ivory">aysegul</span> = {'{'}
      </p>
      <p className="pl-4">
        role: <span className="text-accent-soft">'Computer Engineer'</span>,
      </p>
      <p className="pl-4">
        focus: [<span className="text-accent-soft">'Data'</span>, <span className="text-accent-soft">'Full-Stack'</span>],
      </p>
      <p className="pl-4">
        available: <span className="text-accent">true</span>
        <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-accent" />
      </p>
      <p>{'}'}</p>
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 1.1, delay: START + delay, ease: easeOutQuint },
  })

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Introduction"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory"
    >
      {/* Cinematic background */}
      <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0 -z-20">
        <img
          src="/images/hero_workspace.jpg"
          alt="A dark, modern developer workspace with an ultra-wide monitor displaying code"
          width={1024}
          height={1024}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_42%] opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/80 to-transparent" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative flex flex-1 flex-col justify-end pb-20 pt-28 sm:pb-24"
      >
        {/* floating code card (desktop only, out of flow) */}
        <motion.div
          {...fade(0.25)}
          className="absolute right-[clamp(1.25rem,4vw,3.5rem)] top-36 hidden xl:block"
        >
          <CodeCard />
        </motion.div>

        {/* top row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 sm:mb-8">
          <motion.p
            {...fade(0.1)}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 eyebrow text-ivory/80 backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
            Available for new projects
          </motion.p>
        </div>

        <RevealText
          as="h1"
          immediate
          play={ready}
          delay={START + 0.2}
          text="Building Digital|Experiences|Through *Code.*"
          className="display-xl max-w-[16ch] md:max-w-none"
          accentClass="italic text-accent-soft"
        />

        <div className="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-12">
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.p {...fade(0.9)} className="max-w-[34rem] text-[1.05rem] leading-relaxed text-ivory/75 sm:text-lg">
              I design and develop modern software solutions, combining clean architecture, thoughtful design, and
              innovative technologies to solve real-world problems.
            </motion.p>
            <motion.div {...fade(1.05)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#projects" variant="light" icon={ArrowRight} className="sm:min-w-[14.5rem]">
                Explore My Work
              </Button>
              <Button href="#contact" variant="outline-light" className="sm:min-w-[12.5rem]">
                Get In Touch
              </Button>
            </motion.div>
          </div>

          <motion.dl
            {...fade(1.2)}
            className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-xs leading-snug text-mist sm:text-[0.8rem]">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* bottom meta + scroll indicator */}
        <motion.div
          {...fade(1.5)}
          className="mt-12 flex items-end justify-between gap-6 text-mist"
        >
          <p className="hidden eyebrow sm:block">{site.location}</p>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#about')
            }}
            aria-label="Scroll to the About section"
            className="group flex items-center gap-4 sm:absolute sm:left-1/2 sm:-translate-x-1/2"
          >
            <span className="eyebrow text-ivory/70 transition-colors group-hover:text-ivory">Scroll</span>
            <span className="relative block h-14 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-0 animate-scroll-line bg-accent" />
            </span>
          </a>
          <p className="eyebrow">© {new Date().getFullYear()}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
