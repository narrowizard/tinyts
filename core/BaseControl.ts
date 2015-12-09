class BaseControl implements IControl {
	private id: string;
	protected target: JQuery;
	protected data: { [index: string]: any };
	protected elementName: string;
	protected textValue: string;
	protected required: boolean;

	ViewId(): string {
		return this.id;
	}

	constructor(id: string) {
		this.id = id;
		this.data = new Object();
	}

	LoadView() {
		this.target = $("#" + this.id);
		this.required = Boolean(this.target.attr("data-required"));
	}
	
	// On 注册控件事件
	// @param eventName:事件名称
	// @param handler: 事件处理函数
	On(eventName: string, handler: (...args: any[]) => any) {
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
		this.target.replaceWith(this.ToHtml());
	}

}