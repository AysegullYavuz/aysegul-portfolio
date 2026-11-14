import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { navLinks, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { lockScroll, scrollToTarget } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'

const sectionIds = ['home', 'about', 'expertise', 'projects', 'technologies', 'contact']

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToTarget(href)
    onClick?.()
  }
  return (
    <a
      href={href}
      onClick={handle}
      aria-current={active ? 'page' : undefined}
      className="group relative inline-flex items-center gap-2 overflow-hidden px-1 py-1 text-[0.92rem] font-medium tracking-tight text-ivory/80 transition-colors hover:text-ivory aria-[current=page]:text-ivory"
    >
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full bg-accent transition-all duration-500 ${
          active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-quint group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block transition-transform duration-500 ease-out-quint group-hover:-translate-y-full"
        >
          {label}
        </span>
      </span>
    </a>
  )
}

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 500 && y > prev && !open)
  })

  // Lock scroll + Escape handling for mobile menu
  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close menu when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = () => mq.matches && setOpen(false)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: '-120%' }}
        animate={{ y: ready && !hidden ? 0 : '-120%', opacity: ready && !hidden ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex items-center justify-between rounded-full transition-all duration-700 ease-out-quint ${
            scrolled
              ? 'mt-3 w-[calc(100%-1.5rem)] max-w-[88rem] border border-white/10 bg-ink/70 px-4 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-[calc(100%-3rem)] sm:px-6'
              : 'mt-5 w-full max-w-[96rem] border border-transparent bg-transparent px-5 py-3 sm:px-8 lg:px-14'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#home')
            }}
            className="flex items-center gap-2.5 text-ivory"
            aria-label={`${site.name} — back to top`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory text-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </span>
            <span className="whitespace-nowrap font-serif text-[1.65rem] leading-none tracking-tight">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} active={active === l.href.slice(1)} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button href="#contact" variant="light" className="!py-2.5 whitespace-nowrap max-sm:!hidden">
              Let’s Talk
            </Button>
            <button
              type="button"
              id="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/20 text-ivory transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-quint ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-quint ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-28 text-ivory lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: [0.6, 0.14, 0, 1] }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      setTimeout(() => scrollToTarget(l.href), 700)
                    }}
                    initial={{ y: '110%' }}
                    animate={{ y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    className="flex items-baseline gap-4 border-b border-white/10 py-3 font-serif text-[2.9rem] leading-none tracking-tight"
                  >
                    <span className="eyebrow !text-[0.65rem] text-accent">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              <Button
                href="#contact"
                variant="accent"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Let’s Talk
              </Button>
              <div className="flex items-center justify-between text-mist">
                <a href={`mailto:${site.email}`} className="text-sm hover:text-ivory">
                  {site.email}
                </a>
                <div className="flex gap-3 text-xl">
                  <a href={site.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                    <GithubIcon />
                  </a>
                  <a href={site.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
