const staticAssets = [
  './',
  './index.css',
  './index.js',
  './ui.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
];
const staticCacheName = 'site-static'

self.addEventListener('install', async event => {
  event.waitUntil(
    await caches.open('staticCacheName').then(cache => {
      console.log("caching assets")
      cache.addAll(staticAssets)
    })
  )
  
});

// install event
self.addEventListener('install', event => {
  //console.log('service worker installed');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});


self.addEventListener('fetch', event => {
  //console.log('fetch event', evt);
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request);
    })
  );
});

/*
self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if(url.origin === location.origin) {
      event.respondWith(cacheData(request));
  } else {
      event.respondWith(networkFirst(request));
  }

});

async function cacheData(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open('dynamic-birds');

  try {
      const response = await fetch(request);
      cache.put(request, response.clone());
      return response;
  } catch (error){
      return await cache.match(request);

  }

}
*/