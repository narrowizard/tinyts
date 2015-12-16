var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewGroup = (function (_super) {
    __extends(ViewGroup, _super);
    function ViewGroup() {
        _super.apply(this, arguments);
    }
    ViewGroup.prototype.Hide = function () {
        this.target.css("display", "none");
        this.visiable = false;
    };
    ViewGroup.prototype.Show = function () {
        this.target.css("display", "block");
        this.visiable = true;
    };
    return ViewGroup;
})(View);
//# sourceMappingURL=ViewGroup.js.map