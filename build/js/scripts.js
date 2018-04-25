"use strict";

function SendNotification(message) {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission(function (status) {
      console.log(status);
    });
  } else {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(message);
    });
  }
}
//# sourceMappingURL=scripts.js.map
