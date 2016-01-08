class Table<T extends IModel> extends ListView<T> {
    columns: {};
    length: number;

    navBarId: string;
    navBar: JQuery;

    TurnToPage(hanlder: (page: number, pagesize: number) => void) {
        var me = this;
        this.navBar.find(".nav-first-page").click(() => {
            hanlder(1, me.GetPageSize());
            me.curPage = 1;
        });
        this.navBar.find(".nav-last-page").click(() => {
            hanlder(me.pageCount, me.GetPageSize());
            me.curPage = me.pageCount;
        });
        this.navBar.find(".nav-next-page").click(() => {
            if (me.curPage == me.pageCount) {
                return;
            }
            hanlder(me.curPage + 1, me.GetPageSize());
            me.curPage = me.curPage + 1;
        });
        this.navBar.find(".nav-prev-page").click(() => {
            if (me.curPage == 1) {
                return;
            }
            hanlder(me.curPage - 1, me.GetPageSize());
            me.curPage = me.curPage - 1;
        });
        this.navBar.find(".nav-to-page").click(() => {
            var t = me.navBar.find(".page").val();
            if (t < 1 || t > me.pageCount) {
                return;
            }
            me.curPage = +t;
            hanlder(t, me.GetPageSize());
        });
    }

    /**
     * 总页数
     */
    protected pageCount: number;
    protected curPage: number;
    
    /**
     * 设置总页数
     */
    SetPageCount(count: number) {
        this.pageCount = count;
    }
    /**
     * 设置当前页
     */
    SetCurPage(page: number) {
        if (page < 1 || page > this.pageCount) {
            return;
        }
        this.curPage = +page;
    }
    /**
     * 获取当前页码
     */
    CurrentPage(): number {
        return this.curPage;
    }
    
    /**
     * 获取每页条数
     */
    GetPageSize(): number {
        return this.navBar.find(".pagesize").val();
    }

    ResetPage() {
        this.curPage = 1;
    }
    
    /* 自定义table row 可以设置该回调,在该回调中处理row的自定义
    * @param index 列索引
    * @param data 当前行数据
    */
    beforeAppend: (index: number, data: IModel) => string;
    /**
     * 该回调将会在RefreshView之后被调用
     * 请在该函数中注册行中元素的事件
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
        html += "<button class='btn btn-xs btn-info nav-first-page'>首页</button>";
        html += "<button class='btn btn-xs btn-info nav-prev-page'>上一页</button>";
        html += "<button class='btn btn-xs btn-info nav-next-page'>下一页</button>";
        html += "<button class='btn btn-xs btn-info nav-last-page'>末页</button>";
        html += "页次 <label class='curPage'></label>/<label class='totalPage'></label>";
        html += " 每页<input type='text' value='10' class='pagesize' />条";
        html += " 跳转到<input type='text' class='page' value='1'/>";
        html += "<button class='btn btn-xs btn-info nav-to-page'>跳转</button>";
        this.navBar.append(html);

    }

    RefreshView() {
        super.RefreshView();
        if (this.navBar) {
            this.navBar.find(".curPage").text(this.curPage);
            this.navBar.find(".totalPage").text(this.pageCount);
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