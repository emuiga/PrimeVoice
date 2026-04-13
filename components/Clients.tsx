'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  {
    name: 'Kenya Broadcasting Corporation',
    image: '/images/KBC_Kenya.PNG',
    initials: null,
  },
  {
    name: 'Lightower Electricals',
    image: '/images/Lightower.webp',
    initials: null,
  },
  {
    name: 'Bethany Delights',
    image: null,
    initials: 'BD',
  },
  {
    name: 'Kisii Family Medical Centre',
    image: '/images/kisiifamilymedicalcentre-300x300.jpg',
    initials: null,
  },
]

// Triple-duplicate for perfectly seamless infinite scroll
const track = [...clients, ...clients, ...clients]

export default function Clients() {
  return (
    <section id="clients" className="py-10 sm:py-14 overflow-hidden bg-[#1A0A2E]">

      {/* Centered header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10 px-6"
      >
        <h2 className="heading-display-white">Trusted By</h2>
      </motion.div>

      {/* Carousel — continuous, never pauses */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #1A0A2E, transparent)' }}
          aria-hidden="true"
        />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #1A0A2E, transparent)' }}
          aria-hidden="true"
        />

        <div className="animate-marquee flex items-center" style={{ width: 'max-content' }}>
          {track.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="shrink-0 flex flex-col items-center gap-3 px-10 border-r border-white/5"
            >
              {/* Logo circle — matches original style */}
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-brand-purple/25 border border-white/10">
                {client.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain p-2.5"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <span className="text-white font-bold text-sm text-center leading-tight px-2">
                    {client.initials}
                  </span>
                )}
              </div>
              <p className="text-white/50 text-xs text-center max-w-[120px] leading-snug">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
