// Ultra-fast service worker for aggressive caching
const CACHE_NAME = 'wordcounter-v1';
const STATIC_CACHE = 'wordcounter-static-v1';
const DYNAMIC_CACHE = 'wordcounter-dynamic-v1';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add generated assets here when built
];

// Install service worker and cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch with aggressive caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different resource types with optimized strategies
  if (request.method === 'GET') {
    // Static assets: Cache first, network fallback
    if (isStaticAsset(url)) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            return response || fetch(request)
              .then((response) => {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
                return response;
              });
          })
      );
    }
    // Dynamic content: Network first, cache fallback with short TTL
    else if (isDynamicContent(url)) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
            return response;
          })
          .catch(() => {
            return caches.match(request);
          })
      );
    }
  }
});

function isStaticAsset(url) {
  return (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname === '/' ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/images/')
  );
}

function isDynamicContent(url) {
  return (
    url.pathname.startsWith('/blog/') ||
    url.origin === location.origin
  );
}