import { sanityClient } from './client'
import { urlFor } from './image'

export type PortfolioItem = {
  id: string
  title: string
  service: string
  mediaType: 'video' | 'audio'
  driveFileId: string
}

export type ClientLogo = {
  id: string
  name: string
  shortName: string
  logoUrl: string
}

// Accepts a full Google Drive share link (the normal case) or a bare file ID
// (in case someone pastes just the ID) and returns the file ID either way.
function extractDriveFileId(driveLink: string): string | null {
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/) || driveLink.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (match) return match[1]
  if (/^[a-zA-Z0-9_-]{10,}$/.test(driveLink.trim())) return driveLink.trim()
  return null
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const raw = await sanityClient.fetch<
    { _id: string; title: string; service: string; mediaType: 'video' | 'audio'; driveLink: string }[]
  >(
    `*[_type == "portfolioItem"] | order(_createdAt desc){ _id, title, service, mediaType, driveLink }`,
    {},
    { next: { revalidate: 60 } },
  )

  return raw
    .map((item) => {
      const driveFileId = extractDriveFileId(item.driveLink)
      if (!driveFileId) return null
      return {
        id: item._id,
        title: item.title,
        service: item.service,
        mediaType: item.mediaType,
        driveFileId,
      }
    })
    .filter((item): item is PortfolioItem => item !== null)
}

export async function getClients(): Promise<ClientLogo[]> {
  const raw = await sanityClient.fetch<
    { _id: string; name: string; shortName: string; logo: unknown }[]
  >(
    `*[_type == "client"] | order(_createdAt asc){ _id, name, shortName, logo }`,
    {},
    { next: { revalidate: 60 } },
  )

  return raw
    .filter((c) => !!c.logo)
    .map((c) => ({
      id: c._id,
      name: c.name,
      shortName: c.shortName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logoUrl: urlFor(c.logo as any).width(160).height(160).fit('max').url(),
    }))
}
