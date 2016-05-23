import {TableColumn} from '../models/TableColumn';
import {ListView} from '../core/ListView';
import {controlConfig} from '../config/TinytsConfig';
/**
 * Table<T> 表格插件
 * 需要在DOM中定义table的thead
 * 
 * methods:
 * TurnToPage: 定义table的翻页函数
 * 
 * table options:
 * data-navigation:指示table是否需要分页控件
 * 
 */
export class Table<T extends IModel> extends ListView<T> {
    navBarId: string;
    navBar: JQuery;

    TurnToPage(handler: (page: number, pagesize: number) => void) {
        var me = this;
        this.navBar.find(".nav-first-page").click(() => {
            handler(1, me.GetPageSize());
            me.curPage = 1;
        });
        this.navBar.find(".nav-last-page").click(() => {
            handler(me.pageCount, me.GetPageSize());
            me.curPage = me.pageCount;
        });
        this.navBar.find(".nav-next-page").click(() => {
            if (me.curPage == me.pageCount) {
                return;
            }
            handler(me.curPage + 1, me.GetPageSize());
            me.curPage = me.curPage + 1;
        });
        this.navBar.find(".nav-prev-page").click(() => {
            if (me.curPage == 1) {
                return;
            }
            handler(me.curPage - 1, me.GetPageSize());
            me.curPage = me.curPage - 1;
        });
        this.navBar.find(".nav-to-page").click(() => {
            var t = me.navBar.find(".page").val();
            if (t < 1 || t > me.pageCount) {
                return;
            }
            me.curPage = +t;
            handler(t, me.GetPageSize());
        });
    }

    /**
     * 总页数
     */
    protected pageCount: number;
    protected curPage: number;

    /**
     * SetPageCount 设置总页数
     */
    SetPageCount(count: number) {
        this.pageCount = count;
    }
    /**
     * SetCurPage 设置当前页
     */
    SetCurPage(page: number) {
        if (page < 1 || page > this.pageCount) {
            return;
        }
        this.curPage = +page;
    }
    /**
     * CurrentPage 获取当前页码
     */
    CurrentPage(): number {
        return this.curPage;
    }

    /**
     * GetPageSize 获取每页条数
     */
    GetPageSize(): number {
        return this.navBar.find(".pagesize").val();
    }
    
    /**
     * ResetPage 重置当前页
     */
    ResetPage() {
        this.curPage = 1;
    }

    /**
     * clear 清除列表元素的页面内容
     */
    protected clear() {
        this.target.find("tbody").html("");
    }

    /**
     * GetItemId 获取指定索引元素的id
     * @param index 索引
     */
    GetItemId(index: number) {
        if (index < 0 || index > this.Count()) {
            return 0;
        }
        return this.mData[index].Id;
    }

    LoadView() {
        super.LoadView();
        //导航
        var naved = Boolean(this.target.attr("data-navigation"));
        if (naved) {
            //创建页面导航
            this.navBarId = this.ViewId() + "Navigation";
            var html = "<div id='" + this.navBarId + "'></div>";
            $(html).insertAfter(this.target);
            this.navBar = $("#" + this.navBarId);
            this.createNavigation();
            this.ResetPage();
        }
    }

    /**
     * createNavigation 创建分页导航,并绑定到this.navBar
     */
    protected createNavigation() {
        var html = "";
        html += `<button class='${controlConfig.tableNavItemClass} nav-first-page'>首页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-prev-page'>上一页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-next-page'>下一页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-last-page'>末页</button>
                    页次 <label class='curPage'></label>/<label class='totalPage'></label>
                    每页<input type='text' value='10' class='pagesize' />条
                    跳转到<input type='text' class='page' value='1'/>
                    <button class='${controlConfig.tableNavItemClass} nav-to-page'>跳转</button>`;
        this.navBar.append(html);
    }

    RefreshView() {
        var me = this;
        super.RefreshView();
        if (this.navBar) {
            this.navBar.find(".curPage").text(this.curPage);
            this.navBar.find(".totalPage").text(this.pageCount);
        }
    }

    protected append(viewString: string) {
        this.target.find("tbody").append(viewString);
    }
}