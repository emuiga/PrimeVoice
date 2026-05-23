'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SERVICES, FILTER_ORANGE, type MediaEntry, type Service } from '@/lib/services-data'

// ── Derive flat project list from services ─────────────────────────────────
type Project = {
  id: string
  label: string         // project / work title  (e.g. "Echoes of Life")
  serviceTitle: string
  serviceSlug: string
  accentColor: string
  iconFilter: string
  serviceImage: string
  media: MediaEntry
}

function buildProjects(): Project[] {
  const projects: Project[] = []
  for (const s of SERVICES) {
    for (const m of s.media) {
      projects.push({
        id: `${s.slug}-${m.label}`,
        label: m.label,
        serviceTitle: s.title,
        serviceSlug: s.slug,
        accentColor: s.accentColor,
        iconFilter: s.iconFilter,
        serviceImage: s.image,
        media: m,
      })
    }
  }
  return projects
}

const ALL_PROJECTS = buildProjects()

// Unique service categories that actually have content
const FILTER_OPTIONS = [
  'All',
  ...Array.from(new Set(ALL_PROJECTS.map((p) => p.serviceTitle))),
]

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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/93 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-sm">
          Close <span className="text-xl leading-none">×</span>
        </button>
        <p className="text-brand-orange text-[10px] tracking-[0.3em] uppercase font-medium mb-3">{label}</p>
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe className="absolute inset-0 w-full h-full border-0" src={`https://drive.google.com/file/d/${fileId}/preview`} title={label} allow="autoplay" allowFullScreen />
        </div>
        <p className="mt-3 text-white/30 text-xs text-center">Press Esc or click outside to close</p>
      </motion.div>
    </motion.div>
  )
}

// ── Video thumbnail card ───────────────────────────────────────────────────
function VideoCard({ project, onPlay }: { project: Project; onPlay: () => void }) {
  const m = project.media as Extract<MediaEntry, { type: 'driveVideo' }>
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Accent strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.accentColor}`} />

      {/* Video thumbnail */}
      <button
        onClick={onPlay}
        className="relative w-full aspect-video group block overflow-hidden bg-gray-900 shrink-0"
        aria-label={`Play ${m.label}`}
      >
        <Image src={project.serviceImage} alt={project.serviceTitle} fill className="object-contain p-8 opacity-40 group-hover:opacity-60 transition-opacity duration-300" style={{ filter: project.iconFilter }} sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#FF5A1F" /></svg>
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="px-5 py-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1.5 leading-snug" style={{ fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif" }}>
            {project.label}
          </h3>
          <ServiceTag project={project} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Audio card ─────────────────────────────────────────────────────────────
function AudioCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false)
  const m = project.media as Extract<MediaEntry, { type: 'driveAudio' }>

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Accent strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.accentColor}`} />

      {/* Icon area */}
      <div className={`relative w-full bg-gradient-to-br ${project.accentColor} flex items-center justify-center`} style={{ aspectRatio: '16/7' }}>
        <div className="relative w-24 h-24 opacity-80">
          <Image src={project.serviceImage} alt={project.serviceTitle} fill className="object-contain drop-shadow-xl" style={{ filter: project.iconFilter }} sizes="96px" />
        </div>
        {/* Waveform animation overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-1">
          {[3, 6, 4, 8, 5, 9, 5, 7, 4, 6, 3].map((h, i) => (
            <motion.div key={i} className="w-1 bg-white/40 rounded-full"
              style={{ height: `${h * 3}px` }}
              animate={{ height: [`${h * 3}px`, `${(h + 3) * 3}px`, `${h * 3}px`] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>

      {/* Info + player */}
      <div className="px-5 pt-4 pb-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1.5 leading-snug" style={{ fontFamily: "'SuisseIntl', var(--font-inter-body), sans-serif" }}>
            {project.label}
          </h3>
          <ServiceTag project={project} />
        </div>

        {/* Audio player — click to load */}
        {loaded ? (
          <iframe src={`https://drive.google.com/file/d/${m.fileId}/preview`} width="100%" height="80" allow="autoplay" title={m.label} className="border-0 w-full block" />
        ) : (
          <button onClick={() => setLoaded(true)}
            className="flex items-center gap-2.5 text-gray-700 hover:text-brand-orange transition-colors group text-sm">
            <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-medium">Play audio sample</span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ── Service type badge ─────────────────────────────────────────────────────
function ServiceTag({ project }: { project: Project }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] uppercase text-gray-600 border border-gray-300 px-2.5 py-1">
      <span className="relative w-3 h-3 shrink-0">
        <Image src={project.serviceImage} alt="" fill className="object-contain" style={{ filter: FILTER_ORANGE }} sizes="12px" />
      </span>
      {project.serviceTitle}
    </span>
  )
}

// ── Project card dispatcher ────────────────────────────────────────────────
function ProjectCard({ project, onPlayVideo }: { project: Project; onPlayVideo: () => void }) {
  if (project.media.type === 'driveVideo') return <VideoCard project={project} onPlay={onPlayVideo} />
  if (project.media.type === 'driveAudio') return <AudioCard project={project} />
  return null
}

// ── Main grid ──────────────────────────────────────────────────────────────
export default function PortfolioGrid() {
  const [filter, setFilter] = useState('All')
  const [overlayVideo, setOverlayVideo] = useState<{ fileId: string; label: string } | null>(null)

  const visible = filter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.serviceTitle === filter)

  return (
    <>
      <AnimatePresence>
        {overlayVideo && (
          <VideoOverlay fileId={overlayVideo.fileId} label={overlayVideo.label} onClose={() => setOverlayVideo(null)} />
        )}
      </AnimatePresence>

      {/* Filter tabs */}
      <div className="mb-10 -mx-6 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {FILTER_OPTIONS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${filter === f ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project count */}
      <p className="text-gray-600 text-xs tracking-[0.2em] uppercase mb-8">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        {filter !== 'All' && ` in ${filter}`}
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPlayVideo={() => {
                const m = project.media as Extract<MediaEntry, { type: 'driveVideo' }>
                setOverlayVideo({ fileId: m.fileId, label: m.label })
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="mt-20 text-center border-t border-gray-200 pt-16">
        <p className="text-gray-700 text-xs tracking-[0.3em] uppercase mb-4">Want work like this for your brand?</p>
        <a
          href="https://wa.me/254792481990?text=Hi%20Prime%20Voice%20Media%2C%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20starting%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-orange text-white text-sm font-medium px-8 py-4 hover:bg-orange-600 transition-colors tracking-wide"
        >
          Start a Project
        </a>
      </div>
    </>
  )
}
