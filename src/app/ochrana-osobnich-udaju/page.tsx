import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: "Informace o zpracování osobních údajů dle GDPR — Homeopatie Petra, Ing. Petra Cihlářová.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white py-16 lg:py-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm sm:prose-base">
          <h1 className="font-serif text-3xl sm:text-4xl text-text-dark mb-2">Ochrana osobních údajů</h1>
          <p className="text-text-muted text-sm mb-10">Informace dle nařízení EU 2016/679 (GDPR)</p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">1. Správce osobních údajů</h2>
          <p className="text-text-body leading-relaxed">
            <strong>Ing. Petra Cihlářová</strong><br />
            Dřevná 382/2, 128 00 Praha 2 – Nové Město<br />
            E-mail: petra@homeopatie-praha.com<br />
            Tel.: +420 776 385 429
          </p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">2. Rozsah zpracovávaných údajů</h2>
          <p className="text-text-body leading-relaxed">
            Zpracováváme pouze údaje, které nám sami poskytnete — jméno, e-mail, telefon a text vaší zprávy
            odeslaný přes kontaktní formulář. V rámci konzultace dále zpracováváme zdravotní údaje nezbytné
            pro homeopatickou léčbu, a to výhradně s vaším souhlasem.
          </p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">3. Účel zpracování</h2>
          <ul className="list-disc pl-5 text-text-body leading-relaxed space-y-2">
            <li>Vyřízení vaší poptávky nebo dotazu (oprávněný zájem).</li>
            <li>Poskytnutí homeopatické konzultace a vedení dokumentace (plnění smlouvy).</li>
            <li>Plnění zákonných povinností (daňové a účetní předpisy).</li>
          </ul>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">4. Doba uchování</h2>
          <p className="text-text-body leading-relaxed">
            Kontaktní dotazy uchováváme po dobu nezbytnou pro jejich vyřízení, nejdéle 1 rok. Zdravotní
            dokumentace je uchována po dobu trvání léčby a 10 let po jejím ukončení v souladu s platnou
            legislativou.
          </p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">5. Předávání třetím stranám</h2>
          <p className="text-text-body leading-relaxed">
            Vaše údaje nepředáváme třetím stranám ani je nepoužíváme pro marketingové účely. Pro technické
            zajištění webu využíváme služeb Vercel Inc. (hosting), Turso (databáze) a Resend Inc. (odesílání
            e-mailů), kteří vystupují jako zpracovatelé v souladu s GDPR.
          </p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">6. Cookies</h2>
          <p className="text-text-body leading-relaxed">
            Web používá pouze technické cookies nezbytné pro svou funkčnost (uložení zvoleného jazyka,
            souhlas s tímto upozorněním). Nepoužíváme reklamní ani analytické cookies od třetích stran
            vyžadující souhlas.
          </p>

          <h2 className="font-serif text-xl text-text-dark mt-10 mb-3">7. Vaše práva</h2>
          <p className="text-text-body leading-relaxed">
            Máte právo na přístup k osobním údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost
            a právo vznést námitku. Pro uplatnění těchto práv nás kontaktujte na e-mailu výše. Máte rovněž
            právo podat stížnost u Úřadu pro ochranu osobních údajů (uoou.cz).
          </p>

          <p className="text-text-muted text-sm mt-16">
            Tato informace je platná od 1. 1. 2025. Aktuální znění je vždy dostupné na této stránce.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
