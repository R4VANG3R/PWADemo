/**
 * @fileoverview Implementation of the Bluetooth Web Api
 * @see {@link https://googlechrome.github.io/samples/web-bluetooth/device-info.html}
 *
 * At the time of writing this API is very unstable and useless.
 * Devices show up as unsupported missing their names, and it does not work on mobile.
 */

export default class BluetoothService {
  constructor() {

  }

  /**
   *
   */
  getAllDevices() {
    if (!('bluetooth' in navigator)) {
      alert('no bluetooth :(')
      return
    }

    navigator.bluetooth.requestDevice({
      //filters: [],
      acceptAllDevices: true
    })
      .then(devices => {
        console.log(devices);
      })
      .catch(error => console.error(`${error.name} (${error.code}): ${error.message}`))
  }
}
