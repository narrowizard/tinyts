import {InputView} from "../core/InputView";
import {Button} from "./Button";

export class TextBox extends InputView {
    acceptBtn: string;

    LoadView() {
        super.LoadView();

        this.acceptBtn = this.target.attr("data-accept-button");
        if (this.acceptBtn) {
            this.On("keypress", (args) => {
                if (args.which == 13) {
                    $("#" + this.acceptBtn).click();
                }
            });
        }
    }
    
    /**
     * Clear 清空textbox
     */
    Clear() {
        this.target.val("");
    }
    
    /**
     * Value 获取TextBox的值
     */
    Value(): string {
        var value = this.target.val();
        return value;
    }

    /**
     * ReadOnly 设置TextBox的只读属性
     * @param readonly 是否只读
     */
    ReadOnly(readonly: boolean) {
        if (readonly) {
            this.target.attr("readonly", "readonly");
        } else {
            this.target.removeAttr("readonly");
        }
    }

    /**
     * SetAcceptButton 设置默认按钮
     * @param id 默认按钮的id
     * @param btn 默认按钮(Button对象)
     */
    SetAcceptButton(id: string);
    SetAcceptButton(btn: Button);
    SetAcceptButton(p: any) {
        this.target.keydown((event) => {
            if (event.keyCode == 13) {
                if (typeof p == "string") {
                    $("#" + p).click();
                } else if (typeof p == "object") {
                    (p as Button).PerformClick();
                }
            }
        });

    }

    /**
     * SetValue 设置值
     * @param value 值
     */
    SetValue(value: string) {
        this.target.val(value);
    }

}