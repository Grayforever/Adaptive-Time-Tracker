// Version your cache to make updates easier
const CACHE_VERSION = 'v1';
const STATIC_CACHE_NAME = 'acs-tt-static-' + CACHE_VERSION;
const DYNAMIC_CACHE_NAME = 'acs-tt-dynamic-' + CACHE_VERSION;

// Add all essential assets your app needs to work offline
const STATIC_ASSETS = [
  './',
  './index.html',
  './src/index.css',
  './src/index.js', // Assuming you have a main JS file
  '/adaptivepwa2.png',
  '/Timemanagementpwa.png',
  // Add other critical assets here (fonts, core scripts, etc.)
];

// Install event - cache your static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            // Delete old versions of caches
            if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
              console.log('[Service Worker] Removing old cache', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        // Ensure the service worker takes control immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // For same-origin requests, use cache-first strategy
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached response if available
            return cachedResponse;
          }

          // If not in cache, fetch from network and store in dynamic cache
          return fetch(event.request)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response since it can only be consumed once
              const responseToCache = response.clone();

              caches.open(DYNAMIC_CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(err => {
              console.log('[Service Worker] Fetch failed:', err);
              // You could return a custom offline page here
              // return caches.match('/offline.html');
            });
        })
    );
  } else {
    // For external resources, use network-first approach
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});