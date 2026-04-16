import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homeopatie-praha.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/ochrana-osobnich-udaju`, changeFrequency: "yearly", priority: 0.2 },
  ];

  let articles: { slug: string; updatedAt: Date }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    articles = [];
  }

  const seen = new Set<string>();
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => {
      if (seen.has(a.slug)) return false;
      seen.add(a.slug);
      return true;
    })
    .map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...articlePages];
}
