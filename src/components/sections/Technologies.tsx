import { technologies } from '../../data/site'
import type { Tech } from '../../data/site'
import { Reveal, RevealText } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

/** Brand colours that are too dark for the charcoal surface fall back to the accent. */
const readable = (hex: string) => {
  const n = parseInt(hex, 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.28 ? '#8fd0c8' : `#${hex}`
}

function TechCard({ tech, hidden = false }: { tech: Tech; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="group/tech relative w-52 flex-none rounded-[1.5rem] border border-white/10 bg-ink-2 p-6 transition-all duration-700 ease-out-quint hover:-translate-y-2 hover:border-white/30 hover:bg-ink-3 sm:w-60 sm:p-7"
      style={{ ['--brand' as string]: readable(tech.hex) }}
    >
      <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-ink text-mist transition-all duration-700 ease-out-quint group-hover/tech:scale-110 group-hover/tech:border-[var(--brand)] group-hover/tech:text-[var(--brand)] group-hover/tech:shadow-[0_0_40px_-8px_var(--brand)]">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden role="img">
          <path d={tech.path} />
        </svg>
      </div>
      <p className="mt-16 font-serif text-3xl leading-none tracking-tight text-ivory sm:mt-20">{tech.name}</p>
      <span className="mt-4 block h-px w-8 bg-white/20 transition-all duration-700 ease-out-quint group-hover/tech:w-full group-hover/tech:bg-[var(--brand)]" />
    </li>
  )
}

export function Technologies() {
  return (
    <section
      id="technologies"
      aria-labelledby="tech-title"
      className="sheet z-10 overflow-hidden bg-ink py-28 text-ivory sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="04" label="Technologies" tone="dark" />
            <RevealText
              id="tech-title"
              text="A modern toolkit, *chosen with care.*"
              className="display-lg mt-10"
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-mist">
              I pick technology to fit the problem — favouring proven tools, strong typing and simple, maintainable
              architecture.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Primary carousel */}
      <div
        className="marquee-track relative mt-20 lg:mt-28 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="region"
        aria-label="Technologies carousel"
      >
        <div className="marquee-inner flex w-max animate-marquee gap-5 will-change-transform">
          <ul className="flex flex-none gap-5" aria-label="Technologies I work with">
            {technologies.map((t) => (
              <TechCard key={t.name} tech={t} />
            ))}
          </ul>
          <ul className="flex flex-none gap-5 pr-5" aria-hidden>
            {technologies.map((t) => (
              <TechCard key={t.name} tech={t} hidden />
            ))}
          </ul>
        </div>
      </div>

      {/* Secondary typographic ticker */}
      <div
        aria-hidden
        className="marquee-track mt-14 border-y border-white/10 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="marquee-inner flex w-max animate-marquee-reverse whitespace-nowrap font-serif text-5xl italic tracking-tight text-ivory/15 sm:text-7xl">
          {[0, 1].map((k) => (
            <div key={k} className="flex flex-none items-center">
              {technologies.map((t) => (
                <span key={`${k}-${t.name}`} className="flex items-center">
                  <span className="px-8">{t.name}</span>
                  <span className="h-2 w-2 rounded-full bg-accent/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
