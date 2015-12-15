class Button extends TextView {

	PerformClick() {
		if (this.target != null) {
			this.target.click();
		}
	}

}