var that;

class Application {
    constructor() {
        this.CACHE_NAME = 'pwa-cache-v1';
        this.urlsToCache = [
            './',
            './index.js',
            './index.html',
            './build/',
            './build/js/',
            './build/js/scripts.js',
            './build/css/',
            './build/css/styles.css',
            './assets/',
            './assets/img/'
        ];

        self.addEventListener('install', this.onInstall);
        self.addEventListener('fetch', this.onFetch);
        self.addEventListener('activate', this.onActivate);

        that = this;
    }

    /**
     * Install ServiceWorker
     * @param {InstallEvent} event 
     */
    onInstall(event) {
        event.waitUntil(
            caches.open(that.CACHE_NAME)
                .then(function (cache) {
                    console.log('Opened cache');
                    cache.addAll(that.urlsToCache)
                        .then(function(value) {
                            return value;
                        }, function(err) {
                            console.error(err);
                        });
                }, function(err) {
                    console.error(err);
                }
            )
        );
    }

    /**
     * Cache fetch
     * @param {FetchEvent} event 
     */
    onFetch(event) {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    }

                    var fetchRequest = event.request.clone();

                    return fetch(fetchRequest)
                        .then(function (response) {
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            var responseToCache = response.clone();

                            caches.open(that.CACHE_NAME)
                                .then(function(cache) {
                                    cache.put(event.request, responseToCache);
                                }, function(err) {
                                    console.error(err);
                                }
                            );

                            return response;
                        }, function(err) {
                            console.error(err);
                        }
                    );
                }, function (err) {
                    console.error(err);
                }
            )
        );
    }

    /**
     * On ServiceWorker activate (post update)
     * @param {ActivateEvent} event 
     */
    onActivate(event) {
        var cacheWhitelist = [that.CACHE_NAME];

        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    }
}

var app = new Application();
