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
    ViewGroup.prototype.SetContext = function (context) {
        this.context = context;
    };
    return ViewGroup;
})(BaseViewModel);
//# sourceMappingURL=ViewGroup.js.map