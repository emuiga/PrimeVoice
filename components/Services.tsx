'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    title: 'Radio & TV Commercials',
    description:
      'From 30-second radio spots to full TV commercial narrations — compelling audio that drives action and reinforces brand identity.',
    image: '/images/tv-commercial.jpg',
  },
  {
    title: 'Corporate Narration',
    description:
      'Professional narrations for presentations, annual reports, training materials, and internal communications that carry authority and clarity.',
    image: '/images/corporate-narration.jpg',
  },
  {
    title: 'Documentaries',
    description:
      'Thoughtful documentary narrations that honor real stories and guide viewers through complex topics with depth and nuance.',
    image: '/images/documentary.jpg',
  },
  {
    title: 'E-Learning',
    description:
      'Engaging narrations that improve knowledge retention and create immersive learning experiences for every type of learner.',
    image: '/images/e-learning.jpg',
  },
  {
    title: 'Social Media Promos',
    description:
      'High-energy audio and video content designed for maximum engagement across all platforms — from Instagram Reels to YouTube ads.',
    image: '/images/socialmediapromo.jpg',
  },
  {
    title: 'Podcast Intros & Outros',
    description:
      'Memorable podcast branding — from opening hooks to closing sign-offs — that establishes your show\'s voice.',
    image: '/images/podcastintro.jpg',
  },
  {
    title: 'Audio-Visual Production',
    description:
      'Full-spectrum production integrating compelling visuals with professional voice and sound design for maximum impact.',
    image: '/images/audio-visual.jpg',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 bg-brand-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-brand-orange text-xs font-medium tracking-[0.35em] uppercase mb-5"
            >
              What We Offer
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display"
            >
              Our Services
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed"
          >
            Two pillars — Voice Over Services and Audio Visual Communication —
            spanning seven specialist disciplines.
          </motion.p>
        </div>

        {/* Service list */}
        <div className="divide-y divide-gray-200">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative group py-7 flex items-center justify-between gap-8 cursor-default overflow-hidden"
            >
              {/* Background image on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 -z-10"
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover opacity-10"
                      sizes="100vw"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-6 flex-1">
                <span className="text-xs text-gray-300 font-medium w-7 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-heading text-xl font-medium text-gray-900 group-hover:text-brand-orange transition-colors duration-300"
                    style={{ fontFamily: "'SuisseIntl', Arial, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500 text-sm leading-relaxed overflow-hidden"
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Arrow */}
              <motion.span
                animate={{ x: hovered === i ? 4 : 0, opacity: hovered === i ? 1 : 0.3 }}
                transition={{ duration: 0.2 }}
                className="text-brand-orange shrink-0"
                aria-hidden="true"
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
