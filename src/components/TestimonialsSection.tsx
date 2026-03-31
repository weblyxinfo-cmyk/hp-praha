"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/LocaleContext";

interface Testimonial {
  id: string;
  nameCs: string;
  nameEn: string;
  textCs: string;
  textEn: string;
  detailCs: string;
  detailEn: string;
  stars: number;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { locale, t } = useLocale();
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/public/testimonials")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  const name = (item: Testimonial) => (locale === "en" && item.nameEn ? item.nameEn : item.nameCs);
  const text = (item: Testimonial) => (locale === "en" && item.textEn ? item.textEn : item.textCs);
  const detail = (item: Testimonial) => (locale === "en" && item.detailEn ? item.detailEn : item.detailCs);

  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.testimonials.label}</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-dark mt-2">{t.testimonials.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 lg:p-8 border border-border">
              <Stars count={item.stars} />
              <p className="text-text-body italic leading-relaxed mb-6">&ldquo;{text(item)}&rdquo;</p>
              <div>
                <div className="font-semibold text-text-dark text-sm">{name(item)}</div>
                <div className="text-xs text-primary">{detail(item)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
