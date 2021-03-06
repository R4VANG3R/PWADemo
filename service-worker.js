class Application {
  constructor() {
    this.CACHE_NAME = 'pwa-cache-v1.0.3';
    this.filesToCache = [
      './',
      './index.html',
      './build/js/main.bundle.js',
      './build/css/styles.css',
      './service-worker.js'
    ];

    self.addEventListener('install', this.onInstall.bind(this));
    self.addEventListener('fetch', this.onFetch.bind(this));
    self.addEventListener('activate', this.onActivate.bind(this));
    self.addEventListener('notificationclick', this.onNotificationClick.bind(this));
  }

  /**
   * Install ServiceWorker
   * @param {InstallEvent} event
   */
  onInstall(event) {
    const self = this;

    event.waitUntil(
        caches.open(this.CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');

                cache.addAll(self.filesToCache)
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
    var cacheWhitelist = [this.CACHE_NAME];

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

  /**
   * User clicks on notification
   * @param {Event} event
   */
  onNotificationClick(event) {
    console.log('Notification click!', event);
    event.notification.close();

    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(clientList => {
      clientList.forEach(client => {
        // check if the user has the tab open already, if so focus the tab.
        if (client.url === './' && 'focus' in client) {
          return client.focus();
        }
      });
      // otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    }));
  }
}

const app = new Application();
