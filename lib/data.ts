export type ModInfo = {
  isMod: boolean;
  label: string;
  features: string[];
};

export type AppItem = {
  id: string;
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

  downloadUrl: string;

  modInfo: ModInfo;

  taskPopupEnabled: boolean;
  taskTelegramEnabled: boolean;
  taskTelegramUrl: string;
  taskInstagramEnabled: boolean;
  taskInstagramUrl: string;
  taskReelEnabled: boolean;
  taskReelUrl: string;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

/* =========================
   CATEGORIES
========================= */

export const categories = [
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

/* =========================
   APPS
========================= */

export const apps: AppItem[] = [
  {
    id: "capcut-pro-mod",
    slug: "capcut-pro-mod-apk",
    name: "CapCut Pro Mod APK",
    category: "Video Players & Editors",
    publisher: "CapCut",

    version: "Latest",
    size: "Varies",
    android: "Android 8.0+",

    rating: 4.7,
    votes: 18420,
    downloads: 125000,

    description:
      "CapCut is a powerful video editing app with professional editing tools, creative effects, templates, filters, transitions and AI-powered features.",

    updated: "Recently updated",

    icon: "/apps/capcut.png",

    screenshots: [
      "/apps/capcut-1.jpg",
      "/apps/capcut-2.jpg",
      "/apps/capcut-3.jpg",
    ],

    features: [
      "Professional video editing tools",
      "Creative effects and filters",
      "Transitions and animations",
      "Auto captions and text tools",
      "Templates and creative assets",
      "AI-powered editing features",
      "High-quality video export",
    ],

    changelog: [
      "Performance improvements",
      "Improved editing experience",
      "Bug fixes and stability improvements",
    ],

    downloadUrl: "#",

    modInfo: {
      isMod: true,
      label: "MOD",
      features: [
        "Premium features",
        "Enhanced editing tools",
        "Additional creative resources",
      ],
    },
    taskPopupEnabled: false,
    taskTelegramEnabled: true,
    taskTelegramUrl: "https://t.me/Genmodapk",
    taskInstagramEnabled: true,
    taskInstagramUrl: "https://www.instagram.com/instagram/",
    taskReelEnabled: true,
    taskReelUrl: "https://www.instagram.com/reels/",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  },

  {
    id: "snapchat-pro",
    slug: "snapchat-pro",
    name: "Snapchat Pro",
    category: "Social",
    publisher: "Snap Inc.",

    version: "Latest",
    size: "Varies",
    android: "Android 8.0+",

    rating: 4.5,
    votes: 15360,
    downloads: 98000,

    description:
      "Snapchat is a social platform for sharing photos and videos, communicating with friends, discovering stories and enjoying creative lenses and filters.",

    updated: "Recently updated",

    icon: "/apps/snapchat.png",

    screenshots: [
      "/apps/snapchat-1.jpg",
      "/apps/snapchat-2.jpg",
      "/apps/snapchat-3.jpg",
    ],

    features: [
      "Photo and video sharing",
      "Creative lenses and filters",
      "Stories and Spotlight",
      "Private and group messaging",
      "Video and voice calls",
      "Discover trending content",
      "Customizable profiles",
    ],

    changelog: [
      "Improved app performance",
      "Updated camera experience",
      "Bug fixes and stability improvements",
    ],

    downloadUrl: "#",

    modInfo: {
      isMod: true,
      label: "MOD",
      features: [
        "Enhanced social experience",
        "Additional customization",
        "Extra features",
      ],
    },
    taskPopupEnabled: false,
    taskTelegramEnabled: true,
    taskTelegramUrl: "https://t.me/Genmodapk",
    taskInstagramEnabled: true,
    taskInstagramUrl: "https://www.instagram.com/instagram/",
    taskReelEnabled: true,
    taskReelUrl: "https://www.instagram.com/reels/",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  },

  {
    id: "spotify-pro-mod",
    slug: "spotify-pro-mod",
    name: "Spotify Pro Mod APK",
    category: "Music & Audio",
    publisher: "Spotify",

    version: "Latest",
    size: "Varies",
    android: "Android 7.0+",

    rating: 4.8,
    votes: 22150,
    downloads: 210000,

    description:
      "Spotify is a music and podcast streaming platform where you can discover songs, artists, albums, playlists and podcasts from around the world.",

    updated: "Recently updated",

    icon: "/apps/spotify.png",

    screenshots: [
      "/apps/spotify-1.jpg",
      "/apps/spotify-2.jpg",
      "/apps/spotify-3.jpg",
    ],

    features: [
      "Music and podcast streaming",
      "Personalized recommendations",
      "Curated playlists",
      "Artist and album discovery",
      "Lyrics support",
      "Playlist creation",
      "Cross-device listening",
    ],

    changelog: [
      "Improved playback performance",
      "Updated user experience",
      "Bug fixes and stability improvements",
    ],

    downloadUrl: "#",

    modInfo: {
      isMod: true,
      label: "MOD",
      features: [
        "Enhanced listening experience",
        "Additional playback options",
        "Extra customization",
      ],
    },
    taskPopupEnabled: false,
    taskTelegramEnabled: true,
    taskTelegramUrl: "https://t.me/Genmodapk",
    taskInstagramEnabled: true,
    taskInstagramUrl: "https://www.instagram.com/instagram/",
    taskReelEnabled: true,
    taskReelUrl: "https://www.instagram.com/reels/",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  },

  {
    id: "instagram-pro",
    slug: "instagram-pro",
    name: "Instagram Pro",
    category: "Social",
    publisher: "Instagram",

    version: "Latest",
    size: "Varies",
    android: "Android 9.0+",

    rating: 4.6,
    votes: 19870,
    downloads: 175000,

    description:
      "Instagram is a social media platform for sharing photos, videos and stories, communicating with friends and discovering content from creators around the world.",

    updated: "Recently updated",

    icon: "/apps/instagram.png",

    screenshots: [
      "/apps/instagram-1.jpg",
      "/apps/instagram-2.jpg",
      "/apps/instagram-3.jpg",
    ],

    features: [
      "Photo and video sharing",
      "Stories and Reels",
      "Direct messaging",
      "Creator profiles",
      "Explore personalized content",
      "Photo and video editing",
      "Multiple account support",
    ],

    changelog: [
      "Improved app performance",
      "Updated Reels experience",
      "Bug fixes and stability improvements",
    ],

    downloadUrl: "#",

    modInfo: {
      isMod: true,
      label: "MOD",
      features: [
        "Additional customization",
        "Enhanced browsing experience",
        "Extra features",
      ],
    },
    taskPopupEnabled: false,
    taskTelegramEnabled: true,
    taskTelegramUrl: "https://t.me/Genmodapk",
    taskInstagramEnabled: true,
    taskInstagramUrl: "https://www.instagram.com/instagram/",
    taskReelEnabled: true,
    taskReelUrl: "https://www.instagram.com/reels/",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  },
];

/* =========================
   HELPERS
========================= */

/**
 * Get an app by its slug.
 */
export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}

/**
 * Alias kept for compatibility with other pages/components.
 */
export function getAppBySlug(slug: string) {
  return getApp(slug);
}

/**
 * Get all apps belonging to a category.
 */
export function getAppsByCategory(category: string) {
  return apps.filter(
    (app) => app.category.toLowerCase() === category.toLowerCase()
  );
}
