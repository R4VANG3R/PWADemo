import NotificationService from "./../Services/notification.service"
import ShareService, { ShareModel } from "./../Services/share.service"
import BluetoothService from "../Services/bluetooth.service";
import ForegroundService from "../Services/foreground.service";
import ScreencaptureService from "../Services/screencapture.service";
import BatteryService from "../Services/battery.service";

const SERVICEWORKER = './service-worker.js';

class Main {
  constructor() {
    window.addEventListener('beforeinstallprompt', this.handleInstall.bind(this));

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', this.registerServiceWorker.bind(this));
    }

    this.state = {
      installPrompt: null,
    };

    document.querySelector("#btnShare").addEventListener('click', this.handleShareClick.bind(this));
    document.querySelector("#btnNotify").addEventListener('click', this.handleNotifyClick.bind(this));
    document.querySelector("#btnBluetooth").addEventListener('click', this.handleBluetoothClick.bind(this));
    document.querySelector("#btnScreencapture").addEventListener('click', this.handleScreencaptureClick.bind(this));
    document.querySelector("#btnPleasure").addEventListener('click', this.handlePleasureClick.bind(this));

    const fg = new ForegroundService();

    document.querySelector("#txtNetworkInfo").innerHTML = `Speed: ${navigator.connection.downlink} MB/s<br>Latency: ${navigator.connection.rtt}`;
    BatteryService.batteryLevel().then(level => {
      document.querySelector("#txtBattery").innerHTML = level * 100 + " %";
    })
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
    new ScreencaptureService(document.querySelector("#vidScreencapture"));
  }

  handlePleasureClick(event) {
    navigator.vibrate([100, 0, 100, 0, 100, 0, 300, 0, 300, 0, 300, 0, 100, 0, 100, 0, 100]);
  }
}

const m = new Main();
