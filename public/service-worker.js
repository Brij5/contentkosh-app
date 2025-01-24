const CACHE_NAME = "contentkosh-cache-v1";
const staticUrlsToCache = [
  "/",
  "/index.html",
  "/data.json",
  "/assets/images/logo.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
  // Add other static resources here
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(staticUrlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((newResponse) => {
        if (newResponse.ok) {
          const responseToCache = newResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return newResponse;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
