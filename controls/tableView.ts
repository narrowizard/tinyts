class Table<T> extends ListControl<T> {
    columns: {};
    length: number;
    // beforeAppend 在这里处理row的自定义
    beforeAppend: (index: number, data: IModel) => string;
    
    constructor(id: string) {
        super(id);
    }

    Clear() {
        this.target.find("tbody").html("");
    }

    GetView(index: number): string {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html: string = "";
        html += "<tr>";
        for (var i = 0; i < this.length; i++) {
            var value = this.mData[index][this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            } else {
                html += "<td>" + this.beforeAppend(i, this.mData[index]) + "</td>";
            }
        }
        html += "</tr>";
        return html;
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

    RefreshView() {
        var tbody = this.target.find("tbody");
        for (var i = 0; i < this.mData.length; i++) {
            tbody.append(this.GetView(i));
        }
        if(this.registerEvents != null){
            this.registerEvents();
        }
    }

}