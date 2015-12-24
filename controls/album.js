var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Album = (function (_super) {
    __extends(Album, _super);
    function Album() {
        _super.apply(this, arguments);
    }
    Album.prototype.SetPrefix = function (p) {
        this.prefix = p;
    };
    Album.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<div class='album-item'>";
        html += "<span data-index=" + index + ">×</span>";
        html += "<img src='" + this.prefix + this.mData[index].url + "' />";
        html += "</div>";
        return html;
    };
    Album.prototype.RefreshView = function () {
        _super.prototype.RefreshView.call(this);
        if (this.registerEvents) {
            this.registerEvents();
        }
    };
    return Album;
})(ListView);
//# sourceMappingURL=album.js.map