class SelectButton<T extends RadioModel> extends ListView<T>
{
	protected itemClasses = [];
	muiltiSelect: boolean;
	/**
	 * 点击事件,请在设置数据(SetData)之前定义
	 */
	onItemClick: (element: JQuery) => void;

	LoadView() {
		super.LoadView();
		var t = Boolean(this.target.attr("data-muilti-select"));
		if (t) {
			this.muiltiSelect = true;
		} else {
			this.muiltiSelect = false;
		}
	}

	Clear() {
		this.target.html("");
	}

	Add(model: T) {
		var me = this;
		super.Add(model);
		for (var i = 0; i < this.itemClasses.length; i++) {
			this.target.find("button").last().addClass(this.itemClasses[i]);
		}
		if (me.onItemClick != null) {
			this.target.find("button").last().click((p: JQueryEventObject) => {
				me.onItemClick($(p.target));
			});
		}
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

	GetSelectedItemId(): number {
		if (this.muiltiSelect) {
			return 0;
		} else {
			return +this.target.find("button").filter(".active").attr("data-id");
		}
	}

	RefreshView() {
		var me = this;
		super.RefreshView();
		for (var i = 0; i < this.itemClasses.length; i++) {
			this.target.find("button").addClass(this.itemClasses[i]);
		}
		if (me.onItemClick != null) {
			this.target.find("button").click((p: JQueryEventObject) => {
				if (this.muiltiSelect) {
					if ($(p.target).hasClass("active")) {
						$(p.target).removeClass("active");
					} else {
						$(p.target).addClass("active");
					}
				} else {
					this.target.find("button").removeClass("active");
					$(p.target).addClass("active");
				}
				me.onItemClick($(p.target));
			});
		}
	}

	SetItemClass(className: string) {
		if (className.trim() == "") {
			return;
		}
		this.itemClasses.push(className);
	}

}