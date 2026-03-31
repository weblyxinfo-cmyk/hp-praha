"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative flex items-center bg-bg-mint rounded-full p-0.5 border border-border">
      {/* Animated pill */}
      <div
        className="absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-primary transition-transform duration-300 ease-out"
        style={{
          transform: locale === "cs" ? "translateX(2px)" : "translateX(calc(100% + 2px))",
        }}
      />
      <button
        onClick={() => setLocale("cs")}
        className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
          locale === "cs" ? "text-white" : "text-text-muted hover:text-text-dark"
        }`}
      >
        CZ
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
          locale === "en" ? "text-white" : "text-text-muted hover:text-text-dark"
        }`}
      >
        EN
      </button>
    </div>
  );
}
