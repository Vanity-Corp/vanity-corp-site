/**
 * Server-side read client for CMS content served by the Payload backend.
 *
 * Uses Next.js fetch caching with revalidation TAGS so marketing pages stay
 * static and are refreshed on-demand when Payload content changes (Payload
 * pings /api/revalidate, which calls revalidateTag). Intended for use in
 * Server Components / the root layout — not client components.
 */

const PAYLOAD_URL = process.env.PAYLOAD_API_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL

export type ClientCategory = 'brand' | 'artist' | 'strategic_client'

export interface CmsMedia {
  url?: string | null
  alt?: string | null
}

export interface CmsClient {
  id: number
  name: string
  logo?: CmsMedia | null
  imageUrl?: string | null
  link?: string | null
  sector?: string | null
  focus?: string | null
  category: ClientCategory
  active?: boolean | null
  sortOrder?: number | null
}

/** Resolve a client's display image: uploaded logo first, else the imageUrl bridge. */
export function clientImage(client: CmsClient): string | undefined {
  return mediaUrl(client.logo?.url) ?? client.imageUrl ?? undefined
}

export interface CmsSiteSettings {
  siteName?: string | null
  analytics?: { gaMeasurementId?: string | null } | null
  contact?: {
    phone?: string | null
    email?: string | null
    addressLine?: string | null
    city?: string | null
    mapUrl?: string | null
  } | null
  social?: {
    instagram?: string | null
    linkedin?: string | null
    tiktok?: string | null
    youtube?: string | null
  } | null
  showreel?: {
    video?: CmsMedia | null
    poster?: CmsMedia | null
    videoUrl?: string | null
    posterUrl?: string | null
  } | null
}

export interface CmsServiceFeature {
  name?: string | null
  description?: string | null
  icon?: string | null
}

export interface CmsService {
  id: number
  slug: string
  eyebrow?: string | null
  title: string
  color?: string | null
  link?: string | null
  reverse?: boolean | null
  description?: string | null
  image?: CmsMedia | null
  imageUrl?: string | null
  features?: CmsServiceFeature[] | null
}

export interface CmsTeamMember {
  id: number
  name: string
  position?: string | null
  photo?: CmsMedia | null
  imageUrl?: string | null
  bio?: string | null
}

/** Resolve a team member's photo: uploaded first, else the imageUrl bridge. */
export function teamMemberImage(member: CmsTeamMember): string | undefined {
  return mediaUrl(member.photo?.url) ?? member.imageUrl ?? undefined
}

/** Resolve a service's image: uploaded first, else the imageUrl bridge. */
export function serviceImage(service: CmsService): string | undefined {
  return mediaUrl(service.image?.url) ?? service.imageUrl ?? undefined
}

/** Prefix a relative Payload media path with the backend origin. */
export function mediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http')) return url
  if (!PAYLOAD_URL) return url
  return `${PAYLOAD_URL}${url}`
}

async function cmsFetch<T>(path: string, _tag: string): Promise<T | null> {
  if (!PAYLOAD_URL) return null
  try {
    // Dynamic read: always fetch fresh so CMS edits reflect immediately.
    // (Phase 5 can switch back to `next: { tags: [_tag] }` + on-demand
    // revalidation for static caching, once revalidation env is wired.)
    const res = await fetch(`${PAYLOAD_URL}${path}`, { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  return cmsFetch<CmsSiteSettings>('/api/globals/site-settings?depth=1', 'site-settings')
}

export async function getServices(): Promise<CmsService[]> {
  const data = await cmsFetch<{ docs?: CmsService[] }>(
    '/api/services?sort=sortOrder&depth=1&limit=50',
    'services',
  )
  return data?.docs ?? []
}

export async function getTeamMembers(): Promise<CmsTeamMember[]> {
  const data = await cmsFetch<{ docs?: CmsTeamMember[] }>(
    '/api/team-members?sort=sortOrder&depth=1&limit=50',
    'team-members',
  )
  return data?.docs ?? []
}

export interface CmsPageSection {
  blockType: string
  key?: string | null
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  category?: ClientCategory | null
  maxItems?: number | null
  image?: CmsMedia | null
  items?: { value?: string | null }[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  [key: string]: unknown
}

export interface CmsPage {
  title?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CmsMedia | null
  } | null
  sections?: CmsPageSection[] | null
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  const data = await cmsFetch<{ docs?: CmsPage[] }>(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
    `page:${slug}`,
  )
  return data?.docs?.[0] ?? null
}

/** Find the first section of a given block type (optionally matching a category). */
export function findSection(
  page: CmsPage | null,
  blockType: string,
  category?: ClientCategory,
): CmsPageSection | undefined {
  return (page?.sections ?? []).find(
    (s) => s.blockType === blockType && (category ? s.category === category : true),
  )
}

export async function getClients(category?: ClientCategory): Promise<CmsClient[]> {
  const params = new URLSearchParams({
    'where[active][equals]': 'true',
    sort: 'sortOrder',
    depth: '1',
    limit: '200',
  })
  if (category) params.set('where[category][equals]', category)

  const data = await cmsFetch<{ docs?: CmsClient[] }>(`/api/clients?${params.toString()}`, 'clients')
  return data?.docs ?? []
}
