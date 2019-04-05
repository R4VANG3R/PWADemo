/**
 * @fileoverview Screencapture / sharing service. Handles sharing your screen.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API}
 */

export default class ScreencaptureService {
  /**
   *
   * @param {HTMLVideoElement} videoEl
   */
  constructor(videoEl, options) {
    this.videoEl = videoEl;
    this.options = Object.assign({
      video: {
        cursor: "always",
        displaySurface: "monitor"
      },
      audio: false
    }, options);

    navigator.mediaDevices.getDisplayMedia(this.options)
      .then(stream => {
        this.videoEl.srcObject = stream;
        this.videoEl.style.display = "block";

        stream.oninactive = this.handleCaptureStop.bind(this);
      })
      .catch(error => console.log("" + error))
  }

  handleCaptureStop(event) {
    const tracks = this.videoEl.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    this.videoEl.srcObject = null;
    this.videoEl.style.display = "none";
  }
}
