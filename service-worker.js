const CACHE_NAME = 'spelling-bee-cache-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './icons/icon.svg',
  './app.js',
  './words.json',
  './wordlists/example.json',
  './wordlists/example.csv',
  './wordlists/example.tsv',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
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
      .then(response => response || fetch(event.request).catch(() => caches.match('offline.html')))
  );
});
