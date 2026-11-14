import { expertise } from '../../data/site'
import { ExpertiseIllustration } from '../ui/ExpertiseIllustrations'
import { ArrowUpRight } from '../ui/Icons'
import { Reveal, RevealText } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="sheet z-10 bg-ink py-28 text-ivory sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02" label="Expertise" tone="dark" />
            <RevealText
              id="expertise-title"
              text="Engineering craft across *every layer* of the stack."
              className="display-lg mt-10"
              accentClass="italic text-accent"
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-mist">
              From pixel-perfect interfaces to resilient infrastructure, I deliver complete, maintainable software
              — designed with intent and engineered to scale.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-5 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-6 lg:pb-14">
          {expertise.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(i % 3) * 0.1}
              className="lg:[&:nth-child(3n+2)]:translate-y-14"
            >
              <article className="group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-ink-2 p-5 transition-all duration-700 ease-out-quint hover:-translate-y-1.5 hover:border-ivory hover:bg-ivory hover:text-ink sm:p-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink p-5 text-mist transition-colors duration-700 group-hover:bg-ivory-2 group-hover:text-ink/70">
                  <ExpertiseIllustration id={item.id} />
                  <span className="absolute left-4 top-4 eyebrow !text-[0.65rem] text-accent group-hover:text-accent-deep">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-7 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-[1.9rem] leading-[1.05] tracking-tight">{item.title}</h3>
                  <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full border border-white/15 text-lg transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                    <ArrowUpRight />
                  </span>
                </div>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-mist transition-colors duration-500 group-hover:text-muted">
                  {item.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 pt-1" aria-label={`${item.title} technologies`}>
                  {item.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-ivory/80 transition-colors duration-500 group-hover:border-ink/20 group-hover:text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
