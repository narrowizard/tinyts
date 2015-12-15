var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        _super.apply(this, arguments);
    }
    TextView.prototype.SetText = function (text) {
        this.target.text(text);
    };
    TextView.prototype.SetColor = function (color) {
        this.target.css("color", color);
    };
    TextView.prototype.SetBackgroundColor = function (color) {
        this.target.css("background-color", color);
    };
    TextView.prototype.SetSize = function (pixel) {
        this.target.css("font-size", pixel);
    };
    return TextView;
})(View);
//# sourceMappingURL=TextView.js.map