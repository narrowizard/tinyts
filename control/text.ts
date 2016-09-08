import { View } from './view';

/**
 * TextView 用于文本显示的控件
 * 这里的文本指<tag>文本内容</tag>中的文本内容
 * 所以button也继承自该类
 */
export class TextView extends View {

    Text(): string {
        return this.target.text();
    }

    SetText(v: string) {
        this.target.text(v);
    }
}