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
    EditDialog.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var masked = this.target.attr("data-mask");
        this.closeOnClick = Boolean(this.target.attr("data-close-on-click"));
        if (masked) {
            this.masked = true;
            this.initMask();
        }
        this.Hide();
    };
    EditDialog.prototype.Show = function () {
        this.target.css("display", "block");
    };
    EditDialog.prototype.Hide = function () {
        this.target.css("display", "none");
    };
    /**
     * 需要添加mask的样式
     */
    EditDialog.prototype.initMask = function () {
        var html = "<div class='" + controlConfig.dialogMaskClass + "'></div>";
        this.mask = $(html);
        this.target.append(this.mask);
        var me = this;
        if (this.closeOnClick) {
            this.mask.click(function () {
                me.Hide();
            });
        }
    };
    return EditDialog;
})(View);
//# sourceMappingURL=editDialog.js.map