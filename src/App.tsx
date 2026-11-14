import { useEffect, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Preloader } from './components/layout/Preloader'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Expertise } from './components/sections/Expertise'
import { Hero } from './components/sections/Hero'
import { Process } from './components/sections/Process'
import { Projects } from './components/sections/Projects'
import { Technologies } from './components/sections/Technologies'
import { Testimonials } from './components/sections/Testimonials'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { lockScroll } from './lib/scroll'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [ready, setReady] = useState(() => reducedMotion())
  useSmoothScroll()

  // Hold the page still while the intro plays
  useEffect(() => {
    if (ready) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [ready])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Navbar ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Expertise />
        <Projects />
        <Technologies />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
