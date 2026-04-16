"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";

export default function Footer() {
  const { t, locale, setLocale } = useLocale();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif text-xl font-bold mb-1">Homeopatie Petra</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-4">Ing. Petra Cihlářová</div>
            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line max-w-md">{t.footer.brand}</p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 font-medium mb-4">{t.nav.about}</h3>
            <ul className="space-y-2.5">
              <li><Link href="/#o-mne" className="text-sm text-white/70 hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/#proces" className="text-sm text-white/70 hover:text-white transition-colors">{t.nav.process}</Link></li>
              <li><Link href="/#cenik" className="text-sm text-white/70 hover:text-white transition-colors">{t.nav.pricing}</Link></li>
              <li><Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">{t.nav.articles}</Link></li>
              <li><Link href="/#faq" className="text-sm text-white/70 hover:text-white transition-colors">{t.nav.faq}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 font-medium mb-4">{t.nav.contact}</h3>
            <ul className="space-y-2.5">
              <li><a href="tel:+420776385429" className="text-sm text-white/70 hover:text-white transition-colors">+420 776 385 429</a></li>
              <li><a href="mailto:petra@homeopatie-praha.com" className="text-sm text-white/70 hover:text-white transition-colors">petra@homeopatie-praha.com</a></li>
              <li><span className="text-sm text-white/70">Dřevná 382/2, Praha 2</span></li>
              <li>
                <button
                  type="button"
                  onClick={() => setLocale(locale === "cs" ? "en" : "cs")}
                  className="text-sm text-primary-light hover:text-white transition-colors"
                >
                  {t.footer.english}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
          <Link href="/ochrana-osobnich-udaju" className="text-xs text-white/40 hover:text-white/60 transition-colors">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
