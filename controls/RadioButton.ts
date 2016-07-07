import {ListView} from '../core/ListView';
import {controlConfig} from '../config/TinytsConfig';
import {RadioModel} from '../models/RadioModel';

/**
 * 请使用input[type="radio"]
 */
export class RadioButton<T extends RadioModel> extends ListView<T>{

    GetChildren(): JQuery {
        return this.target.find("input[type='radio']");
    }

    /**
     * Value 获取当前选定值
     */
    Value() {
        var index = this.target.find("input:radio").filter(":checked").index("input:radio");
        if (index < 0) {
            //不存在
            return null;
        }
        return this.mData[index].Value;
    }

    /**
     * SetValue 选择指定值的选项
     * @param value 指定值
     */
    SetValue(value: any) {
        var index = -1;
        for (var i = 0; i < this.mData.length; i++) {
            if (value == this.mData[i].Value) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this.target.find("input:radio").eq(index).prop("checked", true);
        }
    }

}