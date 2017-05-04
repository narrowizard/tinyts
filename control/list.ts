import { View, ViewState } from '../core/view';
import { Meta } from '../core/meta';

/**
 * ArrayProxy<T> 列表数据操作接口
 */
export class ArrayProxy<T> {

    protected data: T[];

    constructor(data: T[], context: ListView<T>) {
        this.data = data;
        this.context = context;
    }

    context: ListView<T>;

    get(index: number): T {
        return this.data[index];
    }

    push(...items: T[]): number {
        var res = this.data.push(...items);
        this.context.RefreshView();
        return res;
    }

    pop(): T {
        var res = this.data.pop();
        this.context.RefreshView();
        return res;

    }

    concat<U extends T[]>(...items: U[]): T[] {
        var res = this.data.concat(...items);
        this.context.RefreshView();
        return res;

    }

    shift(): T {
        var res = this.data.shift();
        this.context.RefreshView();
        return res;

    }

    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        var res = this.data.splice(start, deleteCount, ...items);
        this.context.RefreshView();
        return res;

    }

    unshift(...items: T[]): number {
        var res = this.data.unshift();
        this.context.RefreshView();
        return res;
    }

    count(): number {
        return this.data.length;
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
        for (var i = 0; i < this.mData.count(); i++) {
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
        var data = this.mData.get(dataIndex);
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

}
