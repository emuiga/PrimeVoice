// Shared service data — imported by ServicesAndSamples (homepage) and PortfolioGrid (portfolio page)

export type MediaEntry =
  | { type: 'driveVideo'; fileId: string; label: string }
  | { type: 'driveAudio'; fileId: string; label: string }

export type ServiceClient = {
  name: string    // Business / brand name
  project: string // Brief project description
}

export type Service = {
  num: string
  slug: string          // for future /services/[slug] pages
  title: string
  tagline: string
  description: string
  items: string[]
  image: string         // category PNG illustration
  accentColor: string   // Tailwind gradient classes for banner bg
  iconFilter: string    // CSS filter to colorize the monochrome PNG
  clients: ServiceClient[]  // populated when client names are provided
  media: MediaEntry[]
}

// ── CSS filter presets ─────────────────────────────────────────────────────
// brightness(0) saturate(100%) normalises to black, then shifts to target hue
export const FILTER_ORANGE = 'brightness(0) saturate(100%) invert(51%) sepia(72%) saturate(1217%) hue-rotate(349deg) brightness(104%)'
export const FILTER_PURPLE = 'brightness(0) saturate(100%) invert(17%) sepia(65%) saturate(2000%) hue-rotate(264deg) brightness(85%)'
export const FILTER_AMBER  = 'brightness(0) saturate(100%) invert(75%) sepia(58%) saturate(800%) hue-rotate(10deg) brightness(105%)'
export const FILTER_TEAL   = 'brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(700%) hue-rotate(140deg) brightness(95%)'
export const FILTER_ROSE   = 'brightness(0) saturate(100%) invert(40%) sepia(90%) saturate(1500%) hue-rotate(320deg) brightness(100%)'
export const FILTER_INDIGO = 'brightness(0) saturate(100%) invert(40%) sepia(80%) saturate(900%) hue-rotate(220deg) brightness(105%)'

// Bullet icon set — rotated by item index for personality
export const BULLET_ICONS = [
  '/images/wave-sound.png',
  '/images/mic.png',
  '/images/microphone.png',
]

export const SERVICES: Service[] = [
  {
    num: '01',
    slug: 'radio-tv-commercials',
    title: 'Radio & TV Commercials',
    tagline: 'Voices that sell, stories that stick',
    description:
      'From 30-second radio spots to full TV commercial narrations, compelling audio that drives audience action and reinforces brand identity.',
    items: ['Radio Spots', 'TV Commercial VO', 'Jingle Narration', 'Brand Voice Identity'],
    image: '/images/radioandtvcommercial.png',
    accentColor: 'from-orange-950 to-brand-dark',
    iconFilter: FILTER_ORANGE,
    clients: [],
    media: [
      { type: 'driveVideo', fileId: '1udPJmqXdmm8aCz-3coBkiu6oCz22ERby', label: 'Media Council TV Commercial' },
    ],
  },
  {
    num: '02',
    slug: 'corporate-narration',
    title: 'Corporate Narration',
    tagline: 'Authority. Clarity. Impact.',
    description:
      'Professional narrations for presentations, annual reports, training materials, and internal communications that carry authority.',
    items: ['Corporate Presentations', 'Annual Reports', 'Training Materials', 'Internal Comms'],
    image: '/images/corporatenarration.png',
    accentColor: 'from-slate-900 to-brand-dark',
    iconFilter: FILTER_PURPLE,
    clients: [],
    media: [],
  },
  {
    num: '03',
    slug: 'documentaries',
    title: 'Documentaries',
    tagline: 'Stories told with depth and nuance',
    description:
      'Thoughtful documentary narrations that honor real stories and guide viewers through complex topics with clarity and emotion.',
    items: ['Feature Documentaries', 'Short Docs', 'News Features', 'Historical Narration'],
    image: '/images/documentaries.png',
    accentColor: 'from-stone-900 to-brand-dark',
    iconFilter: FILTER_AMBER,
    clients: [],
    media: [
      { type: 'driveAudio', fileId: '1XDGLG8eYauoE3Q4YRjHNR8aNtLnYAnnf', label: 'Echoes of Life' },
      { type: 'driveAudio', fileId: '1ZjWQG3m6Q-bPf906AvekPdbyT4pcjdja', label: 'Notes of a Native Son' },
    ],
  },
  {
    num: '04',
    slug: 'e-learning',
    title: 'E-Learning',
    tagline: 'Learning that resonates',
    description:
      'Engaging narrations that improve knowledge retention and create immersive experiences for every type of learner.',
    items: ['Course Modules', 'Tutorial Narration', 'Educational Content', 'Accessibility Audio'],
    image: '/images/e-learning.png',
    accentColor: 'from-purple-950 to-brand-dark',
    iconFilter: FILTER_TEAL,
    clients: [],
    media: [
      { type: 'driveAudio', fileId: '1KAvBjEXmafUqY0s7qGrOM5Eo9nAdc0H0', label: 'Taita Taveta University' },
    ],
  },
  {
    num: '05',
    slug: 'social-media-promos',
    title: 'Social Media Promos',
    tagline: 'Content that stops the scroll',
    description:
      'High-energy audio and video content designed for maximum engagement across all platforms.',
    items: ['Instagram Reels', 'YouTube Ads', 'TikTok Content', 'LinkedIn Video'],
    image: '/images/promotion.png',
    accentColor: 'from-rose-950 to-brand-dark',
    iconFilter: FILTER_ROSE,
    clients: [],
    media: [
      { type: 'driveVideo', fileId: '1oSAh8hGVMx1h0P9hqRDC2E-cZv_bbqvQ', label: 'Bethany Delights Social Media Promo' },
      { type: 'driveAudio', fileId: '1MRd8orV1xmy_BlPLp9LUxL9-HO6tRsxD', label: 'Lightower Electricals Social Media Promo' },
    ],
  },
  {
    num: '06',
    slug: 'podcast-intros-outros',
    title: 'Podcast Intros & Outros',
    tagline: 'First impressions that last',
    description:
      "Memorable podcast branding, from opening hooks to closing sign-offs, that establishes your Podcast's voice and keeps listeners coming back.",
    items: ['Podcast Intros', 'Episode Outros', 'Show Trailers', 'Ad Reads'],
    image: '/images/mic (1).png',
    accentColor: 'from-indigo-950 to-brand-dark',
    iconFilter: 'none',  // mic (1).png already has its own colour
    clients: [],
    media: [],
  },
  {
    num: '07',
    slug: 'audio-visual-production',
    title: 'Audio-Visual Production',
    tagline: 'Where sound meets vision',
    description:
      'Full-spectrum production integrating compelling visuals with professional voice and sound design for maximum impact.',
    items: ['Explainer Videos', 'Brand Films', 'Product Demos', 'Event Coverage'],
    image: '/images/audiovisual.png',
    accentColor: 'from-zinc-900 to-brand-dark',
    iconFilter: FILTER_INDIGO,
    clients: [],
    media: [],
  },
]
