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
        html += "<tr>";
        for (var i = 0; i < this.length; i++) {
            var value = this.mData[index][this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            }
            else {
                html += "<td>" + this.beforeAppend(i, this.mData[index]) + "</td>";
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
        this.length = this.target.find("tr").eq(0).children("th").length;
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
        for (var i = 0; i < this.mData.length; i++) {
            tbody.append(this.GetView(i));
        }
        if (this.registerEvents != null) {
            this.registerEvents();
        }
    };
    return Table;
})(ListControl);
//# sourceMappingURL=tableView.js.map