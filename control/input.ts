import { View } from './view';

/**
 * InputView 文本输入控件,作为输入框的基类
 */
export class InputView extends View {

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