var that;

class Application {
    constructor() {
        this.CACHE_NAME = 'pwa-cache-v1';
        this.urlsToCache = [
            './',
            './build/css/styles.css'
        ];

        self.addEventListener('install', this.onInstall);
        // self.addEventListener('fetch', this.onFetch);

        that = this;
    }

    onInstall(event) {
        event.waitUntil(
            caches.open(this.CACHE_NAME)
                .then(function(cache) {
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
                .then(function(response) {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
        );
    }
}

var app = new Application();
