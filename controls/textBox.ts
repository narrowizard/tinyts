class TextBox extends BaseControl {
	validationArea: JQuery;
	minLength: number;
	maxLength: number;

	constructor(id: string) {
		super(id);
	}

	LoadView() {
		super.LoadView();
		
		this.minLength = +this.target.attr("data-min-length");
		this.maxLength = +this.target.attr("data-max-length");
		this.validationArea = this.target.parent().children(".validation");
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

	SetColor(color: string) {
		this.target.css("color", color);
	}
	
	// ColorPicker 将TextBox构造为一个ColorPicker
	// @param 当选择一个颜色之后的回调函数
	ColorPicker(handler: (event: JQueryEventObject) => void) {
		this.target.colorpicker({
			format: "hex"
		}).on("changeColor.colorpicker", handler);
	}
}