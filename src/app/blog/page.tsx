import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "cs";
  const isCs = locale === "cs";

  const articles = await prisma.article.findMany({
    where: { published: true, locale },
    orderBy: { publishedAt: "desc" },
  });

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => a !== featured);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              {isCs ? "Blog" : "Blog"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-dark mt-2">
              {isCs ? "Články & případy z praxe" : "Articles & Case Studies"}
            </h1>
            <p className="text-text-muted mt-3 max-w-2xl">
              {isCs
                ? "Přečtěte si o mých zkušenostech s homeopatickou léčbou, případech z praxe a novinkách z oboru."
                : "Read about my experiences with homeopathic treatment, case studies, and news from the field."}
            </p>
          </div>

          {/* Featured article */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="relative rounded-2xl overflow-hidden bg-primary-dark group cursor-pointer block mb-10 min-h-[300px] md:min-h-[400px]"
            >
              {featured.image && (
                <img
                  src={featured.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary opacity-90" />
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 min-h-[300px] md:min-h-[400px]">
                <span className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-3">
                  {featured.category}
                </span>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-3 leading-snug max-w-2xl">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="text-white/70 text-sm mb-4 leading-relaxed max-w-xl">
                    {featured.description}
                  </p>
                )}
                <span className="text-gold text-sm font-medium group-hover:text-gold-light transition-colors">
                  {isCs ? "Číst celý článek" : "Read full article"} &rarr;
                </span>
              </div>
            </Link>
          )}

          {/* Articles grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-colors bg-white"
                >
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden bg-bg-mint">
                      <img
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs tracking-[0.15em] uppercase text-primary font-medium">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-text-dark mt-2 mb-2 leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <time className="text-xs text-text-muted">
                        {new Date(article.publishedAt).toLocaleDateString(
                          locale === "cs" ? "cs-CZ" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </time>
                      <span className="text-primary text-sm font-medium group-hover:text-primary-dark transition-colors">
                        {isCs ? "Číst" : "Read"} &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {articles.length === 0 && (
            <p className="text-center text-text-muted py-20">
              {isCs ? "Zatím nejsou publikovány žádné články." : "No articles published yet."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
