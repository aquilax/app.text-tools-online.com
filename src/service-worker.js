var CACHE_NAME = "cache-v1";
var urlsToCache = ["/", "/?source=pwa"];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
