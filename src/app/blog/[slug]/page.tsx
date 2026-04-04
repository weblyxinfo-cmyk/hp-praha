import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "cs";
  const isCs = locale === "cs";

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors mb-8"
          >
            &larr; {isCs ? "Zpět na články" : "Back to articles"}
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="text-xs tracking-[0.15em] uppercase text-primary font-medium">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-dark mt-3 mb-4 leading-tight">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-lg text-text-body leading-relaxed">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-6 text-sm text-text-muted">
              <time>
                {new Date(article.publishedAt).toLocaleDateString(
                  locale === "cs" ? "cs-CZ" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
              <span>Petra Cihlářová</span>
            </div>
          </header>

          {/* Hero image */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-text-body leading-relaxed">
            {article.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 my-4 space-y-1">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              &larr; {isCs ? "Všechny články" : "All articles"}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
