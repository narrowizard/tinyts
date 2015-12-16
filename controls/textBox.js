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
        _super.prototype.LoadView.call(this);
        this.required = Boolean(this.target.attr("data-required"));
        this.minLength = +this.target.attr("data-min-length");
        this.maxLength = +this.target.attr("data-max-length");
        this.validationArea = this.target.parent().children(".validation");
    };
    TextBox.prototype.Clear = function () {
        this.target.val("");
    };
    TextBox.prototype.Value = function () {
        var value = this.target.val();
        if (this.required) {
            if (!this.Required(value)) {
                this.SetErrorMsg("必须");
                this.ShowError();
                return null;
            }
        }
        if (this.minLength) {
            if (!this.MinLength(value)) {
                this.SetErrorMsg("长度必须大于等于" + this.minLength);
                this.ShowError();
                return null;
            }
        }
        if (this.maxLength) {
            if (!this.MaxLength(value)) {
                this.SetErrorMsg("长度必须小于等于" + this.maxLength);
                this.ShowError();
                return null;
            }
        }
        this.HideError();
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
    TextBox.prototype.SetErrorMsg = function (msg) {
        this.validationArea.text(msg);
    };
    TextBox.prototype.ShowError = function () {
        this.validationArea.css("display", "block");
    };
    TextBox.prototype.HideError = function () {
        this.validationArea.css("display", "none");
    };
    TextBox.prototype.Required = function (value) {
        return value.trim() !== "";
    };
    TextBox.prototype.MinLength = function (value) {
        return value.length >= this.minLength;
    };
    TextBox.prototype.MaxLength = function (value) {
        return value.length <= this.maxLength;
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
    return TextBox;
})(TextView);
//# sourceMappingURL=textBox.js.map