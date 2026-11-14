import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Footer } from "@/components/Footer";
import { getArticle, articleCoverImage, mediaUrl } from "@/lib/payload-cms";

const SITE_URL = "https://vanitycorp.fr";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};

  const title = article.seoMetaTitle || `${article.title} | Vanity Corp`;
  const description = article.seoMetaDescription || article.excerpt || undefined;
  const ogImage = mediaUrl(article.seoOgImageUrl) ?? articleCoverImage(article);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const coverUrl = articleCoverImage(article);
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="dark min-h-screen w-full text-white flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        {date && (
          <span className="text-[11px] uppercase tracking-widest text-indigo-400">
            {date}
          </span>
        )}
        <h1 className="mt-3 mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {article.title}
        </h1>

        {coverUrl && (
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl">
            <Image src={coverUrl} alt={article.title} fill className="object-cover" />
          </div>
        )}

        <article className="prose prose-invert prose-neutral max-w-none prose-headings:font-semibold prose-a:text-indigo-400">
          <Markdown remarkPlugins={[remarkGfm]}>{article.content ?? ""}</Markdown>
        </article>
      </main>
      <Footer />
    </div>
  );
}
