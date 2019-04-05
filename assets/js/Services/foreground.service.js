export default class ForegroundService {
  constructor() {
    document.addEventListener('visibilitychange', event => {
      console.log(event, document.visibilityState);
    });
  }

  static get isInForeground() {
    return document.visibilityState === "visible"
  }
}
