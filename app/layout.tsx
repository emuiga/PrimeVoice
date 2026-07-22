import type { Metadata } from 'next'
import { Playfair_Display, Inter, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
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

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const interDisplay = localFont({
  src: [
    { path: '../public/fonts/inter-display/ttf/InterDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-display/ttf/InterDisplay-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter-display/ttf/InterDisplay-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter-display',
  display: 'swap',
})

const BASE = 'https://www.theprimevoicemedia.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: { url: '/favicon.ico', sizes: 'any' },
    apple: { url: '/apple-touch-icon.png', type: 'image/png' },
    shortcut: '/favicon.ico',
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
    title: 'Prime Voice Media - Voice That Resonates, Impact That Lasts!',
    description:
      'Audio and visual storytelling crafted to resonate with your audience and create real, lasting impact for your brand.',
    // og:image is served by app/opengraph-image.tsx (auto-generated)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Voice Media | Voice That Resonates, Impact That Lasts!',
    description:
      'Audio and visual storytelling crafted to resonate with your audience and create real, lasting impact for your brand.',
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
      className={`${playfair.variable} ${inter.variable} ${interDisplay.variable} ${robotoMono.variable} antialiased`}
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
          email: 'primevoicemedia@gmail.com',
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
          sameAs: ['https://www.instagram.com/prime_voice_media/'],
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
