# ULTRA. — Men's Collection

Premium men's-only e-commerce **frontend** — a test website with **no backend**.
300 men's products (Baby 0–2, Boys 3–12, Teens 13–19, Men 20+), Amazon-style
header/search, Nike-style bold hero ("JUST SHOP IT."), Daraz-style Flash Sale
with a live countdown, premium 3D tilt product cards, and a PWA-ready shell.

Everything runs in the browser: search/filter/sort, Quick View, wishlist,
cart, checkout (bKash / Nagad / Cash on Delivery / Card), and orders history
are all saved in `localStorage`. No API calls, no database.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project → Import** the repo.
3. Framework preset: **Next.js** (auto-detected).
4. No environment variables are needed.
5. Deploy — Vercel gives you a live HTTPS URL.

## PWA

- `public/manifest.webmanifest` — name "ULTRA Mens Collection", display standalone.
- `public/sw.js` — cache-first service worker for the app shell.
- `public/icon-192.png` and `public/icon-512.png` — app icons.
- Install: open the live site in Chrome/Android → "Install app" / "Add to Home screen".

## Tech

Next.js 14.2 (App Router) + React 18 + TypeScript + Tailwind CSS 3.4.
Product images are Unsplash URLs with a local fallback image on error.
