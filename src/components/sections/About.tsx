import { aboutContent } from '../../data/site'
import { ParallaxImage } from '../ui/ParallaxImage'
import { Reveal, RevealText } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="sheet z-10 scroll-mt-0 bg-ivory py-28 text-charcoal sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <SectionLabel index="01" label="About" />

        <RevealText
          id="about-title"
          text="Turning Ideas Into|Meaningful *Digital Solutions.*"
          className="display-lg mt-10 max-w-[18ch] md:max-w-none"
          accentClass="italic text-accent-deep"
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <ParallaxImage
                  src="/images/about_abstract.jpg"
                  alt="Abstract macro visual of glowing teal fibre-optic lines across a dark microchip grid"
                  className="aspect-[4/5] w-full rounded-[1.75rem] bg-ink"
                  range={8}
                />
                <Reveal delay={0.4} className="absolute -bottom-6 right-4 sm:-right-8">
                  <div className="rounded-2xl bg-ink px-6 py-5 text-ivory shadow-2xl">
                    <p className="font-serif text-5xl leading-none tracking-tight">
                      {aboutContent.badge.value}
                      <span className="text-accent">.</span>
                    </p>
                    <p className="mt-1.5 max-w-[10rem] text-xs leading-snug text-mist">
                      {aboutContent.badge.text}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6">
              {aboutContent.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p
                    className={
                      i === 0
                        ? 'font-serif text-3xl leading-[1.15] tracking-tight text-ink sm:text-[2.2rem]'
                        : 'max-w-xl text-lg leading-relaxed text-muted'
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Philosophy */}
            <div className="mt-16">
              <p className="eyebrow mb-6 text-muted">Development philosophy</p>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {aboutContent.principles.map((pr, i) => (
                  <Reveal as="li" key={pr.title} delay={i * 0.08} y={24}>
                    <div className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr_1.4fr]">
                      <span className="font-serif text-2xl italic text-accent-deep">0{i + 1}</span>
                      <h3 className="font-serif text-2xl leading-tight tracking-tight text-ink transition-transform duration-500 ease-out-quint group-hover:translate-x-2">
                        {pr.title}
                      </h3>
                      <p className="col-start-2 text-[0.95rem] leading-relaxed text-muted sm:col-start-3">{pr.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="mt-16">
              <p className="eyebrow mb-6 text-muted">Focus areas</p>
              <ol className="relative space-y-8 border-l border-ink/15 pl-8">
                {aboutContent.highlights.map((h, i) => (
                  <Reveal as="li" key={h.title} delay={i * 0.08} y={24} className="relative">
                    <span className="absolute -left-[2.45rem] top-2 h-2.5 w-2.5 rounded-full border-2 border-ivory bg-accent-deep ring-1 ring-accent-deep/40" />
                    <p className="eyebrow text-accent-deep">{h.year}</p>
                    <p className="mt-1.5 font-serif text-2xl leading-tight tracking-tight text-ink">{h.title}</p>
                    <p className="text-sm text-muted">{h.place}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
