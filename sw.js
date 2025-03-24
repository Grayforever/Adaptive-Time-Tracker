// Define cache version and cache names for static and dynamic assets
const CACHE_VERSION = 'v1'; 
const STATIC_CACHE_NAME = 'acs-tt-static-' + CACHE_VERSION;
const DYNAMIC_CACHE_NAME = 'acs-tt-dynamic-' + CACHE_VERSION;

// List of static assets to cache during installation
const STATIC_ASSETS = [
  './',
  './index.html',
  './src/index.css',
  './src/index.js', 
  '/adaptivepwa2.png',
  '/Timemanagementpwa.png',
];

// Install event - caches static assets and activates immediately
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  self.skipWaiting(); 

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - removes old caches and takes control of open clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); 
});

// Fetch event - tries network first, caches response dynamically, falls back to cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => caches.match(event.request)) 
  );
});
