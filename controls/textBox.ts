class TextBox extends BaseControl {
	validationArea: JQuery;

	constructor(id: string) {
		super(id);
	}

	LoadView() {
		super.LoadView();
		this.validationArea = this.target.parent().children(".validation");
	}

	Value(): string {
		var value = this.target.val();
		if ($.trim(value) == "") {
			this.validationArea.css("display", "block");
			return null;
		} else {
			this.validationArea.css("display", "");
			return value;
		}
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