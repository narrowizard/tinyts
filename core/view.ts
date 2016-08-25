export class View {

    protected id: string;

    // 该属性用于解决虚拟视图被多次引用时产生的id冲突问题
    protected selector: string;

    protected target: JQuery;

    protected attributes: { [index: string]: any };

    /**
     * SetAttr 设置属性,该属性与DOM元素无关
     * @param attrName 属性名
     * @param value 属性值
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
        }
        if (this.target.length > 0) {
            return true;
        } else {
            return false;
        }
    }

}