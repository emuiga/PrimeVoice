// NOTE: public/og-image.jpg needs to be created at 1200×630px showing the brand name
// "Prime Voice Media" and tagline "Voice That Resonates, Impact That Lasts" on the
// dark purple (#1A0A2E) background before launch, for social sharing previews.

import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://primevoicemedia.co.ke'),
  icons: {
    icon: [
      { url: '/images/logo-nobg.png', type: 'image/png', sizes: 'any' },
    ],
    apple: { url: '/images/logo-nobg.png', type: 'image/png' },
    shortcut: '/images/logo-nobg.png',
  },
  title: {
    default: 'Prime Voice Media | Professional Voice Over & Audio Visual',
    template: '%s | Prime Voice Media',
  },
  description:
    'Professional voice over and audio visual communication tailored to your audience. Connecting brands with their target audience in Kenya and beyond.',
  keywords: [
    'voice over Kenya',
    'professional voice over',
    'audio visual communication',
    'radio commercial voice',
    'e-learning narration Kenya',
    'corporate narration',
    'Prime Voice Media',
  ],
  authors: [{ name: 'Prime Voice Media' }],
  creator: 'Prime Voice Media',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://primevoicemedia.co.ke',
    siteName: 'Prime Voice Media',
    title: 'Prime Voice Media | Voice That Resonates, Impact That Lasts',
    description:
      'Professional voice over and audio visual communication tailored to your audience.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prime Voice Media — Voice That Resonates, Impact That Lasts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Voice Media | Voice That Resonates, Impact That Lasts',
    description:
      'Professional voice over and audio visual communication tailored to your audience.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://primevoicemedia.co.ke',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'ProfessionalService'],
              name: 'Prime Voice Media',
              description:
                'Professional voice over and audio visual communication',
              telephone: '+254792481990',
              email: 'enyaboke130@gmail.com',
              url: 'https://primevoicemedia.co.ke',
              areaServed: { '@type': 'Country', name: 'Kenya' },
              serviceType: [
                'Voice Over',
                'Audio Visual Communication',
                'E-Learning Narration',
                'Radio Commercials',
                'Corporate Narration',
              ],
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  )
}
