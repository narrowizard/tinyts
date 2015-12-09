var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EditDialog = (function (_super) {
    __extends(EditDialog, _super);
    function EditDialog(id) {
        _super.call(this, id);
    }
    EditDialog.prototype.Hide = function () {
        this.target.css("display", "none");
        this.state = false;
    };
    EditDialog.prototype.Show = function () {
        this.target.css("display", "block");
        this.state = true;
    };
    EditDialog.prototype.MoveTo = function (x, y) {
        this.target.css("left", x);
        this.target.css("top", y);
    };
    return EditDialog;
})(BaseControl);
//# sourceMappingURL=editDialog.js.map