// Simple cache-first service worker for the ULTRA app shell (frontend-only test store).
const CACHE = 'ultra-v2';
const SHELL = ['/ultra-fashion/', '/ultra-fashion/shop', '/ultra-fashion/orders', '/ultra-fashion/manifest.webmanifest', '/ultra-fashion/icon-192.png', '/ultra-fashion/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => undefined));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // only cache same-origin shell
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => undefined);
      return res;
    }).catch(() => caches.match('/ultra-fashion/')))
  );
});
