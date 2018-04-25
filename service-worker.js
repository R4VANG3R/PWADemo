var that;

class Application {
    constructor() {
        this.CACHE_NAME = 'pwa-cache-v1';
        this.filesToCache = [
            './',
            './index.html',
            './build/js/scripts.js',
            './build/css/styles.css',
            './service-worker.js'
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
                    cache.addAll(that.filesToCache)
                        .catch(reason => console.error(reason))
                })
                .catch(reason => console.warn(reason))
        );
    }

    /**
     * Cache fetch
     * @param {FetchEvent} event 
     */
    onFetch(event) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
                .catch(reason => console.warn(reason))
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
        return self.clients.claim();
    }
}

var app = new Application();
