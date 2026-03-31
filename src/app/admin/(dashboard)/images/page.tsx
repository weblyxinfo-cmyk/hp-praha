"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface SiteImage {
  id: string;
  slot: string;
  url: string;
  alt: string;
}

const slots = [
  { key: "hero", label: "Hero fotografie", desc: "Hlavní fotka v úvodu stránky" },
  { key: "about", label: "O mně fotografie", desc: "Fotka v sekci O mně" },
  { key: "logo", label: "Logo", desc: "Logo značky" },
];

export default function ImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const res = await fetch("/api/admin/images");
    if (res.ok) setImages(await res.json());
  }

  function getImageForSlot(slot: string) {
    return images.find((img) => img.slot === slot);
  }

  async function handleUpload(slot: string, file: File) {
    setUploading(slot);

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (uploadRes.ok) {
      const { url } = await uploadRes.json();
      await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot, url, alt: slot }),
      });
      await loadImages();
    }

    setUploading(null);
  }

  function triggerUpload(slot: string) {
    setActiveSlot(slot);
    fileRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && activeSlot) {
      handleUpload(activeSlot, file);
    }
    e.target.value = "";
  }

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-text-dark mb-6">
        Obrázky
      </h1>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => {
          const img = getImageForSlot(slot.key);
          return (
            <div
              key={slot.key}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Preview */}
              <div className="aspect-[4/3] bg-gray-100 relative flex items-center justify-center">
                {img ? (
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-text-muted">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="mx-auto mb-2 opacity-30"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 16l5-5 3 3 4-4 6 6" />
                      <circle cx="14.5" cy="8.5" r="1.5" />
                    </svg>
                    <span className="text-xs">Bez obrázku</span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm text-text-dark">
                  {slot.label}
                </h3>
                <p className="text-xs text-text-muted mt-0.5 mb-3">
                  {slot.desc}
                </p>
                <button
                  onClick={() => triggerUpload(slot.key)}
                  disabled={uploading === slot.key}
                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {uploading === slot.key
                    ? "Nahrávám..."
                    : img
                    ? "Změnit obrázek"
                    : "Nahrát obrázek"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
