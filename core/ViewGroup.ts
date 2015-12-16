class ViewGroup extends View {
	visiable: boolean;
	Hide() {
		this.target.css("display", "none");
		this.visiable = false;
	}

	Show() {
		this.target.css("display", "block");
		this.visiable = true;
	}
}