'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  SERVICES,
  BULLET_ICONS,
  FILTER_ORANGE,
  type MediaEntry,
  type Service,
} from '@/lib/services-data'

// ── Bullet icon ────────────────────────────────────────────────────────────
function BulletIcon({ index }: { index: number }) {
  return (
    <span className="shrink-0 w-4 h-4 relative inline-flex items-center justify-center">
      <Image
        src={BULLET_ICONS[index % 3]}
        alt=""
        width={14}
        height={14}
        className="object-contain"
        style={{ filter: FILTER_ORANGE }}
        aria-hidden="true"
      />
    </span>
  )
}

// ── Full-screen video overlay ──────────────────────────────────────────────
import { useEffect } from 'react'

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
      {/* Header bar — always visible, works on mobile & desktop */}
      <div
        className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-brand-orange text-[10px] tracking-[0.3em] uppercase font-medium">{label}</p>
        <button
          onClick={onClose}
          aria-label="Close video"
          className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
        >
          <span className="hidden sm:inline">Close</span>
          <span className="text-2xl leading-none">×</span>
        </button>
      </div>

      {/* Video — fills every remaining pixel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 min-h-0 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full border-0 block"
          src={`https://drive.google.com/file/d/${fileId}/preview`}
          title={label}
          allow="autoplay"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  )
}

// ── Video thumbnail card ───────────────────────────────────────────────────
function DriveVideoCard({ fileId, label, fallbackImage, onPlay }: {
  fileId: string; label: string; fallbackImage: string; onPlay: () => void
}) {
  return (
    <button
      onClick={onPlay}
      className="relative w-full aspect-video group block text-left overflow-hidden bg-gray-900"
      aria-label={`Play ${label}`}
    >
      <Image src={fallbackImage} alt={label} fill className="object-contain p-8 opacity-60 group-hover:opacity-80 transition-opacity duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
          <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#FF5A1F" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-medium bg-black/60 backdrop-blur-sm px-3 py-1">{label}</span>
        <span className="text-white/60 text-[10px] tracking-widest uppercase bg-black/40 px-2 py-1">Click to play</span>
      </div>
    </button>
  )
}

// ── Audio card — click-to-load so Drive iframe is never pre-mounted ────────
function DriveAudioCard({ fileId, label }: { fileId: string; label: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
          <Image src="/images/wave-sound.png" alt="" width={20} height={20} className="object-contain" style={{ filter: FILTER_ORANGE }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{label}</p>
          <p className="text-xs text-gray-500">Audio Sample</p>
        </div>
        <div className="flex items-end gap-0.5 h-5 shrink-0">
          {[4, 7, 5, 9, 6, 8, 4, 7, 5].map((h, i) => (
            <motion.div key={i} className="w-0.5 bg-brand-orange/60 rounded-full" style={{ height: `${h * 2}px` }}
              animate={{ height: [`${h * 2}px`, `${(h + 3) * 2}px`, `${h * 2}px`] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>
      <div className="p-1">
        {loaded ? (
          <iframe src={`https://drive.google.com/file/d/${fileId}/preview`} width="100%" height="80" allow="autoplay" title={label} className="border-0 w-full block" />
        ) : (
          <button onClick={() => setLoaded(true)} className="w-full flex items-center justify-center gap-2 py-4 text-sm text-gray-500 hover:text-brand-orange transition-colors group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-wide">Load audio sample</span>
          </button>
        )}
      </div>
    </div>
  )
}

// ── Media dispatcher ───────────────────────────────────────────────────────
function MediaBlock({ entry, fallbackImage, onPlayVideo }: {
  entry: MediaEntry; fallbackImage: string; onPlayVideo: (fileId: string, label: string) => void
}) {
  if (entry.type === 'driveVideo')
    return <DriveVideoCard fileId={entry.fileId} label={entry.label} fallbackImage={fallbackImage} onPlay={() => onPlayVideo(entry.fileId, entry.label)} />
  if (entry.type === 'driveAudio')
    return <DriveAudioCard fileId={entry.fileId} label={entry.label} />
  return null
}

// ── Service banner ─────────────────────────────────────────────────────────
function ServiceBanner({ service }: { service: Service }) {
  return (
    <div className={`relative w-full overflow-hidden mb-7 bg-gradient-to-br ${service.accentColor}`} style={{ aspectRatio: '21/8', minHeight: '160px' }}>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-6">
        <div className="relative h-full w-full max-h-48">
          <Image src={service.image} alt={service.title} fill className="object-contain object-right drop-shadow-2xl" style={{ filter: service.iconFilter }} sizes="25vw" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative h-full flex flex-col justify-end">
        <div className="px-7 pb-7 pt-4 backdrop-blur-[2px]" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
          <p className="text-brand-orange text-[11px] tracking-[0.3em] uppercase font-medium mb-1.5">
            {service.num} · {service.tagline}
          </p>
          <p className="text-white text-2xl lg:text-3xl font-medium leading-tight" style={{ fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif" }}>
            {service.title}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ServicesAndSamples() {
  const [active, setActive] = useState(0)
  const [overlayVideo, setOverlayVideo] = useState<{ fileId: string; label: string } | null>(null)

  const service = SERVICES[active]
  const videos = service.media.filter((m) => m.type === 'driveVideo')
  const audios  = service.media.filter((m) => m.type === 'driveAudio')

  return (
    <>
      <AnimatePresence>
        {overlayVideo && (
          <VideoOverlay fileId={overlayVideo.fileId} label={overlayVideo.label} onClose={() => setOverlayVideo(null)} />
        )}
      </AnimatePresence>

      <section id="services" className="relative bg-brand-surface">
        <span id="samples" className="absolute" style={{ top: -80 }} />

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="heading-display">
              Our Services
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="text-gray-500 max-w-xs text-sm leading-relaxed">
              Seven specialist disciplines across voice-over and audio-visual production, with real work samples for each.
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">

          {/* MOBILE tabs */}
          <div className="md:hidden mb-6 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
              {SERVICES.map((s, i) => (
                <button key={s.num} onClick={() => setActive(i)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${active === i ? 'bg-brand-orange text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-orange/40'}`}>
                  <span className="relative w-5 h-5 shrink-0">
                    <Image src={s.image} alt={s.title} fill className="object-contain" style={{ filter: s.iconFilter }} sizes="20px" />
                  </span>
                  <span className="text-[9px] opacity-60 mr-0.5">{s.num}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* MOBILE content */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <ServiceBanner service={service} />
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="grid grid-cols-2 gap-y-2.5 gap-x-3 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700 text-xs">
                      <BulletIcon index={idx} />{item}
                    </li>
                  ))}
                </ul>
                {videos.length > 0 && (
                  <div className="grid gap-3 mb-4">
                    {(videos as Extract<MediaEntry, { type: 'driveVideo' }>[]).map((m, mi) => (
                      <MediaBlock key={mi} entry={m} fallbackImage={service.image} onPlayVideo={(id, lbl) => setOverlayVideo({ fileId: id, label: lbl })} />
                    ))}
                  </div>
                )}
                {audios.length > 0 && (
                  <div className="space-y-3">
                    {(audios as Extract<MediaEntry, { type: 'driveAudio' }>[]).map((m, mi) => (
                      <MediaBlock key={mi} entry={m} fallbackImage={service.image} onPlayVideo={() => {}} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DESKTOP sidebar + content */}
          <div className="hidden md:grid md:grid-cols-[260px_1fr] lg:grid-cols-[290px_1fr] gap-8 items-start">

            <nav className="sticky top-24" aria-label="Service categories">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium mb-3 pl-1">Service Categories</p>
              <div className="space-y-0.5">
                {SERVICES.map((s, i) => (
                  <button key={s.num} onClick={() => setActive(i)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-3 transition-all duration-200 group ${active === i ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
                    <span className="relative w-8 h-8 shrink-0">
                      <Image src={s.image} alt={s.title} fill className={`object-contain transition-opacity duration-200 ${active === i ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`} style={{ filter: s.iconFilter }} sizes="32px" />
                    </span>
                    <span className={`text-xs font-medium transition-colors duration-200 leading-tight flex-1 ${active === i ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      <span className={`text-[9px] block mb-0.5 ${active === i ? 'text-brand-orange' : 'text-gray-300 group-hover:text-gray-400'}`}>{s.num}</span>
                      {s.title}
                    </span>
                    {active === i && (
                      <motion.div layoutId="sidebar-dot" className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                    )}
                  </button>
                ))}
              </div>
            </nav>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <ServiceBanner service={service} />
                  <div className={`grid gap-8 mb-8 ${service.media.length > 0 ? 'lg:grid-cols-[1fr_1fr]' : 'grid-cols-1'}`}>
                    <div>
                      <p className={`text-gray-600 leading-relaxed mb-5 ${service.media.length === 0 ? 'text-lg max-w-2xl' : 'text-base'}`}>{service.description}</p>
                      <ul className={service.media.length === 0 ? 'grid sm:grid-cols-2 gap-x-12 gap-y-3' : 'space-y-2.5'}>
                        {service.items.map((item, idx) => (
                          <motion.li key={item} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + idx * 0.05 }} className="flex items-center gap-2.5 text-gray-700 text-sm">
                            <BulletIcon index={idx} />{item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    {service.media.length > 0 && (
                    <div className="space-y-4">
                      {videos.length > 0 && (
                        <div className="space-y-3">
                          {(videos as Extract<MediaEntry, { type: 'driveVideo' }>[]).map((m, mi) => (
                            <MediaBlock key={mi} entry={m} fallbackImage={service.image} onPlayVideo={(id, lbl) => setOverlayVideo({ fileId: id, label: lbl })} />
                          ))}
                        </div>
                      )}
                      {audios.length > 0 && (
                        <div className="space-y-3">
                          {(audios as Extract<MediaEntry, { type: 'driveAudio' }>[]).map((m, mi) => (
                            <MediaBlock key={mi} entry={m} fallbackImage={service.image} onPlayVideo={() => {}} />
                          ))}
                        </div>
                      )}
                    </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
