'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'

// Navigation links — href values work from any page (home anchors use /#)
const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Contact', href: '/#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">

      {/* Video as absolute background — content drives the height */}
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/videos/footerdesign.mp4"
        aria-hidden="true" preload="none" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#1A0A2E]/93" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-orange/40" aria-hidden="true" />

      {/* Content — determines footer height */}
      <div className="relative z-10 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pt-14 sm:pt-20 pb-6 flex flex-col gap-10">

          {/* Grid: Brand | Nav | Services | Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 pb-12 border-b border-white/10">

            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="Prime Voice Media">
                <Image src="/images/PVMlogo.png" alt="Prime Voice Media" width={240} height={68} className="h-20 sm:h-24 w-auto object-contain" unoptimized />
              </Link>
              <p className="text-white text-xl font-semibold tracking-wide mb-3" style={{ fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif" }}>
                Prime Voice Media
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Professional Voice-Over and audio visual communication, connecting brands with the audiences they were made to serve.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
              <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase mb-5">Navigation</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}>
              <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase mb-5">Services</p>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/#services`}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-200 flex items-start gap-2"
                    >
                      <span className="text-brand-orange/60 text-[10px] mt-0.5 shrink-0">{s.num}</span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase mb-5">Contact</p>
              <div className="space-y-3 mb-8">
                <a href="https://wa.me/254792481990?text=Hi%20Prime%20Voice%20Media%2C%20I%20came%20across%20your%20work%20and%20I%27m%20interested%20in%20discussing%20a%20project." target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/50 text-sm hover:text-[#25D366] transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  +254 792 481 990
                </a>
                <a href="mailto:enyaboke130@gmail.com" className="flex items-center gap-2.5 text-white/50 text-sm hover:text-white transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="break-all">enyaboke130@gmail.com</span>
                </a>
              </div>
              <a
                href="https://wa.me/254792481990?text=Hi%20Prime%20Voice%20Media%2C%20I%20came%20across%20your%20work%20and%20I%27m%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300"
              >
                Start a Project
              </a>
            </motion.div>

          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs tracking-wide">
              © {year} Prime Voice Media. All rights reserved.
            </p>
            <div className="w-8 h-px bg-brand-orange" aria-hidden="true" />
          </div>

        </div>
      </div>
    </footer>
  )
}
