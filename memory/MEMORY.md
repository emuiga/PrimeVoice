# PrimeVoice Project Memory

## Live Domain
`https://www.theprimevoicemedia.com` — all canonical URLs, OG tags, sitemap, robots.txt use this.

## Key Files
- `lib/services-data.ts` — single source of truth for all service + media data
- `app/layout.tsx` — root metadata, JSON-LD (LocalBusiness + WebSite schemas), BASE constant
- `app/opengraph-image.tsx` + `app/twitter-image.tsx` — dynamic OG/Twitter card images (edge runtime)
- `app/manifest.ts` — PWA manifest
- `app/sitemap.ts` — only real pages (/, /portfolio), no hash anchors
- `app/robots.ts` — points to sitemap

## Architecture
- Next.js 16.2.3, App Router, Tailwind v4
- `components/ServicesAndSamples.tsx` — merged services + samples (replaced Services.tsx + WorkSamples.tsx)
- `components/PortfolioGrid.tsx` — project-centric flat list (6 cards), derives from SERVICES
- `components/Clients.tsx` — static white-bg grid, actual logos in original colors
- `components/Reviews.tsx` — uses real clients: KBC, Lightower Electricals, Kisii Family Medical Centre

## WhatsApp Links
All WhatsApp links include pre-filled message:
`https://wa.me/254792481990?text=Hi%20Prime%20Voice%20Media%2C%20I%20came%20across%20your%20work%20and%20I%27m%20interested%20in%20discussing%20a%20project.`
"Start a Project" CTA (Footer + Portfolio) → WhatsApp (not contact form)

## Design Conventions
- Brand colors: `brand-orange` (#FF5A1F), `brand-purple` (#5E189A), `brand-dark` (#1A0A2E), `brand-surface` (#F5F4F2)
- No border radius on cards/images (sharp corners)
- No em dashes anywhere
- No "Coming soon" placeholders
- Fonts: Inter (body), SuisseIntl fallback (headings) — NO Arial anywhere
- Faint text rule: never use text-gray-400 for visible UI text; use text-gray-600+ on light bg
- Abstract patterns (blobs + SVG rings/waves/dots) on: About, WhyUs, Reviews sections

## Google Drive Media
Videos use `<iframe src="https://drive.google.com/file/d/{fileId}/preview">` in fullscreen overlay.
Audio uses click-to-load lazy iframe pattern.

## Navbar Routing
- Anchor links use `href="/#anchor"` format (works from any page)
- `usePathname` → `isHome` flag gates client-side scroll vs Next.js navigation
- `handleNavClick` strips leading `/` with `.replace('/', '')` before `document.querySelector`
