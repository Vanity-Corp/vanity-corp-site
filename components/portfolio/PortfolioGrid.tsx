"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import type { CmsPortfolioProject, PortfolioCategory } from "@/lib/payload-cms";

const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  video: "Vidéo",
  graphisme: "Graphisme",
  shooting: "Shooting photo",
  site_web: "Site internet",
  strategie: "Accompagnement stratégique",
  reseaux_sociaux: "Réseaux sociaux",
};

// Panel redesign (vanity-corp-site/.claude/design-proposals/portfolio-panel-redesign.html):
// cascade timings below are copied verbatim from the validated mockup's
// motion annotations, not re-derived.
const PANEL_SLIDE_S = 0.3;
const META_DELAY_S = 0.08;
const TITLE_DELAY_S = 0.14;
const HERO_DELAY_S = 0.2;
const BODY_START_DELAY_S = 0.26;
const BODY_STAGGER_S = 0.08;
const GALLERY_STAGGER_S = 0.07;
const GRID_STAGGER_S = 0.05;

/** youtu.be/XXX or youtube.com/watch?v=XXX -> { embed, thumbnail } */
function parseYoutubeUrl(url?: string | null): { embed: string; thumbnail: string } | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be")
      ? u.pathname.slice(1)
      : u.searchParams.get("v");
    if (!id) return undefined;
    return {
      embed: `https://www.youtube.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/sddefault.jpg`,
    };
  } catch {
    return undefined;
  }
}

/** Fullscreen single-image viewer, opened by clicking a gallery thumbnail —
 * same backdrop/close-button visual language as HeroVideoDialog's modal. */
function ImageLightbox({
  images,
  index,
  title,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-full bg-neutral-900/50 p-2 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-neutral-900/80"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-black">
          <Image
            src={images[index]}
            alt={`${title} ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/70">
            <button
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              className="rounded-full p-1.5 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span>{index + 1} / {images.length}</span>
            <button
              onClick={() => onNavigate((index + 1) % images.length)}
              className="rounded-full p-1.5 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** The 3 narrative blocks are each independently optional — SHOOTING never
 * shows them at all, by design (grid format has no story to tell). */
function NarrativeBlocks({ project }: { project: CmsPortfolioProject }) {
  if (project.category === "shooting") return null;
  const blocks = [
    { label: "Le besoin", text: project.need },
    { label: "Notre approche", text: project.approach },
    { label: "Le résultat", text: project.result },
  ].filter((b): b is { label: string; text: string } => Boolean(b.text));
  if (blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BODY_START_DELAY_S + i * BODY_STAGGER_S, duration: 0.3 }}
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
            {b.label}
          </p>
          <p className="text-sm leading-relaxed text-white/80">{b.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function PanelHero({ project }: { project: CmsPortfolioProject }) {
  const gallery = (project.gallery ?? []).filter(Boolean);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (project.category === "video") {
    const parsed = parseYoutubeUrl(project.videoUrl);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: HERO_DELAY_S, duration: 0.35 }}
      >
        {parsed ? (
          <div className="overflow-hidden rounded-lg">
            <HeroVideoDialog
              animationStyle="from-center"
              videoSrc={parsed.embed}
              thumbnailSrc={parsed.thumbnail}
              thumbnailAlt={project.title}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Vidéo indisponible.</p>
        )}
      </motion.div>
    );
  }

  if (project.category === "graphisme") {
    const images = gallery.length ? gallery : project.coverUrl ? [project.coverUrl] : [];
    return (
      <>
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_DELAY_S + i * GALLERY_STAGGER_S, duration: 0.35 }}
              // First visual wider (16:9, "cover" effect), rest 4:3 — not a
              // uniform grid like before.
              className={`group relative w-full cursor-zoom-in overflow-hidden rounded-lg ${i === 0 ? "aspect-video" : "aspect-[4/3]"}`}
            >
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {lightboxIndex !== null && (
            <ImageLightbox
              images={images}
              index={lightboxIndex}
              title={project.title}
              onClose={() => setLightboxIndex(null)}
              onNavigate={setLightboxIndex}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  if (project.category === "shooting") {
    const images = gallery.length ? gallery : project.coverUrl ? [project.coverUrl] : [];
    return (
      <>
        <div className="grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: HERO_DELAY_S + i * GRID_STAGGER_S, duration: 0.3 }}
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt={`${project.title} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {lightboxIndex !== null && (
            <ImageLightbox
              images={images}
              index={lightboxIndex}
              title={project.title}
              onClose={() => setLightboxIndex(null)}
              onNavigate={setLightboxIndex}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default (site_web / strategie / reseaux_sociaux).
  if (!project.coverUrl) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: HERO_DELAY_S, duration: 0.35 }}
      className="relative aspect-video w-full overflow-hidden rounded-lg"
    >
      <Image src={project.coverUrl} alt={project.title} fill className="object-cover" />
    </motion.div>
  );
}

/** Footer secondary action, varies by category — see mockup's footer-cta. */
function SecondaryAction({ project }: { project: CmsPortfolioProject }) {
  if (project.category === "video" && project.videoUrl) {
    return (
      <a
        href={project.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 hover:text-white/80"
      >
        Voir sur YouTube ↗
      </a>
    );
  }
  if (project.category === "graphisme" || project.category === "shooting") {
    const count = (project.gallery ?? []).filter(Boolean).length;
    if (count === 0) return null;
    const noun = project.category === "graphisme" ? "visuel" : "photo";
    return <span className="text-white/50">{count} {noun}{count > 1 ? "s" : ""}</span>;
  }
  return null;
}

function PanelContent({
  project,
  onNext,
}: {
  project: CmsPortfolioProject;
  onNext: () => void;
}) {
  const metaPills = [
    project.year ? { key: "year", label: String(project.year), accent: true } : null,
    { key: "category", label: CATEGORY_LABELS[project.category], accent: false },
    project.services?.length
      ? { key: "services", label: project.services.join(" · "), accent: false }
      : null,
  ].filter((p): p is { key: string; label: string; accent: boolean } => Boolean(p));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: META_DELAY_S, duration: 0.3 }}
        className="mb-1 flex flex-wrap gap-1.5"
      >
        {metaPills.map((p) => (
          <span
            key={p.key}
            className={`rounded-full border px-2.5 py-0.5 text-[10.5px] ${
              p.accent
                ? "border-amber-900/50 text-amber-400"
                : "border-white/10 text-white/60"
            }`}
          >
            {p.label}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: TITLE_DELAY_S, duration: 0.3 }}
      >
        <h2 className="mb-1 mt-2 text-2xl font-semibold text-white">{project.title}</h2>
        {project.client && <p className="mb-4 text-sm text-white/60">{project.client}</p>}
      </motion.div>

      <div className="mb-4">
        <PanelHero project={project} />
      </div>

      <div className="mb-2">
        <NarrativeBlocks project={project} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
        <button onClick={onNext} className="flex items-center gap-1.5 text-white hover:text-white/80">
          → Projet suivant
        </button>
        <SecondaryAction project={project} />
      </div>
    </>
  );
}

export function PortfolioGrid({ projects }: { projects: CmsPortfolioProject[] }) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "all">("all");
  const [selected, setSelected] = useState<CmsPortfolioProject | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );
  const visible = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const goToNext = () => {
    if (!selected) return;
    const i = visible.findIndex((p) => p.slug === selected.slug);
    if (i === -1) return;
    setSelected(visible[(i + 1) % visible.length]);
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-2 px-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeCategory === "all" ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeCategory === c ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((project) => (
          <button
            key={project.slug}
            onClick={() => setSelected(project)}
            className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black text-left"
          >
            {project.coverUrl && (
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-end bg-black/50 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-lg font-medium text-white">{project.title}</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            {/* Slides in from the right edge once per panel open/close — "Projet
                suivant" swaps the content below without re-sliding the shell,
                but still replays the meta/title/hero/body cascade (key swap). */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto bg-neutral-950 p-6 shadow-2xl sm:p-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: PANEL_SLIDE_S, ease: "easeInOut" }}
            >
              <button
                onClick={() => setSelected(null)}
                className="mb-5 flex items-center gap-2 text-sm text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
                Fermer
              </button>
              <div key={selected.slug}>
                <PanelContent project={selected} onNext={goToNext} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
