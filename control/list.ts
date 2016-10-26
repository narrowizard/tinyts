import { View } from './view';

/**
 * List<T> 列表数据操作接口
 */
interface List<T> {
    SetData(data: T[]);
    Count(): number;
    Add(...model: T[]);
}

export class ListView<T> extends View implements List<T>{

    protected mData: T[];

    /**
     * getTemplateView 设置列表部分的模板
     * @param index 索引
     * @param data 数据
     */
    getTemplateView: (index: number, data: T) => string;


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
     * SetData 设置数据
     * @param data 数据
     */
    SetData(data: T[]) {
        if (!data) {
            data = [];
        }
        this.mData = data;
        this.RefreshView();
    }

    /**
     * RefreshView 刷新列表部分视图
     */
    RefreshView() {
        this.ClearView();
        if (!this.mData) {
            return;
        }
        for (var i = 0; i < this.Count(); i++) {
            this.append(this.GetView(i));
        }
        this.RegisterEvents();
    }

    /**
	 * 获取列表中某一个元素的html代码
	 * @param index 索引
	*/
    GetView(index: number): string {
        if (!this.getTemplateView) {
            console.error(this.id + "未定义getTemplateView方法");
            return "";
        }
        return this.getTemplateView(index, this.mData[index]);
    };

    /**
     * 在列表的最后插入元素,请在子类中实现该方法
     * @param viewString 元素的html字符串
     */
    protected append(viewString: string) {
        this.target.append(viewString);
    }

    /**
     * ClearView 清空列表部分视图
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

    /**
     * Count 获取列表长度
     */
    Count(): number {
        return this.mData.length;
    }

    /**
     * Add 添加数据，该方法不会刷新整个列表
     * @param model 待添加的数据
     */
    Add(...model: T[]) {
        this.mData.push(...model);
        var c = model.length;
        for (var i = 0; i < c; i++) {
            this.append(this.GetView(this.Count() - c + i));
        }
    }

}
