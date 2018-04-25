var that;

class Application {
    constructor() {
        this.CACHE_NAME = 'pwa-cache-v1';
        this.urlsToCache = [
            './',
            './build/css/styles.css',
            './assets/img/'
        ];

        self.addEventListener('install', this.onInstall);
        self.addEventListener('fetch', this.onFetch);

        that = this;
    }

    onInstall(event) {
        event.waitUntil(
            caches.open(that.CACHE_NAME)
                .then(function (cache) {
                    console.log('Opened cache');
                    return cache.addAll(that.urlsToCache);
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
                                }
                            );

                            return response;
                        }
                    );
                }
            )
        );
    }
}

var app = new Application();
