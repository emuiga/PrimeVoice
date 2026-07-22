// Shared service data — imported by ServicesAndSamples (homepage) and PortfolioGrid (portfolio page)
// Portfolio work samples (videos/audio) live in Sanity CMS — see lib/sanity/queries.ts

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
  photo?: string        // optional real photo — shown as the panel background when present
  accentColor: string   // Tailwind gradient classes for banner bg
  iconFilter: string    // CSS filter to colorize the monochrome PNG
  clients: ServiceClient[]  // populated when client names are provided
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
    tagline: 'Conversational, Warm, Confident.',
    description:
      'From 15-second radio spots to full TV commercial narrations, compelling audio that drives audience action and reinforces brand identity.',
    items: ['Radio Spots', 'TV Commercial VO', 'Jingle Narration'],
    image: '/images/radioandtvcommercial.png',
    photo: '/images/TVCommercial.jpg',
    accentColor: 'from-orange-950 to-brand-dark',
    iconFilter: FILTER_ORANGE,
    clients: [],
  },
  {
    num: '02',
    slug: 'corporate-narration',
    title: 'Corporate Narration',
    tagline: 'Engaging, Articulate, Authoritative.',
    description:
      'Professional narrations for external brand videos, explainer videos, onboarding tutorials, and internal communications that carry authority.',
    items: ['External Brand Videos', 'Explainer Videos', 'Onboarding Tutorials', 'Internal Comms'],
    image: '/images/corporatenarration.png',
    photo: '/images/corporatenarration.jpg',
    accentColor: 'from-slate-900 to-brand-dark',
    iconFilter: FILTER_PURPLE,
    clients: [],
  },
  {
    num: '03',
    slug: 'documentaries',
    title: 'Documentaries',
    tagline: 'Authoritative, Engaging, Clear.',
    description:
      'Thoughtful documentary narrations that honor real stories and guide viewers through complex topics with clarity and emotion.',
    items: ['Feature Documentaries', 'Short Docs', 'News Features', 'Historical Narration'],
    image: '/images/documentaries.png',
    photo: '/images/documentaries.jpg',
    accentColor: 'from-stone-900 to-brand-dark',
    iconFilter: FILTER_AMBER,
    clients: [],
  },
  {
    num: '04',
    slug: 'e-learning',
    title: 'E-Learning',
    tagline: 'Inclusive, Clear, Supportive.',
    description:
      'Engaging narrations that improve knowledge retention and create immersive experiences for every type of learner.',
    items: ['Course Modules', 'Tutorial Narration', 'Educational Content', 'Accessibility Audio'],
    image: '/images/e-learning.png',
    photo: '/images/elearning.jpg',
    accentColor: 'from-purple-950 to-brand-dark',
    iconFilter: FILTER_TEAL,
    clients: [],
  },
  {
    num: '05',
    slug: 'social-media-promos',
    title: 'Social Media Promos',
    tagline: 'Vibrant, Concise, Dynamic.',
    description:
      'High-energy audio and video content designed for maximum engagement across all platforms.',
    items: ['Instagram Reels', 'YouTube Ads', 'TikTok Content', 'LinkedIn Video'],
    image: '/images/promotion.png',
    photo: '/images/promo.jpg',
    accentColor: 'from-rose-950 to-brand-dark',
    iconFilter: FILTER_ROSE,
    clients: [],
  },
  {
    num: '06',
    slug: 'podcast-intros-outros',
    title: 'Podcast Intros & Outros',
    tagline: 'Engaging, Structured, Inviting.',
    description:
      "Memorable podcast branding, from opening hooks to closing sign-offs, that establishes your Podcast's voice and keeps listeners coming back.",
    items: ['Podcast Intros', 'Episode Outros', 'Show Trailers', 'Ad Reads'],
    image: '/images/mic (1).png',
    photo: '/images/podcastintros.jpg',
    accentColor: 'from-indigo-950 to-brand-dark',
    iconFilter: 'none',  // mic (1).png already has its own colour
    clients: [],
  },
  {
    num: '07',
    slug: 'audio-visual-production',
    title: 'Audio-Visual Production',
    tagline: 'Every frame, a lasting impression.',
    description:
      'Full-spectrum production integrating compelling visuals with professional voice and sound design for maximum impact.',
    items: ['Explainer Videos', 'Brand Films', 'Product Demos', 'Event Coverage'],
    image: '/images/audiovisual.png',
    photo: '/images/audiovisual.jpg',
    accentColor: 'from-zinc-900 to-brand-dark',
    iconFilter: FILTER_INDIGO,
    clients: [],
  },
  {
    num: '08',
    slug: 'audiobook-narration',
    title: 'Audio-Book Narration',
    tagline: 'Stories, voiced with care',
    description:
      'Long-form narration for audiobooks, bringing characters and stories to life with pacing, tone, and consistency across every chapter.',
    items: ['Fiction Narration', 'Non-Fiction Narration', 'Multi-Character Voicing', 'Chapter Sampling'],
    image: '/images/icons/study.png',
    photo: '/images/audiobooknarration.jpg',
    accentColor: 'from-purple-950 to-brand-dark',
    iconFilter: FILTER_PURPLE,
    clients: [],
  },
]
