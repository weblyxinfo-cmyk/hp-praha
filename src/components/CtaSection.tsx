"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function CtaSection() {
  const { t } = useLocale();

  return (
    <section id="kontakt" className="bg-primary-dark text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium">{t.cta.label}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 mb-3 leading-tight">
              {t.cta.title1}{" "}
              <em className="text-gold italic">{t.cta.title2}</em>
            </h2>
            <p className="text-white/70 text-sm">{t.cta.address}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+420776385429" className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-primary-dark rounded-lg px-7 py-3.5 text-sm font-semibold transition-colors">
              +420 776 385 429
            </a>
            <a href="mailto:petra@homeopatie-praha.com" className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white rounded-lg px-7 py-3.5 text-sm font-medium transition-colors">
              petra@homeopatie-praha.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
