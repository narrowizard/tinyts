var Table = (function () {
    function Table(id) {
        this.id = id;
    }
    Table.prototype.Append = function (obj) {
        var html = "";
        html += "<tr>";
        for (var i = 0; i < this.length; i++) {
            var value = obj[this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            }
            else {
                html += "<td>" + this.beforeAppend(i, obj) + "</td>";
            }
        }
        html += "</tr>";
        this.target.find("tbody").append(html);
    };
    Table.prototype.Clear = function () {
        this.target.find("tbody").html("");
    };
    Table.prototype.LoadView = function () {
        this.target = $("#" + this.id);
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
    return Table;
})();
//# sourceMappingURL=tableView.js.map