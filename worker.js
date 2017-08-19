self.addEventListener('activate', function(event) {
  console.log('Activating ...')
  var cacheWhitelist = ['hack_v5']

  event.waitUntil(
    caches
    .keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})

// greedy cache
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
    .match(event.request)
    .then(function (response) {
      return response || fetch(event.request).then(function (response) {
        if (event.request.url.indexOf(self.location.hostname) != -1) {
          return caches.open('hack_v5').then(function(cache) {
            cache.put(event.request, response.clone())
            return response
          })
        } else {
          return response
        }
      })
    })
  )
})
