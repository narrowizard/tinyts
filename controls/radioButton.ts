// 初始化会在每一个input:radio上加上name属性为radio + id
class RadioButton<T extends RadioModel> extends ListView<T>{
	name: string;
	
	SetId(id: string) {
		super.SetID(id);
		this.name = "radio_" + id;
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
	
	Clear(){
		this.target.html("");
	}

	Value() {
		var r = $("input:radio[name=" + this.name + "]").filter(":checked");
		return r.val();
	}

	SetValue(value: any) {
		$("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
	}
	
	protected append(viewString:string){
		this.target.append(viewString);
	}
}