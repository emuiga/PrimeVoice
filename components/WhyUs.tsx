'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { WHATSAPP_LINK } from '@/lib/contact-info'

const checklist = [
  'Client-centric, never one-size-fits-all',
  'Clear communication at every step',
  'Quick turnaround, on schedule every time',
]

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 bg-brand-surface overflow-hidden">

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-brand-purple/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Single bold card — photo background, headline + checklist + CTAs overlaid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="relative w-full aspect-[3/4] xs:aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-brand-dark">
            <Image
              src="/images/whychooseussection.jpg"
              alt="Prime Voice Media recording session"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(26,10,46,0.95) 0%, rgba(26,10,46,0.7) 40%, rgba(26,10,46,0.25) 100%)' }}
              aria-hidden="true"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10 lg:p-14">
            <h2
              className="mb-3 sm:mb-4 max-w-xl"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: 'clamp(24px, 4vw, 46px)',
                lineHeight: 1.15,
                color: '#ffffff',
              }}
            >
              A dedicated voice partner, not just a vendor.
            </h2>

            <ul className="flex flex-col gap-1.5 sm:gap-2 mb-5 sm:mb-8">
              {checklist.map((point) => (
                <li
                  key={point}
                  className="inline-flex w-fit items-center gap-2 text-xs sm:text-sm text-white bg-black/40 backdrop-blur-sm rounded-full pl-1.5 pr-3.5 sm:pl-2 sm:pr-4 py-1 sm:py-1.5"
                >
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true">
                      <path d="M4 10.5l3.5 3.5L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-col xs:flex-row sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white text-sm font-medium px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg hover:bg-orange-600 transition-colors tracking-wide"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 2px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)' }}
              >
                Get a Quote
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg hover:bg-white hover:text-black transition-colors tracking-wide"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
