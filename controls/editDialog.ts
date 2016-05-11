import {View} from "../core/View";
import {controlConfig} from '../config/TinytsConfig';

export class EditDialog extends View {
    mask: JQuery;
    masked: boolean;
    closeOnClick: boolean;

    MoveTo(x: number, y: number) {
        this.target.css("left", x);
        this.target.css("top", y);
    }

    LoadView() {
        super.LoadView();
        var masked = this.target.attr("data-mask");
        this.closeOnClick = Boolean(this.target.attr("data-close-on-click"));
        if (masked) {
            this.masked = true;
            this.initMask();
        }
        this.Hide();
    }

    Show() {
        this.target.css("display", "block");
    }

    Hide() {
        this.target.css("display", "none");
    }

    /**
     * 需要添加mask的样式
     */
    protected initMask() {
        var html = `<div class='${controlConfig.dialogMaskClass}'></div>`;
        this.mask = $(html);
        this.target.append(this.mask);

        var me = this;
        if (this.closeOnClick) {
            this.mask.click(() => {
                me.Hide();
            });
        }
    }
}