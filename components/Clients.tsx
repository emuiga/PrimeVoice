'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  {
    name: 'Kenya Broadcasting Corporation',
    shortName: 'KBC',
    image: '/images/KBC_Kenya.PNG',
  },
  {
    name: 'Lightower Electricals',
    shortName: 'Lightower',
    image: '/images/Lightower.webp',
  },
  {
    name: 'Bethany Delights',
    shortName: 'Bethany Delights',
    image: null,
  },
  {
    name: 'Kisii Family Medical Centre',
    shortName: 'Kisii Medical',
    image: '/images/kisiifamilymedicalcentre-300x300.jpg',
  },
]

export default function Clients() {
  return (
    <section id="clients" className="bg-brand-dark py-16 sm:py-20 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="text-brand-orange text-[10px] tracking-[0.4em] uppercase font-medium mb-3">
          Our Clients
        </p>
        <h2 className="heading-display-white">Trusted By</h2>
      </motion.div>

      {/* Logo grid */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white flex flex-col items-center justify-center gap-3 py-8 px-6"
            >
              {client.image ? (
                <div className="relative w-full h-14 sm:h-16">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ) : (
                /* Styled wordmark for clients without a logo file */
                <p
                  className="text-brand-dark text-lg sm:text-xl font-semibold tracking-tight text-center leading-tight"
                  style={{ fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif" }}
                >
                  {client.shortName}
                </p>
              )}
              <span className="text-gray-600 text-[10px] tracking-[0.18em] uppercase text-center leading-snug">
                {client.shortName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-5xl mx-auto px-8 mt-0">
        <div className="h-px bg-white/5" />
      </div>

    </section>
  )
}
