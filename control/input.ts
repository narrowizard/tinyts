import { TextView } from './text';
import { Button } from './button';

/**
 * InputView 文本输入控件,作为输入框的基类,重载了TextView中的方法
 * properties 
 *      data-accept-button string jquery selector
 */
export class InputView extends TextView {

    protected acceptBtn: JQuery;

    LoadView(parent) {
        var succ = super.LoadView(parent);
        if (succ) {
            var acceptSelector = this.target.attr("data-accept-button");
            if (acceptSelector) {
                this.acceptBtn = $(acceptSelector);
            }
            this.On("keypress", (args) => {
                if (args.which == 13) {
                    if (this.acceptBtn.prop("disabled")) {

                    } else {
                        this.acceptBtn.click();
                    }
                }
            });
        }
        return succ;
    }

    /**
     * SetAcceptButton 设置默认按钮
     * @param id 默认按钮的选择器
     * @param btn 默认按钮(Button对象)
     */
    SetAcceptButton(id: string);
    SetAcceptButton(btn: Button);
    SetAcceptButton(p: any) {
        if (typeof p == "string") {
            this.acceptBtn = $(p);
        } else if (typeof p == "object") {
            this.acceptBtn = (p as Button).GetJQueryInstance();
        }
    }

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