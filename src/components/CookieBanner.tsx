"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";

const KEY = "hp-cookies-ok";

export default function CookieBanner() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-50 max-w-xl sm:mx-auto rounded-2xl bg-white border border-border shadow-xl p-5 text-sm text-text-body">
      <p>{t.cookies.text}</p>
      <div className="flex items-center justify-between gap-4 mt-3">
        <Link href="/ochrana-osobnich-udaju" className="text-primary text-xs underline underline-offset-4">
          {t.cookies.more}
        </Link>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(KEY, "1");
            setShow(false);
          }}
          className="bg-primary hover:bg-primary-dark text-white rounded-lg px-5 py-2 text-xs font-medium transition-colors"
        >
          {t.cookies.accept}
        </button>
      </div>
    </div>
  );
}
