/**
 * ListView<T> 列表控件的基类
 * T: 元数据类型
 * methods:
 * SetData(data: T[])=>void,set data to the list view and refresh it.
 * RefreshView:()=>void,get each data item's html code(via method GetView),and refresh the whole view.
 * GetView:(index:number):string,get the specific data item's html code.
 * 
 * property:
 * data-pagable sync或async
 */

import {View} from './View';

export abstract class ListView<T extends IModel> extends View {
    mData: T[];

    /**
     * getTemplateView 设置列表部分的模板
     * @param index 索引
     * @param data 数据
     */
    getTemplateView: (index: number, data: T) => string;


    protected eventHandler: { selector: string, event?: string, handler: (obj: JQueryEventObject) => void }[];

    /**
     * RegisterEvents 注册列表子元素的事件
     */
    RegisterEvents() {
        if (!this.eventHandler) {
            this.eventHandler = [];
        }
        //解绑事件
        for (var i = 0; i < this.eventHandler.length; i++) {
            this.UnbindEvents(this.eventHandler[i].selector);
        }
        //绑定事件
        for (var i = 0; i < this.eventHandler.length; i++) {
            var targetView = this.target.find(this.eventHandler[i].selector);
            if (this.eventHandler[i].event) {
                targetView.on(this.eventHandler[i].event, this.eventHandler[i].handler);
            } else {
                targetView.click(this.eventHandler[i].handler);
            }
        }
    }

    /**
     * SetEventHandler 设置事件处理函数
     * @param selector 选择器
     * @param handler 事件处理函数
     * @param event 事件名,默认为click事件
     */
    SetEventHandler(selector: string, handler: (obj: JQueryEventObject) => void, event?: string) {
        if (!this.eventHandler) {
            this.eventHandler = [];
        }
        this.eventHandler.push({ selector: selector, handler: handler, event: event });
    }

    /**
     * RemoveEventHandler 移除handler,在下一次刷新数据列表时不再绑定
     * @param selector 选择器
     */
    RemoveEventHandler(selector: string) {
        var temp = [];
        for (var i = 0; i < this.eventHandler.length; i++) {
            if (this.eventHandler[i].selector != selector) {
                temp.push(this.eventHandler[i]);
            }
        }
        this.eventHandler = temp;
    }

    /**
     * UnbindEvents 解除绑定的事件,解除已经绑定的事件
     * @param selector 选择器
     * @param event 事件名,若不传,则解除所有事件
     */
    UnbindEvents(selector: string, event?: string) {
        if (event) {
            this.target.find(selector).off(event);
        } else {
            this.target.find(selector).off();
        }
    }

	/**
	 * 设置数据,并刷新视图
	 * @param data 数据集合
	 */
    SetData(data: T[]) {
        if (!data) {
            data = [];
        }
        this.mData = data;
        this.RefreshView();
    }

	/**
	 * 添加数据,并刷新视图
	 * @param T 数据元素
     * @param reloadView 是否重新加载视图(重新加载指刷新整个列表,否则添加元素到列表末尾)
	*/
    Add(model: T, reloadView?: boolean) {
        this.mData.push(model);
        if (reloadView) {
            this.RefreshView();
            return;
        } else {
            this.append(this.GetView(this.mData.length - 1));
            this.RegisterEvents();
            return;
        }
    }

    LoadView() {
        super.LoadView();
        this.mData = [];
        //需要分页
        var pagable = this.target.attr("data-pagable");
        if (pagable) {
            this.pageManager = new PageManager<T>();
            this.pageManager.SetContext(this);
        }
        if (pagable == "sync") {
            this.pageManager.SetPageMode(PAGEMODE.SYNC);
        } else if (pagable == "async") {
            this.pageManager.SetPageMode(PAGEMODE.ASYNC);
        }
    }

	/**
	 * 清空列表
	*/
    protected clear() {
        this.target.html("");
    };

	/**
	 * 移除某个指定元素
	 * @param index 指定索引
	 * @param obj 指定元素的引用,可由GetItem得到
	 */
    Remove(index: number);
    Remove(obj: T);
    Remove(p: any) {
        if (typeof p == "number") {
            var index = <number>p;
            if (index < 0 || index > this.mData.length) {
                return;
            }
            for (var i = index; i < this.mData.length - 1; i++) {
                this.mData[i] = this.mData[i + 1];
            }
            this.mData.pop();
        } else {
            var obj = <T>p;
            for (var j = 0; j < this.mData.length; j++) {
                if (this.mData[j] == obj) {
                    for (var i = j; i < this.mData.length - 1; i++) {
                        this.mData[i] = this.mData[i + 1];
                    }
                    this.mData.pop();
                    break;
                }
            }
        }
        this.RefreshView();
    }

    /**
     * GetChildren 获取子元素集合的jquery引用,请在子类中实现
     */
    protected abstract GetChildren(): JQuery;

    /**
     * GetItemView 获取子元素的jquery instance
     * @param index 指定索引
     */
    GetItemView(index: number): JQuery {
        return this.GetChildren().eq(index);
    }

    /**
     * GetItemById 根据id获取子元素的jquery instance
     */
    GetItemViewById(id: number): JQuery {
        for (var i = 0; i < this.mData.length; i++) {
            if (this.mData[i].Id == id) {
                return this.GetItemView(i);
            }
        }
        return null;
    }

	/**
	 * 获取某个指定的元素
	 * @param index 指定索引
	 * @param predicate 指定条件,返回true表示满足条件
	 */
    GetItem(predicate: (p: T) => boolean): T;
    GetItem(index: number): T;
    GetItem(param: any) {
        if (typeof param == "number") {
            var index = <number>param;
            if (index < 0 || index > this.mData.length) {
                return null;
            }
            return this.mData[index];
        } else if (typeof param == "function") {
            var predicate = <(p: T) => boolean>param;
            return Enumerable.from(this.mData).where(predicate).first();
        }
    }

    /**
     * GetItemById 通过id获取某元素
     * @param id 元素id
     */
    GetItemById(id: number): T {
        return Enumerable.from(this.mData).where((item) => { return item.Id == id }).first();
    }

    /**
     * SetItem 设置(替换)数据数组中的某个元素
     */
    SetItem(predicate: (p: T) => boolean, item: T);
    SetItem(index: number, item: T);
    SetItem(param: any, item: T) {
        if (typeof param == "number") {
            if (param < 0 || param >= this.Count()) {
                return;
            }
            this.mData[param] = item;
        } else if (typeof param == "function") {
            var predicate = <(p: T) => boolean>param;
            for (var i = 0; i < this.Count(); i++) {
                if (predicate(this.mData[i])) {
                    this.mData[i] = item;
                    break;
                }
            }
        }
        this.RefreshView();
    }

	/**
	 * 获取数组元素的长度
	 */
    Count(): number {
        return this.mData.length;
    }

	/**
	 * 获取指定索引元素的Id(唯一编号)
	 * @param index 索引
	 */
    GetItemId(index: number): number {
        if (index < 0 || index > this.Count()) {
            return 0;
        }
        return this.mData[index].Id;
    }
	/**
	 * 获取列表中某一个元素的html代码
	 * @param index 索引
	*/
    GetView(index: number): string {
        return this.getTemplateView(index, this.mData[index]);
    };


	/**
	 * 刷新整个ListView的列表部分
	 */
    RefreshView() {
        this.clear();
        if (this.mData == null) {
            return;
        }
        for (var i = 0; i < this.mData.length; i++) {
            this.append(this.GetView(i));
        }
        //注册item事件
        this.RegisterEvents();
    }

	/**
	 * 在列表的最后插入元素,请在子类中实现该方法
	 * @param viewString 元素的html字符串
	 */
    protected append(viewString: string) {
        this.target.append(viewString);
    }

    //分页
    protected pageManager: PageManager<T>;

    /**
     * GetPageManager 获取分页器,仅当data-pagable为sync或async时有效
     */
    GetPageManager(): PageManager<T> {
        if (!this.pageManager) {
            console.error("data-pagable has not defined!");
        }
        return this.pageManager;
    }

    /**
     * SetCurPage 设置当前页(用于展示)
     */
    SetCurPage(page: number) {

    }

    /**
     * SetPageCount 设置总页数(用于展示)
     */
    SetPageCount(count: number) {

    }

    /**
     * GetPageSize 获取每页条数
     */
    GetPageSize(): number {
        return 0;
    }
}

// PAGEMODE 分页模式
// SYNC 同步分页
// ASYNC 异步分页
enum PAGEMODE { SYNC, ASYNC };

class PageManager<T extends IModel> {

    /**
     * mData 同步分页模式的数据(异步时无效)
     */
    protected mData: T[];

    /**
     * SetData 设置数据,当模式为同步分页模式时,可以直接调用该函数将数据交给PageManager
     * @param data 数据,同时会更新total和pageCount
     */
    SetData(data: T[]) {
        if (!data) {
            return;
        }
        this.mData = data;
        this.SetRecordCount(this.mData.length);
    }

    /**
     * SetContext 设置上下文
     * @param context 数据获取器
     */
    SetContext(context: ListView<T>) {
        this.context = context;
    }

    protected context: ListView<T>;

    /**
     * @param instance 同步模式时,数据会被设置到该instance
     */
    constructor(instance?: ListView<T>) {
        this.curPage = 1;
    }

    protected pageMode: PAGEMODE;

    /**
     * SetPageMode 设置分页模式
     * 同步模式时,需要在构造函数中传入目标ListView的实例
     * 异步模式时,需要设置用于获取异步数据的context
     * @param mode 分页模式
     */
    SetPageMode(mode: PAGEMODE) {
        this.pageMode = mode;
    }

    protected curPage: number;

    protected pageSize: number;

    /**
     * SetPageSize 设置每页条数
     * @param pagesize 每页条数
     */
    SetPageSize(pagesize: number) {
        this.pageSize = pagesize;
    }

    protected total: number;

    /**
     * SetRecordCount 设置记录总条数,同时设置pageCount
     * @param count 记录总数量
     */
    SetRecordCount(count: number) {
        this.total = count;
        this.SetPageCount(Math.ceil(this.total / this.pageSize));
    }

    protected pageCount: number;

    /**
     * SetPageCount 设置总页数
     * @param count 总页数
     */
    SetPageCount(count: number) {
        //在列表上展示总页数
        this.context.SetPageCount(count);
        this.pageCount = count;
    }

    /**
     * GetCurPage 获取当前页的数据
     */
    GetCurPage() {
        //在列表上展示当前页
        this.context.SetCurPage(this.curPage);
        //获取每页条数
        var pagesize = this.context.GetPageSize();
        if (!pagesize) {
            console.error("pagesize is wrong!");
            return;
        }
        this.SetPageSize(pagesize);

        if (this.pageMode == PAGEMODE.SYNC) {
            //同步分页模式,直接将数据交给ListView
            this.context.SetData(Enumerable.from(this.mData).skip((this.curPage - 1) * this.pageSize).take(this.pageSize).toArray());
        } else if (this.pageMode == PAGEMODE.ASYNC) {
            if (!this.context) {
                throw "context has not been set!";
            }
            //异步分页模式,请求服务器
            this.getData(this.curPage, this.pageSize);
        }
    }

    /**
     * getData 异步获取数据回调,异步模式时请设置此方法
     * @param index 页码
     * @param pagesize 每页条数
     */
    getData: (index: number, pagesize: number) => void;

    /**
     * FirstPage 首页
     */
    FirstPage() {
        this.curPage = 1;
        this.GetCurPage();
    }

    /**
     * PrevPage 上一页
     */
    PrevPage() {
        if (this.curPage <= 1) {
            return;
        }
        this.curPage--;
        this.GetCurPage();
    }

    /**
     * NextPage 下一页
     */
    NextPage() {
        if (this.curPage >= this.pageCount) {
            return;
        }
        this.curPage++;
        this.GetCurPage();
    }

    /**
     * LastPage 末页
     */
    LastPage() {
        this.curPage = this.pageCount;
        this.GetCurPage();
    }

    /**
     * TurnToPage 跳转到某页
     * @param index 页码
     */
    TurnToPage(index: number) {
        if (index < 1 || index > this.pageCount) {
            return;
        }
        this.curPage = index;
        this.GetCurPage();
    }

}