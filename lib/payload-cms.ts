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
