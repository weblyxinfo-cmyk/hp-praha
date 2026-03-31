"use client";

import { useLocale } from "@/lib/LocaleContext";

const icons = [
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h6M9 17h4" /></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
];

const nums = ["01", "02", "03", "04"];

export default function ProcessSection() {
  const { t } = useLocale();

  return (
    <section id="proces" className="py-16 lg:py-24 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.process.label}</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-dark mt-2">{t.process.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.process.steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-3xl font-serif font-bold text-primary/20 mb-4">{nums[i]}</div>
              <div className="w-10 h-10 rounded-full bg-bg-mint flex items-center justify-center text-primary mb-4">{icons[i]}</div>
              <h3 className="font-serif text-lg font-bold text-text-dark mb-2">{step.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
