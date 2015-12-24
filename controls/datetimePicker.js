var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DatetimePicker = (function (_super) {
    __extends(DatetimePicker, _super);
    function DatetimePicker() {
        _super.apply(this, arguments);
    }
    DatetimePicker.prototype.DatePicker = function (config) {
        this.picker = this.target.datetimepicker(config);
    };
    return DatetimePicker;
})(TextBox);
//# sourceMappingURL=datetimePicker.js.map