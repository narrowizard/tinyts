var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UEditor = (function (_super) {
    __extends(UEditor, _super);
    function UEditor() {
        _super.apply(this, arguments);
    }
    UEditor.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var param = this.target.attr("data-param");
        this.editor = UE.getEditor(this.ViewId());
        //多个参数以|分割
        var ps = param.split("|");
        for (var i = 0; i < ps.length; i++) {
            var temp = ps[i].split(":");
            this.SetImageUploadParam(temp[0], temp[1]);
        }
    };
    UEditor.prototype.SetImageUploadParam = function (key, value) {
        var _this = this;
        this.editor.ready(function () {
            _this.editor.execCommand("serverparam", key, value);
        });
    };
    UEditor.prototype.ClearImageUploadParam = function () {
        var _this = this;
        this.editor.ready(function () {
            _this.editor.execCommand("serverparam");
        });
    };
    UEditor.prototype.SetContent = function (html) {
        this.editor.setContent(html);
    };
    UEditor.prototype.GetContent = function () {
        return this.editor.getContent();
    };
    UEditor.ResizeEditor = function () {
        $(".edui-editor").css("width", "95%");
        $(".edui-editor").css("margin-left", "1%");
        $(".edui-editor-iframeholder").css("width", "100%");
    };
    return UEditor;
})(View);
//# sourceMappingURL=ueditor.js.map