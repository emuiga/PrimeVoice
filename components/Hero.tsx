'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function Hero() {
  const handleScroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* ── Full-screen studio image ── */}
      <Image
        src="/images/studio2.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      {/* Left-side gradient only — keeps video text visible on the right */}
      <div
        className="absolute left-0 top-0 bottom-0 w-3/4 md:w-3/5 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.span
              variants={item}
              className="inline-block text-brand-orange text-[10px] sm:text-xs font-medium tracking-[0.35em] uppercase mb-5 sm:mb-6"
            >
              Voice-Over &amp; Audio Visual Production
            </motion.span>

            <motion.h1
              variants={item}
              className="mb-6"
              style={{
                fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(32px, 6vw, 58px)',
                lineHeight: 'clamp(38px, 6.8vw, 65px)',
                color: '#ffffff',
                textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.9)',
              }}
            >
              Voice That Resonates,
              <br />
              <span className="text-brand-orange" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}>
                Impact That Lasts
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-sm sm:max-w-md"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
            >
              Professional audio and visual communication that connects brands
              with the people they were made to serve.
            </motion.p>

            <motion.div variants={item} className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => handleScroll('#samples')}
                className="border border-white/50 text-white text-sm font-medium tracking-[0.12em] px-7 py-3.5 sm:px-8 sm:py-4 hover:bg-white hover:text-black transition-all duration-300"
                style={{ textShadow: 'none' }}
              >
                Hear the Work
              </button>
              <button
                onClick={() => handleScroll('#contact')}
                className="bg-brand-orange text-white text-sm font-medium tracking-[0.12em] px-7 py-3.5 sm:px-8 sm:py-4 hover:bg-orange-600 transition-colors duration-300"
              >
                Let&apos;s Work Together
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-white/40 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-white/40 origin-top"
        />
      </motion.div>
    </section>
  )
}
