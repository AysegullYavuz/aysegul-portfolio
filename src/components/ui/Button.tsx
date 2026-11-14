import type { ComponentType, MouseEvent, ReactNode, SVGProps } from 'react'
import { scrollToTarget } from '../../lib/scroll'
import { ArrowUpRight } from './Icons'

type Variant = 'light' | 'accent' | 'dark' | 'outline-light' | 'outline-dark'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  icon?: ComponentType<SVGProps<SVGSVGElement>> | null
  className?: string
  size?: 'md' | 'lg'
  onClick?: () => void
  external?: boolean
  ariaLabel?: string
  id?: string
}

const variants: Record<Variant, string> = {
  light: 'bg-ivory text-ink hover:bg-white',
  accent: 'bg-accent text-ink hover:bg-accent-soft',
  dark: 'bg-ink text-ivory hover:bg-ink-3',
  'outline-light': 'border border-white/25 text-ivory hover:bg-ivory hover:text-ink hover:border-ivory',
  'outline-dark': 'border border-ink/20 text-ink hover:bg-ink hover:text-ivory hover:border-ink',
}

/** Pill button with a rolling-text hover and a sliding arrow. */
export function Button({
  children,
  variant = 'light',
  href,
  type = 'button',
  disabled,
  icon: Icon = ArrowUpRight,
  className = '',
  size = 'md',
  onClick,
  external,
  ariaLabel,
  id,
}: ButtonProps) {
  const cls = `group relative inline-flex items-center justify-between gap-6 rounded-full font-medium tracking-tight transition-colors duration-500 disabled:opacity-60 disabled:pointer-events-none ${
    size === 'lg' ? 'px-8 py-5 text-lg' : 'px-6 py-3.5 text-[0.95rem]'
  } ${variants[variant]} ${className}`

  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-quint group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block transition-transform duration-500 ease-out-quint group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      {Icon && (
        <span className="relative block h-4 w-4 overflow-hidden">
          <Icon className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-quint group-hover:translate-x-full group-hover:-translate-y-full" />
          <Icon className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-quint group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  )

  if (href) {
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        scrollToTarget(href)
      }
      onClick?.()
    }
    return (
      <a
        id={id}
        href={href}
        className={cls}
        onClick={handle}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button id={id} type={type} className={cls} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
