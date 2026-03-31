"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="font-serif text-xl font-bold mb-1">Homeopatie Petra</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-4">Ing. Petra Cihlářová</div>
            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{t.footer.brand}</p>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 font-medium mb-4">{t.nav.about}</h3>
            <ul className="space-y-2.5">
              {t.footer.aboutLinks.map((label) => (
                <li key={label}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 font-medium mb-4">Homeopatie</h3>
            <ul className="space-y-2.5">
              {t.footer.homeoLinks.map((label) => (
                <li key={label}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 font-medium mb-4">Kontakt</h3>
            <ul className="space-y-2.5">
              <li><a href="tel:+420776385429" className="text-sm text-white/70 hover:text-white transition-colors">+420 776 385 429</a></li>
              <li><a href="mailto:petra@homeopatie-praha.com" className="text-sm text-white/70 hover:text-white transition-colors">petra@homeopatie-praha.com</a></li>
              <li><span className="text-sm text-white/70">Dřevná 382/2, Praha 2</span></li>
              <li><a href="#" className="text-sm text-primary-light hover:text-white transition-colors">{t.footer.english}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; 2025 {t.footer.copyright}</p>
          <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
