"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";
import type { CmsArticle } from "@/lib/payload-cms";

export function BlogCard({
  article,
  coverUrl,
  index,
}: {
  article: CmsArticle;
  coverUrl?: string;
  index: number;
}) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <motion.div {...fadeUpInView(index)}>
      <Link
        href={`/blog/${article.slug}`}
        className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
      >
        {coverUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={coverUrl}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {date && (
            <span className="text-[11px] uppercase tracking-widest text-indigo-400">
              {date}
            </span>
          )}
          <h2 className="text-lg font-semibold text-white">{article.title}</h2>
          {article.excerpt && (
            <p className="text-sm leading-relaxed text-neutral-400">{article.excerpt}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
