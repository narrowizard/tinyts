import { TextView } from './text';

export class Button extends TextView {

    /**
     * OnClick 注册点击事件
     */
    OnClick(handler: (eventObject: JQueryEventObject) => void) {
        this.target.click(handler);
    }

    /**
     * PerformClick 触发button的点击事件
     */
    PerformClick() {
        if (this.target != null) {
            this.target.click();
        }
    }
}
