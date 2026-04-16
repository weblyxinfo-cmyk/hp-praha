"use client";

import { useState } from "react";
import { useLocale } from "@/lib/LocaleContext";

type Status = "idle" | "sending" | "ok" | "error";

export default function BookingForm() {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      website: fd.get("website"),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Odeslání selhalo");
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-bg-mint border border-primary/20 p-8 text-center">
        <div className="text-primary font-serif text-2xl mb-2">{t.form.successTitle}</div>
        <p className="text-text-body">{t.form.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.15em] text-text-muted">{t.form.name} *</span>
          <input
            type="text"
            name="name"
            required
            maxLength={200}
            className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.15em] text-text-muted">{t.form.phone}</span>
          <input
            type="tel"
            name="phone"
            maxLength={50}
            className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.15em] text-text-muted">{t.form.email} *</span>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.15em] text-text-muted">{t.form.message} *</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder={t.form.messagePlaceholder}
          className="mt-1 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </label>

      <p className="text-xs text-text-muted">{t.form.privacy}</p>

      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-lg px-7 py-3.5 text-sm font-medium transition-colors"
      >
        {status === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
