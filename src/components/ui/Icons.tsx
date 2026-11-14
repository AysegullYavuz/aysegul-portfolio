import type { SVGProps } from 'react'
import { siGithub, siX } from 'simple-icons'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ArrowUpRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
)

export const ArrowLeft = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
)

export const ArrowDown = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
)

export const CloseIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const QuoteMark = (p: IconProps) => (
  <svg viewBox="0 0 48 36" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d="M0 36V21.6C0 9.6 6 2.4 18 0l2.4 5.4C13.8 7.2 10.8 11.4 10.2 16.8H20V36H0Zm28 0V21.6C28 9.6 34 2.4 46 0l2.4 5.4C41.8 7.2 38.8 11.4 38.2 16.8H48V36H28Z" />
  </svg>
)

const brand = (path: string) => (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d={path} />
  </svg>
)

export const GithubIcon = brand(siGithub.path)
export const XIcon = brand(siX.path)

/** LinkedIn glyph (not bundled in simple-icons any more). */
export const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)
