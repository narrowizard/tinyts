class TextBox extends InputView {
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

    Clear() {
        this.target.val("");
    }

    Value(): string {
        var value = this.target.val();
        return value;
    }

    ReadOnly(readonly: boolean) {
        if (readonly) {
            this.target.attr("readonly", "readonly");
        } else {
            this.target.removeAttr("readonly");
        }
    }

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

    SetValue(value: string) {
        this.target.val(value);
    }
	
    // ColorPicker 将TextBox构造为一个ColorPicker
    // @param 当选择一个颜色之后的回调函数
    ColorPicker(handler: (event: JQueryEventObject) => void) {
        this.target.colorpicker({
            format: "hex"
        }).on("changeColor.colorpicker", handler);
    }

    DatePicker(config?: any) {
        this.target.datetimepicker(config);
    }
}