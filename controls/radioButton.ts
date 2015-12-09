// 初始化会在每一个input:radio上加上name属性为radio + id
class RadioButton<T extends RadioModel> extends ListControl<T>{
	mData: T[];
	name: string;

	constructor(id: string) {
		super(id);
		this.name = "radio" + id;
	}

	SetName(name: string) {
		this.name = name;
	}

	GetView(index: number): string {
		if (index < 0 || index > this.mData.length) {
			return "";
		}
		var html = "";
		html += "<input type='radio' value=" + this.mData[index].value + " name='" + this.name + "'/>" + this.mData[index].text;
		return html;
	}

	RefreshView() {
		this.target.html("");
		for (var i = 0; i < this.mData.length; i++) {
			this.target.append(this.GetView(i));
		}
	}

	Value() {
		var r = $("input:radio[name=" + this.name + "]").filter(":checked");
		return r.val();
	}

	SetValue(value: any) {
		$("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
	}
}