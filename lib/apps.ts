import { createClient } from "@/lib/supabase-server";
import type { AppItem } from "@/lib/data";

type DbApp = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  publisher: string | null;
  version: string | null;
  size: string | null;
  android: string | null;
  description: string | null;
  updated_at: string | null;
  icon: string | null;
  screenshots: string[] | null;
  features: string[] | null;
  changelog: string[] | null;
  download_url: string | null;
  is_mod: boolean | null;
  mod_label: string | null;
  mod_features: string[] | null;
  rating: number | null;
  votes: number | null;
  downloads: number | null;
  published: boolean | null;
};

function mapDbApp(app: DbApp): AppItem {
  return {
    id: app.id,
    slug: app.slug,
    name: app.name,
    category: app.category || "Apps",
    publisher: app.publisher || "",
    version: app.version || "",
    size: app.size || "",
    android: app.android || "",
    description: app.description || "",
    updated: app.updated_at
      ? new Date(app.updated_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently updated",
    icon: app.icon || "",
    screenshots: app.screenshots || [],
    features: app.features || [],
    changelog: app.changelog || [],
    downloadUrl: app.download_url || "#",
    rating: Number(app.rating || 0),
    votes: Number(app.votes || 0),
    downloads: Number(app.downloads || 0),
    modInfo: {
      isMod: Boolean(app.is_mod),
      label: app.mod_label || "MOD",
      features: app.mod_features || [],
    },
  };
}

export async function getPublishedApps(): Promise<AppItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to load published apps: ${error.message}`
    );
  }

  return (data || []).map((app) => mapDbApp(app as DbApp));
}

export async function getPublishedApp(
  slug: string
): Promise<AppItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load app:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return mapDbApp(data as DbApp);
}
