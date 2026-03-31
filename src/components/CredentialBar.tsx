"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function CredentialBar() {
  const { t } = useLocale();

  return (
    <div className="bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 divide-x divide-white/20">
          {t.credentials.map((item) => (
            <div key={item} className="flex-1 text-center text-xs sm:text-sm font-medium px-2">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
