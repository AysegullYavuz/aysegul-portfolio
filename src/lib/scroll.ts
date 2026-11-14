import Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const getLenis = () => instance

/** Smooth-scroll to a hash target (e.g. "#about"), falling back to native scrolling. */
export const scrollToTarget = (hash: string, offset = 0) => {
  if (hash === '#' || hash === '#home') {
    if (instance) instance.scrollTo(0, { duration: 1.6, force: true })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, {
      offset,
      duration: 1.6,
      force: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/** Lock / unlock page scroll (used by preloader + mobile menu). */
export const lockScroll = (locked: boolean) => {
  if (locked) {
    instance?.stop()
    document.documentElement.style.overflow = 'hidden'
  } else {
    instance?.start()
    document.documentElement.style.overflow = ''
  }
}
