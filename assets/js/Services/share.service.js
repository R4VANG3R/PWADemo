export default class ShareService {
    static get hasShare() {
        return (navigator.share) ? true : false;
    }

    /**
     * Share
     * @param {ShareModel} shareObj
     */
    static share(shareObj) {
        if (this.hasShare) {
            return navigator.share({
                title: shareObj.title,
                text: shareObj.text,
                url: shareObj.url
            });
        }
    }
}

export class ShareModel {
    constructor(title, text, url) {
        this.title = title;
        this.text = text;
        this.url = url;
    }
}
