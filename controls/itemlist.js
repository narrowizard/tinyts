var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemList = (function (_super) {
    __extends(ItemList, _super);
    function ItemList() {
        _super.apply(this, arguments);
    }
    ItemList.prototype.GetView = function (index) {
        if (index < 0 || index >= this.Count()) {
            return "";
        }
        var html = "";
        html += "<li data-value='" + this.mData[index].value + "'>";
        html += this.mData[index].text;
        html += "</li>";
        return html;
    };
    ItemList.prototype.RefreshView = function () {
        var me = this;
        _super.prototype.RefreshView.call(this);
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click(function (obj) {
                me.target.children("li").removeClass(controlConfig.itemlistActiveClass);
                $(obj.target).addClass(controlConfig.itemlistActiveClass);
                me.onItemClick(obj);
            });
        }
        if (this.Count() > 0) {
            me.target.children("li").eq(0).click();
        }
    };
    ItemList.prototype.Select = function (index) {
        if (index < 0) {
            return;
        }
        this.target.children("li").eq(index).click();
    };
    ItemList.prototype.SelectLast = function () {
        this.target.children("li").last().click();
    };
    ItemList.prototype.RemoveSelected = function () {
        var index = this.target.children("." + controlConfig.itemlistActiveClass).index();
        if (index == -1) {
            return;
        }
        this.Remove(index);
    };
    ItemList.prototype.append = function (html) {
        var me = this;
        _super.prototype.append.call(this, html);
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click(function (obj) {
                me.target.children("li").removeClass(controlConfig.itemlistActiveClass);
                $(obj.target).addClass(controlConfig.itemlistActiveClass);
                me.onItemClick(obj);
            });
        }
    };
    return ItemList;
})(ListView);
//# sourceMappingURL=itemlist.js.map