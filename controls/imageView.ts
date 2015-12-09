class ImageView extends BaseControl {

	constructor(id: string) {
		super(id);
	}

	SetUrl(url: string) {
		this.target.attr("src", url);
	}
}