class Table extends ListControl {
    columns: {};
    length: number;
    beforeAppend: (index: number, data: IModel) => string;

    constructor(id: string) {
        super(id);
    }

    Append(obj: IModel) {
        var html: string = "";
        html += "<tr>";
        for (var i = 0; i < this.length; i++) {
            var value = obj[this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            } else {
                html += "<td>" + this.beforeAppend(i, obj) + "</td>";
            }
        }
        html += "</tr>";
        this.target.find("tbody").append(html);
    }

    Clear() {
        this.target.find("tbody").html("");
    }

    LoadView() {
        super.LoadView();
        this.columns = {};
        var me = this;
        //列长度
        this.length = this.target.find("tr").eq(0).children("th").length;
        //列绑定
        this.target.find("tr").eq(0).children("th").each(function(index, element) {
            var c = $(element).attr("data-column");
            if (c) {
                me.columns[index] = c
            }
        });
    }

}