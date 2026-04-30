'use client'

import { motion } from 'framer-motion'

const points = [
  {
    num: '01',
    title: 'Client Centric',
    description:
      'We prioritize your goals and craft solutions designed for your specific audience — not a one-size-fits-all approach.',
    accentColor: 'brand-orange',
  },
  {
    num: '02',
    title: 'Clear Communication',
    description:
      'We keep you informed every step of the way, so nothing is ever left to chance. Transparent process, always.',
    accentColor: 'brand-purple',
  },
  {
    num: '03',
    title: 'Quick Turnaround',
    description:
      'Excellence delivered on schedule, every time. We respect your deadlines as much as you do.',
    accentColor: 'brand-orange',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function WhyUs() {
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
          {points.map((point) => (
            <motion.div
              key={point.title}
              variants={card}
              className="group relative bg-brand-surface hover:bg-brand-purple transition-colors duration-300 p-10 flex flex-col gap-5 overflow-hidden cursor-default select-none"
              style={{ minHeight: '280px' }}
            >
              {/* Number */}
              <span
                className="text-5xl font-light select-none text-gray-200 group-hover:text-white/15 transition-colors duration-300"
                aria-hidden="true"
              >
                {point.num}
              </span>

              {/* Accent rule */}
              <div
                className={`w-10 h-px ${
                  point.accentColor === 'brand-orange' ? 'bg-brand-orange' : 'bg-brand-purple group-hover:bg-white/40'
                } transition-colors duration-300`}
                aria-hidden="true"
              />

              <div>
                <h3
                  className="text-xl font-medium text-gray-900 group-hover:text-white mb-3 transition-colors duration-300"
                  style={{ fontFamily: "'SuisseIntl', Arial, sans-serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-300">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
