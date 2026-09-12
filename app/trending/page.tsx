import { apps } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

export const metadata = { title: "Trending Apps", description: "Trending apps and games on GenMod." };

export default function TrendingPage() {
  const trending = [...apps].sort((a,b) => b.rating - a.rating);
  return <div className="container pt-8"><Section title="Trending" subtitle="What people are checking out."><div className="app-grid">{trending.map((app) => <AppCard key={app.slug} app={app} />)}</div></Section></div>;
}
