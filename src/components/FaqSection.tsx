"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function FaqSection() {
  const { t } = useLocale();

  return (
    <section id="faq" className="bg-bg-cream py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.faq.label}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-dark mt-3 leading-tight">
            {t.faq.title}
          </h2>
        </div>

        <div className="divide-y divide-border border-t border-b border-border">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <span className="text-base font-medium text-text-dark pr-4">{item.q}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-primary transition-transform group-open:rotate-45">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="text-sm text-text-body leading-relaxed mt-3 pr-10">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
