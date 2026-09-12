import { notFound } from "next/navigation";
import { apps, categories } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.toLowerCase() === params.slug);
  return { title: category ? `${category} Apps` : "Category" };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.toLowerCase() === params.slug);
  if (!category) notFound();
  const items = apps.filter((app) => app.category.toLowerCase() === category.toLowerCase());
  return (
    <div className="container pt-8">
      <Section title={`${category} Apps`} subtitle={`Browse ${category.toLowerCase()} apps on GenMod.`}>
        {items.length ? <div className="app-grid">{items.map((app) => <AppCard key={app.slug} app={app} />)}</div> : <div className="surface rounded-3xl p-8 text-center text-[var(--muted)]">No apps in this category yet.</div>}
      </Section>
    </div>
  );
}
