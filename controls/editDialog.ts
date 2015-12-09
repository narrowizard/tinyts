class EditDialog extends BaseControl implements ISuppressiabe, IMoveable {
	state: boolean;

	constructor(id: string) {
		super(id);
	}

	Hide() {
		this.target.css("display", "none");
		this.state = false;
	}

	Show() {
		this.target.css("display", "block");
		this.state = true;
	}

	MoveTo(x: number, y: number) {
		this.target.css("left", x);
		this.target.css("top", y);
	}
}