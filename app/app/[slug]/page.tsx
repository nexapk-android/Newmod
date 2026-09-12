import { notFound } from "next/navigation";
import { apps, getApp } from "@/lib/data";
import { AppDetail } from "@/components/app-detail";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const app = getApp(params.slug);
  if (!app) return { title: "App Not Found" };
  return {
    title: `${app.name} v${app.version}`,
    description: `${app.name} by ${app.publisher}. Version ${app.version}, ${app.size}, Android ${app.android}.`
  };
}

export default function AppPage({ params }: { params: { slug: string } }) {
  const app = getApp(params.slug);
  if (!app) notFound();
  const related = apps.filter((x) => x.slug !== app.slug && x.category === app.category).slice(0, 3);
  return (
    <>
      <AppDetail app={app} />
      {related.length > 0 && (
        <div className="container">
          <Section title="Related Apps"><div className="app-grid">{related.map((item) => <AppCard key={item.slug} app={item} />)}</div></Section>
        </div>
      )}
    </>
  );
}
