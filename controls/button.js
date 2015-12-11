var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(id) {
        _super.call(this, id);
        this.elementName = "button";
    }
    Button.Init = function (id) {
        var instance = new Button(id);
        instance.LoadView();
        return instance;
    };
    Button.prototype.OnClick = function (handler) {
        if (this.target != null) {
            this.target.click(handler);
        }
    };
    Button.prototype.PerformClick = function () {
        if (this.target != null) {
            this.target.click();
        }
    };
    return Button;
})(BaseControl);
//# sourceMappingURL=button.js.map