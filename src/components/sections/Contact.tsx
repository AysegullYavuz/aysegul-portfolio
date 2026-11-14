import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { site } from '../../data/site'
import { submitContactForm } from '../../lib/contact'
import type { ContactPayload } from '../../lib/contact'
import { Button } from '../ui/Button'
import { ArrowUpRight, GithubIcon, LinkedinIcon } from '../ui/Icons'
import { Reveal, RevealText, easeOutQuint } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

type Errors = Partial<Record<keyof ContactPayload, string>>
type Status = 'idle' | 'sending' | 'sent'

const empty: ContactPayload = { name: '', email: '', subject: '', message: '' }

const validate = (v: ContactPayload): Errors => {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please tell me your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.'
  if (v.message.trim().length < 10) e.message = 'A few more details would help (10+ characters).'
  return e
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = 'text',
  multiline = false,
  autoComplete,
}: {
  id: keyof ContactPayload
  label: string
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  multiline?: boolean
  autoComplete?: string
}) {
  const common = {
    id: `contact-${id}`,
    name: id,
    value,
    onChange,
    placeholder: ' ',
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `contact-${id}-error` : undefined,
    autoComplete,
    required: true,
    className:
      'peer w-full border-b border-ink/20 bg-transparent pb-3 pt-7 text-lg text-ink outline-none transition-colors duration-500 placeholder-transparent focus:border-ink aria-[invalid=true]:border-red-600',
  }
  return (
    <div className="relative">
      {multiline ? (
        <textarea {...common} rows={4} className={`${common.className} resize-none`} />
      ) : (
        <input {...common} type={type} />
      )}
      <label
        htmlFor={`contact-${id}`}
        className="pointer-events-none absolute left-0 top-7 origin-left text-lg text-muted transition-all duration-500 ease-out-quint peer-focus:-translate-y-6 peer-focus:scale-[0.72] peer-focus:text-accent-deep peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-[0.72]"
      >
        {label}
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent-deep transition-transform duration-700 ease-out-quint peer-focus:scale-x-100"
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`contact-${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border-b border-ink/15 py-5 transition-colors duration-500 hover:border-ink"
    >
      <span className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-lg transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
          {icon}
        </span>
        <span>
          <span className="eyebrow block !text-[0.65rem] text-muted">{label}</span>
          <span className="block text-[1.05rem] font-medium tracking-tight">{value}</span>
        </span>
      </span>
      <ArrowUpRight className="text-xl transition-transform duration-500 ease-out-quint group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  )
}

export function Contact() {
  const [values, setValues] = useState<ContactPayload>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof ContactPayload]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    setStatus('sending')
    await submitContactForm(values)
    setStatus('sent')
    setValues(empty)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="sheet z-10 bg-ivory py-28 text-charcoal sm:py-36 lg:py-44"
    >
      <div className="container-x">
        <SectionLabel index="07" label="Contact" />

        <RevealText
          id="contact-title"
          text="Have an Idea?|Let’s Build|*Something Great.*"
          className="display-xl mt-10"
          accentClass="italic text-accent-deep"
        />

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-20">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                Whether you’re planning a new product, need a trusted engineering partner or simply want to say hello —
                I’d love to hear about it. I usually reply within one business day.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <ContactLink
                href={`mailto:${site.email}`}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                }
                label="Email"
                value={site.email}
              />
              <ContactLink href={site.linkedin} icon={<LinkedinIcon className="h-5 w-5" />} label="LinkedIn" value={site.linkedinLabel} />
              <ContactLink href={site.github} icon={<GithubIcon className="h-5 w-5" />} label="GitHub" value={site.githubLabel} />
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <Button href={`mailto:${site.email}`} variant="dark" size="lg" className="w-full sm:w-auto sm:min-w-[19rem]">
                Start a conversation
              </Button>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/50 p-6 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easeOutQuint }}
                    className="flex min-h-[26rem] flex-col items-start justify-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-deep text-ivory">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <h3 className="display-md mt-8">
                      Message <span className="italic text-accent-deep">received.</span>
                    </h3>
                    <p className="mt-4 max-w-sm text-lg text-muted">
                      Thank you for reaching out — I’ll get back to you personally within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-semibold underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    aria-label="Contact form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
                  >
                    <Field id="name" label="Your name" value={values.name} error={errors.name} onChange={onChange} autoComplete="name" />
                    <Field id="email" label="Email address" type="email" value={values.email} error={errors.email} onChange={onChange} autoComplete="email" />
                    <div className="sm:col-span-2">
                      <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={onChange} />
                    </div>
                    <div className="sm:col-span-2">
                      <Field id="message" label="Tell me about your project" multiline value={values.message} error={errors.message} onChange={onChange} />
                    </div>
                    <div className="mt-4 flex flex-col-reverse items-start justify-between gap-6 sm:col-span-2 sm:flex-row sm:items-center">
                      <p className="text-sm text-muted">All fields are required.</p>
                      <Button type="submit" variant="accent" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto sm:min-w-[15rem] !text-ink">
                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
