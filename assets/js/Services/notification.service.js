export default class NotificationService {
  /**
   * Show a local notification
   * @param {string} title
   * @param {NotificationOptions} options
   */
  static showNotification(title, options) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(value => {
        sendNotification(title, options);
      });
    } else {
      sendNotification(title, options);
    }
  }
}

/**
 *
 * @param {string} title
 * @param {NotificationOptions} options
 */
function sendNotification(title, options) {
  const opts = Object.assign({
    icon: './assets/img/icon-192.png',
    badge: './assets/img/icon-128.png',
    body: "",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'test-notification'
  }, options);

  navigator.serviceWorker.getRegistration().then(function (reg) {
    reg.showNotification(title, opts);
  });
}
