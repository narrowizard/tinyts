var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var value = this.Value();
        for (var i = 0; i < this.validators.length; i++) {
            if (!this.validators[i].Validate(value)) {
                this.lastError = this.validators[i].message;
                return false;
            }
        }
        return true;
    };
    return InputView;
})(TextView);
//# sourceMappingURL=InputView.js.map