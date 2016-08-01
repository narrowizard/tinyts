import {ListInputView} from '../core/ListInputView';

/**
 * DropDownList 下拉列表,请使用select元素
 */
export class DropDownList<T extends IModel> extends ListInputView<T>{

    Clear() {
        this.SetValue(null);
    }

    GetChildren() {
        return this.target.children("option");
    }

    /**
     * SetValue 设置select的Value
     */
    SetValue(value: any) {
        var me = this;
        var target = 0;
        for (var i = 0; i < this.mData.length; i++) {
            if (this.mData[i][me.valueKey] == value) {
                target = i;
                break;
            }
        }
        this.target.children("option").eq(target).prop("selected", true);
    }

    SelectByText(text: string) {
        var me = this;
        var target = 0;
        for (var i = 0; i < this.mData.length; i++) {
            if (this.mData[i][me.textKey] == text) {
                target = i;
                break;
            }
        }
        this.target.children("option").eq(target).prop("selected", true);
    }

    Value() {
        var index = this.target.find("option:selected").index();
        return this.mData[index][this.valueKey];
    }

    SelectedText() {
        var index = this.target.find("option:selected").index();
        return this.mData[index][this.textKey];
    }

}
