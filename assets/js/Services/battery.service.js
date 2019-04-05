export default class BatteryService {
  constructor() {

  }

  /**
   * @returns {Promise}
   */
  static batteryLevel() {
    return new Promise((resolve, reject) => {
      navigator.getBattery().then(value => resolve(value.level))
    })
  }
}
