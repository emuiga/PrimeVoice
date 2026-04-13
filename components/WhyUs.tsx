'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// CSS filter values to tint black PNGs to brand colors
const ORANGE_FILTER =
  'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1300%) hue-rotate(1deg) brightness(101%) contrast(103%)'
const PURPLE_FILTER =
  'brightness(0) saturate(100%) invert(16%) sepia(89%) saturate(1600%) hue-rotate(266deg) brightness(80%) contrast(110%)'

type FloatingPos = {
  left: string
  top: string
  size: number
  rotate: number
  delay: number
  initX: number  // entry offset in px
  initY: number
}

const points = [
  {
    num: '01',
    title: 'Client Centric',
    description:
      'We prioritize your goals and craft solutions designed for your specific audience — not a one-size-fits-all approach.',
    icon: '/images/icons/customer-centricity.png',
    filter: ORANGE_FILTER,
    accentColor: 'brand-orange',
    // 7 floating instances — positions within the card
    floats: [
      { left: '8%',  top: '12%', size: 32, rotate: -15, delay: 0,    initX: -40, initY: -40 },
      { left: '72%', top: '8%',  size: 24, rotate: 20,  delay: 0.06, initX: 40,  initY: -30 },
      { left: '85%', top: '55%', size: 36, rotate: -8,  delay: 0.1,  initX: 50,  initY: 20 },
      { left: '55%', top: '78%', size: 20, rotate: 15,  delay: 0.08, initX: 10,  initY: 40 },
      { left: '12%', top: '70%', size: 28, rotate: 10,  delay: 0.12, initX: -30, initY: 40 },
      { left: '40%', top: '15%', size: 18, rotate: -20, delay: 0.04, initX: 0,   initY: -50 },
      { left: '62%', top: '42%', size: 22, rotate: 5,   delay: 0.14, initX: 60,  initY: 0 },
    ] as FloatingPos[],
  },
  {
    num: '02',
    title: 'Clear Communication',
    description:
      'We keep you informed every step of the way, so nothing is ever left to chance. Transparent process, always.',
    icon: '/images/icons/speech-bubble.png',
    filter: PURPLE_FILTER,
    accentColor: 'brand-purple',
    floats: [
      { left: '10%', top: '10%', size: 34, rotate: -10, delay: 0,    initX: -50, initY: -30 },
      { left: '68%', top: '6%',  size: 22, rotate: 18,  delay: 0.07, initX: 40,  initY: -40 },
      { left: '80%', top: '62%', size: 30, rotate: -5,  delay: 0.11, initX: 45,  initY: 30 },
      { left: '50%', top: '80%', size: 18, rotate: 12,  delay: 0.09, initX: 0,   initY: 50 },
      { left: '8%',  top: '65%', size: 26, rotate: 8,   delay: 0.13, initX: -40, initY: 35 },
      { left: '35%', top: '20%', size: 20, rotate: -25, delay: 0.05, initX: -10, initY: -45 },
      { left: '58%', top: '38%', size: 24, rotate: 3,   delay: 0.15, initX: 55,  initY: 10 },
    ] as FloatingPos[],
  },
  {
    num: '03',
    title: 'Quick Turnaround',
    description:
      'Excellence delivered on schedule, every time. We respect your deadlines as much as you do.',
    icon: '/images/icons/clock.png',
    filter: ORANGE_FILTER,
    accentColor: 'brand-orange',
    floats: [
      { left: '6%',  top: '14%', size: 36, rotate: -12, delay: 0,    initX: -45, initY: -35 },
      { left: '74%', top: '10%', size: 20, rotate: 22,  delay: 0.06, initX: 45,  initY: -35 },
      { left: '82%', top: '58%', size: 32, rotate: -6,  delay: 0.1,  initX: 50,  initY: 25 },
      { left: '48%', top: '76%', size: 22, rotate: 14,  delay: 0.09, initX: 5,   initY: 45 },
      { left: '14%', top: '68%', size: 26, rotate: 9,   delay: 0.12, initX: -35, initY: 40 },
      { left: '38%', top: '18%', size: 18, rotate: -22, delay: 0.04, initX: -5,  initY: -48 },
      { left: '60%', top: '40%', size: 28, rotate: 4,   delay: 0.14, initX: 58,  initY: 5 },
    ] as FloatingPos[],
  },
]

function FloatingIcons({
  icon,
  filter,
  floats,
}: {
  icon: string
  filter: string
  floats: FloatingPos[]
}) {
  return (
    <>
      {floats.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-10"
          style={{ left: pos.left, top: pos.top }}
          initial={{ opacity: 0, scale: 0, x: pos.initX, y: pos.initY, rotate: pos.rotate - 45 }}
          animate={{ opacity: 0.75, scale: 1, x: 0, y: 0, rotate: pos.rotate }}
          exit={{ opacity: 0, scale: 0, x: pos.initX * 0.5, y: pos.initY * 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 480,
            damping: 22,
            delay: pos.delay,
          }}
        >
          <Image
            src={icon}
            alt=""
            width={pos.size}
            height={pos.size}
            style={{ filter, width: pos.size, height: pos.size }}
            aria-hidden="true"
            unoptimized
          />
        </motion.div>
      ))}
    </>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function WhyUs() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="why-us" className="py-24 bg-brand-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-brand-orange text-xs font-medium tracking-[0.35em] uppercase mb-5"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="heading-display"
            >
              Why Prime Voice Media
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm max-w-xs leading-relaxed"
          >
            Three commitments that define every project we deliver.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200"
        >
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              variants={card}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-brand-surface hover:bg-white transition-colors duration-300 p-10 flex flex-col gap-5 overflow-hidden cursor-default select-none"
              style={{ minHeight: '280px' }}
            >
              {/* Flying icons on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <FloatingIcons
                    icon={point.icon}
                    filter={point.filter}
                    floats={point.floats}
                  />
                )}
              </AnimatePresence>

              {/* Card content */}
              <span
                className={`text-5xl font-light select-none transition-colors duration-300 ${
                  hovered === i
                    ? point.accentColor === 'brand-orange'
                      ? 'text-brand-orange/25'
                      : 'text-brand-purple/25'
                    : 'text-gray-200'
                }`}
                aria-hidden="true"
              >
                {point.num}
              </span>

              {/* Orange/purple rule */}
              <div
                className={`w-10 h-px transition-colors duration-300 ${
                  point.accentColor === 'brand-orange' ? 'bg-brand-orange' : 'bg-brand-purple'
                }`}
                aria-hidden="true"
              />

              <div className="relative z-20">
                <h3
                  className="text-xl font-medium text-gray-900 mb-3 transition-colors duration-200 group-hover:text-gray-900"
                  style={{ fontFamily: "'SuisseIntl', Arial, sans-serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{point.description}</p>
              </div>

              {/* Single large icon bottom-right for non-hover state hint */}
              <div className="absolute bottom-4 right-4 opacity-6 pointer-events-none" aria-hidden="true">
                <Image
                  src={point.icon}
                  alt=""
                  width={44}
                  height={44}
                  style={{ filter: point.filter, opacity: 0.07 }}
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
