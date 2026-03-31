export type Locale = "cs" | "en";

export const translations = {
  cs: {
    nav: {
      about: "O mně",
      treatment: "Léčba",
      articles: "Články",
      cases: "Případy z praxe",
      pricing: "Ceník",
    },
    hero: {
      badge: "Homeopatická léčba · Praha 2",
      title1: "Léčba, která vidí",
      title2: "celého člověka",
      text: "Homeopatie není jen o příznacích. Je o vás — vaší historii, povaze, životě. Přes patnáct let hledám s pacienty kořen jejich obtíží, ne jen úlevu.",
      cta: "Objednat se",
      ctaSecondary: "Jak probíhá konzultace",
      years: "let praxe",
      india: "stáž u mistrů",
      lmhi: "mezinárodní člen",
      photo: "Vaše fotografie",
    },
    credentials: [
      "Certifikovaná homeopatka",
      "Přes 15 let praxe",
      "Stáž v Indii",
      "Kongresy LMHI",
      "Praha 2 – Nové Město",
    ],
    blog: {
      label: "Z Blogu",
      title: "Články & případy z praxe",
      all: "Všechny články",
      read: "Číst",
      readFull: "Číst celý článek",
    },
    about: {
      label: "O mně",
      title1: "Váš průvodce",
      title2: "na cestě ke zdraví",
      quote:
        "Mám upřímný zájem o své pacienty a jejich obtíže — každý případ je pro mě jedinečný příběh.",
      text: "Mám více než patnáctiletou praxi, zkušenosti ze stáže v Indii a studovala jsem u nejlepších homeopatů z celého světa. Homeopatie mi umožňuje léčit příčiny, ne jen příznaky.",
      tags: ["15+ let praxe", "Stáž · Indie", "LMHI člen", "Kurzy & přednášky"],
    },
    process: {
      label: "Proces",
      title: "Jak probíhá léčba",
      steps: [
        { title: "Objednání", desc: "Telefonicky nebo e-mailem. První konzultace trvá cca 90 minut." },
        { title: "Konzultace", desc: "Podrobný rozhovor o zdraví, historii a povaze pacienta." },
        { title: "Výběr léku", desc: "Individuální lék přesně pro vás. Žádná generická léčba." },
        { title: "Sledování", desc: "Kontroly výsledků, úprava léčby podle reakcí organismu." },
      ],
    },
    treatments: {
      label: "Co léčím",
      title: "Homeopatií lze léčit téměř vše",
      text: "Jemně, účinně a trvale — bez vedlejších účinků, vhodné i v těhotenství a kojení.",
    },
    testimonials: {
      label: "Slovo pacientů",
      title: "Co říkají o léčbě",
    },
    cta: {
      label: "Začněte dnes",
      title1: "Vaše zdraví si zaslouží",
      title2: "přirozený přístup",
      address: "Praha 2 – Nové Město · Dřevná 382/2",
    },
    footer: {
      brand: "Homeopatická praxe v Praze 2.\nJemná, účinná a trvalá léčba\npro vás i vaše blízké.",
      aboutLinks: ["Moje cesta", "Metoda léčby", "Vzdělání v oboru", "Pomůcky"],
      homeoLinks: ["Nejčastější otázky", "Případy z praxe", "Slovo pacientů", "Historie"],
      english: "English version",
      privacy: "Ochrana osobních údajů",
      copyright: "Ing. Petra Cihlářová — Homeopatie Praha",
    },
  },
  en: {
    nav: {
      about: "About",
      treatment: "Treatment",
      articles: "Articles",
      cases: "Case studies",
      pricing: "Pricing",
    },
    hero: {
      badge: "Homeopathic treatment · Prague 2",
      title1: "Treatment that sees",
      title2: "the whole person",
      text: "Homeopathy isn't just about symptoms. It's about you — your history, personality, life. For over fifteen years, I've been helping patients find the root of their issues, not just relief.",
      cta: "Book now",
      ctaSecondary: "How consultation works",
      years: "years of practice",
      india: "studied with masters",
      lmhi: "international member",
      photo: "Your photo",
    },
    credentials: [
      "Certified homeopath",
      "15+ years of practice",
      "Internship in India",
      "LMHI congresses",
      "Prague 2 – Nové Město",
    ],
    blog: {
      label: "From the Blog",
      title: "Articles & case studies",
      all: "All articles",
      read: "Read",
      readFull: "Read full article",
    },
    about: {
      label: "About me",
      title1: "Your guide",
      title2: "on the path to health",
      quote:
        "I have a sincere interest in my patients and their concerns — each case is a unique story to me.",
      text: "I have more than fifteen years of practice, experience from an internship in India, and I studied with the best homeopaths from around the world. Homeopathy allows me to treat causes, not just symptoms.",
      tags: ["15+ years of practice", "Internship · India", "LMHI member", "Courses & lectures"],
    },
    process: {
      label: "Process",
      title: "How treatment works",
      steps: [
        { title: "Booking", desc: "By phone or email. The first consultation takes about 90 minutes." },
        { title: "Consultation", desc: "A detailed conversation about health, history, and personality." },
        { title: "Remedy selection", desc: "An individual remedy just for you. No generic treatment." },
        { title: "Follow-up", desc: "Monitoring results, adjusting treatment based on the body's responses." },
      ],
    },
    treatments: {
      label: "What I treat",
      title: "Homeopathy can treat almost everything",
      text: "Gently, effectively and permanently — without side effects, safe during pregnancy and breastfeeding.",
    },
    testimonials: {
      label: "Patient voices",
      title: "What they say about treatment",
    },
    cta: {
      label: "Start today",
      title1: "Your health deserves",
      title2: "a natural approach",
      address: "Prague 2 – Nové Město · Dřevná 382/2",
    },
    footer: {
      brand: "Homeopathic practice in Prague 2.\nGentle, effective and lasting treatment\nfor you and your loved ones.",
      aboutLinks: ["My journey", "Treatment method", "Education", "Resources"],
      homeoLinks: ["FAQ", "Case studies", "Patient voices", "History"],
      english: "Česká verze",
      privacy: "Privacy policy",
      copyright: "Ing. Petra Cihlářová — Homeopathy Prague",
    },
  },
} as const;

export function t(locale: Locale) {
  return translations[locale];
}
