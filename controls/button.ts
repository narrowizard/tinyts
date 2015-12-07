class Button extends BaseControl {
	
	constructor(id: string) {
		super(id);
		this.elementName = "button";
	}

	static Init(id: string): Button {
		var instance = new Button(id);
		instance.LoadView();
		return instance;
	}

	OnClick(handler: (eventObject: JQueryEventObject) => void) {
		if (this.target != null) {
			this.target.click(handler);
		}
	}
	
}