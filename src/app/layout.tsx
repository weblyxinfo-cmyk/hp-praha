import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/lib/LocaleContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Homeopatie Petra | Ing. Petra Cihlářová — Praha 2",
  description:
    "Homeopatická léčba v Praze 2. Certifikovaná homeopatka s 15+ lety praxe. Jemná, účinná a trvalá léčba pro vás i vaše blízké.",
  keywords: [
    "homeopatie",
    "Praha",
    "Petra Cihlářová",
    "homeopatická léčba",
    "alternativní medicína",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
