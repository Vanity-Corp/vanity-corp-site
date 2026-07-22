import type { Metadata } from "next";

import HomeView from "@/components/home/HomeView";
import {
  getClients,
  getPage,
  findSection,
  clientImage,
} from "@/lib/payload-cms";

// SEO metadata from the 'home' Page (falls back to the layout defaults).
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");
  const seo = page?.seo;
  return {
    ...(seo?.metaTitle ? { title: seo.metaTitle } : {}),
    ...(seo?.metaDescription ? { description: seo.metaDescription } : {}),
  };
}

// Server wrapper: fetches CMS content and passes it to the (client) HomeView.
// If the CMS is unreachable or empty, props are undefined and HomeView's
// sliders/headings fall back to their built-in values — so the page never breaks.
export default async function Home() {
  const [brands, artists, page] = await Promise.all([
    getClients("brand"),
    getClients("artist"),
    getPage("home"),
  ]);

  const brandItems = brands
    .map((c) => ({ image: clientImage(c) ?? "", name: c.name }))
    .filter((b) => b.image);
  const half = Math.ceil(brandItems.length / 2);
  const brands1 = brandItems.slice(0, half);
  const brands2 = brandItems.slice(half);

  const artistItems = artists
    .map((c, i) => ({
      id: c.id ?? i + 1,
      name: c.name,
      image: clientImage(c) ?? "",
      link: c.link ?? "#",
    }))
    .filter((a) => a.image);

  const brandSection = findSection(page, "clientsShowcase", "brand");
  const artistSection = findSection(page, "clientsShowcase", "artist");

  return (
    <HomeView
      brands1={brands1.length ? brands1 : undefined}
      brands2={brands2.length ? brands2 : undefined}
      artists={artistItems.length ? artistItems : undefined}
      brandsHeading={brandSection?.heading ?? undefined}
      artistsHeading={artistSection?.heading ?? undefined}
    />
  );
}
