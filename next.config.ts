import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export' removed — API routes (Resend) require a Node.js server.
  // Deploy on Vercel or any Node-capable host.
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
