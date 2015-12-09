var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 初始化会在每一个input:radio上加上name属性为radio + id
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(id) {
        _super.call(this, id);
        this.name = "radio" + id;
    }
    RadioButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<input type='radio' value=" + this.mData[index].value + " name='" + this.name + "'/>" + this.mData[index].text;
        return html;
    };
    RadioButton.prototype.RefreshView = function () {
        this.target.html("");
        for (var i = 0; i < this.mData.length; i++) {
            this.target.append(this.GetView(i));
        }
    };
    RadioButton.prototype.Value = function () {
        return $("input:radio[name=" + this.name + "]").filter(":checked").val();
    };
    RadioButton.prototype.SetValue = function (value) {
        $("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
    };
    return RadioButton;
})(ListControl);
//# sourceMappingURL=radioButton.js.map