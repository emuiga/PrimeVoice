'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  SERVICES,
  type MediaEntry,
  type Service,
} from '@/lib/services-data'

// ── Full-screen video overlay ──────────────────────────────────────────────
function VideoOverlay({ fileId, label, onClose }: { fileId: string; label: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <p className="text-brand-orange text-[10px] tracking-[0.3em] uppercase font-medium font-mono-label">{label}</p>
        <button onClick={onClose} aria-label="Close video" className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
          <span className="hidden sm:inline">Close</span>
          <span className="text-2xl leading-none">×</span>
        </button>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex-1 min-h-0 w-full" onClick={(e) => e.stopPropagation()}>
        <iframe className="w-full h-full border-0 block" src={`https://drive.google.com/file/d/${fileId}/preview`} title={label} allow="autoplay" allowFullScreen />
      </motion.div>
    </motion.div>
  )
}

// ── Video thumbnail card ───────────────────────────────────────────────────
function DriveVideoCard({ fileId, label, fallbackImage, onPlay }: {
  fileId: string; label: string; fallbackImage: string; onPlay: () => void
}) {
  return (
    <button onClick={onPlay} className="relative w-full aspect-video group block text-left overflow-hidden bg-gray-900" aria-label={`Play ${label}`}>
      <Image src={fallbackImage} alt={label} fill className="object-contain p-8 opacity-60 group-hover:opacity-80 transition-opacity duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
          <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#FF5A1F" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-medium bg-black/60 backdrop-blur-sm px-3 py-1">{label}</span>
      </div>
    </button>
  )
}

// ── Audio card — click-to-load so Drive iframe is never pre-mounted ────────
function DriveAudioCard({ fileId, label, accentColor }: { fileId: string; label: string; accentColor: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* Accent header — icon, waveform, title */}
      <div className={`relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r ${accentColor}`}>
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" />
            <path d="M19 11a1 1 0 00-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7 7 0 006 6.92V20H9a1 1 0 100 2h6a1 1 0 100-2h-2v-2.08A7 7 0 0019 11z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-white truncate flex-1 min-w-0">{label}</p>
        <div className="flex items-end gap-0.5 h-4 shrink-0" aria-hidden="true">
          {[4, 7, 5, 9, 6, 8].map((h, i) => (
            <motion.div key={i} className="w-0.5 bg-white/70 rounded-full" style={{ height: `${h * 1.6}px` }}
              animate={{ height: [`${h * 1.6}px`, `${(h + 3) * 1.6}px`, `${h * 1.6}px`] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>

      <div className="p-1">
        {loaded ? (
          <iframe src={`https://drive.google.com/file/d/${fileId}/preview`} width="100%" height="170" allow="autoplay" title={label} className="border-0 w-full block" />
        ) : (
          <button onClick={() => setLoaded(true)} className="w-full flex items-center justify-center gap-2.5 py-4 text-gray-700 hover:text-brand-orange transition-colors group">
            <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-medium tracking-wide">Play sample</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ── Media dispatcher ───────────────────────────────────────────────────────
function MediaBlock({ entry, fallbackImage, accentColor, onPlayVideo }: {
  entry: MediaEntry; fallbackImage: string; accentColor: string; onPlayVideo: (fileId: string, label: string) => void
}) {
  if (entry.type === 'driveVideo')
    return <DriveVideoCard fileId={entry.fileId} label={entry.label} fallbackImage={fallbackImage} onPlay={() => onPlayVideo(entry.fileId, entry.label)} />
  if (entry.type === 'driveAudio')
    return <DriveAudioCard fileId={entry.fileId} label={entry.label} accentColor={accentColor} />
  return null
}

// ── Service spread — editorial alternating layout ──────────────────────────
function ServiceSpread({ service, reverse, isOpen, onToggle, onPlayVideo }: {
  service: Service
  reverse: boolean
  isOpen: boolean
  onToggle: () => void
  onPlayVideo: (fileId: string, label: string) => void
}) {
  const videos = service.media.filter((m) => m.type === 'driveVideo')
  const audios = service.media.filter((m) => m.type === 'driveAudio')

  const hasPhoto = Boolean(service.photo)

  return (
    <div id={service.slug} className={`relative py-14 sm:py-16 overflow-hidden border-b border-gray-200 last:border-b-0 scroll-mt-28 ${hasPhoto ? '-mx-6 lg:-mx-8 px-6 lg:px-8 bg-brand-dark' : ''}`}>
      {hasPhoto && (
        <>
          <Image
            src={service.photo!}
            alt=""
            fill
            className="object-cover scale-110 blur-md"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>

        {/* Text column */}
        <div>
          <p className={`italic text-base mb-3 ${hasPhoto ? 'text-white/60' : 'text-gray-400'}`}>{service.tagline}</p>
          <h3
            className="mb-5"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: 'clamp(30px, 3.6vw, 44px)',
              lineHeight: 1.1,
              color: hasPhoto ? '#ffffff' : 'rgb(26,26,26)',
            }}
          >
            {service.title}
          </h3>
          <p className={`leading-relaxed max-w-md ${hasPhoto ? 'text-white/70' : 'text-gray-500'}`}>{service.description}</p>
        </div>

        {/* Image column — the real, crisp service photo with a small icon badge */}
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark">
          <Image src={service.photo ?? service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className={`absolute inset-0 bg-gradient-to-t ${service.accentColor} opacity-30`} aria-hidden="true" />
          <div className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <div className="relative w-6 h-6">
              <Image src={service.image} alt="" fill className="object-contain" style={{ filter: service.iconFilter }} sizes="24px" aria-hidden="true" />
            </div>
          </div>
        </div>

      </div>

      {/* Centered CTA */}
      <div className="relative flex justify-center mt-8">
        <div
          className={`relative inline-flex rounded-full p-[1.5px] overflow-hidden ${isOpen ? 'border' : ''} ${
            isOpen ? (hasPhoto ? 'border-white/30' : 'border-gray-300') : ''
          }`}
        >
          {/* Animated light chasing the pill's border — draws the eye while collapsed */}
          {!isOpen && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-[-100%]"
              style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 82%, #FF5A1F 92%, #FFA366 96%, #FF5A1F 100%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
            />
          )}
          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className={`relative z-10 inline-flex items-center gap-2 text-sm font-medium rounded-full px-6 py-2.5 transition-all duration-200 ${
              hasPhoto
                ? 'bg-brand-dark text-white hover:text-brand-orange'
                : 'bg-brand-surface text-gray-700 hover:text-brand-orange'
            }`}
          >
            {isOpen ? 'Hide details' : 'View details & samples'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`relative pt-8 mt-8 border-t max-w-2xl mx-auto text-center ${hasPhoto ? 'border-white/15' : 'border-gray-100'}`}>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className={`text-xs rounded-full px-3.5 py-1.5 border font-mono-label ${
                      hasPhoto ? 'text-white/80 border-white/25' : 'text-gray-600 border-gray-200'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {service.media.length > 0 && (
                <div className="space-y-3 text-left">
                  {videos.map((m, mi) => (
                    <MediaBlock key={`v${mi}`} entry={m} fallbackImage={service.image} accentColor={service.accentColor} onPlayVideo={onPlayVideo} />
                  ))}
                  {audios.map((m, mi) => (
                    <MediaBlock key={`a${mi}`} entry={m} fallbackImage={service.image} accentColor={service.accentColor} onPlayVideo={() => {}} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ServicesAndSamples() {
  const [active, setActive] = useState<number | null>(null)
  const [overlayVideo, setOverlayVideo] = useState<{ fileId: string; label: string } | null>(null)

  return (
    <>
      <AnimatePresence>
        {overlayVideo && (
          <VideoOverlay fileId={overlayVideo.fileId} label={overlayVideo.label} onClose={() => setOverlayVideo(null)} />
        )}
      </AnimatePresence>

      <section id="services" className="relative bg-brand-surface overflow-hidden">
        <span id="samples" className="absolute" style={{ top: -80 }} />

        {/* Subtle texture — keeps the light section from reading flat/empty */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
            <defs>
              <pattern id="services-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#1A0A2E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-dots)" />
          </svg>
          <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-brand-orange/6 blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-brand-purple/6 blur-3xl" />
        </div>

        {/* Masthead — asymmetric editorial header */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="max-w-xl"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: 'clamp(38px, 5.5vw, 64px)',
                lineHeight: 1.05,
                color: 'rgb(26,26,26)',
              }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-500 text-base leading-relaxed max-w-xs md:text-right"
            >
              Eight expert services, each designed to amplify your message through voice &amp; visuals.
            </motion.p>
          </div>
        </div>

        {/* Quick-jump nav — lets visitors skip straight to the service they want */}
        <div className="sticky top-[64px] sm:top-[72px] z-20 bg-brand-surface/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max py-3">
              {SERVICES.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="shrink-0 rounded-full px-4 py-1.5 text-xs font-mono-label border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors duration-200"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
          {SERVICES.map((s, i) => (
            <ServiceSpread
              key={s.slug}
              service={s}
              reverse={i % 2 === 1}
              isOpen={active === i}
              onToggle={() => setActive(active === i ? null : i)}
              onPlayVideo={(fileId, label) => setOverlayVideo({ fileId, label })}
            />
          ))}
        </div>
      </section>
    </>
  )
}
