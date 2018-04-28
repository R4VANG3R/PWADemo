"use strict";

function SendNotification(title, message) {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission(function (status) {
      console.log(status);
    }).then(function (value) {
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShareService =
/*#__PURE__*/
function () {
  function ShareService() {
    _classCallCheck(this, ShareService);
  }

  _createClass(ShareService, [{
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

var ShareModel = function ShareModel(title, text, url) {
  _classCallCheck(this, ShareModel);

  this.title = title;
  this.text = text;
  this.url = url;
};
//# sourceMappingURL=scripts.js.map
