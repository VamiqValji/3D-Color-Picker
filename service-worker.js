// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
// );

// workbox.routing.registerRoute(
//   ({ request }) => request.destination === "image",
//   new workbox.strategies.CacheFirst()
// );

const cacheName = "3DCP";
const staticAssets = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./pwa-icons/manifest-icon-192.png",
  "./pwa-icons/manifest-icon-512.png",
  "./images/logo_256.png",
];

self.addEventListener("install", async (e) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
