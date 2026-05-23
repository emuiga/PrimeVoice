import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prime Voice Media',
    short_name: 'PrimeVoice',
    description: 'Professional Voice-Over and audio visual communication connecting brands with the audiences they were made to serve.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A0A2E',
    theme_color: '#1A0A2E',
    icons: [
      {
        src: '/images/mic.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/images/PVMlogo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
