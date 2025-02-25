
// Caching strategy configuration
const CACHE_NAME = 'cvv-iedc-v1';
const IMAGE_CACHE_NAME = 'cvv-iedc-images-v1';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/placeholder.svg',
  // Add other critical assets here
];

// File extensions to cache in the image cache
const IMAGE_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.gif'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(PRECACHE_ASSETS)),
      // Create image cache
      caches.open(IMAGE_CACHE_NAME)
    ])
    .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches except current ones
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  const url = new URL(request.url);
  return IMAGE_EXTENSIONS.some(ext => url.pathname.endsWith(ext)) || 
         request.destination === 'image';
}

// Helper function to determine if a request should be network-first
function isNetworkFirstRequest(request) {
  const url = new URL(request.url);
  // API calls and dynamic content should be network-first
  return url.pathname.includes('/api/') || 
         url.pathname.endsWith('.json');
}

// Fetch event - handle requests with appropriate strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle cross-origin requests differently
  if (new URL(request.url).origin !== location.origin) {
    // For third-party resources, use stale-while-revalidate
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          // Only cache valid responses
          if (networkResponse && networkResponse.status === 200) {
            const cacheName = isImageRequest(request) ? IMAGE_CACHE_NAME : CACHE_NAME;
            const responseToCache = networkResponse.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Return offline fallback for navigation
          if (request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return null;
        });
        
        // Return cached response immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
  
  // For image requests, use cache-first strategy with network fallback
  if (isImageRequest(request)) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // If in cache, return the cached version immediately
            // But also update cache in the background
            const fetchPromise = fetch(request).then((network