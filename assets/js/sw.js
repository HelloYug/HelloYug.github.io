const CACHE_NAME = 'yug-portfolio-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/main.js',
  './assets/js/randomTheme.js',
  './assets/js/randomProfilePic.js',
  './assets/vendor/bootstrap/css/bootstrap.min.css',
  './assets/vendor/icofont/icofont.min.css',
  './assets/vendor/boxicons/css/boxicons.min.css',
  './assets/vendor/remixicon/remixicon.css',
  './assets/vendor/owl.carousel/assets/owl.carousel.min.css',
  './assets/vendor/venobox/venobox.css',
  './assets/CustomCursors/cursor.css',
  './assets/CustomCursors/cursor.js'
];

// Install Event: Cache all critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve from cache, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Dynamically cache images as they are fetched
        if (event.request.url.match(/\.(webp|png|jpg|jpeg|gif|svg|mp4)$/)) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    })
  );
});
