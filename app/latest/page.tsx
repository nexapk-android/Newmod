import { apps } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

export const metadata = { title: "Latest Apps", description: "Recently updated apps and games on GenMod." };

export default function LatestPage() {
  return <div className="container pt-8"><Section title="Latest Apps" subtitle="Recently updated entries."><div className="app-grid">{apps.map((app) => <AppCard key={app.slug} app={app} />)}</div></Section></div>;
}
