export default class NotificationService {
    constructor() {}

    /**
     * @returns {Promise}
     */
    get Registration() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(value => {
                return navigator.serviceWorker.getRegistration();
            });
        } else {
            return navigator.serviceWorker.getRegistration();
        }
    }

    /**
     * Send a push notification
     * @param {NotificationOptions} options Notification options
     */
    ShowNotification(title, options) {
        this.Registration.then(reg => {
            reg.showNotification(title, options);
        });
    }
}

export class NotificationOptions {
    /**
     * 
     * @param {string} message Body text
     * @param {string} icon Large icon inside the notification
     * @param {string} badge The tray icon (mobile only)
     * @param {string} image Image
     * @param {string} tag Id tag handler
     * @param {*} actions Action buttons
     */
    constructor(message, icon, badge = './assets/img/icon-128.png', image = undefined, tag = undefined, actions = undefined) {
        this.body = message;
        this.icon = icon;
        this.badge = badge;
        this.image = image;
        this.tag = tag;
        this.vibrate = [200, 100, 200, 100];
        this.actions = actions;
    }
}
