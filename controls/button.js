var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.PerformClick = function () {
        if (this.target != null) {
            this.target.click();
        }
    };
    Button.prototype.Disable = function () {
        this.target.attr("disabled", "true");
    };
    Button.prototype.Enable = function () {
        this.target.removeAttr("disabled");
    };
    return Button;
})(TextView);
//# sourceMappingURL=button.js.map