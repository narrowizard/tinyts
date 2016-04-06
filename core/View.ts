/**
 * View 控件基类,所有的控件类继承自View
 */
abstract class View {
    private id: string;
    protected target: JQuery;
    protected attributes: { [index: string]: any };

	/**
	 * SetID 设置元素的id,该方法会在View初始化之后被调用
	 * 可以重载该方法来实现额外的初始化
	 * @param id 唯一id
	 */
    SetID(id: string) {
        this.attributes = {};
        this.id = id;
    }

    /**
     * ViewId 返回元素的id
     */
    ViewId(): string {
        return this.id;
    }

    /**
     * LoadView 绑定jQuery引用
     * 如果有额外操作,可以在子类中重写该方法
     */
    LoadView() {
        this.target = $("#" + this.id);
    }

    /**
     * BindBySelector 通过选择器绑定View
     */
    BindBySelector(selector: string) {
        this.target = $(selector);
    }

    /**
     * SetStyle 设置style属性
     */
    SetStyle(key: string, value: string) {
        this.target.css(key, value);
    }

    /**
     * SetAttr 设置属性
     */
    SetAttr(attrName: string, value: any) {
        this.attributes[attrName] = value;
    }

    /**
     * Attr 获取属性
     */
    Attr(attrName: string): any {
        return this.attributes[attrName];
    }

    /**
     * On 注册控件事件
     * @param eventName:事件名称
     * @param handler: 事件处理函数
     */
    On(eventName: string, handler: (...args: any[]) => any) {
        if (this.target != null) {
            this.target.on(eventName, handler);
        }
    }

    /**
     * OnClick 设置点击事件
     */
    OnClick(handler: (eventObject: JQueryEventObject) => void) {
        if (this.target != null) {
            this.target.click(handler);
        }
    }

    /**
     * SetClass 添加class属性
     * @param className
     * @param selector:该View的子元素选择器
     */
    SetClass(className: string, selector?: string) {
        if (!selector) {
            this.target.addClass(className);
        } else {
            this.target.find(selector).addClass(className);
        }
    }

    /**
     * SetClass 移除class
     * @param className
     * @param selector:该View的子元素选择器
     */
    RemoveClass(className: string, selector?: string) {
        if (!selector) {
            this.target.removeClass(className);
        } else {
            this.target.find(selector).removeClass(className);
        }
    }

}
