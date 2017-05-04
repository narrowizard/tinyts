import { View, ViewState } from '../core/view';
import { Meta } from '../core/meta';

/**
 * ArrayProxy<T> 列表数据操作接口
 */
export class ArrayProxy<T> extends Array<T>{

    constructor(data: T[], context: ListView<T>) {
        super(...data);
        Object.setPrototypeOf(this, ArrayProxy.prototype);
        this.context = context;
    }

    context: ListView<T>;

    push(...items: T[]): number {
        var res = super.push(...items);
        this.context.RefreshView();
        return res;
    }

    pop(): T {
        var res = super.pop();
        this.context.RefreshView();
        return res;

    }

    concat<U extends T[]>(...items: U[]): T[] {
        var res = super.concat(...items);
        this.context.RefreshView();
        return res;

    }

    shift(): T {
        var res = super.shift();
        this.context.RefreshView();
        return res;

    }

    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        var res = super.splice(start, deleteCount, ...items);
        this.context.RefreshView();
        return res;

    }

    unshift(...items: T[]): number {
        var res = super.unshift();
        this.context.RefreshView();
        return res;
    }

}


export class ListView<T> extends View {

    protected mData: ArrayProxy<T>;

    protected viewString: string[];

    /**
     * GetTemplpateModel 可以设置该方法来对data进行渲染前预处理
     */
    getTemplpateModel: (data: T) => T;

    LoadView(parent?: string | JQuery): boolean {
        var succ = super.LoadView(parent);
        this.viewString = [];
        if (succ) {
            // 设置模版
            if (this.multipart) {
                // 多绑定元素,viewString可能每个都不一样,但是数据是一份一样的
                this.target.each((index, elem) => {
                    this.viewString[index] = $(elem).html();
                });
            } else {
                // 单元素绑定关系
                this.viewString.push(this.target.html());

            }
        }
        return succ;
    }

    protected eventHandler: { selector: string, event?: string, handler: (obj: JQueryEventObject) => void }[];

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
     * 注意，使用该方法解除事件后，若刷新数据，事件依然会重新绑定
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
     * SetData 设置数据,在这里作列表数据代理
     * @param data 数据
     */
    SetData(data: T[]) {
        if (!data) {
            data = [];
        }
        if (this.state != ViewState.LOADSUCC) {
            console.error(`${this.name} load error!`);
            return;
        }
        this.mData = new ArrayProxy(data, this);
        this.RefreshView();
    }

    GetData(): ArrayProxy<T> {
        return this.mData;
    }

    SetValue(data: T[]) {
        this.SetData(data);
    }

    Value() {
        return this.mData;
    }

    /**
     * RefreshView 刷新列表部分视图
     */
    RefreshView() {
        this.ClearView();
        if (!this.mData) {
            return;
        }
        for (var i = 0; i < this.mData.length; i++) {
            this.createView(i);
        }
        this.RegisterEvents();
    }

    /**
	 * 获取列表中某一个元素的html代码
	 * @param dataIndex 数据索引
     * @param (仅多元素绑定时)元素索引
	*/
    GetView(dataIndex: number, elemIndex?: number): string {
        var data = this.mData[dataIndex];
        if (this.getTemplpateModel) {
            data = this.getTemplpateModel(data);
        }
        if (elemIndex == null) {
            elemIndex = 0;
        }
        return Meta.Resolve(this.viewString[elemIndex], data);
    };



    /**
     * createView 创建一个视图的html代码,并添加到当前view的最后面
     * @param index 需要创建的view的索引
     */
    protected createView(index: number) {
        if (this.multipart) {
            this.target.each((i, elem) => {
                this.append(this.GetView(index, i), i);
            });
        } else {
            this.append(this.GetView(index, 0));
        }
    }

    /**
     * [override] append 在视图的最后添加html内容,该方法是为了避免类似table元素这种列表内容并非其直接子元素的情况
     */
    protected append(viewString: string, elemIndex?: number) {
        if (this.multipart) {
            if (elemIndex == null) {
                elemIndex = 0;
            }
            this.target.eq(elemIndex).append(viewString);
        } else {
            this.target.append(viewString);
        }
    }

    /**
     * [override] GetChildren 获取列表内容的jquery引用
     */
    protected GetChildren(): JQuery {
        return this.target.children();
    }

    /**
     * [override] ClearView 清空列表部分视图
     */
    ClearView() {
        this.target.html("");
    }

    /**
     * RegisterEvents 注册列表子元素的事件
     * 注意，手动调用该方法会在注册事件之前先解除列表原有的所有事件
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
     * SetPageSize 设置每页条数,显示到页面上
     */
    SetPageSize(pagesize: number) {

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

class PageManager<T> {

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

    /**
     * SetCurPage 强行设置当前页,不跳转
     * 注意,调用此函数会引起分页器的奔溃,请谨慎使用
     * @param index 页码
     */
    ForceSetCurPage(index: number) {
        this.curPage = index;
    }

    protected pageSize: number;

    /**
     * CurPage 获取当前页码
     */
    CurPage() {
        return this.curPage;
    }

    /**
     * SetPageSize 设置每页条数
     * @param pagesize 每页条数
     */
    SetPageSize(pagesize: number) {
        this.pageSize = pagesize;
    }

    protected total: number;

    /**
     * RecordCount 返回记录总条数,仅在通过SetRecordCount方法设置总条数后才有效
     */
    RecordCount(): number {
        return this.total;
    }

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
     * ResetCurPage 重置当前页为第一页
     */
    ResetCurPage() {
        this.curPage = 1;
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
            this.context.SetData(mx(this.mData).skip((this.curPage - 1) * this.pageSize).take(this.pageSize).toArray());
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
        var nPageSize = this.context.GetPageSize();
        if (nPageSize >= this.pageSize && this.curPage >= this.pageCount) {
            return;
        }
        this.curPage++;
        this.GetCurPage();
    }

    /**
     * LastPage 末页
     */
    LastPage() {
        if (this.pageCount < 1) {
            return;
        }
        this.curPage = this.pageCount;
        this.GetCurPage();
    }

    /**
     * TurnToPage 跳转到某页
     * @param index 页码
     */
    TurnToPage(index: number) {
        var nPageSize = this.context.GetPageSize();
        if (index < 1 || (nPageSize >= this.pageSize && index > this.pageCount)) {
            return;
        }
        this.curPage = index;
        this.GetCurPage();
    }

}