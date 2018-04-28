function SendNotification(title, message) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
            console.log(status);
        }).then(function(value) {
            ShowNotification(title, message);
        });
    } else {
       ShowNotification(title, message);
    }
}

function ShowNotification(title, message) {
    navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification(title, {
            icon: 'https://r4vang3r.github.io/PWADemo/assets/img/icon-128.png',
            body: message,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'test-notification'
        });
    });
}
