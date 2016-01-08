var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageListView = (function (_super) {
    __extends(PageListView, _super);
    function PageListView() {
        _super.call(this);
        this.async = true;
    }
    /**
     * 设置数据总条数,用于异步获取数据时的分页计算
     */
    PageListView.prototype.SetItemCount = function (itemCount) {
        this.itemCount = itemCount;
    };
    /**
     * 设置数据,当数据为同步加载时,会同时设置数据总条数
     */
    PageListView.prototype.SetData = function (data) {
        _super.prototype.SetData.call(this, data);
        if (!this.async) {
            this.itemCount = data.length;
        }
    };
    PageListView.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.pageable = Boolean(this.target.attr("data-pageable"));
    };
    return PageListView;
})(ListView);
//# sourceMappingURL=PageListView.js.map