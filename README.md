# GenMod

Production-oriented Next.js starter for a public, mobile-first app discovery website.

## Features
- GenMod branded header with mobile drawer
- No login/register/admin system
- Light/dark/system theme
- Responsive 9:16-friendly mobile layout
- Featured/latest/trending/category/search pages
- Detailed app pages
- Screenshot gallery
- SEO metadata + sitemap + robots
- Premium responsive app cards
- Footer + legal starter pages

## Run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production
```bash
npm run build
npm start
```

## Before publishing
1. Replace `https://example.com` in metadata, sitemap and robots with your real domain.
2. Replace demo image URLs and app data in `lib/data.ts`.
3. Replace `downloadUrl: "#"` with authorized download URLs.
4. Replace starter legal/contact text with your real policies and contact details.
5. Only distribute APKs/files you are authorized to distribute.
