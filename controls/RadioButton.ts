import {ListView} from '../core/ListView';
import {controlConfig} from '../config/TinytsConfig';
import {RadioModel} from '../models/RadioModel';

// 初始化会在每一个input:radio上加上name属性为radio + id
export class RadioButton<T extends RadioModel> extends ListView<T>{
    name: string;

    GetChildren(): JQuery {
        return this.target.find("input[type='radio']");
    }

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

    /**
     * Value 获取当前选定值
     */
    Value() {
        var r = $("input:radio[name=" + this.name + "]").filter(":checked");
        return r.val();
    }

    /**
     * SetValue 选择指定值的选项
     * @param value 指定值
     */
    SetValue(value: any) {
        $("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
    }

}