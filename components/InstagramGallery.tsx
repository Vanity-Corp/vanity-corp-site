"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// ── Data ──────────────────────────────────────────────────────────────────────
// Pour ajouter une nouvelle publication, il suffit d'ajouter une ligne ici.

interface InstagramPost {
  /** Identifiant unique, utilisé comme key React */
  id: number;
  /** URL de l'image de couverture affichée dans la grille */
  thumbnail: string;
  /** URL publique du post (utilisée pour l'embed dans la modal) */
  postUrl: string;
  /** Texte alternatif de l'image (accessibilité) */
  alt?: string;
}

/**
 * Construit une URL de thumbnail directe à partir de l'URL publique d'un post
 * ("astuce" `media/?size=l`, non officielle mais largement utilisée pour éviter
 * de charger l'embed complet juste pour obtenir une image de couverture).
 *
 * ⚠️ Cette URL peut être bloquée par Instagram selon le contexte (hotlink
 * protection, rate limiting). Pour un rendu 100% fiable en production,
 * il est recommandé de télécharger les visuels une fois, de les héberger
 * vous-même (ex: /public/instagram/xxx.jpg ou un CDN), puis de renseigner
 * directement `thumbnail` ci-dessous.
 */
function buildThumbnail(postUrl: string): string {
  const normalized = postUrl.endsWith("/") ? postUrl : `${postUrl}/`;
  return `${normalized}media/?size=l`;
}

type RawPost = Pick<InstagramPost, "id" | "postUrl" | "alt"> & {
  thumbnail?: string;
};

const RAW_POSTS: RawPost[] = [
  {
    id: 1,
    postUrl: "https://www.instagram.com/p/DZNZTasuUWn/",
    alt: "Tournage vidéo au studio Vanihouse",
    thumbnail: "/DZNZTasuUWn.jpg",
  },
  {
    id: 2,
    postUrl: "https://www.instagram.com/p/DZxaszyuIhh/",
    alt: "Shooting photo en studio",
    thumbnail: "/DZxaszyuIhh.jpg",
  },
  {
    id: 3,
    postUrl: "https://www.instagram.com/p/DU3dMcsDDhH/",
    alt: "Séance podcast au studio Vanihouse",
    thumbnail: "/DU3dMcsDDhH.jpg",
  },
  {
    id: 4,
    postUrl: "https://www.instagram.com/p/DZ7vlcdO8qn/",
    alt: "Production contenu réseaux sociaux en studio",
    thumbnail: "/DZ7vlcdO8qn.jpg",
  },
];
const instagramPosts: InstagramPost[] = RAW_POSTS.map((post) => ({
  ...post,
  thumbnail: post.thumbnail ?? buildThumbnail(post.postUrl),
}));

// ── Icône ─────────────────────────────────────────────────────────────────────
// L'icône "Instagram" de lucide-react est dépréciée (supprimée en v1.x).
// On utilise donc un SVG inline dédié pour rester indépendant de la version
// de lucide-react installée dans le projet.

function InstagramGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ── Carte ─────────────────────────────────────────────────────────────────────

interface InstagramCardProps {
  post: InstagramPost;
  index: number;
  onOpen: (post: InstagramPost) => void;
}

const InstagramCard = memo(function InstagramCard({
  post,
  index,
  onOpen,
}: InstagramCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(post)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/50 shadow-lg shadow-black/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      aria-haspopup="dialog"
      aria-label="Ouvrir la publication Instagram"
    >
      <Image
        src={post.thumbnail}
        alt={post.alt ?? "Publication Instagram Vanihouse Studio"}
        loading="lazy"
        width={700}
        height={700}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Overlay discret au hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 opacity-0 transition-all duration-300 group-hover:bg-neutral-950/50 group-hover:opacity-100">
        <span className="scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <InstagramGlyph size={28} />
        </span>
      </div>
    </motion.button>
  );
});

// ── Modal ─────────────────────────────────────────────────────────────────────
// Charge le script Instagram et l'embed uniquement à l'ouverture de la modal.
// La Dialog (shadcn/Radix) gère nativement Echap, clic extérieur, blocage du
// scroll body et le focus trap.

interface InstagramModalProps {
  post: InstagramPost | null;
  onClose: () => void;
}

function InstagramModal({ post, onClose }: InstagramModalProps) {
  const [embedReady, setEmbedReady] = useState(false);

  // Le script Instagram remplace le <blockquote> par sa propre iframe dans le
  // DOM réel, sans que React n'en soit informé. Si ce nœud est déclaré en JSX,
  // React tente ensuite de le "removeChild" lui-même lors du unmount et plante
  // (NotFoundError) car le nœud original n'existe plus. Pour éviter ça, React
  // ne gère ici qu'un <div> vide ; l'insertion/le nettoyage du blockquote se
  // fait entièrement en impératif, hors de la réconciliation React.
  //
  // On utilise une ref-callback (plutôt qu'un simple useRef + effect sur
  // `post`) car <DialogContent> est porté par Radix et ne monte dans le DOM
  // qu'une fois la Dialog ouverte : un useEffect basé uniquement sur `post`
  // peut s'exécuter avant que ce nœud existe réellement, et ne se redéclenche
  // jamais ensuite → c'est ce qui causait le chargement infini.
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);

  useEffect(() => {
    if (!post || !containerNode) {
      setEmbedReady(false);
      return;
    }

    setEmbedReady(false);
    containerNode.innerHTML = "";

    const blockquote = document.createElement("blockquote");
    blockquote.className = "instagram-media";
    blockquote.setAttribute("data-instgrm-permalink", post.postUrl);
    blockquote.setAttribute("data-instgrm-version", "14");
    Object.assign(blockquote.style, {
      background: "transparent",
      border: "0",
      borderRadius: "12px",
      margin: "0",
      maxWidth: "100%",
      minWidth: "326px",
      width: "100%",
    });
    containerNode.appendChild(blockquote);

    const processEmbed = () => {
      const instgrm = (window as any).instgrm;
      instgrm?.Embeds?.process();
      setEmbedReady(true);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="//www.instagram.com/embed.js"]',
    );

    if (existingScript) {
      // Script déjà chargé (ouverture précédente) : on redemande juste le traitement.
      processEmbed();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    }

    // Nettoyage impératif : safe même si Instagram a remplacé le contenu,
    // puisqu'on vide `containerNode` lui-même plutôt que de laisser React
    // essayer de retirer un enfant qu'il pense encore posséder.
    return () => {
      containerNode.innerHTML = "";
    };
  }, [post, containerNode]);

  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[500px] overflow-hidden border-white/10 bg-neutral-950 p-0">
        {/* Titre accessible pour les lecteurs d'écran (non affiché visuellement) */}
        <DialogTitle className="sr-only">
          Publication Instagram Vanihouse Studio
        </DialogTitle>

        <div className="relative flex min-h-[420px] items-center justify-center p-4">
          {!embedReady && (
            <div className="absolute flex flex-col items-center gap-3 text-neutral-500">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-xs">Chargement de la publication…</span>
            </div>
          )}

          {/* React ne gère que ce conteneur vide : le contenu Instagram y est
              inséré/retiré manuellement (voir useEffect ci-dessus). */}
          <div ref={containerRef} className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Composant principal ────────────────────────────────────────────────────────

export function InstagramGallery() {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const handleOpen = useCallback((post: InstagramPost) => {
    setSelectedPost(post);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPost(null);
  }, []);

  return (
    <section className="border-b border-white/10 max-w-[1920px] m-auto px-6 sm:px-10 py-12">
      <p className="text-[11px] uppercase tracking-widest text-indigo-400 mb-4">
        Instagram
      </p>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-8">
        Nos dernières
        <br />
        <span className="font-normal text-indigo-400 italic">réalisations</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {instagramPosts.map((post, index) => (
          <InstagramCard
            key={post.id}
            post={post}
            index={index}
            onOpen={handleOpen}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="https://www.instagram.com/vanihouse.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-400/30 hover:border-indigo-300"
        >
          Voir plus sur Instagram →
        </a>
      </div>

      <InstagramModal post={selectedPost} onClose={handleClose} />
    </section>
  );
}
