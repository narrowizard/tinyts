var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        _super.apply(this, arguments);
    }
    TextBox.prototype.LoadView = function () {
        var _this = this;
        _super.prototype.LoadView.call(this);
        this.acceptBtn = this.target.attr("data-accept-button");
        if (this.acceptBtn) {
            this.On("keypress", function (args) {
                if (args.which == 13) {
                    $("#" + _this.acceptBtn).click();
                }
            });
        }
    };
    TextBox.prototype.Clear = function () {
        this.target.val("");
    };
    TextBox.prototype.Value = function () {
        var value = this.target.val();
        return value;
    };
    TextBox.prototype.ReadOnly = function (readonly) {
        if (readonly) {
            this.target.attr("readonly", "readonly");
        }
        else {
            this.target.removeAttr("readonly");
        }
    };
    TextBox.prototype.SetAcceptButton = function (p) {
        this.target.keydown(function (event) {
            if (event.keyCode == 13) {
                if (typeof p == "string") {
                    $("#" + p).click();
                }
                else if (typeof p == "object") {
                    p.PerformClick();
                }
            }
        });
    };
    TextBox.prototype.SetValue = function (value) {
        this.target.val(value);
    };
    // ColorPicker 将TextBox构造为一个ColorPicker
    // @param 当选择一个颜色之后的回调函数
    TextBox.prototype.ColorPicker = function (handler) {
        this.target.colorpicker({
            format: "hex"
        }).on("changeColor.colorpicker", handler);
    };
    TextBox.prototype.DatePicker = function (config) {
        this.target.datetimepicker(config);
    };
    return TextBox;
})(InputView);
//# sourceMappingURL=textBox.js.map