"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-dark leading-[1.1] mb-6">
              {t.hero.title1}{" "}
              <em className="text-gold not-italic font-serif italic">
                {t.hero.title2}
              </em>
            </h1>

            <p className="text-lg text-text-body leading-relaxed mb-8 max-w-lg">
              {t.hero.text}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#kontakt" className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white rounded-lg px-7 py-3.5 text-sm font-medium transition-colors">
                {t.hero.cta}
              </a>
              <a href="#proces" className="inline-flex items-center justify-center text-text-dark hover:text-primary text-sm font-medium transition-colors underline underline-offset-4">
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold text-primary font-serif">15+</div>
                <div className="text-xs text-text-muted">{t.hero.years}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-serif">Indie</div>
                <div className="text-xs text-text-muted">{t.hero.india}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-serif">LMHI</div>
                <div className="text-xs text-text-muted">{t.hero.lmhi}</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] rounded-3xl bg-bg-mint border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-4 rounded-full border border-primary/10" />
              <div className="text-center text-text-muted">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-30">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-sm">{t.hero.photo}</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gold/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
