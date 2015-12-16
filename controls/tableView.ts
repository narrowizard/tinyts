class Table<T extends IModel> extends ListView<T> {
    columns: {};
    length: number;
    
    /* 自定义table row 可以设置该回调,在该回调中处理row的自定义
    * @param index 列索引
    * @param data 当前行数据
    */
    beforeAppend: (index: number, data: IModel) => string;
    /**
     * 该回调将会在RefreshView之后被调用
     */
    registerEvents: () => void;
    /**
     * 自定义table row可以继承该类,在自己的类中实现该方法
     * 如果采用继承的方法,请不要设置beforeAppend属性
     * @param index 索引
     */
    BeforeAppend(index: number): string {
        return "<td></td>";
    }
    
    RegisterEvents(){
        
    }

    Clear() {
        this.target.find("tbody").html("");
    }

    GetItemId(index: number) {
        if (index < 0 || index > this.Count()) {
            return 0;
        }
        return this.mData[index].Id;
    }

    GetView(index: number): string {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html: string = "";
        html += "<tr data-id=" + this.GetItemId(index) + " >";
        for (var i = 0; i < this.length; i++) {
            var value = this.mData[index][this.columns[i]];
            if (value) {
                html += "<td>" + value + "</td>";
            } else {
                if (this.beforeAppend == null) {
                    html += this.BeforeAppend(index);
                } else {
                    html += this.beforeAppend(i, this.mData[index]);
                }
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
        this.length = this.target.find("thead tr").children("th").length;
        //列绑定
        this.target.find("tr").eq(0).children("th").each(function(index, element) {
            var c = $(element).attr("data-column");
            if (c) {
                me.columns[index] = c;
            }
        });
    }

    RefreshView() {
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
    }
    
    TreeTable(config: any,force?:boolean) {
        this.target.treetable(config,force);
    }
    
    ExpandAll(){
        this.target.treetable("expandAll");
    }
    
    /** Sortable 将table设置为可排序
    * @param handler 排完序之后的回调
    */
    Sortable(handler: () => void) {
        this.target.children("tbody").sortable({
            containerSelector: "table",
            itemPath: "> tbody",
            itemSelector: "tr",
            placeholder: "<tr class='placeholder' />",
            stop: () => {
                var tbody = this.target.find("tbody");
                var ids = [];
                tbody.children("tr").each((index, elem) => {
                    ids[index] = $(elem).attr("data-id");
                });
                var temp: T[] = [];
                for (var i = 0; i < ids.length; i++) {
                    temp[i] = this.mData.where((p: T) => { return p.Id == ids[i] }).first();
                }
                this.mData = temp;
                handler();
            }
        });
    }

    protected append(viewString: string) {
        this.target.find("tbody").append(viewString);
    }
}