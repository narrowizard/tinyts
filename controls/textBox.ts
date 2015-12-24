class TextBox extends TextView {
    validationArea: JQuery;
    minLength: number;
    maxLength: number;
    required: boolean;

    LoadView() {
        super.LoadView();

        this.required = Boolean(this.target.attr("data-required"));
        this.minLength = +this.target.attr("data-min-length");
        this.maxLength = +this.target.attr("data-max-length");
        this.validationArea = this.target.parent().children(".validation");
    }

    Clear() {
        this.target.val("");
    }

    Value(): string {
        var value = this.target.val();
        if (this.required) {
            if (!this.Required(value)) {
                this.SetErrorMsg("必须");
                this.ShowError();
                return null;
            }
        }
        if (this.minLength) {
            if (!this.MinLength(value)) {
                this.SetErrorMsg("长度必须大于等于" + this.minLength);
                this.ShowError();
                return null;
            }
        }
        if (this.maxLength) {
            if (!this.MaxLength(value)) {
                this.SetErrorMsg("长度必须小于等于" + this.maxLength);
                this.ShowError();
                return null;
            }
        }
        this.HideError();
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

    SetErrorMsg(msg: string) {
        this.validationArea.text(msg);
    }

    ShowError() {
        this.validationArea.css("display", "block");
    }

    HideError() {
        this.validationArea.css("display", "none");
    }

    Required(value: string): boolean {
        return value.trim() !== "";
    }

    MinLength(value: string) {
        return value.length >= this.minLength;
    }

    MaxLength(value: string) {
        return value.length <= this.maxLength;
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