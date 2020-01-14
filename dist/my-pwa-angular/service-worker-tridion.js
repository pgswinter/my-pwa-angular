'use strict';

const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
    // '/',
    // 'favicon.ico',
    '/tuananh_website.xhtml',
    // '/static/mcivn/js/main.js',
    // 'main.js.map',
    // '/static/mcivn/js/polyfills.js',
    // 'polyfills.js.map',
    // '/static/mcivn/js/runtime.js',
    // 'runtime.js.map',
    // '/static/mcivn/js/styles.js',
    // 'styles.js.map',
    // '/static/mcivn/js/vendor.js',
    // 'vendor.js.map',
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.add(FILES_TO_CACHE))
    )
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('fetch', (evt) => { });

// self.addEventListener('install', event => {
//     console.log('[ServiceWorker] Install');
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(cache => cache.add(FILES_TO_CACHE))
//     )
//     self.skipWaiting();
// });

// self.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys().then(keys => Promise.all(
//             keys.map(key => {
//                 if (!expectedCaches.includes(key)) {
//                     return caches.delete(key);
//                 }
//             })
//         )).then((() => {
//             console.log('V1 now ready to handle fetches!');
//         }))
//     );
//     self.clients.claim();
// });

// self.addEventListener('fetch', event => {
//     if (event.request.url.includes('/')) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then((cache) => {
//                 return fetch(event.request)
//                     .then(res => {
//                         if (res.status === 200) {
//                             cache.put(event.request.url, res.clone());
//                         }
//                         return res;
//                     }).catch(err => {
//                         // Network request failed, try to get it from the cache.
//                         return cache.match(event.request);
//                     })
//             })
//         )
//     }
//     event.respondWith(
//         caches.open(CACHE_NAME).then((cache) => {
//             return cache.match(event.request)
//                 .then(res => {
//                   return res || fetch(event.request);
//                 });
//           })
//     )
// })