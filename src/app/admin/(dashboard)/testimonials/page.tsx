"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Testimonial {
  id: string;
  nameCs: string;
  nameEn: string;
  textCs: string;
  textEn: string;
  detailCs: string;
  detailEn: string;
  stars: number;
  order: number;
  published: boolean;
}

const emptyTestimonial: Omit<Testimonial, "id"> & { id?: string } = {
  nameCs: "",
  nameEn: "",
  textCs: "",
  textEn: "",
  detailCs: "",
  detailEn: "",
  stars: 5,
  order: 0,
  published: true,
};

export default function TestimonialsPageWrapper() {
  return (
    <Suspense>
      <TestimonialsPage />
    </Suspense>
  );
}

function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<typeof emptyTestimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditing({ ...emptyTestimonial });
    }
  }, [searchParams]);

  async function loadItems() {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
  }

  async function handleSave() {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew
      ? "/api/admin/testimonials"
      : `/api/admin/testimonials/${editing!.id}`;

    const { id, ...data } = editing!;
    await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    setEditing(null);
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat recenzi?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    loadItems();
  }

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-serif font-bold text-text-dark">
            {editing.id ? "Upravit recenzi" : "Nová recenze"}
          </h1>
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-text-muted hover:text-text-dark"
          >
            Zrušit
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Jméno (CZ)
              </label>
              <input
                value={editing.nameCs}
                onChange={(e) =>
                  setEditing({ ...editing, nameCs: e.target.value })
                }
                placeholder="Jana K."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Name (EN)
              </label>
              <input
                value={editing.nameEn}
                onChange={(e) =>
                  setEditing({ ...editing, nameEn: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Text (CZ)
              </label>
              <textarea
                rows={4}
                value={editing.textCs}
                onChange={(e) =>
                  setEditing({ ...editing, textCs: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Text (EN)
              </label>
              <textarea
                rows={4}
                value={editing.textEn}
                onChange={(e) =>
                  setEditing({ ...editing, textEn: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Detail (CZ)
              </label>
              <input
                value={editing.detailCs}
                onChange={(e) =>
                  setEditing({ ...editing, detailCs: e.target.value })
                }
                placeholder="ekzém · 3 roky léčby"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Detail (EN)
              </label>
              <input
                value={editing.detailEn}
                onChange={(e) =>
                  setEditing({ ...editing, detailEn: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Hvězdičky
              </label>
              <select
                value={editing.stars}
                onChange={(e) =>
                  setEditing({ ...editing, stars: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)}{"☆".repeat(5 - n)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Pořadí
              </label>
              <input
                type="number"
                value={editing.order}
                onChange={(e) =>
                  setEditing({ ...editing, order: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) =>
                    setEditing({ ...editing, published: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                Publikováno
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary-dark text-white rounded-lg px-5 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? "Ukládám..." : "Uložit"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="border border-gray-200 text-text-body rounded-lg px-5 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Zrušit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-text-dark">
          Recenze
        </h1>
        <button
          onClick={() => setEditing({ ...emptyTestimonial })}
          className="bg-primary hover:bg-primary-dark text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          + Nová recenze
        </button>
      </div>

      <div className="grid gap-4">
        {items.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-8">
            Žádné recenze
          </p>
        ) : (
          items.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-gold text-sm mb-1">
                    {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
                  </div>
                  <p className="text-text-body text-sm italic mb-2">
                    &ldquo;{t.textCs}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-text-dark">
                    {t.nameCs}
                  </p>
                  <p className="text-xs text-primary">{t.detailCs}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditing(t)}
                    className="text-primary hover:text-primary-dark text-sm"
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Smazat
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
