// greedy caching
const currentCache = 'hack_v8'

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCache).then(function(cache) {
      return cache.addAll([
        '/',
        '/blog',
        '/projects',
        '/css/website.css',
        '/js/website.js',
        '/js/0.website.js',
        '/js/1.website.js',
        '/js/2.website.js'
      ])
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('Activating ...')
  let cacheWhitelist = [currentCache]

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

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
    .match(event.request)
    .then(function (response) {
      return response || fetch(event.request).then(function (response) {
        if (event.request.url.indexOf(self.location.hostname) != -1) {
          return caches.open(currentCache).then(function(cache) {
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
