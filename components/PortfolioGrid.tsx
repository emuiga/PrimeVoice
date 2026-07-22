'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SERVICES, FILTER_ORANGE } from '@/lib/services-data'
import type { PortfolioItem } from '@/lib/sanity/queries'

// ── Derive flat project list from services + CMS-supplied portfolio items ──
type Project = {
  id: string
  label: string         // project / work title  (e.g. "Echoes of Life")
  serviceTitle: string
  serviceSlug: string
  serviceImage: string
  servicePhoto: string
  mediaType: 'video' | 'audio'
  driveFileId: string
}

function buildProjects(portfolioItems: PortfolioItem[]): Project[] {
  const projects: Project[] = []
  for (const item of portfolioItems) {
    const s = SERVICES.find((svc) => svc.title === item.service)
    if (!s) continue
    projects.push({
      id: item.id,
      label: item.title,
      serviceTitle: s.title,
      serviceSlug: s.slug,
      serviceImage: s.image,
      servicePhoto: s.photo ?? s.image,
      mediaType: item.mediaType,
      driveFileId: item.driveFileId,
    })
  }
  return projects
}

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
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <p className="text-brand-orange text-[10px] tracking-[0.3em] uppercase font-medium font-mono-label">{label}</p>
        <button onClick={onClose} aria-label="Close" className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm">
          <span className="hidden sm:inline">Close</span>
          <span className="text-2xl leading-none">×</span>
        </button>
      </div>

      {/* Video fills every remaining pixel */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 min-h-0 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe className="w-full h-full border-0 block" src={`https://drive.google.com/file/d/${fileId}/preview`} title={label} allow="autoplay" allowFullScreen />
      </motion.div>
    </motion.div>
  )
}

// ── Video thumbnail card ───────────────────────────────────────────────────
function VideoCard({ project, onPlay }: { project: Project; onPlay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Video thumbnail — real service photo */}
      <button
        onClick={onPlay}
        className="relative w-full aspect-video group block overflow-hidden bg-brand-dark shrink-0"
        aria-label={`Play ${project.label}`}
      >
        <Image src={project.servicePhoto} alt={project.serviceTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#FF5A1F" /></svg>
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="px-5 py-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45 }}
      className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Photo area — real service photo, no accent gradient */}
      <div className="relative w-full bg-brand-dark overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image src={project.servicePhoto} alt={project.serviceTitle} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
        {/* Waveform animation overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-1">
          {[3, 6, 4, 8, 5, 9, 5, 7, 4, 6, 3].map((h, i) => (
            <motion.div key={i} className="w-1 bg-white/60 rounded-full"
              style={{ height: `${h * 3}px` }}
              animate={{ height: [`${h * 3}px`, `${(h + 3) * 3}px`, `${h * 3}px`] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }} />
          ))}
        </div>
      </div>

      {/* Info + player */}
      <div className="px-5 pt-4 pb-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
            {project.label}
          </h3>
          <ServiceTag project={project} />
        </div>

        {/* Audio player — click to load */}
        {loaded ? (
          <iframe src={`https://drive.google.com/file/d/${project.driveFileId}/preview`} width="100%" height="170" allow="autoplay" title={project.label} className="border-0 w-full block" />
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
    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] uppercase text-gray-600 border border-gray-300 px-2.5 py-1 font-mono-label">
      <span className="relative w-3 h-3 shrink-0">
        <Image src={project.serviceImage} alt="" fill className="object-contain" style={{ filter: FILTER_ORANGE }} sizes="12px" />
      </span>
      {project.serviceTitle}
    </span>
  )
}

// ── Project card dispatcher ────────────────────────────────────────────────
function ProjectCard({ project, onPlayVideo }: { project: Project; onPlayVideo: () => void }) {
  if (project.mediaType === 'video') return <VideoCard project={project} onPlay={onPlayVideo} />
  if (project.mediaType === 'audio') return <AudioCard project={project} />
  return null
}

// ── Main grid ──────────────────────────────────────────────────────────────
export default function PortfolioGrid({ portfolioItems }: { portfolioItems: PortfolioItem[] }) {
  const [filter, setFilter] = useState('All')
  const [overlayVideo, setOverlayVideo] = useState<{ fileId: string; label: string } | null>(null)

  const allProjects = useMemo(() => buildProjects(portfolioItems), [portfolioItems])
  const filterOptions = useMemo(
    () => ['All', ...Array.from(new Set(allProjects.map((p) => p.serviceTitle)))],
    [allProjects],
  )

  const visible = filter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.serviceTitle === filter)

  if (allProjects.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-16">
        Portfolio items are on the way — check back soon.
      </p>
    )
  }

  return (
    <>
      <AnimatePresence>
        {overlayVideo && (
          <VideoOverlay fileId={overlayVideo.fileId} label={overlayVideo.label} onClose={() => setOverlayVideo(null)} />
        )}
      </AnimatePresence>

      {/* Filter pills */}
      <div className="mb-6 -mx-6 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {filterOptions.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium tracking-wide font-mono-label transition-all duration-200 ${filter === f ? 'bg-brand-orange text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-orange hover:text-brand-orange'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project count */}
      <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-8 border-b border-gray-200 pb-6 font-mono-label">
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
              onPlayVideo={() => setOverlayVideo({ fileId: project.driveFileId, label: project.label })}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA — bold single card, matching the WhyUs treatment */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-20 overflow-hidden rounded-2xl bg-brand-dark min-h-[280px]"
      >
        <Image
          src="/images/studio1.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,10,46,0.97) 0%, rgba(26,10,46,0.88) 45%, rgba(94,24,154,0.7) 100%)' }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-6 py-14 sm:px-14 sm:py-16">
          <div className="max-w-xl">
            <p className="text-brand-orange text-[11px] tracking-[0.35em] uppercase font-medium mb-4 font-mono-label">
              Ready when you are
            </p>
            <h2
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.05, color: '#ffffff' }}
            >
              Want work like this for your brand?
            </h2>
          </div>

          <a
            href="https://wa.me/254792481990?text=Hi%20Prime%20Voice%20Media%2C%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20starting%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-brand-orange text-white text-sm font-medium px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors tracking-wide"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 2px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)' }}
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </motion.div>
    </>
  )
}
