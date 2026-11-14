import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getArticles, articleCoverImage } from "@/lib/payload-cms";

const SITE_URL = "https://vanitycorp.fr";

export const metadata: Metadata = {
  title: "Actualités | Vanity Corp",
  description:
    "Les dernières actualités, coulisses de tournage et conseils de l'agence Vanity Corp.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function Blog() {
  const articles = await getArticles();

  return (
    <div className="dark min-h-screen w-full text-white flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
        <div className="mb-12">
          <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-indigo-400">
            Actualités
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Nos dernières actualités
          </h1>
        </div>

        {articles.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucun article pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.map((article, i) => (
              <BlogCard
                key={article.slug}
                article={article}
                coverUrl={articleCoverImage(article)}
                index={i}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
