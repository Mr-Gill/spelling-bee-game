const CACHE_NAME = 'spelling-bee-cache-v4';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './app.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          ASSETS.map(asset => {
            return cache.add(asset).catch(err => {
              console.log(`Failed to cache ${asset}:`, err);
            });
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
