class BaseControl implements IControl {
	private id: string;
	protected target: JQuery;
	protected data: { [index: string]: {} };
	protected elementName: string;
	protected textValue: string;

	ViewId(): string {
		return this.id;
	}

	constructor(id: string) {
		this.id = id;
	}

	LoadView() {
		this.target = $("#" + this.id);
	}

	RegisterEvent(eventName: string, handler: (...args: any[]) => any) {
		if (this.target != null) {
			this.target.on(eventName, handler);
		}
	}

	SetAttr(attrName: string, value: any) {
		this.data[attrName] = value;
	}

	Attr(attrName: string): any {
		return this.data[attrName];
	}

	ToHtml() {
		var html: string = "";
		html += "<" + this.elementName + " id='" + this.id + "'";
		Object.keys(this.data).map((index: string) => {
			html += (index + "=" + this.data[index]);
		});
		html += ">";
		html += this.textValue;
		html += "</" + this.elementName + ">";
		return html;
	}

	RefreshView() {
		this.target.html(this.ToHtml());
	}

}