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

    GetChildren(): JQuery {
        return this.target.find("tbody tr");
    }

    /**
     * clear 清除列表元素的页面内容
     */
    protected clear() {
        this.target.find("tbody").html("");
    }

    LoadView() {
        super.LoadView();
        //导航
        var naved = Boolean(this.target.attr("data-navigation"));
        if (naved) {
            //创建分页导航
            this.navBarId = this.ViewId() + "Navigation";
            var html = "<div id='" + this.navBarId + "'></div>";
            $(html).insertAfter(this.target);
            this.navBar = $("#" + this.navBarId);
            this.navBar.append(this.createNavigation());
        }
    }

    /**
     * createNavigation 创建分页导航,返回导航的html代码
     * 请继承table类,并重写该方法以适应项目的导航结构
     */
    protected createNavigation(): string {
        var html = "";
        html += `<button class='${controlConfig.tableNavItemClass} nav-first-page'>首页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-prev-page'>上一页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-next-page'>下一页</button>
                    <button class='${controlConfig.tableNavItemClass} nav-last-page'>末页</button>
                    页次 <label class='curPage'></label>/<label class='totalPage'></label>
                    每页<input type='text' value='10' class='pagesize' />条
                    跳转到<input type='text' class='page' value='1'/>
                    <button class='${controlConfig.tableNavItemClass} nav-to-page'>跳转</button>`;
        return html;
    }

    /**
     * registerNavigation 注册导航事件,初始化导航数据
     */
    protected registerNavigation(selector, handler: () => void, context?) {
        this.navBar.find(selector).click(() => {
            handler.apply(context);
        });
    }

    protected append(viewString: string) {
        this.target.children("tbody").append(viewString);
    }
}