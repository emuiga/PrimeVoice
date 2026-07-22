'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ClientLogo } from '@/lib/sanity/queries'

function Badge({ client }: { client: ClientLogo }) {
  return (
    <div className="group flex items-center gap-4 pr-16 shrink-0">
      <span className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-white">
        <Image
          src={client.logoUrl}
          alt=""
          fill
          className="object-contain p-2.5"
          sizes="80px"
          aria-hidden="true"
        />
      </span>
      <span className="text-white/60 group-hover:text-white text-lg font-medium whitespace-nowrap transition-colors duration-300">
        {client.shortName}
      </span>
    </div>
  )
}

export default function Clients({ clients }: { clients: ClientLogo[] }) {
  if (clients.length === 0) return null

  // Duplicated so the track can loop from -50% back to 0% seamlessly —
  // the last badge of the first set sits right before the first badge repeats.
  const track = [...clients, ...clients]

  return (
    <section id="clients" className="relative bg-brand-dark py-16 sm:py-20 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="text-brand-orange text-xs tracking-[0.4em] uppercase font-medium">
          Our Clients
        </p>
      </motion.div>

      {/* Logo carousel — infinite, one row, first badge follows the last seamlessly */}
      <div className="relative">
        <div className="flex w-max animate-marquee">
          {track.map((client, i) => (
            <Badge key={`${client.id}-${i}`} client={client} />
          ))}
        </div>

        {/* Edge fades so badges don't hard-cut at the viewport edge */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" aria-hidden="true" />
      </div>

    </section>
  )
}
