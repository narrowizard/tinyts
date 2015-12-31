var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageView = (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        _super.apply(this, arguments);
    }
    ImageView.prototype.SetUrl = function (url) {
        this.target.attr("src", url);
    };
    ImageView.prototype.SetSize = function (height, width) {
        if (height > 0) {
            this.target.css("height", height);
        }
        if (width > 0) {
            this.target.css("width", width);
        }
    };
    return ImageView;
})(View);
//# sourceMappingURL=imageView.js.map