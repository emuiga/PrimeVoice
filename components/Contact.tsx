'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

function WhatsAppIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function EmailIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-brand-orange text-xs font-medium tracking-[0.35em] uppercase mb-5"
            >
              Get in Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display mb-6"
            >
              Let&apos;s collaborate and create{' '}
              <span className="text-brand-orange">impact that lasts</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 leading-relaxed mb-10 max-w-md text-[15px]"
            >
              Ready to bring your brand&apos;s message to life? Reach out and
              let&apos;s create something meaningful together.
            </motion.p>

            {/* Contact icon buttons */}
            <div className="flex gap-8">
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                href="https://wa.me/254792481990"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                  <WhatsAppIcon size={28} />
                </div>
                <span className="text-gray-600 text-sm font-medium group-hover:text-[#25D366] transition-colors">
                  WhatsApp
                </span>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                href="mailto:enyaboke130@gmail.com"
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <EmailIcon size={28} />
                </div>
                <span className="text-gray-600 text-sm font-medium group-hover:text-brand-orange transition-colors">
                  Email
                </span>
              </motion.a>
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 border border-gray-100 rounded"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-brand-orange text-sm underline">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'contact-name', name: 'name', type: 'text', placeholder: 'Your Name' },
                    { id: 'contact-email', name: 'email', type: 'email', placeholder: 'Your Email' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="sr-only">{f.placeholder}</label>
                      <input
                        type={f.type} id={f.id} name={f.name}
                        placeholder={f.placeholder} required
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 px-4 py-3.5 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="sr-only">Project Type</label>
                  <input
                    type="text" id="contact-subject" name="subject"
                    placeholder="Project Type (e.g. Radio Commercial, E-Learning)"
                    className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 px-4 py-3.5 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">Message</label>
                  <textarea
                    id="contact-message" name="message"
                    placeholder="Tell us about your project…" required rows={5}
                    className="w-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 px-4 py-3.5 focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-sm resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or reach out via WhatsApp.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-brand-dark text-white font-medium py-4 text-sm tracking-[0.12em] hover:bg-brand-orange transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
