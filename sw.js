const CACHE_NAME = 'gu-art-mock-exam-v2';
const APP_BASE = '/GU-ART-OES/';
const APP_SHELL = [
  APP_BASE,
  APP_BASE + 'index.html',
  APP_BASE + 'manifest.webmanifest',
  APP_BASE + 'icons/icon-192.png',
  APP_BASE + 'icons/icon-512.png',
  APP_BASE + 'icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('gu-art-mock-exam-') && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_BASE)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match(APP_BASE + 'index.html');
        throw new Error('Offline and resource not cached');
      });
    })
  );
});
