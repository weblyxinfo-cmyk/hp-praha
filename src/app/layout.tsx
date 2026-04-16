import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocaleProvider } from "@/lib/LocaleContext";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homeopatie-praha.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Homeopatie Petra | Ing. Petra Cihlářová — Praha 2",
    template: "%s | Homeopatie Petra",
  },
  description:
    "Homeopatická léčba v Praze 2. Certifikovaná homeopatka s 15+ lety praxe. Jemná, účinná a trvalá léčba pro vás i vaše blízké.",
  keywords: [
    "homeopatie",
    "Praha",
    "Petra Cihlářová",
    "homeopatická léčba",
    "alternativní medicína",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: "Homeopatie Petra",
    title: "Homeopatie Petra | Ing. Petra Cihlářová — Praha 2",
    description:
      "Homeopatická léčba v Praze 2. Certifikovaná homeopatka s 15+ lety praxe. Jemná, účinná a trvalá léčba.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homeopatie Petra | Praha 2",
    description:
      "Homeopatická léčba v Praze 2. 15+ let praxe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("locale")?.value;
  const lang = savedLocale === "en" ? "en" : "cs";

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>
          {children}
          <CookieBanner />
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
