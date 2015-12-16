var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 初始化会在每一个input:radio上加上name属性为radio + id
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        _super.apply(this, arguments);
    }
    RadioButton.prototype.SetId = function (id) {
        _super.prototype.SetID.call(this, id);
        this.name = "radio_" + id;
    };
    RadioButton.prototype.SetName = function (name) {
        this.name = name;
    };
    RadioButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<input type='radio' value=" + this.mData[index].value + " name='" + this.name + "'/>" + this.mData[index].text;
        return html;
    };
    RadioButton.prototype.Clear = function () {
        this.target.html("");
    };
    RadioButton.prototype.Value = function () {
        var r = $("input:radio[name=" + this.name + "]").filter(":checked");
        return r.val();
    };
    RadioButton.prototype.SetValue = function (value) {
        $("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
    };
    RadioButton.prototype.append = function (viewString) {
        this.target.append(viewString);
    };
    return RadioButton;
})(ListView);
//# sourceMappingURL=radioButton.js.map