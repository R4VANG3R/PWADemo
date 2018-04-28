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
            iconUrl: './../../assets/img/icon-128.png',
            type: 'basic',
            title: title,
            message: message
        });
    });
}
