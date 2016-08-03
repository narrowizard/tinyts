import {ListInputView} from '../core/ListInputView';
import {controlConfig} from '../config/TinytsConfig';
import {RadioModel} from '../models/RadioModel';

/**
 * 请使用input[type="radio"]
 */
export class RadioButton<T extends IModel> extends ListInputView<T>{

    GetChildren(): JQuery {
        return this.target.find("input[type='radio']");
    }

    /**
     * Value 获取当前选定值
     */
    Value() {
        var index = this.target.find("input:radio").index(this.target.find("input:radio").filter(":checked"));
        if (index < 0) {
            //不存在
            return null;
        }
        return this.mData[index][this.valueKey];
    }

    /**
     * SetValue 选择指定值的选项
     * @param value 指定值
     */
    SetValue(value: any) {
        var index = -1;
        for (var i = 0; i < this.mData.length; i++) {
            if (value == this.mData[i][this.valueKey]) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this.target.find("input:radio").eq(index).prop("checked", true);
        }
    }

    /**
     * Clear 清除所有选择项
     */
    Clear() {
        this.GetChildren().prop("checked", false);
    }

}