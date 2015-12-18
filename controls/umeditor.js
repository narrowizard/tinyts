var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMEditor = (function (_super) {
    __extends(UMEditor, _super);
    function UMEditor() {
        _super.apply(this, arguments);
    }
    UMEditor.prototype.LoadView = function () {
        var config = {
            toolbar: [
                'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
                'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
                '| justifyleft justifycenter justifyright justifyjustify |',
                'link unlink | image ',
                '| horizontal preview '
            ],
            zIndex: 98
        };
        this.editor = UE.getEditor(this.ViewId(), config);
    };
    UMEditor.ResizeEditor = function () {
        $(".edui-container").css("width", "95%");
        $(".edui-container").css("margin", "1%");
        $(".edui-body-container").css("width", "100%");
    };
    return UMEditor;
})(View);
//# sourceMappingURL=umeditor.js.map