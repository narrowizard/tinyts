var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (old) {
    $.fn.attr = function () {
        if (arguments.length === 0) {
            if (this.length === 0) {
                return null;
            }
            var obj = {};
            $.each(this[0].attributes, function () {
                if (this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }
        return old.apply(this, arguments);
    };
})($.fn.attr);
/**
 * InputView包含Validate方法
 */
var InputView = (function (_super) {
    __extends(InputView, _super);
    function InputView() {
        _super.apply(this, arguments);
    }
    InputView.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.validators = [];
        var attributes = this.target.attr();
        for (var temp in attributes) {
            if (temp.indexOf("data-validate") > -1) {
                var v = ValidatePool.GetValidator(temp, attributes[temp]);
                this.AddValidator(v);
            }
        }
    };
    InputView.prototype.AddValidator = function (validator) {
        this.validators.push(validator);
    };
    InputView.prototype.ClearValidator = function () {
        this.validators = [];
    };
    InputView.prototype.GetLastError = function () {
        return this.lastError;
    };
    InputView.prototype.Validate = function () {
        debugger;
        var value = this.Value();
        for (var i = 0; i < this.validators.length; i++) {
            if (!this.validators[i].Validate(value)) {
                this.lastError = this.validators[i].GetMessage();
                return false;
            }
        }
        return true;
    };
    return InputView;
})(TextView);
//# sourceMappingURL=InputView.js.map