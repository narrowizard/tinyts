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
    Table.prototype.TurnToPage = function (hanlder) {
        var me = this;
        this.navBar.find(".nav-first-page").click(function () {
            hanlder(1, me.GetPageSize());
            me.curPage = 1;
        });
        this.navBar.find(".nav-last-page").click(function () {
            hanlder(me.pageCount, me.GetPageSize());
            me.curPage = me.pageCount;
        });
        this.navBar.find(".nav-next-page").click(function () {
            if (me.curPage == me.pageCount) {
                return;
            }
            hanlder(me.curPage + 1, me.GetPageSize());
            me.curPage = me.curPage + 1;
        });
        this.navBar.find(".nav-prev-page").click(function () {
            if (me.curPage == 1) {
                return;
            }
            hanlder(me.curPage - 1, me.GetPageSize());
            me.curPage = me.curPage - 1;
        });
        this.navBar.find(".nav-to-page").click(function () {
            var t = me.navBar.find(".page").val();
            if (t < 1 || t > me.pageCount) {
                return;
            }
            me.curPage = +t;
            hanlder(t, me.GetPageSize());
        });
    };
    /**
     * 设置总页数
     */
    Table.prototype.SetPageCount = function (count) {
        this.pageCount = count;
    };
    /**
     * 设置当前页
     */
    Table.prototype.SetCurPage = function (page) {
        if (page < 1 || page > this.pageCount) {
            return;
        }
        this.curPage = +page;
    };
    /**
     * 获取当前页码
     */
    Table.prototype.CurrentPage = function () {
        return this.curPage;
    };
    /**
     * 获取每页条数
     */
    Table.prototype.GetPageSize = function () {
        return this.navBar.find(".pagesize").val();
    };
    Table.prototype.ResetPage = function () {
        this.curPage = 1;
    };
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
        //增加tr
        if (this.beforeAppend != null) {
            var res = this.beforeAppend(-1, this.mData[index]);
            if (res != "") {
                html += res;
            }
            else {
                html += "<tr data-id=" + this.GetItemId(index) + " >";
            }
        }
        else {
            html += "<tr data-id=" + this.GetItemId(index) + " >";
        }
        //增加td
        for (var i = 0; i < this.length; i++) {
            //首先判断是否是checkbox
            if (this.columns[i].checkBox) {
                html += "<td><input type='checkbox' data-id=" + this.mData[index].Id + " data-column-index=" + i + " /></td>";
                continue;
            }
            if (this.columns[i].dataBind) {
                var value = this.mData[index][this.columns[i].dataColumn];
                //data-column数据绑定
                if (value !== undefined) {
                    html += "<td>" + value + "</td>";
                }
                else {
                    html += "<td></td>";
                }
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
        this.columns = [];
        var me = this;
        //列长度
        this.length = this.target.find("thead tr").children("th").length;
        //列绑定
        this.target.find("tr").eq(0).children("th").each(function (index, element) {
            var temp = new TableColumn();
            var c = $(element).attr("data-column");
            if (c) {
                temp.dataBind = true;
                temp.dataColumn = c;
            }
            if ($(element).attr("data-checkbox")) {
                $(element).append("<input type='checkbox' data-column-index='" + index + "' />");
                temp.checkBox = true;
            }
            me.columns[index] = temp;
        });
        //导航
        var naved = Boolean(this.target.attr("data-navigation"));
        if (naved) {
            //创建页面导航
            this.navBarId = this.ViewId() + "Navigation";
            var html = "<div id='" + this.navBarId + "'></div>";
            $(html).insertAfter(this.target);
            this.navBar = $("#" + this.navBarId);
            this.createNavigation();
        }
        //点击选中
        this.selectOnClick = Boolean(this.target.attr("data-select-on-click"));
    };
    Table.prototype.createNavigation = function () {
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
    };
    Table.prototype.RefreshView = function () {
        var me = this;
        _super.prototype.RefreshView.call(this);
        if (this.navBar) {
            this.navBar.find(".curPage").text(this.curPage);
            this.navBar.find(".totalPage").text(this.pageCount);
        }
        //注册item事件
        this.RegisterEvents();
        if (this.registerEvents != null) {
            this.registerEvents();
        }
        //注册全选事件
        this.target.find("thead input[type='checkbox']").click(function (obj) {
            var columnIndex = $(obj.target).attr("data-column-index");
            var state = $(obj.target).prop("checked");
            me.target.find("tbody input[type='checkbox'][data-column-index=" + columnIndex + "]").prop("checked", state);
        });
        //点击选中
        if (this.selectOnClick) {
            this.target.find("tbody tr").click(function (obj) {
                $(obj.target).find("input[type='checkbox']").each(function (index, elem) {
                    if ($(elem).prop("checked")) {
                        $(elem).prop("checked", false);
                    }
                    else {
                        $(elem).prop("checked", true);
                    }
                });
            });
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
                if (handler) {
                    handler();
                }
            }
        });
    };
    Table.prototype.append = function (viewString) {
        this.target.find("tbody").append(viewString);
    };
    return Table;
})(ListView);
//# sourceMappingURL=tableView.js.map