var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader() {
        _super.apply(this, arguments);
    }
    FileUploader.prototype.GetFile = function () {
        var files = this.target.prop("files");
        if (files.length != 0) {
            return files[0];
        }
        return null;
    };
    return FileUploader;
})(TextBox);
//# sourceMappingURL=fileUploader.js.map