"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function PricingSection() {
  const { t } = useLocale();

  return (
    <section id="cenik" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.pricing.label}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-dark mt-3 leading-tight">
            {t.pricing.title1}{" "}
            <em className="text-gold not-italic italic">{t.pricing.title2}</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {t.pricing.items.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-border bg-bg-cream/40 p-7 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-serif text-xl font-bold text-text-dark">{item.name}</div>
                  <div className="text-xs text-text-muted mt-1">{item.duration}</div>
                </div>
                <div className="text-2xl font-serif font-bold text-primary whitespace-nowrap">{item.price}</div>
              </div>
              <p className="text-sm text-text-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-text-muted mt-8 max-w-2xl">{t.pricing.note}</p>
      </div>
    </section>
  );
}
