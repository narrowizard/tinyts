class EditDialog extends BaseControl {
	state: boolean;

	constructor(id: string) {
		super(id);
	}

	Switch() {
		if (this.state) {
			this.hide();
		} else {
			this.show();
		}
	}

	hide() {
		this.target.css("display", "none");
		this.state = false;
	}

	show() {
		this.target.css("display", "block");
		this.state = true;
	}
	
}