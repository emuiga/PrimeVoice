'use client'

// MEDIA SOURCES:
// - Set type: 'youtube' and src to your YouTube embed URL
// - Set type: 'audio' and src to a direct audio file URL (Cloudinary recommended)

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Media =
  | { type: 'youtube'; src: string }
  | { type: 'audio'; src: string }
  | { type: 'video'; src: string }
  | null

type WorkCategory = {
  num: string
  title: string
  tagline: string
  description: string
  items: string[]
  image: string
  media: Media[]
}

const CATEGORIES: WorkCategory[] = [
  {
    num: '01',
    title: 'Radio & TV Commercials',
    tagline: 'Conversational, Warm, Confident.',
    description:
      'From 15-second radio spots to full TV commercial narrations — compelling audio that drives audience action and reinforces brand identity.',
    items: ['Radio Spots', 'TV Commercial VO', 'Jingle Narration'],
    image: '/images/tv-commercial.jpg',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0' },
    ],
  },
  {
    num: '02',
    title: 'Corporate Narration',
    tagline: 'Authority. Clarity. Impact.',
    description:
      'Professional narrations for presentations, annual reports, training materials, and internal communications that carry authority.',
    items: ['Corporate Presentations', 'Annual Reports', 'Training Materials', 'Internal Comms'],
    image: '/images/corporate-narration.jpg',
    media: [{ type: 'audio', src: '' }],
  },
  {
    num: '03',
    title: 'Documentaries',
    tagline: 'Stories told with depth and nuance',
    description:
      'Thoughtful documentary narrations that honor real stories and guide viewers through complex topics with clarity and emotion.',
    items: ['Feature Documentaries', 'Short Docs', 'News Features', 'Historical Narration'],
    image: '/images/documentary.jpg',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0' },
    ],
  },
  {
    num: '04',
    title: 'E-Learning',
    tagline: 'Learning that resonates',
    description:
      'Engaging narrations that improve knowledge retention and create immersive experiences for every type of learner.',
    items: ['Course Modules', 'Tutorial Narration', 'Educational Content', 'Accessibility Audio'],
    image: '/images/e-learning.jpg',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0' },
    ],
  },
  {
    num: '05',
    title: 'Social Media Promos',
    tagline: 'Content that stops the scroll',
    description:
      'High-energy audio and video content designed for maximum engagement across all platforms.',
    items: ['Instagram Reels', 'YouTube Ads', 'TikTok Content', 'LinkedIn Video'],
    image: '/images/socialmediapromo.jpg',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0' },
    ],
  },
  {
    num: '06',
    title: 'Podcast Intros & Outros',
    tagline: 'First impressions that last',
    description:
      "Memorable podcast branding, from opening hooks to closing sign-offs, that establishes your Podcast's voice and keeps listeners coming back.",
    items: ['Podcast Intros', 'Episode Outros', 'Show Trailers', 'Ad Reads'],
    image: '/images/podcastintro.jpg',
    media: [
      { type: 'audio', src: '' },
      { type: 'audio', src: '' },
    ],
  },
  {
    num: '07',
    title: 'Audio-Visual Production',
    tagline: 'Every frame, a lasting impression.',
    description:
      'Full-spectrum production integrating compelling visuals with professional voice and sound design for maximum impact.',
    items: ['Explainer Videos', 'Brand Films', 'Product Demos', 'Event Coverage'],
    image: '/images/audio-visual.jpg',
    media: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0' },
      { type: 'audio', src: '' },
    ],
  },
]

const N = CATEGORIES.length

// ── Compact YouTube player — thumbnail row + small inline player ───────────
function CompactVideo({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false)
  const videoId = src.match(/\/embed\/([^?]+)/)?.[1] ?? ''

  return (
    <div className="rounded overflow-hidden border border-gray-100 shadow-sm text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        {/* Thumbnail */}
        <div className="relative w-14 h-8 shrink-0 rounded overflow-hidden bg-gray-200">
          {videoId && (
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
              <path d={open ? 'M6 6h2v12H6zm10 0h2v12h-2z' : 'M8 5v14l11-7z'} />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-medium text-gray-700 truncate">{title}</p>
          <p className="text-[10px] text-gray-400">{open ? 'Click to hide' : 'Click to play'}</p>
        </div>
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" aria-hidden="true" />
      </button>

      {open && (
        <div className="px-3 pb-3 bg-gray-50">
          {/* Fixed compact height — same feel as audio player */}
          <div className="relative w-full" style={{ paddingTop: '56.25%', maxHeight: '140px', overflow: 'hidden' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`${src}&autoplay=1`}
              title={`${title} — video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Compact audio player ───────────────────────────────────────────────────
function CompactAudio({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
        <div className="flex items-end gap-0.5 h-3.5">
          {[3, 5, 8, 5, 9, 4, 7].map((h, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-brand-orange/50 rounded-full"
              style={{ height: `${h * 2}px` }}
              animate={{ height: [`${h * 2}px`, `${(h + 3) * 2}px`, `${h * 2}px`] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
        <span className="text-gray-400 text-[10px] tracking-wide">Audio Sample</span>
      </div>
      <div className="px-3 py-2">
        {src ? (
          <audio controls src={src} className="w-full h-7" aria-label={`${title} audio`} />
        ) : (
          <p className="text-gray-400 text-[10px] italic">Audio sample coming soon</p>
        )}
      </div>
    </div>
  )
}

// ── Media dispatcher ───────────────────────────────────────────────────────
function MediaItem({ item, title }: { item: Media; title: string }) {
  if (!item) return null
  if (item.type === 'youtube') return <CompactVideo src={item.src} title={title} />
  if (item.type === 'audio') return <CompactAudio src={item.src} title={title} />
  return null
}

// ── Main component (fully controlled — no internal state for activeIndex) ──
export default function WorkSamples({
  activeIndex,
  onIndexChange,
}: {
  activeIndex: number
  onIndexChange: (i: number) => void
}) {
  // Direction computed synchronously during render (no stale closures)
  const prevRef = useRef(activeIndex)
  const dirRef = useRef(1)
  if (activeIndex !== prevRef.current) {
    dirRef.current = activeIndex > prevRef.current ? 1 : -1
    prevRef.current = activeIndex
  }
  const direction = dirRef.current

  // Track which categories have been opened — keep iframes mounted for performance
  const [mounted, setMounted] = useState<Set<number>>(new Set([0]))
  useEffect(() => {
    setMounted((prev) => new Set([...prev, activeIndex]))
  }, [activeIndex])

  const cat = CATEGORIES[activeIndex]

  const contentVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 32 : -32 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -32 : 32 }),
  }

  const goTo = (i: number) => {
    if (i === activeIndex) return
    onIndexChange(i)
  }

  return (
    <section id="samples" className="flex flex-col bg-white" style={{ height: '100vh' }}>

      {/* ── Tab strip ─────────────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.num}
              onClick={() => goTo(i)}
              className={`relative shrink-0 px-3 sm:px-4 py-3 text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap ${
                activeIndex === i ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="hidden sm:inline">{c.title}</span>
              {activeIndex === i && (
                <motion.div
                  layoutId="ws-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE  (< md)
      ══════════════════════════════════════════════════ */}
      <div className="md:hidden flex-1 relative overflow-hidden">
        {/* All images pre-rendered */}
        {CATEGORIES.map((c, i) => (
          <div
            key={c.num}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
            aria-hidden={i !== activeIndex}
          >
            <Image src={c.image} alt={c.title} fill className="object-cover" sizes="100vw" priority={i === 0} />
          </div>
        ))}

        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.97))' }}
        />

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
                center: { opacity: 1, y: 0 },
                exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -16 : 16 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/97 px-5 pt-4 pb-6"
            >
              <p className="text-brand-orange text-[9px] font-medium tracking-[0.3em] uppercase mb-1">
                {cat.tagline}
              </p>
              <h2 className="text-2xl font-medium leading-tight mb-2" style={{ fontFamily: "'SuisseIntl', Arial, sans-serif" }}>
                {cat.title}
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{cat.description}</p>
              <ul className="grid grid-cols-2 gap-y-1 gap-x-3 mb-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-gray-600 text-xs">
                    <span className="w-1 h-1 bg-brand-orange rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {mounted.has(activeIndex) && cat.media.length > 0 && (
                <div className="space-y-2">
                  {cat.media.map((m, mi) => <MediaItem key={mi} item={m} title={cat.title} />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-3 right-3 z-30 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-white text-[9px] tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (md+) — left panel + right image
      ══════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* LEFT: compact content — must fit without scrolling */}
        <div className="relative w-1/2 flex flex-col justify-center px-10 lg:px-14 overflow-hidden bg-white">

          {/* Tiny top bar */}
          <div className="absolute top-3 left-10 right-10 flex items-center justify-between pointer-events-none">
            <span className="text-[8px] tracking-[0.35em] uppercase text-gray-200 select-none">Work Samples</span>
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[8px] tracking-[0.3em] text-gray-200 select-none"
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </motion.span>
          </div>

          {/* Animated content block */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Heading — compact size so long titles don't wrap badly */}
                <h2
                  className="text-2xl lg:text-3xl font-medium leading-tight mb-1.5"
                  style={{ fontFamily: "'SuisseIntl', Arial, sans-serif" }}
                >
                  {cat.title}
                </h2>

                {/* Tagline */}
                <p className="text-brand-orange text-[11px] font-medium tracking-wide mb-3">
                  {cat.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-sm">
                  {cat.description}
                </p>

                {/* Bullet points */}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                  {cat.items.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.04 }}
                      className="flex items-center gap-1.5 text-gray-600 text-xs"
                    >
                      <span className="w-1 h-1 bg-brand-orange rounded-full shrink-0" aria-hidden="true" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Media — lazy mount, stays mounted once opened */}
                {mounted.has(activeIndex) && cat.media.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    {cat.media.map((m, mi) => (
                      <MediaItem key={mi} item={m} title={cat.title} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: images — all pre-rendered, CSS opacity toggle */}
        <div className="w-1/2 relative overflow-hidden">
          {CATEGORIES.map((c, i) => (
            <div
              key={c.num}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
              aria-hidden={i !== activeIndex}
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
                sizes="50vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="inline-flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-brand-orange text-[10px] tracking-[0.2em] uppercase">
                  {c.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop progress bar ─────────────────────────────────────── */}
      <div className="hidden md:flex shrink-0 px-10 py-3 items-center gap-4 border-t border-gray-50">
        <div className="flex-1 h-px bg-gray-100 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-brand-orange"
            animate={{ width: `${((activeIndex + 1) / N) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {CATEGORIES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{
                width: i === activeIndex ? 18 : 5,
                backgroundColor: i === activeIndex ? '#FF5A1F' : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
              aria-label={`Go to ${CATEGORIES[i].title}`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
