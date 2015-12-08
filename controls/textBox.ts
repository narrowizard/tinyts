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


}