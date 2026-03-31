"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="o-mne" className="py-16 lg:py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center">
            <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-bg-mint border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-6 rounded-full border border-primary/10" />
              <div className="text-center text-text-muted">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-30">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-sm">Foto Petry</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-gold/20" />
            </div>
          </div>

          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.about.label}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-dark mt-2 mb-6">
              {t.about.title1}<br />{t.about.title2}
            </h2>
            <blockquote className="border-l-4 border-primary pl-5 mb-6">
              <p className="text-lg text-primary italic font-serif leading-relaxed">
                &ldquo;{t.about.quote}&rdquo;
              </p>
            </blockquote>
            <p className="text-text-body leading-relaxed mb-8">{t.about.text}</p>
            <div className="flex flex-wrap gap-3">
              {t.about.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-text-body">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
