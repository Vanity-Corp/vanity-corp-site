/**
 * Server-side read client for CMS content served by vanity-backend (NestJS).
 *
 * Uses Next.js fetch caching with revalidation TAGS so marketing pages stay
 * static and are refreshed on-demand when dashboard content changes
 * (vanity-backend pings /api/revalidate, which calls revalidateTag).
 * Intended for use in Server Components / the root layout — not client
 * components.
 */

const API_URL = process.env.API_URL

export type ClientCategory = 'brand' | 'artist' | 'strategic_client'

export interface CmsClient {
  id: string
  name: string
  imageUrl?: string | null
  link?: string | null
  sector?: string | null
  focus?: string | null
  category: ClientCategory
}

/** Resolve a client's display image (already resolved server-side, kept for relative fallbacks). */
export function clientImage(client: CmsClient): string | undefined {
  return mediaUrl(client.imageUrl) ?? undefined
}

export interface CmsWorldMapDot {
  startLat: number
  startLng: number
  startLabel?: string | null
  endLat: number
  endLng: number
  endLabel?: string | null
}

export interface CmsSiteSettings {
  analytics?: { gaMeasurementId?: string | null } | null
  showreel?: {
    videoUrl?: string | null
    posterUrl?: string | null
  } | null
  worldMapDots?: CmsWorldMapDot[] | null
}

export interface CmsServiceFeature {
  name?: string | null
  description?: string | null
  icon?: string | null
}

export interface CmsService {
  slug: string
  eyebrow?: string | null
  title: string
  color?: string | null
  link?: string | null
  reverse?: boolean | null
  description?: string | null
  imageUrl?: string | null
  features?: CmsServiceFeature[] | null
}

export interface CmsTeamMember {
  name: string
  position?: string | null
  bio?: string | null
  imageUrl?: string | null
}

/** Resolve a team member's photo (already resolved server-side, kept for relative fallbacks). */
export function teamMemberImage(member: CmsTeamMember): string | undefined {
  return mediaUrl(member.imageUrl) ?? undefined
}

/** Resolve a service's image (already resolved server-side, kept for relative fallbacks). */
export function serviceImage(service: CmsService): string | undefined {
  return mediaUrl(service.imageUrl) ?? undefined
}

/** Prefix a relative vanity-backend media path with the backend origin. */
export function mediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http')) return url
  if (!API_URL) return url
  return `${API_URL}${url}`
}

async function cmsFetch<T>(path: string, _tag: string): Promise<T | null> {
  if (!API_URL) return null
  try {
    // Dynamic read: always fetch fresh so CMS edits reflect immediately.
    // (Phase 5 can switch back to `next: { tags: [_tag] }` + on-demand
    // revalidation for static caching, once revalidation env is wired.)
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  return cmsFetch<CmsSiteSettings>('/api/public/site-settings', 'site-settings')
}

export async function getServices(): Promise<CmsService[]> {
  const data = await cmsFetch<CmsService[]>('/api/public/services', 'services')
  return data ?? []
}

export async function getTeamMembers(): Promise<CmsTeamMember[]> {
  const data = await cmsFetch<CmsTeamMember[]>('/api/public/team-members', 'team-members')
  return data ?? []
}

export type PricingCategory = 'audio' | 'filming' | 'turnkey'

export interface CmsPricingPackage {
  id: string
  category: PricingCategory
  title: string
  description?: string | null
  price?: number | null
  pricePrefix?: string | null
  features: string[]
  highlighted: boolean
}

export async function getPricingPackages(): Promise<CmsPricingPackage[]> {
  const data = await cmsFetch<CmsPricingPackage[]>('/api/public/pricing', 'pricing')
  return data ?? []
}

// Raw shape returned by GET /api/public/pages?slug= — section-specific fields
// (eyebrow, heading, body, items, ctaLabel, ctaHref, maxItems...) live under
// `data` (free-form JSON, set from the dashboard's page editor). getPage()
// flattens `data` onto each section below so call sites keep reading
// `section.heading` etc. directly, same as before this backend migration.
interface RawPageSection {
  blockType: string
  key?: string | null
  category?: string | null
  data?: Record<string, unknown> | null
}

interface RawPage {
  title?: string | null
  slug?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
  } | null
  sections?: RawPageSection[] | null
}

export interface CmsPageSection {
  blockType: string
  key?: string | null
  category?: ClientCategory | null
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  // Plain strings (dashboard's page editor stores items as string[], not
  // Payload's old { value: string }[] shape).
  items?: string[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  maxItems?: number | null
  [key: string]: unknown
}

export interface CmsPage {
  title?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: string | null
  } | null
  sections?: CmsPageSection[] | null
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  const page = await cmsFetch<RawPage>(
    `/api/public/pages?slug=${encodeURIComponent(slug)}`,
    `page:${slug}`,
  )
  if (!page) return null
  return {
    title: page.title,
    seo: page.seo ?? null,
    sections: (page.sections ?? []).map((s) => ({
      blockType: s.blockType,
      key: s.key,
      category: (s.category as ClientCategory) ?? null,
      ...(s.data ?? {}),
    })),
  }
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
  const params = new URLSearchParams({ active: 'true' })
  if (category) params.set('category', category)

  const data = await cmsFetch<CmsClient[]>(`/api/public/clients?${params.toString()}`, 'clients')
  return data ?? []
}

// Drives both the /realisations category filter and which panel template a
// project renders (video player / image gallery / grid) — same value, two
// uses, see PortfolioProject.category on the backend.
export type PortfolioCategory =
  | 'video' | 'graphisme' | 'shooting' | 'site_web' | 'strategie' | 'reseaux_sociaux'

export interface CmsPortfolioProject {
  slug: string
  title: string
  client?: string | null
  description?: string | null
  category: PortfolioCategory
  videoUrl?: string | null
  coverUrl?: string | null
  gallery?: string[] | null
  // Case-study narrative fields (panel redesign) — each independently
  // optional, rendered only when present.
  year?: number | null
  services?: string[] | null
  need?: string | null
  approach?: string | null
  result?: string | null
}

export async function getPortfolio(category?: PortfolioCategory): Promise<CmsPortfolioProject[]> {
  const params = category ? `?category=${category}` : ''
  const data = await cmsFetch<CmsPortfolioProject[]>(`/api/public/portfolio${params}`, 'portfolio')
  return data ?? []
}

export interface CmsArticle {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  coverImageUrl?: string | null
  content?: string | null
  publishedAt?: string | null
  seoMetaTitle?: string | null
  seoMetaDescription?: string | null
  seoOgImageUrl?: string | null
}

/** Only ever PUBLISHED articles — the backend's /api/public/articles already filters this. */
export async function getArticles(): Promise<CmsArticle[]> {
  const data = await cmsFetch<CmsArticle[]>('/api/public/articles', 'articles')
  return data ?? []
}

export async function getArticle(slug: string): Promise<CmsArticle | null> {
  return cmsFetch<CmsArticle>(`/api/public/articles/${encodeURIComponent(slug)}`, `article:${slug}`)
}

/** Resolve an article's cover image (same dual uploaded/url-media pattern as elsewhere). */
export function articleCoverImage(article: CmsArticle): string | undefined {
  return mediaUrl(article.coverImageUrl) ?? undefined
}
