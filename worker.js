this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('hack_v1')
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/media/favicon.png',
          '/media/me.jpg',
          '/media/projects.json'
        ])
      })
  )
})

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request)
      })
  )
})
