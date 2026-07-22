import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PortfolioGrid from '@/components/PortfolioGrid'
import BackToTop from '@/components/BackToTop'
import { SERVICES } from '@/lib/services-data'
import { getPortfolioItems } from '@/lib/sanity/queries'

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

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-brand-dark overflow-hidden" style={{ minHeight: '52vh' }}>
          {/* Background photo — real, present, not faded to near-invisible */}
          <div className="absolute inset-0 bg-brand-dark">
            <Image src="/images/studio1.jpg" alt="" fill priority className="object-cover" sizes="100vw" aria-hidden="true" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(26,10,46,0.92) 0%, rgba(26,10,46,0.6) 55%, rgba(26,10,46,0.35) 100%)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24 flex flex-col justify-end min-h-[52vh]">
            <p className="text-brand-orange text-[11px] tracking-[0.35em] uppercase font-medium mb-5 font-mono-label">
              Prime Voice Media
            </p>
            <h1 className="heading-display-white mb-5 max-w-2xl">Portfolio</h1>
            <p className="text-white/60 text-base leading-relaxed max-w-lg">
              A curated look at the voices, stories, and productions we&apos;ve brought to life for brands across every discipline.
            </p>
          </div>
        </section>

        {/* ── Portfolio grid ────────────────────────────────────── */}
        <section className="relative bg-brand-surface py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-brand-orange/6 blur-3xl" />
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-brand-purple/6 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <PortfolioGrid portfolioItems={portfolioItems} />
          </div>
        </section>

      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
