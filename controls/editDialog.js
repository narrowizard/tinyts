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
    EditDialog.prototype.SetWidth = function (width) {
        this.target.width(width);
    };
    EditDialog.prototype.SetHeight = function (height) {
        this.target.height(height);
    };
    EditDialog.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var masked = this.target.attr("data-mask");
        if (masked) {
            this.masked = true;
            this.initMask();
        }
    };
    EditDialog.prototype.Show = function () {
        _super.prototype.Show.call(this);
        if (this.masked) {
            this.mask.css("display", "block");
        }
    };
    EditDialog.prototype.Hide = function () {
        _super.prototype.Hide.call(this);
        if (this.masked) {
            this.mask.css("display", "none");
        }
    };
    EditDialog.prototype.initMask = function () {
        var html = "<div class='dialog-mask'></div>";
        this.mask = $(html);
        this.mask.insertBefore(this.target);
        this.mask.css("position", "fixed");
        this.mask.css("top", "0");
        this.mask.css("bottom", "0");
        this.mask.css("left", "0");
        this.mask.css("right", "0");
        this.mask.css("background-color", "#353B4B");
        this.mask.css("z-index", "1000");
        this.target.css("z-index", "1001");
        this.mask.css("opacity", "0.5");
    };
    return EditDialog;
})(ViewGroup);
//# sourceMappingURL=editDialog.js.map