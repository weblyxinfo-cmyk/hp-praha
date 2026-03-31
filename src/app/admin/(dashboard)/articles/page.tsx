"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface Article {
  id: string;
  slug: string;
  locale: string;
  category: string;
  title: string;
  description: string;
  content: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

const emptyArticle = (locale: string): Omit<Article, "id" | "publishedAt"> & { id?: string } => ({
  slug: "",
  locale,
  category: "",
  title: "",
  description: "",
  content: "",
  image: null,
  featured: false,
  published: false,
});

export default function ArticlesPageWrapper() {
  return (
    <Suspense>
      <ArticlesPage />
    </Suspense>
  );
}

function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<"cs" | "en">("cs");
  const [editing, setEditing] = useState<ReturnType<typeof emptyArticle> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditing(emptyArticle(activeTab));
    }
  }, [searchParams, activeTab]);

  async function loadArticles() {
    const res = await fetch("/api/admin/articles");
    if (res.ok) setArticles(await res.json());
  }

  const filtered = articles.filter((a) => a.locale === activeTab);

  async function handleSave() {
    setSaving(true);
    const isNew = !editing?.id;
    const url = isNew
      ? "/api/admin/articles"
      : `/api/admin/articles/${editing!.id}`;

    const { id, ...data } = editing!;
    await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    setEditing(null);
    loadArticles();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat článek?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    loadArticles();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (res.ok) {
      const { url } = await res.json();
      setEditing({ ...editing, image: url });
    }
    setUploading(false);
    e.target.value = "";
  }

  // --- EDIT FORM ---
  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-serif font-bold text-text-dark">
            {editing.id ? "Upravit článek" : "Nový článek"}{" "}
            <span className="text-sm font-sans font-normal bg-primary/10 text-primary rounded-full px-3 py-1 ml-2">
              {editing.locale === "cs" ? "Česky" : "English"}
            </span>
          </h1>
          <button onClick={() => setEditing(null)} className="text-sm text-text-muted hover:text-text-dark">
            Zrušit
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Kategorie</label>
              <input
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                placeholder={editing.locale === "cs" ? "Věda · 2024" : "Science · 2024"}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Slug</label>
              <input
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder="auto-generated"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              {editing.locale === "cs" ? "Název článku" : "Article title"}
            </label>
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              {editing.locale === "cs" ? "Popis" : "Description"}
            </label>
            <textarea
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              {editing.locale === "cs" ? "Obsah" : "Content"}
            </label>
            <textarea
              rows={10}
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Náhledový obrázek</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <div className="flex items-center gap-4">
              {editing.image ? (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={editing.image} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setEditing({ ...editing, image: null })}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-text-muted">
                  Bez obrázku
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="border border-gray-200 text-text-body rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {uploading ? "Nahrávám..." : editing.image ? "Změnit" : "Nahrát obrázek"}
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              Hlavní článek
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="rounded border-gray-300"
              />
              Publikováno
            </label>
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

  // --- LIST VIEW ---
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-text-dark">Články</h1>
        <button
          onClick={() => setEditing(emptyArticle(activeTab))}
          className="bg-primary hover:bg-primary-dark text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          + Nový článek
        </button>
      </div>

      {/* CZ / EN tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("cs")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "cs"
              ? "bg-white text-primary shadow-sm"
              : "text-text-muted hover:text-text-dark"
          }`}
        >
          Česky ({articles.filter((a) => a.locale === "cs").length})
        </button>
        <button
          onClick={() => setActiveTab("en")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "en"
              ? "bg-white text-primary shadow-sm"
              : "text-text-muted hover:text-text-dark"
          }`}
        >
          English ({articles.filter((a) => a.locale === "en").length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-text-muted text-sm mb-3">
              {activeTab === "cs" ? "Žádné české články" : "No English articles"}
            </p>
            <button
              onClick={() => setEditing(emptyArticle(activeTab))}
              className="text-primary text-sm font-medium hover:text-primary-dark"
            >
              + {activeTab === "cs" ? "Přidat článek" : "Add article"}
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs text-text-muted uppercase tracking-wider">
                <th className="px-4 py-3">Název</th>
                <th className="px-4 py-3 hidden sm:table-cell">Kategorie</th>
                <th className="px-4 py-3 hidden sm:table-cell">Stav</th>
                <th className="px-4 py-3 text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {article.image && (
                        <img src={article.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-text-dark">{article.title}</div>
                        <div className="text-xs text-text-muted sm:hidden">{article.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted hidden sm:table-cell">
                    {article.category}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${article.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {article.published ? "Publikováno" : "Koncept"}
                    </span>
                    {article.featured && (
                      <span className="ml-1 inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">
                        Hlavní
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(article)} className="text-primary hover:text-primary-dark text-sm mr-3">
                      Upravit
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 text-sm">
                      Smazat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
