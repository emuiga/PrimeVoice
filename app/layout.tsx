import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { SERVICES } from '@/lib/services-data'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const inter = Inter({
  variable: '--font-inter-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const BASE = 'https://www.theprimevoicemedia.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: [
      { url: '/images/mic.png', type: 'image/png', sizes: 'any' },
    ],
    apple: { url: '/images/mic.png', type: 'image/png' },
    shortcut: '/images/mic.png',
  },
  title: {
    default: 'Prime Voice Media | Professional Voice-Over & Audio Visual',
    template: '%s | Prime Voice Media',
  },
  description:
    'Professional Voice-Over and audio visual communication tailored to your audience. Connecting brands with their target audience in Kenya and beyond.',
  keywords: [
    'voice-over Kenya',
    'professional voice-over',
    'audio visual communication',
    'radio commercial voice',
    'e-learning narration Kenya',
    'corporate narration',
    'Prime Voice Media',
    'voice over artist Kenya',
    'audio production Kenya',
  ],
  authors: [{ name: 'Prime Voice Media' }],
  creator: 'Prime Voice Media',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: BASE,
    siteName: 'Prime Voice Media',
    title: 'Prime Voice Media | Voice That Resonates, Impact That Lasts',
    description:
      'Professional Voice-Over and audio visual communication tailored to your audience. Connecting brands with their target audience in Kenya and beyond.',
    // og:image is served by app/opengraph-image.tsx (auto-generated)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Voice Media | Voice That Resonates, Impact That Lasts',
    description:
      'Professional Voice-Over and audio visual communication tailored to your audience.',
    // twitter:image served by app/twitter-image.tsx (auto-generated)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body>
        {children}

        {/* ── Organisation schema ─────────────────────────────── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'ProfessionalService'],
          name: 'Prime Voice Media',
          description: 'Professional Voice-Over and audio visual communication connecting brands with the audiences they were made to serve.',
          telephone: '+254792481990',
          email: 'enyaboke130@gmail.com',
          url: BASE,
          logo: `${BASE}/images/PVMlogo.png`,
          image: `${BASE}/opengraph-image`,
          areaServed: [
            { '@type': 'Country', name: 'Kenya' },
            { '@type': 'Continent', name: 'Africa' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Voice-Over & Audio Visual Services',
            itemListElement: SERVICES.map((s, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
                url: `${BASE}/#services`,
              },
            })),
          },
          sameAs: [],
        })}} />

        {/* ── WebSite schema (enables sitelinks searchbox) ────── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Prime Voice Media',
          url: BASE,
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/portfolio?q={search_term_string}` },
            'query-input': 'required name=search_term_string',
          },
        })}} />
      </body>
    </html>
  )
}
