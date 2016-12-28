/**
 * View 控件基类
 */
export class View {

    protected id: string;

    // 该属性用于解决虚拟视图被多次引用时产生的id冲突问题
    protected selector: string;

    // 该属性标志了当前的view是否绑定了多个元素,默认false
    protected multipart: boolean;

    /**
     * propertyName 属性名(用于注入)
     */
    protected propertyName: string;

    /**
         * PropertyName 获取属性名
         */
    PropertyName(): string {
        return this.propertyName;
    }

    protected target: JQuery;

    /**
     * SetAttr 设置属性,该属性与DOM元素无关
     * @param attrName 属性名
     * @param value 属性值
     */
    SetAttr(attrName: string, value: any) {
        this.target.data(attrName, value);
    }

    /**
     * Attr 获取属性
     */
    Attr(attrName: string): any {
        return this.target.data(attrName);
    }

    /**
     * SetID 设置控件标识符
     */
    SetID(id: string) {
        this.id = id;
    }

    /**
     * SetSelector 设置控件选择器
     */
    SetSelector(selector: string) {
        this.selector = selector;
    }

    /**
     * LoadView 建立控件与DOM之间的关联关系
     * 初始化控件属性
     * @param parent JQuery对象或选择器 父元素,若指定该参数,则元素查找范围限制在父元素内
     */
    LoadView(parent?: JQuery | string): boolean {
        // 优先使用selector绑定元素
        if (this.selector) {
            if (parent) {
                if (typeof parent == "string") {
                    this.target = $(parent).find(this.selector);
                } else {
                    this.target = (parent as JQuery).find(this.selector);
                }
            } else {
                this.target = $(this.selector);
            }
        } else if (this.id) {
            this.target = $(`#${this.id}`);
        } else {
            console.error(`neither selector nor id is set!`);
        }
        var matchedElementLength = this.target.length;
        if (matchedElementLength > 0) {
            // 绑定成功
            this.propertyName = this.target.attr("data-property");
            if (matchedElementLength > 1) {
                // 绑定了多个元素
                this.multipart = true;
                // 检测每个元素的propertyName是否一致
                for (var i = 1; i < matchedElementLength; i++) {
                    if (this.propertyName != this.target.eq(i).attr("data-property")) {
                        console.warn(`${this.propertyName} mismatched the ${i} element. you cannot use injector with this view any more.`);
                        // 不一致,忽略
                        this.propertyName = null;
                        break;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * GetJQueryInstance 获取jquery对象
     */
    GetJQueryInstance(): JQuery {
        console.warn("jquery instance is deprecated to use.")
        return this.target;
    }

    /**
     * Focus 获取焦点
     */
    Focus() {
        this.target.focus();
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
     * Trigger 触发指定的事件
     * @param eventName 事件名称
     * @param index optional 当view处于多个dom绑定模式时,指定触发哪个元素的事件,不传则默认触发第一个元素的事件,传-1则触发所有元素的事件.
     */
    Trigger(eventName: string, index?: number) {
        if (this.multipart) {
            if (index == -1) {
                this.target.trigger(eventName);
                return;
            }
            if (index == null) {
                index = 0;
            }
            this.target.eq(index).trigger(eventName);
        } else {
            this.target.trigger(eventName);
        }
    }

    /**
     * Off 解除绑定事件
     * @param eventName 事件名称
     */
    Off(eventName?: string) {
        if (this.target != null) {
            this.target.off(eventName);
        }
    }

    /**
     * AddClass 添加class属性
     * @param className
     * @param selector:该View的子元素选择器
     */
    AddClass(className: string, selector?: string) {
        if (!selector) {
            this.target.addClass(className);
        } else {
            this.target.find(selector).addClass(className);
        }
    }

    /**
     * RemoveClass 移除class
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

    /**
     * SetStyle 设置style属性
     * @param key css属性名
     * @param value 值
     */
    SetStyle(key: string, value: string) {
        this.target.css(key, value);
    }

    /**
     * Style 获取值
     * @param key css属性名
     * @param unit 是否需要单位(如px)
     */
    Style(key: string, unit?: boolean): string {
        if (unit === false) {
            return this.target.css(key).replace(/[^-\d\.]/g, '');
        } else {
            return this.target.css(key);
        }
    }

    /**
     * Disable 设置控件为不可用(仅支持disabled属性的元素有效)
     */
    Disable() {
        this.target.attr("disabled", "true");
    }

    /**
     * Enable 设置控件为可用(仅支持disabled属性的元素有效)
     */
    Enable() {
        this.target.removeAttr("disabled");
    }

}