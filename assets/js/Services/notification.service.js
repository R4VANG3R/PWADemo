export default class NotificationService {
  /**
   * Show a local notification
   * @param {string} title
   * @param {NotificationOptions} options
   */
  static showNotification(title, options) {
    const opts = Object.assign({
      icon: './assets/img/icon-192.png',
      badge: './assets/img/icon-128.png',
      body: "",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'test-notification'
    }, options);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(result => {
        navigator.serviceWorker.getRegistration().then(registration => {
          registration.showNotification(title, opts);
        })
      });
    } else {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration.showNotification(title, opts);
      })
    }
  }
}
