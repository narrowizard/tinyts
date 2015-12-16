class EditDialog extends ViewGroup {
	MoveTo(x: number, y: number) {
		this.target.css("left", x);
		this.target.css("top", y);
	}
	
	SetTitle(title: string) {
		this.target.children(".title").text(title);
	}
}