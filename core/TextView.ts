/**
 * TextView 具备文字展示功能的View
 */
import {View} from './View';

export class TextView extends View {

    /**
     * SetText 设置控件文本内容
     * @param 文本内容
     */
    SetText(text: string) {
        this.target.text(text);
    }

    /**
     * GetText 获取控件文本内容
     */
    GetText(): string {
        return this.target.text();
    }

    /**
     * SetColor 设置文本颜色
     * @param color 文本颜色
     */
    SetColor(color: string) {
        this.target.css("color", color);
    }

    /**
     * SetBackgroundColor 设置文本背景色
     * @param color 文本背景色
     */
    SetBackgroundColor(color: string) {
        this.target.css("background-color", color);
    }

    /**
     * SetSize 设置字体大小
     * @param pixel 字体大小(像素)
     */
    SetSize(pixel: number) {
        this.target.css("font-size", pixel);
    }
}