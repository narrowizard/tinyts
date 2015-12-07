class EditDialog implements IView {
	id: string;
	instance: JQuery;
	state: boolean;

	constructor(id: string) {
		this.id = id;
	}

	Switch() {
		if (this.state) {
			this.hide();
		} else {
			this.show();
		}
	}

	hide() {
		this.instance.css("display", "none");
		this.state = false;
	}

	show() {
		this.instance.css("display", "block");
		this.state = true;
	}

	LoadView() {
		this.instance = $("#" + this.id);
	}
}