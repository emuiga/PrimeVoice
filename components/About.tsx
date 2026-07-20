'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-white overflow-hidden">

      {/* Abstract background pattern — evenly distributed */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid — full section */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="about-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#1A0A2E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-dots)" />
        </svg>
        {/* Gradient blobs — spread top, middle, bottom */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full bg-brand-purple/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-orange/8 blur-3xl" />
        {/* Wave lines — mid-section horizontal */}
        <svg className="absolute left-0 right-0 opacity-[0.06] w-full" style={{ top: '40%' }} viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
          <path d="M0 30 Q180 5 360 30 Q540 55 720 30 Q900 5 1080 30 Q1260 55 1440 30" stroke="#FF5A1F" strokeWidth="1.5" />
        </svg>
        <svg className="absolute left-0 right-0 opacity-[0.05] w-full" style={{ top: '70%' }} viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
          <path d="M0 30 Q180 55 360 30 Q540 5 720 30 Q900 55 1080 30 Q1260 5 1440 30" stroke="#5E189A" strokeWidth="1" />
        </svg>
        {/* Corner ring accents */}
        <svg className="absolute right-0 top-0 opacity-[0.05] w-48 h-48" viewBox="0 0 200 200" fill="none">
          {[40, 80, 120].map((r) => (
            <circle key={r} cx="200" cy="0" r={r} stroke="#5E189A" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-brand-orange text-xs font-medium tracking-[0.35em] uppercase mb-5 font-mono-label"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="heading-display mb-8"
            >
              About Prime Voice Media
            </motion.h2>

            <div className="space-y-5 mb-10">
              {[
                'Prime Voice Media provides professional Voice-Over and Audio-Visual solutions designed to connect brands with their audience clearly and meaningfully, driving purposeful impact.',
                'We exist to link brand-created solutions with the real needs of their target audience, support effective learning experiences, and expand access to information – especially for the visually impaired – through purposeful voice and audio content.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-gray-500 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Mission / Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-t-2 border-brand-orange pt-5"
              >
                <h3
                  className="text-sm font-medium tracking-[0.2em] uppercase text-brand-orange mb-3"
                >
                  Mission
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To bring every brand and message into focus – seen, heard, and
                  understood so they can serve their ideal audience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-t-2 border-brand-purple pt-5"
              >
                <h3
                  className="text-sm font-medium tracking-[0.2em] uppercase text-brand-purple mb-3"
                >
                  Vision
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To link as many people to services and solutions tailored to
                  their needs, and light up the world one story at a time.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/studiooo.jpeg"
                alt="Prime Voice Media recording studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Orange accent block */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />
            </div>

            {/* Floating inset image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-8 -left-8 w-40 h-40 md:w-52 md:h-52 border-4 border-white overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/mic1.jpeg"
                alt="Studio microphone"
                fill
                className="object-cover"
                sizes="208px"
              />
            </motion.div>

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-6 -right-4 bg-brand-orange text-white px-6 py-4 shadow-xl"
            >
              <p className="text-3xl font-bold leading-none">4+</p>
              <p className="text-xs tracking-wide mt-1 text-orange-100">Years Experience</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
