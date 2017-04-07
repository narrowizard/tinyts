import { View } from '../core/view';

/**
 * TextView 用于文本显示的控件
 * 这里的文本指<tag>文本内容</tag>中的文本内容
 */
export class TextView extends View {

    /**
     * Value 取值
     */
    Value(): string {
        return this.target.text();
    }

    /**
     * SetValue 设置值
     */
    SetValue(v: string) {
        this.target.text(v);
    }

    /**
     * Clear 清空值
     */
    Clear() {
        this.target.text("");
    }
}