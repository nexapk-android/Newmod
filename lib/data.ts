export type ModInfo = {
  isMod: boolean;
  label: string;
  features: string[];
};

export type AppItem = {
  slug: string;
  name: string;
  category: string;
  publisher: string;

  version: string;
  size: string;
  android: string;

  rating: number;
  votes: number;
  downloads: number;

  description: string;
  updated: string;

  icon: string;
  screenshots: string[];

  features: string[];
  changelog: string[];

  modInfo: ModInfo;

  /**
   * Use an authorized/direct APK URL here.
   * Keep "#" until you have a valid download URL.
   */
  downloadUrl: string;
};

export const categories = [
  "Apps",
  "Games",
  "Music",
  "Video",
  "Photography",
  "Social",
  "Productivity",
  "Education",
  "Tools",
  "Entertainment",
  "Business",
  "Lifestyle",
];

export const apps: AppItem[] = [
  {
    slug: "notevault",
    name: "NoteVault",
    category: "Productivity",
    publisher: "Lumen Labs",

    version: "3.2.1",
    size: "28.4 MB",
    android: "8.0+",

    rating: 4.8,
    votes: 12400,
    downloads: 125000,

    description:
      "Fast, offline-first notes with encrypted sync across your devices.",

    updated: "Sep 10, 2026",

    icon:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "Offline-first editing",
      "Encrypted sync",
      "Folders and tags",
      "Fast global search",
    ],

    changelog: [
      "Improved sync reliability",
      "Faster startup",
      "Accessibility fixes",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },

  {
    slug: "pixel-player",
    name: "Pixel Player",
    category: "Music",
    publisher: "Northstar Studio",

    version: "8.4.0",
    size: "42.7 MB",
    android: "7.0+",

    rating: 4.7,
    votes: 8920,
    downloads: 98000,

    description:
      "A clean music player for local libraries with playlists and smart search.",

    updated: "Sep 8, 2026",

    icon:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "Gapless playback",
      "Playlists",
      "Equalizer",
      "Library search",
    ],

    changelog: [
      "New player controls",
      "Reduced memory usage",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },

  {
    slug: "taskflow",
    name: "TaskFlow",
    category: "Business",
    publisher: "Orbit Works",

    version: "5.1.2",
    size: "36.1 MB",
    android: "8.0+",

    rating: 4.6,
    votes: 6100,
    downloads: 67000,

    description:
      "Plan projects, organize tasks and keep your daily work focused.",

    updated: "Sep 6, 2026",

    icon:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "Kanban boards",
      "Reminders",
      "Project labels",
      "Progress tracking",
    ],

    changelog: [
      "New board view",
      "Performance improvements",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },

  {
    slug: "snapstudio",
    name: "SnapStudio",
    category: "Photography",
    publisher: "Framecraft",

    version: "2.9.5",
    size: "74.3 MB",
    android: "9.0+",

    rating: 4.9,
    votes: 15400,
    downloads: 156000,

    description:
      "A lightweight photo editor with modern filters and precise controls.",

    updated: "Sep 5, 2026",

    icon:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "RAW support",
      "Presets",
      "Crop and curves",
      "Export controls",
    ],

    changelog: [
      "Added new presets",
      "Better export quality",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },

  {
    slug: "arcade-rush",
    name: "Arcade Rush",
    category: "Games",
    publisher: "Nova Pixel",

    version: "1.8.3",
    size: "118 MB",
    android: "8.0+",

    rating: 4.5,
    votes: 4300,
    downloads: 52000,

    description:
      "Fast arcade challenges with short sessions and colorful levels.",

    updated: "Sep 3, 2026",

    icon:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "50+ levels",
      "Offline play",
      "Daily challenges",
      "Achievements",
    ],

    changelog: [
      "New levels",
      "Controller improvements",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },

  {
    slug: "studyspace",
    name: "StudySpace",
    category: "Education",
    publisher: "Bright Path",

    version: "4.0.6",
    size: "51.2 MB",
    android: "8.0+",

    rating: 4.8,
    votes: 9800,
    downloads: 104000,

    description:
      "Focus timers, study plans and revision tools for distraction-free learning.",

    updated: "Sep 1, 2026",

    icon:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=85",

    screenshots: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    ],

    features: [
      "Focus timer",
      "Study plans",
      "Progress charts",
      "Notes",
    ],

    changelog: [
      "New focus modes",
      "Improved statistics",
    ],

    modInfo: {
      isMod: false,
      label: "Official",
      features: [],
    },

    downloadUrl: "#",
  },
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
