export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Placeholder submit handler.
 * Replace the body with a real request (Formspree, Resend, your own API, …).
 * Example:
 *   await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
 */
export async function submitContactForm(payload: ContactPayload): Promise<void> {
  void payload
  await new Promise((resolve) => setTimeout(resolve, 1400))
}
