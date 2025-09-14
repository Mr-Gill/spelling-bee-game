// Cache name with versioning
const CACHE_NAME = 'spelling-bee-v1';

// Precache essential assets
const PRECACHE_ASSETS = [
  '/{{REPO_NAME}}/',
  '/{{REPO_NAME}}/index.html',
  '/{{REPO_NAME}}/app.js',
  '/{{REPO_NAME}}/style.css',
  '/{{REPO_NAME}}/manifest.webmanifest',
  '/{{REPO_NAME}}/icons/icon-192x192.png',
  '/{{REPO_NAME}}/icons/icon-512x512.png',
  '/{{REPO_NAME}}/icons/icon-maskable.png'
];

// Install event: precache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
  );
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});

// Fetch event: cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});
