const CACHE_NAME = 'tg-notes-v3';
const STATIC_ASSETS = [
  '/',
  '/notes',
  '/builds',
  '/newsletter',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/loud-recall-html.css'
];

self.addEventListener('install', (event: Event) => {
  const extendableEvent = event as ExtendableEvent;
  extendableEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  (self as unknown as { skipWaiting: () => void }).skipWaiting();
});

self.addEventListener('activate', (event: Event) => {
  const extendableEvent = event as ExtendableEvent;
  extendableEvent.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  (self as unknown as { clients: { claim: () => void } }).clients.claim();
});

self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent;
  if (fetchEvent.request.method !== 'GET') return;

  const url = new URL(fetchEvent.request.url);
  // Never intercept API requests with service worker cache
  if (url.pathname.startsWith('/api/')) return;

  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((cached) => {
      const networked = fetch(fetchEvent.request)
        .then((response) => {
          if (response.status === 200) {
            const cacheCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(fetchEvent.request, cacheCopy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});
