if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
 
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
 
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first').then(function(cache) {
      return cache.addAll([
        'index.html',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'

      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
          .then(function(response) {
        
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
          
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open('first')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});