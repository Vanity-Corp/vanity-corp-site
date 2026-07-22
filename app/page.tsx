import type { Metadata } from "next";

import HomeView from "@/components/home/HomeView";
import { cmsMetadata } from "@/lib/cmsMetadata";
import type { Service } from "@/lib/services";
import {
  getClients,
  getPage,
  getServices,
  getSiteSettings,
  getTeamMembers,
  clientImage,
  serviceImage,
  teamMemberImage,
  mediaUrl,
  type CmsPageSection,
} from "@/lib/payload-cms";

// SEO metadata from the 'home' Page (falls back to the site defaults).
export function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("home", {
    title: "Vanity corp | Agence de communication créative 360",
    description:
      "Tout buzzer pour donner de la visibilité à votre projet est un savoir faire. Vanity Corp est une agence de communication créative 360.",
  });
}

// Server wrapper: fetches CMS content and passes it to the (client) HomeView.
// Every prop is optional — if the CMS is empty/unreachable, HomeView falls back
// to its built-in content, so the page never breaks.
export default async function Home() {
  const [brands, artists, page, settings, cmsServices, team] = await Promise.all([
    getClients("brand"),
    getClients("artist"),
    getPage("home"),
    getSiteSettings(),
    getServices(),
    getTeamMembers(),
  ]);

  // --- Clients (sliders) ---
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

  // --- Page sections ---
  const sections: CmsPageSection[] = page?.sections ?? [];
  const clientsSection = (category: string) =>
    sections.find((s) => s.blockType === "clientsShowcase" && s.category === category);
  const richSection = (key: string) =>
    sections.find((s) => s.blockType === "richSection" && s.key === key);

  const aboutSec = richSection("about");
  const worldmapSec = richSection("worldmap");
  const ctaSec = richSection("cta");
  const teamSec = richSection("team");

  const toChips = (sec?: CmsPageSection) =>
    (sec?.items ?? [])
      .map((i) => i?.value)
      .filter((v): v is string => Boolean(v));

  // --- Showreel (Site Settings) ---
  const sr = settings?.showreel;
  const showreelSrc = mediaUrl(sr?.video?.url) ?? sr?.videoUrl ?? undefined;
  const showreelPoster = mediaUrl(sr?.poster?.url) ?? sr?.posterUrl ?? undefined;

  // --- Services ---
  const services: Service[] = cmsServices.map((s) => ({
    id: s.slug,
    eyebrow: s.eyebrow ?? "",
    title: s.title,
    color: s.color ?? "#7c86ff",
    link: s.link ?? s.slug,
    reverse: s.reverse ?? false,
    description: s.description ?? "",
    image: serviceImage(s) ?? "",
    features: (s.features ?? []).map((f) => ({
      name: f.name ?? "",
      description: f.description ?? "",
      icon: f.icon ?? "Camera",
    })),
  }));

  // --- Team ---
  const teamMembers = team
    .map((m) => ({
      title: m.name,
      src: teamMemberImage(m) ?? "",
      content: m.bio ?? "",
    }))
    .filter((m) => m.src);

  return (
    <HomeView
      brands1={brands1.length ? brands1 : undefined}
      brands2={brands2.length ? brands2 : undefined}
      artists={artistItems.length ? artistItems : undefined}
      brandsHeading={clientsSection("brand")?.heading ?? undefined}
      artistsHeading={clientsSection("artist")?.heading ?? undefined}
      showreelSrc={showreelSrc}
      showreelPoster={showreelPoster}
      about={
        aboutSec
          ? {
              eyebrow: aboutSec.eyebrow ?? undefined,
              heading: aboutSec.heading ?? undefined,
              body: aboutSec.body ?? undefined,
              chips: toChips(aboutSec),
            }
          : undefined
      }
      worldmap={
        worldmapSec
          ? {
              heading: worldmapSec.heading ?? undefined,
              body: worldmapSec.body ?? undefined,
              ctaLabel: worldmapSec.ctaLabel ?? undefined,
              ctaHref: worldmapSec.ctaHref ?? undefined,
            }
          : undefined
      }
      cta={
        ctaSec
          ? {
              heading: ctaSec.heading ?? undefined,
              body: ctaSec.body ?? undefined,
              ctaLabel: ctaSec.ctaLabel ?? undefined,
              ctaHref: ctaSec.ctaHref ?? undefined,
            }
          : undefined
      }
      teamHeading={teamSec?.heading ?? undefined}
      services={services.length ? services : undefined}
      teamMembers={teamMembers.length ? teamMembers : undefined}
    />
  );
}
