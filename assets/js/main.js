function SendNotification(message) {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
            console.log(status);
        }).then(function(value) {
            ShowNotification(message);
        });
    } else {
       ShowNotification(message); 
    }
}

function ShowNotification(message) {
    navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification(message);
    });
}
