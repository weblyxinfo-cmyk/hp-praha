"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Stats {
  articles: number;
  testimonials: number;
  images: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/articles").then((r) => r.json()),
      fetch("/api/admin/testimonials").then((r) => r.json()),
      fetch("/api/admin/images").then((r) => r.json()),
    ]).then(([articles, testimonials, images]) => {
      if (articles.error) {
        router.push("/admin/login");
        return;
      }
      setStats({
        articles: articles.length,
        testimonials: testimonials.length,
        images: images.length,
      });
    });
  }, [router]);

  const cards = [
    { label: "Články", count: stats?.articles ?? "–", href: "/admin/articles", color: "bg-primary" },
    { label: "Recenze", count: stats?.testimonials ?? "–", href: "/admin/testimonials", color: "bg-gold" },
    { label: "Obrázky", count: stats?.images ?? "–", href: "/admin/images", color: "bg-primary-light" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-text-dark mb-6">
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} text-white flex items-center justify-center text-lg font-bold mb-3`}>
              {card.count}
            </div>
            <div className="text-sm font-medium text-text-dark">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h2 className="font-semibold text-text-dark mb-2">Rychlé akce</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/articles?new=1"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            + Nový článek
          </Link>
          <Link
            href="/admin/testimonials?new=1"
            className="inline-flex items-center gap-2 bg-gold text-primary-dark rounded-lg px-4 py-2 text-sm font-medium hover:bg-gold-light transition-colors"
          >
            + Nová recenze
          </Link>
          <Link
            href="/admin/images"
            className="inline-flex items-center gap-2 border border-gray-200 text-text-body rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Nahrát obrázek
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 border border-gray-200 text-text-body rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Zobrazit web &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
