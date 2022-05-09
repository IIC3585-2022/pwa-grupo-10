const staticAssets = [
  './',
  './index.css',
  './index.js',
  './ui.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
];
const staticCacheName = 'site-static-v1'
const dynamicCacheName= 'site-dynamic-v1'

self.addEventListener('install', async event => {
  event.waitUntil(
    await caches.open('staticCacheName').then(cache => {
      console.log("caching assets")
      cache.addAll(staticAssets)
    })
  )
  
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});
