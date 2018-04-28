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
            icon: './assets/img/icon-96.png',
            badge: './assets/img/icon-96.png',
            body: message,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'test-notification'
        });
    });
}
