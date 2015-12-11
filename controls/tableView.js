var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(id) {
        _super.call(this, id);
    }
    Table.prototype.Clear = function () {
        this.target.find("tbody").html("");
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
                    html += "<td></td>";
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
        if (this.registerEvents != null) {
            this.registerEvents();
        }
        // 在这里加上页面导航链接
    };
    // Sortable 将table设置为可排序
    // @param handler 排完序之后的回调
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
    return Table;
})(ListControl);
//# sourceMappingURL=tableView.js.map