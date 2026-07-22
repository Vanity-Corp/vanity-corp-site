import type { Metadata } from "next";

import { getPage, mediaUrl } from "@/lib/payload-cms";

/**
 * Build Next Metadata for a page from its CMS `seo` group, falling back to the
 * provided defaults when the CMS has no value (or is unreachable). Used by each
 * route's server `layout.tsx` so client pages still get per-page metadata.
 */
export async function cmsMetadata(
  slug: string,
  fallback: Metadata = {},
): Promise<Metadata> {
  const page = await getPage(slug);
  const seo = page?.seo;

  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const ogImage = mediaUrl(seo?.ogImage?.url);

  return {
    ...fallback,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(ogImage
      ? { openGraph: { ...(fallback.openGraph ?? {}), images: [ogImage] } }
      : {}),
  };
}
