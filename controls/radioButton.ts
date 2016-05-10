import {ListView} from '../core/ListView';

// 初始化会在每一个input:radio上加上name属性为radio + id
class RadioButton<T extends RadioModel> extends ListView<T>{
    name: string;

    SetId(id: string) {
        super.SetID(id);
        this.name = controlConfig.radiobuttonPrefix + id;
    }

    LoadView() {
        super.LoadView();
        var datas = this.target.find("input[type='radio']");
        if (!this.name) {
            this.name = controlConfig.radiobuttonPrefix + this.ViewId();
        }
        for (var i = 0; i < datas.length; i++) {
            var model = new RadioModel($(datas[i]).val(), $(datas[i]).parent().text());
            this.Add(<T>model);
            datas.parent().remove();
        }
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

    Value() {
        var r = $("input:radio[name=" + this.name + "]").filter(":checked");
        return r.val();
    }

    SetValue(value: any) {
        $("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
    }

}