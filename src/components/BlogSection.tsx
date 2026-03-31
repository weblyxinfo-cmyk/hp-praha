"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { fallbackArticlesCs, fallbackArticlesEn } from "@/lib/fallback";

interface Article {
  id: string;
  slug: string;
  locale: string;
  category: string;
  title: string;
  description: string;
  image: string | null;
  featured: boolean;
}

export default function BlogSection() {
  const { locale, t } = useLocale();
  const fallback = locale === "en" ? fallbackArticlesEn : fallbackArticlesCs;
  const [articles, setArticles] = useState<Article[]>(fallback);

  useEffect(() => {
    fetch(`/api/public/articles?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.length > 0) setArticles(data);
        else setArticles(locale === "en" ? fallbackArticlesEn : fallbackArticlesCs);
      })
      .catch(() => {});
  }, [locale]);

  const featured = articles.find((a) => a.featured) || articles[0];
  const others = articles.filter((a) => a !== featured).slice(0, 2);

  return (
    <section id="clanky" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.blog.label}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-dark mt-2">{t.blog.title}</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            {t.blog.all} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featured && (
            <a
              href={`/blog/${featured.slug}`}
              className="md:row-span-2 relative rounded-2xl overflow-hidden bg-primary-dark group cursor-pointer min-h-[300px] md:min-h-[400px] block"
            >
              {featured.image && (
                <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary opacity-90" />
              <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                <span className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-3">{featured.category}</span>
                <h3 className="text-xl lg:text-2xl font-serif font-bold text-white mb-3 leading-snug">{featured.title}</h3>
                {featured.description && <p className="text-white/70 text-sm mb-4 leading-relaxed">{featured.description}</p>}
                <span className="text-gold text-sm font-medium group-hover:text-gold-light transition-colors">{t.blog.readFull} &rarr;</span>
              </div>
            </a>
          )}

          {others.map((article) => (
            <a
              key={article.id}
              href={`/blog/${article.slug}`}
              className="relative rounded-2xl overflow-hidden bg-primary group cursor-pointer min-h-[180px] block"
            >
              {article.image && (
                <img src={article.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-2">{article.category}</span>
                <h3 className="text-lg font-serif font-bold text-white mb-3 leading-snug">{article.title}</h3>
                <span className="text-gold text-sm font-medium group-hover:text-gold-light transition-colors">{t.blog.read} &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
