import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { navLinks, site } from '../../data/site'
import { scrollToTarget } from '../../lib/scroll'
import { ArrowUpRight, GithubIcon, LinkedinIcon, XIcon } from '../ui/Icons'
import { easeOutQuint } from '../ui/Reveal'

const socials = [
  { label: 'GitHub', href: site.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedinIcon },
  { label: 'X (Twitter)', href: site.x, Icon: XIcon },
]

export function Footer() {
  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <footer className="sheet z-10 overflow-hidden bg-ink pt-20 text-ivory sm:pt-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" onClick={go('#home')} className="inline-flex items-center gap-3" aria-label="Back to top">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
              <span className="font-serif text-3xl tracking-tight">{site.name}</span>
            </a>
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-mist">
              Computer engineer building data analytics solutions and full-stack web applications — with clean
              architecture and thoughtful design.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block border-b border-white/25 pb-1 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow text-mist">Navigate</p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={go(l.href)}
                    className="group inline-flex items-center text-lg text-ivory/85 transition-colors hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-500 ease-out-quint group-hover:mr-2 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-mist">Follow</p>
            <ul className="mt-6 space-y-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-lg text-ivory/85 transition-colors hover:text-ivory"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                    {label}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <motion.p
          aria-hidden
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.4, ease: easeOutQuint }}
          className="mt-20 select-none whitespace-nowrap pb-[0.2em] text-center font-serif text-[clamp(3.5rem,16.5vw,19rem)] leading-[0.78] tracking-[-0.05em] text-ivory/[0.06]"
        >
          {site.name}
        </motion.p>

        <div className="relative z-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 text-sm text-mist sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built with care — React, TypeScript &amp; Framer Motion.</p>
          <a
            href="#home"
            onClick={go('#home')}
            className="inline-flex items-center gap-2 transition-colors hover:text-ivory"
          >
            Back to top <ArrowUpRight className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  )
}
