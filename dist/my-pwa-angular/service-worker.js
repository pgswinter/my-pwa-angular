'use strict';

const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
    '/',
    'favicon.ico',
    '/index.html',
    'main.js',
    'main.js.map',
    'polyfills.js',
    'polyfills.js.map',
    'runtime.js',
    'runtime.js.map',
    'styles.js',
    'styles.js.map',
    'vendor.js',
    'vendor.js.map',
];

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.add(FILES_TO_CACHE))
    )
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then((() => {
            console.log('V1 now ready to handle fetches!');
        }))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then(res => {
                        if (res.status === 200) {
                            cache.put(event.request.url, res.clone());
                        }
                        return res;
                    }).catch(err => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(event.request);
                    })
            })
        )
    }
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request)
                .then(res => {
                  return res || fetch(event.request);
                });
          })
    )
})