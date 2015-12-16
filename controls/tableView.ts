class Table<T extends IModel> extends ListView<T> {
    columns: {};
    length: number;

    navBarId: string;
    navBar: JQuery;
    
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

    RegisterEvents() {

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
        if (this.beforeAppend != null) {
            var res = this.beforeAppend(-1, this.mData[index]);
            if (res != "") {
                html += res;
            } else {
                html += "<tr data-id=" + this.GetItemId(index) + " >";
            }
        } else {
            html += "<tr data-id=" + this.GetItemId(index) + " >";
        }
        for (var i = 0; i < this.length; i++) {
            var value = this.mData[index][this.columns[i]];
            if (value !== undefined) {
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
        var naved = Boolean(this.target.attr("data-navigation"));
        if (naved) {
            //创建页面导航
            this.navBarId = this.ViewId() + "Navigation";
            var html = "<div id='" + this.navBarId + "'></div>";
            $(html).insertAfter(this.target);
            this.navBar = $("#" + this.navBarId);
            this.createNavigation();
        }
    }

    protected createNavigation() {
        var html = "";
        html += "<button class='btn btn-xs btn-success'>首页</button>";
        html += "<button class='btn btn-xs btn-success'>上一页</button>";
        html += "<button class='btn btn-xs btn-success'>下一页</button>";
        html += "<button class='btn btn-xs btn-success'>末页</button>";

        this.navBar.append(html);
    }

    RefreshView() {
        this.Clear();
        for (var i = 0; i < this.mData.length; i++) {
            this.append(this.GetView(i));
        }
        
        //注册item事件
        this.RegisterEvents();
        if (this.registerEvents != null) {
            this.registerEvents();
        }
    }

    TreeTable(config: any, force?: boolean) {
        this.target.treetable(config, force);
    }

    ExpandAll() {
        this.target.treetable("expandAll");
    }
    
    /** Sortable 将table设置为可排序
    * @param handler 排完序之后的回调
    */
    Sortable(handler?: () => void) {
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
                if (handler) {
                    handler();
                }
            }
        });
    }

    protected append(viewString: string) {
        this.target.find("tbody").append(viewString);
    }
}