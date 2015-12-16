var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.apply(this, arguments);
    }
    /**
     * 自定义table row可以继承该类,在自己的类中实现该方法
     * 如果采用继承的方法,请不要设置beforeAppend属性
     * @param index 索引
     */
    Table.prototype.BeforeAppend = function (index) {
        return "<td></td>";
    };
    Table.prototype.RegisterEvents = function () {
    };
    Table.prototype.Clear = function () {
        this.target.find("tbody").html("");
    };
    Table.prototype.GetItemId = function (index) {
        if (index < 0 || index > this.Count()) {
            return 0;
        }
        return this.mData[index].Id;
    };
    Table.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<tr data-id=" + this.GetItemId(index) + " >";
        for (var i = 0; i < this.length; i++) {
            var value = this.mData[index][this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            }
            else {
                if (this.beforeAppend == null) {
                    html += this.BeforeAppend(index);
                }
                else {
                    html += this.beforeAppend(i, this.mData[index]);
                }
            }
        }
        html += "</tr>";
        return html;
    };
    Table.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.columns = {};
        var me = this;
        //列长度
        this.length = this.target.find("thead tr").children("th").length;
        //列绑定
        this.target.find("tr").eq(0).children("th").each(function (index, element) {
            var c = $(element).attr("data-column");
            if (c) {
                me.columns[index] = c;
            }
        });
    };
    Table.prototype.RefreshView = function () {
        var tbody = this.target.find("tbody");
        this.Clear();
        for (var i = 0; i < this.mData.length; i++) {
            tbody.append(this.GetView(i));
        }
        // 在这里加上页面导航链接
        var html = "<a href='#'>下一页</a>";
        $(html).insertAfter(this.target);
        //注册item事件
        this.RegisterEvents();
        if (this.registerEvents != null) {
            this.registerEvents();
        }
    };
    Table.prototype.TreeTable = function (config, force) {
        this.target.treetable(config, force);
    };
    Table.prototype.ExpandAll = function () {
        this.target.treetable("expandAll");
    };
    /** Sortable 将table设置为可排序
    * @param handler 排完序之后的回调
    */
    Table.prototype.Sortable = function (handler) {
        var _this = this;
        this.target.children("tbody").sortable({
            containerSelector: "table",
            itemPath: "> tbody",
            itemSelector: "tr",
            placeholder: "<tr class='placeholder' />",
            stop: function () {
                var tbody = _this.target.find("tbody");
                var ids = [];
                tbody.children("tr").each(function (index, elem) {
                    ids[index] = $(elem).attr("data-id");
                });
                var temp = [];
                for (var i = 0; i < ids.length; i++) {
                    temp[i] = _this.mData.where(function (p) { return p.Id == ids[i]; }).first();
                }
                _this.mData = temp;
                handler();
            }
        });
    };
    Table.prototype.append = function (viewString) {
        this.target.find("tbody").append(viewString);
    };
    return Table;
})(ListView);
//# sourceMappingURL=tableView.js.map