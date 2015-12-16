class SelectButton<T extends RadioModel> extends ListView<T>
{

	LoadView() {
		super.LoadView();
	}

	Clear() {
		this.target.html("");
	}

	GetView(index: number): string {
		if (index < 0 || index > this.mData.length) {
			return "";
		}
		var html = "";
		html += "<button data-id=" + this.mData[index].value + ">";
		html += this.mData[index].text;
		html += "</button>";
		return html;
	}
	
}