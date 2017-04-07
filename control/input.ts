import { TextView } from './text';

/**
 * InputView 文本输入控件,作为输入框的基类,重载了TextView中的方法
 */
export class InputView extends TextView {

    
    Value() {
        return this.target.val();
    }

    
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