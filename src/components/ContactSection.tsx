"use client";

import { useLocale } from "@/lib/LocaleContext";
import BookingForm from "./BookingForm";

export default function ContactSection() {
  const { t } = useLocale();

  return (
    <section id="kontakt" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.form.label}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text-dark mt-3 leading-tight">
              {t.form.title1}{" "}
              <em className="text-gold not-italic italic">{t.form.title2}</em>
            </h2>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Telefon</dt>
                <dd className="mt-1">
                  <a href="tel:+420776385429" className="text-lg text-text-dark hover:text-primary transition-colors">
                    +420 776 385 429
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:petra@homeopatie-praha.com" className="text-lg text-text-dark hover:text-primary transition-colors">
                    petra@homeopatie-praha.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-text-muted">Adresa</dt>
                <dd className="mt-1 text-text-dark">
                  Dřevná 382/2<br />
                  128 00 Praha 2 – Nové Město
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
