"use client";

import { useLocale } from "@/lib/LocaleContext";

const treatmentsCs = [
  { label: "Alergie & astma", highlight: true },
  { label: "Ekzémy", highlight: true },
  { label: "Migrény", highlight: false },
  { label: "Ženské obtíže", highlight: true },
  { label: "Neplodnost", highlight: false },
  { label: "Chronická únava", highlight: false },
  { label: "Deprese & fobie", highlight: true },
  { label: "Nespavost", highlight: false },
  { label: "Menopauza", highlight: true },
  { label: "Těhotenství", highlight: false },
  { label: "Záněty", highlight: true },
  { label: "Snížená imunita", highlight: false },
  { label: "Záněty středouší", highlight: true },
  { label: "Angína", highlight: false },
];

const treatmentsEn = [
  { label: "Allergies & asthma", highlight: true },
  { label: "Eczema", highlight: true },
  { label: "Migraines", highlight: false },
  { label: "Women's health", highlight: true },
  { label: "Infertility", highlight: false },
  { label: "Chronic fatigue", highlight: false },
  { label: "Depression & phobias", highlight: true },
  { label: "Insomnia", highlight: false },
  { label: "Menopause", highlight: true },
  { label: "Pregnancy", highlight: false },
  { label: "Inflammation", highlight: true },
  { label: "Low immunity", highlight: false },
  { label: "Ear infections", highlight: true },
  { label: "Tonsillitis", highlight: false },
];

export default function TreatmentSection() {
  const { locale, t } = useLocale();
  const treatments = locale === "en" ? treatmentsEn : treatmentsCs;

  return (
    <section id="lecba" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.treatments.label}</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-dark mt-2 mb-4">{t.treatments.title}</h2>
          <p className="text-text-body leading-relaxed">{t.treatments.text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {treatments.map((tr) => (
            <span key={tr.label} className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${tr.highlight ? "bg-primary text-white" : "bg-white text-text-body border border-border hover:border-primary/30"}`}>
              {tr.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
