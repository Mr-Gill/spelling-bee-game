const REPO_NAME = '{{REPO_NAME}}'; // This is our placeholder
const CACHE_NAME = 'spelling-bee-cache-v2';
const ASSETS = [
  `/${REPO_NAME}/`,
  `/${REPO_NAME}/index.html`,
  `/${REPO_NAME}/style.css`,
  `/${REPO_NAME}/manifest.webmanifest`,
  `/${REPO_NAME}/icons/icon.svg`,
  `/${REPO_NAME}/app.js`,
  `/${REPO_NAME}/words.json`,
  `/${REPO_NAME}/wordlists/example.json`,
  `/${REPO_NAME}/wordlists/example.csv`,
  `/${REPO_NAME}/wordlists/example.tsv`,
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
