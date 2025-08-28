const CACHE_NAME = 'spelling-bee-cache-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js', // Cache bundled application script
  './words.json',
  './wordlists/example.json',
  './wordlists/example.csv',
  './wordlists/example.tsv',
  './manifest.webmanifest',
  './icons/icon.svg',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset => cache.add(asset).catch(() => console.warn(`Asset ${asset} failed to cache`)))
      )
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(fetchResp => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResp.clone());
          return fetchResp;
        });
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
