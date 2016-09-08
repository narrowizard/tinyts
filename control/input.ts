import { View } from './view';

/**
 * InputView 文本输入控件,作为输入框的基类
 */
export class InputView extends View {

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

    LoadView(parent?: JQuery | string): boolean {
        var succ = super.LoadView();
        if (succ) {
            this.propertyName = this.target.attr("data-property");
        }
        return succ;
    }

    /**
     * Value 取值
     */
    Value() {
        return this.target.val();
    }

    /**
     * SetValue 设置值
     */
    SetValue(v: string) {
        this.target.val(v);
    }

    /**
     * Clear 清空值
     */
    Clear() {
        this.target.val("");
    }

}