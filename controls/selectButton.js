var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectButton = (function (_super) {
    __extends(SelectButton, _super);
    function SelectButton() {
        _super.apply(this, arguments);
    }
    SelectButton.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
    };
    SelectButton.prototype.Clear = function () {
        this.target.html("");
    };
    SelectButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<button data-id=" + this.mData[index].value + ">";
        html += this.mData[index].text;
        html += "</button>";
        return html;
    };
    return SelectButton;
})(ListView);
//# sourceMappingURL=selectButton.js.map