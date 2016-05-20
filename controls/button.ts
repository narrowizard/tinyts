import {TextView} from '../core/TextView';

export class Button extends TextView {

    /**
     * PerformClick 调用Button的click事件
     */
    PerformClick() {
        if (this.target != null) {
            this.target.click();
        }
    }

    /**
     * Disable 设置Button为不可用
     */
    Disable() {
        this.target.attr("disabled", "true");
    }

    /**
     * Enable 设置Button为可用
     */
    Enable() {
        this.target.removeAttr("disabled");
    }

}