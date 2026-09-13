"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Save,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const categories = [
  "Apps",
  "Games",
  "Music & Audio",
  "Video Players & Editors",
  "Photography",
  "Social",
  "Productivity",
  "Education",
  "Tools",
  "Entertainment",
  "Business",
  "Lifestyle",
];

export default function NewAppPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "Apps",
    publisher: "",
    version: "",
    size: "",
    android: "",
    description: "",
    features: "",
    changelog: "",
    download_url: "",
    is_mod: false,
    mod_label: "MOD",
    mod_features: "",
    rating: "",
    votes: "0",
    downloads: "0",
    published: false,
  });

  function updateField(
    field: string,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: makeSlug(value),
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in as admin.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("apps").insert({
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category,
      publisher: form.publisher.trim(),
      version: form.version.trim(),
      size: form.size.trim(),
      android: form.android.trim(),
      description: form.description.trim(),

      features: form.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      changelog: form.changelog
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      download_url: form.download_url.trim(),

      is_mod: form.is_mod,
      mod_label: form.is_mod
        ? form.mod_label.trim() || "MOD"
        : null,

      mod_features: form.mod_features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      rating: form.rating
        ? Number(form.rating)
        : null,

      votes: Number(form.votes) || 0,
      downloads: Number(form.downloads) || 0,

      published: form.published,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("App created successfully!");

    setTimeout(() => {
      window.location.href = "/admin/apps";
    }, 700);
  }

  return (
    <main className="min-h-[80vh] px-4 py-8">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/admin/apps"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-gen-500"
        >
          <ArrowLeft size={16} />
          Back to Apps
        </Link>

        <div className="mt-4">
          <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            Add New App
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Create a new GenMod app entry.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-6"
        >

          {/* BASIC INFO */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Basic Information
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold">
                  App Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    handleNameChange(e.target.value)
                  }
                  placeholder="Example App"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Slug
                </label>

                <input
                  required
                  value={form.slug}
                  onChange={(e) =>
                    updateField("slug", e.target.value)
                  }
                  placeholder="example-app"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  className="admin-input"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Publisher
                </label>

                <input
                  required
                  value={form.publisher}
                  onChange={(e) =>
                    updateField(
                      "publisher",
                      e.target.value
                    )
                  }
                  placeholder="Publisher name"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Version
                </label>

                <input
                  required
                  value={form.version}
                  onChange={(e) =>
                    updateField(
                      "version",
                      e.target.value
                    )
                  }
                  placeholder="Latest"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Size
                </label>

                <input
                  value={form.size}
                  onChange={(e) =>
                    updateField("size", e.target.value)
                  }
                  placeholder="120 MB"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Android
                </label>

                <input
                  value={form.android}
                  onChange={(e) =>
                    updateField(
                      "android",
                      e.target.value
                    )
                  }
                  placeholder="Android 8.0+"
                  className="admin-input"
                />
              </div>

            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Description
            </h2>

            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Write a useful description of the app..."
              className="admin-input mt-5 min-h-32 resize-y"
            />
          </section>

          {/* FEATURES */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Features
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Enter one feature per line.
            </p>

            <textarea
              rows={7}
              value={form.features}
              onChange={(e) =>
                updateField(
                  "features",
                  e.target.value
                )
              }
              placeholder={`Professional tools
Fast performance
Creative effects
Easy to use`}
              className="admin-input mt-4 min-h-40 resize-y"
            />
          </section>

          {/* CHANGELOG */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              What's New
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Enter one update per line.
            </p>

            <textarea
              rows={5}
              value={form.changelog}
              onChange={(e) =>
                updateField(
                  "changelog",
                  e.target.value
                )
              }
              placeholder={`Performance improvements
Bug fixes
Improved user experience`}
              className="admin-input mt-4 min-h-32 resize-y"
            />
          </section>

          {/* MOD */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">
                  App Type
                </h2>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Mark the entry according to the rights and
                  authorization you have for the distributed package.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={form.is_mod}
                  onChange={(e) =>
                    updateField(
                      "is_mod",
                      e.target.checked
                    )
                  }
                  className="peer sr-only"
                />

                <span className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-gen-500" />

                <span className="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
              </label>
            </div>

            {form.is_mod && (
              <div className="mt-5 space-y-4">

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Label
                  </label>

                  <input
                    value={form.mod_label}
                    onChange={(e) =>
                      updateField(
                        "mod_label",
                        e.target.value
                      )
                    }
                    placeholder="MOD"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    MOD Features
                  </label>

                  <p className="mb-2 text-xs text-[var(--muted)]">
                    One feature per line.
                  </p>

                  <textarea
                    rows={5}
                    value={form.mod_features}
                    onChange={(e) =>
                      updateField(
                        "mod_features",
                        e.target.value
                      )
                    }
                    placeholder={`Premium features
Additional options
Enhanced experience`}
                    className="admin-input min-h-32 resize-y"
                  />
                </div>

              </div>
            )}
          </section>

          {/* STATS */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Stats
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) =>
                    updateField(
                      "rating",
                      e.target.value
                    )
                  }
                  placeholder="4.8"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Votes
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.votes}
                  onChange={(e) =>
                    updateField(
                      "votes",
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Downloads
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.downloads}
                  onChange={(e) =>
                    updateField(
                      "downloads",
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>

            </div>
          </section>

          {/* DOWNLOAD */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Download
            </h2>

            <label className="mb-2 mt-5 block text-sm font-bold">
              Authorized Download URL
            </label>

            <input
              type="url"
              value={form.download_url}
              onChange={(e) =>
                updateField(
                  "download_url",
                  e.target.value
                )
              }
              placeholder="https://..."
              className="admin-input"
            />
          </section>

          {/* PUBLISH */}
          <section className="surface rounded-[26px] p-5 sm:p-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  updateField(
                    "published",
                    e.target.checked
                  )
                }
                className="h-5 w-5 accent-green-500"
              />

              <span className="font-bold">
                Publish this app immediately
              </span>
            </label>

            <p className="mt-2 text-xs text-[var(--muted)]">
              Keep this unchecked if you want to save it as
              a draft.
            </p>
          </section>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm font-semibold text-green-600">
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/apps"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] px-6 font-bold hover:bg-[var(--surface-2)]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gen-500 px-7 font-extrabold text-white shadow-lg hover:bg-gen-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save App
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}
