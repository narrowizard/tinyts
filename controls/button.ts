import {TextView} from '../core/TextView';

export class Button extends TextView {

    PerformClick() {
        if (this.target != null) {
            this.target.click();
        }
    }

    Disable() {
        this.target.attr("disabled", "true");
    }

    Enable() {
        this.target.removeAttr("disabled");
    }

}