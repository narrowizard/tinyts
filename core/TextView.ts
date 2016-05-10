/**
 * TextView 具备文字展示功能的View
 */
import {View} from './View';

export class TextView extends View {

    SetText(text: string) {
        this.target.text(text);
    }

    GetText(): string {
        return this.target.text();
    }

    SetColor(color: string) {
        this.target.css("color", color);
    }

    SetBackgroundColor(color: string) {
        this.target.css("background-color", color);
    }

    SetSize(pixel: number) {
        this.target.css("font-size", pixel);
    }
}