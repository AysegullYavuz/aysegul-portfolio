import { motion } from 'framer-motion'
import { moreProjects, projects } from '../../data/site'
import type { MoreProject, Project } from '../../data/site'
import { ArrowUpRight } from '../ui/Icons'
import { ParallaxImage } from '../ui/ParallaxImage'
import { Reveal, RevealText, easeOutQuint } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

/** Asymmetric layout recipes — alternates side, width and aspect ratio. */
const layouts = [
  { image: 'lg:col-span-8 lg:col-start-1', text: 'lg:col-span-4 lg:col-start-9', aspect: 'aspect-[4/3]', offset: 'lg:pb-10' },
  { image: 'lg:col-span-7 lg:col-start-6 lg:order-2', text: 'lg:col-span-4 lg:col-start-1 lg:order-1', aspect: 'aspect-[5/4]', offset: 'lg:pt-24 lg:self-start' },
  { image: 'lg:col-span-6 lg:col-start-2', text: 'lg:col-span-4 lg:col-start-9', aspect: 'aspect-square', offset: 'lg:pb-16' },
  { image: 'lg:col-span-8 lg:col-start-5 lg:order-2', text: 'lg:col-span-4 lg:col-start-1 lg:order-1', aspect: 'aspect-[16/11]', offset: 'lg:pt-16 lg:self-start' },
]

function ViewLink({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      onClick={(e) => project.href === '#' && e.preventDefault()}
      aria-label={`View project: ${project.title}`}
      className="group/link relative inline-flex items-center gap-3 pb-1.5 text-[1.02rem] font-semibold tracking-tight text-ink"
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-quint group-hover/link:-translate-y-full">
          View Project
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block text-accent-deep transition-transform duration-500 ease-out-quint group-hover/link:-translate-y-full"
        >
          View Project
        </span>
      </span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-ivory transition-all duration-500 group-hover/link:rotate-45 group-hover/link:bg-accent-deep">
        <ArrowUpRight />
      </span>
      <span className="absolute bottom-0 left-0 h-px w-[calc(100%-3rem)] origin-left scale-x-100 bg-ink/25 transition-transform duration-700 ease-out-quint group-hover/link:scale-x-0" />
      <span className="absolute bottom-0 left-0 h-px w-[calc(100%-3rem)] origin-right scale-x-0 bg-accent-deep transition-transform delay-100 duration-700 ease-out-quint group-hover/link:scale-x-100" />
    </a>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const l = layouts[index % layouts.length]
  return (
    <article className="group grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
      <div className={`${l.image}`}>
        <a
          href={project.href}
          onClick={(e) => project.href === '#' && e.preventDefault()}
          tabIndex={-1}
          aria-hidden
          className="relative block"
        >
          <ParallaxImage
            src={project.image}
            alt={project.alt}
            className={`${l.aspect} w-full rounded-[1.5rem] bg-ink-2 shadow-[0_30px_80px_-40px_rgba(20,21,29,0.5)]`}
            range={7}
            scaleOnHover
          />
          {/* floating cursor badge */}
          <span className="pointer-events-none absolute bottom-5 right-5 grid h-24 w-24 scale-50 place-items-center rounded-full bg-ivory text-xs font-semibold uppercase tracking-[0.14em] text-ink opacity-0 transition-all duration-700 ease-out-quint group-hover:scale-100 group-hover:opacity-100 sm:bottom-8 sm:right-8 sm:h-28 sm:w-28">
            View
          </span>
        </a>
      </div>

      <div className={`${l.text} ${l.offset} flex flex-col`}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-serif text-6xl italic leading-none tracking-tight text-accent-deep">
              0{index + 1}
            </span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="eyebrow text-right text-muted">{project.badge}</span>
          </div>
          <p className="eyebrow mt-8 text-muted">{project.category}</p>
          <h3 className="display-md mt-3 text-ink">{project.title}</h3>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-charcoal transition-colors duration-500 group-hover:border-ink/30"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <ViewLink project={project} />
          </div>
        </Reveal>
      </div>
    </article>
  )
}

function MoreProjectCard({ project }: { project: MoreProject }) {
  return (
    <a
      href={project.href}
      onClick={(e) => project.href === '#' && e.preventDefault()}
      aria-label={`View project: ${project.title}`}
      className="group flex h-full flex-col rounded-[1.5rem] border border-ink/12 p-7 transition-all duration-700 ease-out-quint hover:-translate-y-1.5 hover:border-ink hover:bg-ink hover:text-ivory sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow text-muted transition-colors duration-500 group-hover:text-accent">{project.category}</p>
        <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-ink/20 text-lg transition-all duration-500 group-hover:rotate-45 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink">
          <ArrowUpRight />
        </span>
      </div>
      <h3 className="display-sm mt-8">{project.title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-mist">
        {project.description}
      </p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${project.title} technologies`}>
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium transition-colors duration-500 group-hover:border-white/20"
          >
            {t}
          </li>
        ))}
      </ul>
    </a>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="sheet z-10 bg-ivory py-28 text-charcoal sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="03" label="Featured Projects" />
            <RevealText
              id="projects-title"
              text="Selected work, *thoughtfully* built."
              className="display-lg mt-10"
              accentClass="italic text-accent-deep"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOutQuint }}
            className="max-w-xs text-lg leading-relaxed text-muted"
          >
            A closer look at products where engineering depth meets refined design.
          </motion.p>
        </div>

        <div className="mt-20 space-y-28 sm:space-y-36 lg:mt-28 lg:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>

        <div className="mt-28 lg:mt-40">
          <div className="flex items-center gap-6">
            <h3 className="display-sm">More projects</h3>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="eyebrow text-muted">Data science & ML</span>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {moreProjects.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} y={30}>
                <MoreProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
