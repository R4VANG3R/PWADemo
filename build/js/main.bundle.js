(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @fileoverview Implementation of the Bluetooth Web Api
 * @see {@link https://googlechrome.github.io/samples/web-bluetooth/device-info.html}
 *
 * At the time of writing this API is very unstable and useless.
 * Devices show up as unsupported missing their names, and it does not work on mobile.
 */
var BluetoothService =
/*#__PURE__*/
function () {
  function BluetoothService() {
    _classCallCheck(this, BluetoothService);
  }
  /**
   *
   */


  _createClass(BluetoothService, [{
    key: "getAllDevices",
    value: function getAllDevices() {
      if (!('bluetooth' in navigator)) {
        alert('no bluetooth :(');
        return;
      }

      navigator.bluetooth.requestDevice({
        //filters: [],
        acceptAllDevices: true
      }).then(function (devices) {
        console.log(devices);
      }).catch(function (error) {
        return console.error("".concat(error.name, " (").concat(error.code, "): ").concat(error.message));
      });
    }
  }]);

  return BluetoothService;
}();

exports.default = BluetoothService;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ForegroundService =
/*#__PURE__*/
function () {
  function ForegroundService() {
    _classCallCheck(this, ForegroundService);

    document.addEventListener('visibilitychange', function (event) {
      console.log(event, document.visibilityState);
    });
  }

  _createClass(ForegroundService, null, [{
    key: "isInForeground",
    get: function get() {
      return document.visibilityState === "visible";
    }
  }]);

  return ForegroundService;
}();

exports.default = ForegroundService;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NotificationService =
/*#__PURE__*/
function () {
  function NotificationService() {
    _classCallCheck(this, NotificationService);
  }

  _createClass(NotificationService, null, [{
    key: "showNotification",

    /**
     * Show a local notification
     * @param {string} title
     * @param {NotificationOptions} options
     */
    value: function showNotification(title, options) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (value) {
          sendNotification(title, options);
        });
      } else {
        sendNotification(title, options);
      }
    }
  }]);

  return NotificationService;
}();
/**
 *
 * @param {string} title
 * @param {NotificationOptions} options
 */


exports.default = NotificationService;

function sendNotification(title, options) {
  var opts = Object.assign({
    icon: './assets/img/icon-192.png',
    badge: './assets/img/icon-128.png',
    body: "",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'test-notification'
  }, options);
  navigator.serviceWorker.getRegistration().then(function (reg) {
    reg.showNotification(title, opts);
  });
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreencaptureService = function ScreencaptureService() {
  _classCallCheck(this, ScreencaptureService);
};

exports.default = ScreencaptureService;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareModel = exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShareService =
/*#__PURE__*/
function () {
  function ShareService() {
    _classCallCheck(this, ShareService);
  }

  _createClass(ShareService, null, [{
    key: "share",

    /**
     * Share
     * @param {ShareModel} shareObj
     */
    value: function share(shareObj) {
      if (this.hasShare) {
        return navigator.share({
          title: shareObj.title,
          text: shareObj.text,
          url: shareObj.url
        });
      }
    }
  }, {
    key: "hasShare",
    get: function get() {
      return navigator.share ? true : false;
    }
  }]);

  return ShareService;
}();

exports.default = ShareService;

var ShareModel = function ShareModel(title, text, url) {
  _classCallCheck(this, ShareModel);

  this.title = title;
  this.text = text;
  this.url = url;
};

exports.ShareModel = ShareModel;

},{}],6:[function(require,module,exports){
"use strict";

var _notification = _interopRequireDefault(require("./../Services/notification.service"));

var _share = _interopRequireWildcard(require("./../Services/share.service"));

var _bluetooth = _interopRequireDefault(require("../Services/bluetooth.service"));

var _foreground = _interopRequireDefault(require("../Services/foreground.service"));

var _screencapture = _interopRequireDefault(require("../Services/screencapture.service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SERVICEWORKER = './service-worker.js';

var Main =
/*#__PURE__*/
function () {
  function Main() {
    _classCallCheck(this, Main);

    window.addEventListener('beforeinstallprompt', this.handleInstall.bind(this));

    if ('serviceworker' in navigator) {
      window.addEventListener('load', this.registerServiceWorker.bind(this));
    }

    this.state = {
      installPrompt: null
    };
    document.querySelector("#btnShare").addEventListener('click', this.handleShareClick.bind(this));
    document.querySelector("#btnNotify").addEventListener('click', this.handleNotifyClick.bind(this));
    document.querySelector("#btnBluetooth").addEventListener('click', this.handleBluetoothClick.bind(this));
    document.querySelector("#btnScreencapture").addEventListener('click', this.handleScreencaptureClick.bind(this));
    var fg = new _foreground.default();
  }

  _createClass(Main, [{
    key: "handleInstall",
    value: function handleInstall(e) {
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
  }, {
    key: "registerServiceWorker",
    value: function registerServiceWorker() {
      navigator.serviceWorker.register(SERVICEWORKER).then(function (registration) {
        console.log("ServiceWorker registration successful with scope: ".concat(registration.scope));
      }, function (err) {
        console.error("ServiceWorker registration failed: ".concat(err));
      });
    }
  }, {
    key: "promptInstall",
    value: function promptInstall(installPrompt) {
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

  }, {
    key: "handleShareClick",
    value: function handleShareClick(event) {
      _share.default.share(new _share.ShareModel('KappaPride!', 'PWA is Kappa', './'));
    }
    /**
     * Notify button click event
     * @param {Event} event
     */

  }, {
    key: "handleNotifyClick",
    value: function handleNotifyClick(event) {
      _notification.default.showNotification("Kappa world!", {
        body: "This notification is a test, so do with it as you will."
      });
    }
    /**
     *
     * @param {Event} event
     */

  }, {
    key: "handleBluetoothClick",
    value: function handleBluetoothClick(event) {
      var service = new _bluetooth.default(); // div#listBluetoothDevices

      service.getAllDevices();
    }
  }, {
    key: "handleScreencaptureClick",
    value: function handleScreencaptureClick(event) {
      navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "never"
        },
        audio: false
      }).then(function (stream) {
        console.log(stream);
        document.querySelector("#vidScreencapture").srcObject = stream;
      }).catch(function (error) {
        return console.log("" + error);
      });
    }
  }]);

  return Main;
}();

var m = new Main();

},{"../Services/bluetooth.service":1,"../Services/foreground.service":2,"../Services/screencapture.service":4,"./../Services/notification.service":3,"./../Services/share.service":5}]},{},[6])

//# sourceMappingURL=main.bundle.js.map
