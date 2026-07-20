'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { WHATSAPP_LINK, EMAIL_LINK, CONTACT_EMAIL } from '@/lib/contact-info'

// Navigation links — href values work from any page (home anchors use /#)
const PAGE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Clients', href: '/#clients' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M18.9 3H22l-7.2 8.23L23.3 21h-6.62l-5.18-6.77L5.5 21H2.4l7.7-8.8L1 3h6.78l4.68 6.2L18.9 3zm-1.16 16.17h1.83L7.34 4.75H5.38l12.36 14.42z',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-brand-dark overflow-hidden">

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-16 sm:pt-20 pb-10">

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 py-12 border-t border-white/10">

          {/* Pages */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-white text-lg mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Studio</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 text-sm font-mono-label hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            <p className="text-white text-lg mb-6" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Get in Touch</p>
            <ul className="space-y-3">
              <li>
                <span className="text-white/50 text-sm font-mono-label">Location: Nairobi, Kenya</span>
              </li>
              <li>
                <a href={EMAIL_LINK} className="text-white/50 text-sm font-mono-label hover:text-white transition-colors duration-200 break-all">
                  Email: {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm font-mono-label hover:text-white transition-colors duration-200">
                  Phone: +254 792 481 990
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>

      {/* ── Giant wordmark over photo ───────────────────────────────────── */}
      <div className="relative h-[34vw] min-h-[180px] max-h-[380px] overflow-hidden bg-brand-dark">
        <Image
          src="/images/footerimage.jpg"
          alt=""
          fill
          className="object-cover object-top"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,10,46,0.15) 0%, rgba(26,10,46,0.55) 45%, rgba(26,10,46,0.95) 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 lg:px-8 pb-2 sm:pb-4">
          <p
            className="max-w-full leading-none whitespace-nowrap overflow-hidden text-ellipsis select-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(48px, 10vw, 160px)',
              color: '#F5F4F2',
            }}
          >
            PRIME VOICE
          </p>
        </div>
      </div>

      {/* Bottom bar — after the wordmark, last thing in the footer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs font-mono-label tracking-wide">
          © {year} Prime Voice Media. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
