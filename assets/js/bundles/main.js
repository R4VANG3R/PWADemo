import NotificationService from "./../Services/notification.service"
import ShareService, { ShareModel } from "./../Services/share.service"
import BluetoothService from "../Services/bluetooth.service";
import ForegroundService from "../Services/foreground.service";
import ScreencaptureService from "../Services/screencapture.service";

const SERVICEWORKER = './service-worker.js';

class Main {
  constructor() {
    window.addEventListener('beforeinstallprompt', this.handleInstall.bind(this));

    if ('serviceworker' in navigator) {
      window.addEventListener('load', this.registerServiceWorker.bind(this));
    }

    this.state = {
      installPrompt: null,
    };

    document.querySelector("#btnShare").addEventListener('click', this.handleShareClick.bind(this));
    document.querySelector("#btnNotify").addEventListener('click', this.handleNotifyClick.bind(this));
    document.querySelector("#btnBluetooth").addEventListener('click', this.handleBluetoothClick.bind(this));
    document.querySelector("#btnScreencapture").addEventListener('click', this.handleScreencaptureClick.bind(this));

    const fg = new ForegroundService();
  }

  handleInstall(e) {
    console.log('beforeinstallprompt Event fired');

    e.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled home screen install');
        alert('ahw :(');
      } else {
        console.log('User added to home screen');
        alert('Yay!');
      }
    });
  }

  registerServiceWorker() {
    navigator.serviceWorker.register(SERVICEWORKER).then(function (registration) {
      console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
    }, function (err) {
      console.error(`ServiceWorker registration failed: ${err}`);
    });
  }

  promptInstall(installPrompt) {
    if (installPrompt === undefined) return false;

    installPrompt.prompt();

    installPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      installPrompt = null;

      return choiceResult.outcome !== 'dismissed';
    });
    return false;
  }

  /**
   * Share button click event
   * @param {Event} event
   */
  handleShareClick(event) {
    ShareService.share(new ShareModel('KappaPride!', 'PWA is Kappa', './'))
  }

  /**
   * Notify button click event
   * @param {Event} event
   */
  handleNotifyClick(event) {
    NotificationService.showNotification("Kappa world!", {body: "This notification is a test, so do with it as you will."});
  }

  /**
   *
   * @param {Event} event
   */
  handleBluetoothClick(event) {
    const service = new BluetoothService();
    // div#listBluetoothDevices
    service.getAllDevices();
  }

  handleScreencaptureClick(event) {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "never"
      },
      audio: false
    })
      .then(stream => {
        console.log(stream);
        document.querySelector("#vidScreencapture").srcObject = stream;
      })
      .catch(error => console.log("" + error))

  }
}

const m = new Main();
