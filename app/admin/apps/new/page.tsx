"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  Upload,
  X,
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

const MAX_SCREENSHOTS = 6;

export default function NewAppPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>(
    []
  );

  const [iconPreview, setIconPreview] = useState("");

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

  function handleIconChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Icon must be an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Icon must be smaller than 5 MB.");
      return;
    }

    setError("");
    setIconFile(file);

    const previewUrl = URL.createObjectURL(file);
    setIconPreview(previewUrl);
  }

  function handleScreenshotsChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    if (files.some((file) => !file.type.startsWith("image/"))) {
      setError("All screenshots must be image files.");
      return;
    }

    if (
      files.some(
        (file) => file.size > 8 * 1024 * 1024
      )
    ) {
      setError("Each screenshot must be smaller than 8 MB.");
      return;
    }

    if (
      screenshotFiles.length + files.length >
      MAX_SCREENSHOTS
    ) {
      setError(
        `You can upload maximum ${MAX_SCREENSHOTS} screenshots.`
      );
      return;
    }

    setError("");

    setScreenshotFiles((current) => [
      ...current,
      ...files,
    ]);
  }

  function removeScreenshot(index: number) {
    setScreenshotFiles((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  async function uploadFile(
    supabase: ReturnType<typeof createClient>,
    file: File,
    folder: string,
    slug: string
  ) {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const safeName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}.${extension}`;

    const path = `${folder}/${slug}/${safeName}`;

    const { error } = await supabase.storage
      .from("app-assets")
      .upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("app-assets")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const {
  data: { session },
} = await supabase.auth.getSession();

if (!session?.user) {
  throw new Error("Your admin session has expired. Please login again.");
}

      if (!form.name.trim()) {
        throw new Error("App name is required.");
      }

      if (!form.slug.trim()) {
        throw new Error("Slug is required.");
      }

      if (!iconFile) {
        throw new Error(
          "Please select an app icon."
        );
      }

      setMessage("Uploading app icon...");

      const iconUrl = await uploadFile(
        supabase,
        iconFile,
        "icons",
        form.slug.trim()
      );

      const screenshotUrls: string[] = [];

      for (let i = 0; i < screenshotFiles.length; i++) {
        setMessage(
          `Uploading screenshot ${i + 1} of ${screenshotFiles.length}...`
        );

        const url = await uploadFile(
          supabase,
          screenshotFiles[i],
          "screenshots",
          form.slug.trim()
        );

        screenshotUrls.push(url);
      }

      setMessage("Saving app information...");

      const { error } = await supabase
        .from("apps")
        .insert({
          name: form.name.trim(),
          slug: form.slug.trim(),
          category: form.category,
          publisher: form.publisher.trim(),
          version: form.version.trim(),
          size: form.size.trim(),
          android: form.android.trim(),
          description: form.description.trim(),

          icon: iconUrl,

          screenshots: screenshotUrls,

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
  throw new Error(
    `Storage upload failed: ${error.message}`
  );
      }

      setMessage(
        "App created successfully! Redirecting..."
      );

      setTimeout(() => {
        window.location.href = "/admin/apps";
      }, 800);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
      setMessage("");
    } finally {
      setLoading(false);
    }
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
            Create and publish a new app entry.
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
                    updateField(
                      "slug",
                      e.target.value
                    )
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
                    updateField(
                      "size",
                      e.target.value
                    )
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

          {/* ICON */}

          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              App Icon
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Recommended: square PNG/JPG, maximum 5 MB.
            </p>

            <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">

              {iconPreview ? (
                <img
                  src={iconPreview}
                  alt="Icon preview"
                  className="h-28 w-28 rounded-[24px] object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-[24px] bg-[var(--surface-2)] text-[var(--muted)]">
                  <ImagePlus size={32} />
                </div>
              )}

              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-bold hover:bg-[var(--surface-2)]">
                <Upload size={17} />
                Choose Icon

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleIconChange}
                  className="hidden"
                />
              </label>

            </div>
          </section>

          {/* SCREENSHOTS */}

          <section className="surface rounded-[26px] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">
                  Screenshots
                </h2>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Upload up to {MAX_SCREENSHOTS} screenshots.
                </p>
              </div>

              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-bold">
                {screenshotFiles.length}/{MAX_SCREENSHOTS}
              </span>
            </div>

            <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] text-center transition hover:border-gen-500 hover:bg-[var(--surface-2)]">
              <ImagePlus size={28} className="text-gen-500" />

              <span className="mt-2 text-sm font-bold">
                Add Screenshots
              </span>

              <span className="mt-1 text-xs text-[var(--muted)]">
                PNG, JPG or WebP · Max 8 MB each
              </span>

              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleScreenshotsChange}
                className="hidden"
              />
            </label>

            {screenshotFiles.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {screenshotFiles.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="group relative overflow-hidden rounded-2xl bg-[var(--surface-2)]"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Screenshot ${index + 1}`}
                        className="aspect-[9/16] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeScreenshot(index)
                        }
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"
                        aria-label="Remove screenshot"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
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
              placeholder="Write a useful description..."
              className="admin-input mt-5 min-h-32 resize-y"
            />
          </section>

          {/* FEATURES */}

          <section className="surface rounded-[26px] p-5 sm:p-6">
            <h2 className="text-xl font-black">
              Features
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              One feature per line.
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
              One update per line.
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
Improved experience`}
              className="admin-input mt-4 min-h-32 resize-y"
            />
          </section>

          {/* APP TYPE */}

          <section className="surface rounded-[26px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">
                  App Type
                </h2>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Use this according to your authorization
                  to distribute the package.
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
              Unchecked = Draft.
            </p>
          </section>

          {/* MESSAGES */}

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

          {/* ACTIONS */}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/apps"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--border)] px-6 font-bold hover:bg-[var(--surface-2)]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gen-500 px-7 font-extrabold text-white shadow-lg hover:bg-gen-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
  message || "Saving..."
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
