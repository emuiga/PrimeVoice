import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PortfolioGrid from '@/components/PortfolioGrid'
import BackToTop from '@/components/BackToTop'
import { SERVICES } from '@/lib/services-data'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore Prime Voice Media\'s portfolio of voice-over and audio-visual work: radio and TV commercials, corporate narrations, documentaries, e-learning, podcasts, and more.',
  alternates: {
    canonical: 'https://www.theprimevoicemedia.com/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Prime Voice Media',
    description: 'Real work samples across seven specialist disciplines: voice-over, narration, and audio-visual production.',
    url: 'https://www.theprimevoicemedia.com/portfolio',
  },
}

// JSON-LD for the portfolio page
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Prime Voice Media Portfolio',
  description: 'Work samples for voice-over and audio-visual services',
  url: 'https://www.theprimevoicemedia.com/portfolio',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://primevoicemedia.co.ke' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.theprimevoicemedia.com/portfolio' },
    ],
  },
  hasPart: SERVICES.map((s) => ({
    '@type': 'CreativeWork',
    name: s.title,
    description: s.description,
  })),
}

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-brand-dark overflow-hidden" style={{ minHeight: '38vh' }}>
          {/* Background image */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/studio1.jpg" alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-16">
            <p className="text-brand-orange text-[11px] tracking-[0.35em] uppercase font-medium mb-4">
              Prime Voice Media
            </p>
            <h1 className="heading-display-white mb-4">Our Portfolio</h1>
            <p className="text-white/50 text-base leading-relaxed max-w-lg">
              Real samples from real projects. Filter by service to find exactly what you need.
            </p>
          </div>
        </section>

        {/* ── Portfolio grid ────────────────────────────────────── */}
        <section className="bg-brand-surface py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <PortfolioGrid />
          </div>
        </section>

      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
