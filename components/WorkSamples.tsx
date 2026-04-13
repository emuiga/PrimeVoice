'use client'

// MEDIA SOURCES:
// - Set type: 'youtube' and src to your YouTube embed URL
// - Set type: 'audio' and src to a direct audio file URL (Cloudinary recommended)
// - Set type: null for no media yet

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
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
  media: Media[] // supports multiple samples per category
}

const CATEGORIES: WorkCategory[] = [
  {
    num: '01',
    title: 'Radio & TV Commercials',
    tagline: 'Voices that sell, stories that stick',
    description:
      'From 30-second radio spots to full TV commercial narrations — compelling audio that drives audience action and reinforces brand identity.',
    items: ['Radio Spots', 'TV Commercial VO', 'Jingle Narration', 'Brand Voice Identity'],
    image: '/images/tv-commercial.jpg',
    media: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0',
      },
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
    media: [
      { type: 'audio', src: '' }, // replace with Cloudinary URL
    ],
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
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0',
      },
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
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0',
      },
    ],
  },
  {
    num: '05',
    title: 'Social Media Promos',
    tagline: 'Content that stops the scroll',
    description:
      'High-energy audio and video content designed for maximum engagement — from Instagram Reels to YouTube pre-rolls.',
    items: ['Instagram Reels', 'YouTube Ads', 'TikTok Content', 'LinkedIn Video'],
    image: '/images/socialmediapromo.jpg',
    media: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0',
      },
    ],
  },
  {
    num: '06',
    title: 'Podcast Intros & Outros',
    tagline: 'First impressions that last',
    description:
      "Memorable podcast branding — opening hooks to closing sign-offs — that establishes your show's voice and keeps listeners coming back.",
    items: ['Podcast Intros', 'Episode Outros', 'Show Trailers', 'Ad Reads'],
    image: '/images/podcastintro.jpg',
    media: [
      { type: 'audio', src: '' }, // Podcast Intro 01 — replace with Cloudinary URL
      { type: 'audio', src: '' }, // Podcast Intro 02 — replace with Cloudinary URL
    ],
  },
  {
    num: '07',
    title: 'Audio-Visual Production',
    tagline: 'Where sound meets vision',
    description:
      'Full-spectrum production integrating compelling visuals with professional voice and sound design for maximum impact.',
    items: ['Explainer Videos', 'Brand Films', 'Product Demos', 'Event Coverage'],
    image: '/images/audio-visual.jpg',
    media: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/6HBVh_hloAc?si=4Ic7NFBhAgTArdAc&controls=0',
      },
      { type: 'audio', src: '' }, // Audio-Visual 01 — replace with Cloudinary URL
    ],
  },
]

const N = CATEGORIES.length

// ── Shared media renderer ────────────────────────────────────────────────────
function MediaItem({ item, title, compact = false }: { item: Media; title: string; compact?: boolean }) {
  if (!item) return null
  if (item.type === 'youtube') {
    return (
      <div className="rounded overflow-hidden border border-gray-100 shadow-sm">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={item.src}
            title={`${title} — video sample`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        {!compact && (
          <div className="bg-gray-50 px-3 py-1.5 flex items-center gap-2 border-t border-gray-100">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span className="text-gray-400 text-xs tracking-wide">Video Sample</span>
          </div>
        )}
      </div>
    )
  }
  if (item.type === 'audio') {
    return (
      <div className="rounded border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
        <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
          <div className="flex items-end gap-0.5 h-4">
            {[3, 5, 8, 5, 9, 4, 7].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-brand-orange/50 rounded-full"
                style={{ height: `${h * 2}px` }}
                animate={{ height: [`${h * 2}px`, `${(h + 3) * 2}px`, `${h * 2}px`] }}
                transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs tracking-wide">Audio Sample</span>
        </div>
        <div className="p-3">
          {item.src ? (
            <audio controls src={item.src} className="w-full" aria-label={`${title} audio`} />
          ) : (
            <p className="text-gray-400 text-xs italic">Audio sample coming soon</p>
          )}
        </div>
      </div>
    )
  }
  return null
}

// ── Decorative shapes ────────────────────────────────────────────────────────
function DecorativeShapes({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-gray-100/80" />
      <div className="absolute -top-8 -right-8 w-52 h-52 rounded-full border border-gray-100/60" />
      <motion.div
        key={index}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full border border-brand-orange/12"
      />
      <svg className="absolute bottom-16 right-6 opacity-20" width="70" height="70" viewBox="0 0 70 70">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <circle key={`${row}-${col}`} cx={col * 13 + 6} cy={row * 13 + 6} r="1.8" fill="#FF5A1F" />
          ))
        )}
      </svg>
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gray-200/50 to-transparent" />
      <div className="absolute top-1/3 left-0 w-2/3 h-px bg-gradient-to-r from-gray-100 to-transparent" />
      <motion.div
        key={`sq-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="absolute top-10 right-10 w-4 h-4 bg-brand-orange/15 rotate-45"
      />
      <div className="absolute top-16 right-16 w-2.5 h-2.5 bg-brand-orange/30 rotate-45" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 12%, rgba(255,90,31,0.05) 0%, transparent 50%), radial-gradient(ellipse at 8% 88%, rgba(94,24,154,0.04) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

export default function WorkSamples() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.min(Math.floor(latest * N), N - 1)
    if (newIndex !== prevIndexRef.current) {
      setDirection(newIndex > prevIndexRef.current ? 1 : -1)
      prevIndexRef.current = newIndex
      setActiveIndex(newIndex)
    }
  })

  const cat = CATEGORIES[activeIndex]

  return (
    <section id="samples" ref={containerRef} style={{ height: `${(N + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ═══════════════════════════════════════════════════
            MOBILE LAYOUT  (< md)
            Full image as background, white text panel at
            the bottom — image stays visible on top.
        ════════════════════════════════════════════════════ */}
        <div className="md:hidden absolute inset-0">
          {/* Full-screen image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-img-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Top counter */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-white text-[10px] tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
          </div>

          {/* White text panel — bottom portion only, image visible above */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            {/* Frosted gradient bridge between image and panel */}
            <div
              className="h-12 w-full pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))',
              }}
            />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 30 : -30 }),
                  center: { opacity: 1, y: 0 },
                  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/97 px-5 pt-4 pb-14"
              >
                <p className="text-brand-orange text-[10px] font-medium tracking-[0.3em] uppercase mb-1">
                  {cat.num} · {cat.tagline}
                </p>
                <h2 className="heading-display mb-3 text-[clamp(26px,7vw,36px)] leading-tight">
                  {cat.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{cat.description}</p>
                <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Media players */}
                {cat.media.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {cat.media.map((m, mi) => (
                      <MediaItem key={mi} item={m} title={cat.title} compact />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile progress bar */}
          <div className="absolute bottom-6 left-5 right-5 z-30 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/30">
              <motion.div
                className="h-full bg-brand-orange"
                animate={{ width: `${((activeIndex + 1) / N) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <div className="flex gap-1.5">
              {CATEGORIES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === activeIndex ? 16 : 4, backgroundColor: i === activeIndex ? '#FF5A1F' : 'rgba(255,255,255,0.4)' }}
                  transition={{ duration: 0.3 }}
                  className="h-1 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            DESKTOP LAYOUT  (md+)
            Left text panel + right image
        ════════════════════════════════════════════════════ */}
        <div className="hidden md:flex h-full">

          {/* LEFT: Content */}
          <div className="relative w-1/2 flex flex-col justify-center px-10 lg:px-16 pt-16 pb-16 overflow-hidden bg-white">
            <DecorativeShapes index={activeIndex} />

            {/* Top counter */}
            <div className="absolute top-5 right-8 text-[10px] tracking-[0.3em] text-gray-400">
              <motion.span key={activeIndex} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="inline-block">
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
              <span className="text-gray-200"> / {String(N).padStart(2, '0')}</span>
            </div>
            <span className="absolute top-5 left-10 text-[10px] tracking-[0.35em] uppercase text-gray-400">Work Samples</span>

            <div className="relative z-10 w-full max-w-lg">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
                    center: { opacity: 1, y: 0 },
                    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block text-6xl lg:text-7xl font-light text-gray-100 leading-none select-none -mb-2" aria-hidden="true">
                    {cat.num}
                  </span>
                  <h2 className="heading-display mb-2">{cat.title}</h2>
                  <p className="text-brand-orange text-sm font-medium tracking-wide mb-4">{cat.tagline}</p>
                  <p className="text-gray-500 leading-relaxed text-sm mb-5">{cat.description}</p>

                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-5">
                    {cat.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.05 }}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" aria-hidden="true" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Media players */}
                  {cat.media.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      className="space-y-3"
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

          {/* RIGHT: Image */}
          <div className="w-1/2 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    clipPath: dir > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
                  }),
                  center: { opacity: 1, clipPath: 'inset(0% 0 0% 0)' },
                  exit: (dir: number) => ({
                    opacity: 0,
                    clipPath: dir > 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={activeIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-10 left-8">
                  <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded">
                    <span className="text-brand-orange text-xs tracking-[0.2em] uppercase">{cat.title}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop progress bar — only visible on md+ */}
        <div className="hidden md:flex absolute bottom-5 left-0 right-0 px-10 items-center gap-4">
          <div className="flex-1 h-px bg-gray-100 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-brand-orange"
              animate={{ width: `${((activeIndex + 1) / N) * 100}%` }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            {CATEGORIES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === activeIndex ? 20 : 5, backgroundColor: i === activeIndex ? '#FF5A1F' : '#E5E7EB' }}
                transition={{ duration: 0.35 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.25em] text-gray-300 uppercase hidden lg:block">
            {activeIndex < N - 1 ? 'Scroll to explore' : 'Continue scrolling'}
          </span>
        </div>

      </div>
    </section>
  )
}
