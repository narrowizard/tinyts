abstract class View {
	private id: string;
	protected target: JQuery;
	protected attributes: { [index: string]: any };

	SetID(id: string) {
		this.id = id;
	}

	ViewId(): string {
		return this.id;
	}

	LoadView() {
		this.target = $("#" + this.id);
	}

	BindBySelector(selector: string) {
		this.target = $(selector);
	}

	SetAttr(attrName: string, value: any) {
		this.attributes[attrName] = value;
	}

	Attr(attrName: string): any {
		return this.attributes[attrName];
	}
	
	// On 注册控件事件
	// @param eventName:事件名称
	// @param handler: 事件处理函数
	On(eventName: string, handler: (...args: any[]) => any) {
		if (this.target != null) {
			this.target.on(eventName, handler);
		}
	}

	OnClick(handler: (eventObject: JQueryEventObject) => void) {
		if (this.target != null) {
			this.target.click(handler);
		}
	}

}
