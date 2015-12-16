var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EditDialog = (function (_super) {
    __extends(EditDialog, _super);
    function EditDialog() {
        _super.apply(this, arguments);
    }
    EditDialog.prototype.MoveTo = function (x, y) {
        this.target.css("left", x);
        this.target.css("top", y);
    };
    EditDialog.prototype.SetTitle = function (title) {
        this.target.children(".title").text(title);
    };
    return EditDialog;
})(ViewGroup);
//# sourceMappingURL=editDialog.js.map