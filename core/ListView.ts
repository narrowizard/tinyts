/**
 * ListView<T> 列表控件的基类
 * T: 元数据类型
 * methods:
 * SetData(data: T[])=>void,set data to the list view and refresh it.
 * RefreshView:()=>void,get each data item's html code(via method GetView),and refresh the whole view.
 * GetView:(index:number):string,get the specific data item's html code.
 */

import {View} from './View';

export class ListView<T extends IModel> extends View {
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
        for (var i = 0; i < this.eventHandler.length; i++) {
            if (this.eventHandler[i].event) {
                this.target.find(this.eventHandler[i].selector).on(this.eventHandler[i].event, this.eventHandler[i].handler);
            } else {
                this.target.find(this.eventHandler[i].selector).click(this.eventHandler[i].handler);
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
     * @param event 事件名,若不穿,则解除所有事件
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
	*/
    Add(model: T) {
        this.mData.push(model);
        this.append(this.GetView(this.mData.length - 1));
    }

    LoadView() {
        super.LoadView();
        this.mData = [];
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
	 * 未在该类中实现,请在子类中实现
	 * @param index 索引
	 */
    GetItemId(index: number): number {
        return 0;
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
}