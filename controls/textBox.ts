class TextBox implements IView {
	id: string;
	target: JQuery;
	validationArea: JQuery;

	constructor(id: string) {
		this.id = id;
	}

	LoadView() {
		this.target = $("#" + this.id);
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