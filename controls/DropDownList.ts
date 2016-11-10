import { ListInputView } from '../core/ListInputView';

/**
 * DropDownList 下拉列表,请使用select元素
 * 此列表控件不需要定义getTemplateView方法
 * property:
 * data-text
 * data-value
 * data-status
 */
export class DropDownList<T extends IModel> extends ListInputView<T>{

    /**
     * SetChangeHandler 设置change事件
     */
    SetChangeHandler(onchange: (ev: Event) => void) {
        this.target.on("change", onchange);
    }

    protected clear() {
        this.target.append("<option value='empty'></option>").val("empty").empty();
    }

    LoadView() {
        var me = this;
        super.LoadView();

        this.getTemplateView = (index, data) => {
            var html = "";
            if (data[me.statusKey]) {
                html = `<option selected value=${data[me.valueKey]}>${data[me.textKey]}</option>`;
            } else {
                html = `<option value=${data[me.valueKey]}>${data[me.textKey]}</option>`;
            }
            return html;
        };
    }

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
        var c = Enumerable.from(this.mData).where(it => it[me.valueKey] == value).count();
        if (c == 0) {
            return;
        }
        this.target.val(value);
        // 设置值后手动触发change事件
        this.Trigger("change");
    }

    /**
     * SelectByText 根据文本内容选择项
     * @param text 文本内容
     */
    SelectByText(text: string) {
        var me = this;
        var item = Enumerable.from(this.mData).where(it => it[me.textKey] == text).firstOrDefault();
        if (item) {
            var value = item[me.valueKey];
            this.SetValue(value);
        }
    }

    Value() {
        return this.target.val();
    }

    /**
     * SelectedText 获取选中的文本内容
     */
    SelectedText() {
        var me = this;
        var value = this.Value();
        var item = Enumerable.from(this.mData).where(it => it[me.valueKey] == value).firstOrDefault();
        if (item) {
            return item[me.textKey];
        }
        return null;
    }

    /**
     * SelectByIndex 通过索引选择
     * @param index 索引
     */
    SelectByIndex(index: number) {
        if (index < 0 || index > this.Count() - 1) {
            return;
        }
        var value = this.mData[index][this.valueKey];
        this.SetValue(value);
    }

}
