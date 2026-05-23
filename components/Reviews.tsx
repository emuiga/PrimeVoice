'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    id: 1,
    name: 'Kenya Broadcasting Corporation',
    title: 'KBC',
    avatar: 'KB',
    quote:
      'Prime Voice Media delivered exactly what our brand needed: a clear, compelling voice that resonated with our audience from the very first listen. The turnaround was exceptional.',
  },
  {
    id: 2,
    name: 'Lightower Electricals',
    title: 'Lightower Electricals',
    avatar: 'LE',
    quote:
      'The narration quality was outstanding. Professional, crisp, and delivered on time. Prime Voice Media understood our brand message and brought it to life perfectly.',
  },
  {
    id: 3,
    name: 'Kisii Family Medical Centre',
    title: 'Kisii Medical',
    avatar: 'KM',
    quote:
      'Quick turnaround, excellent communication, and a final product that exceeded our expectations. Prime Voice Media truly understood our need.',
  },
]

export default function Reviews() {
  const [active, setActive] = useState(0)

  return (
    <section id="reviews" className="relative py-20 sm:py-24 bg-white overflow-hidden">

      {/* Abstract background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-orange/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-purple/8 blur-3xl" />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-orange/6 blur-2xl" />
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.05] w-64 h-64" viewBox="0 0 300 300" fill="none">
          {[40, 80, 120, 160, 200].map((r) => (
            <circle key={r} cx="0" cy="150" r={r} stroke="#FF5A1F" strokeWidth="1" />
          ))}
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="reviews-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#1A0A2E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reviews-dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — featured quote */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-brand-orange text-xs font-medium tracking-[0.35em] uppercase mb-5"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="heading-display mb-10"
            >
              What Clients Say
            </motion.h2>

            <div
              className="text-[96px] leading-none text-brand-orange/12 font-serif select-none -mb-6"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-gray-700 text-lg leading-relaxed mb-8"
              >
                {reviews[active].quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.footer
                key={`footer-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                  <span className="text-brand-orange font-bold text-sm">
                    {reviews[active].avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm leading-tight">
                    {reviews[active].name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{reviews[active].title}</p>
                </div>
              </motion.footer>
            </AnimatePresence>
          </div>

          {/* Right — selectable cards */}
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActive(i)}
                className={`p-5 border cursor-pointer transition-all duration-300 group ${
                  active === i
                    ? 'border-brand-orange bg-orange-50/60 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/60'
                }`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-sm text-brand-orange" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${active === i ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.title}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
