import {ListView} from './ListView';

export abstract class ListInputView<T extends IModel> extends ListView<T>{
    abstract GetChildren();

    protected textKey: string;

    protected valueKey: string;

    protected statusKey: string;

    LoadView() {
        var me = this;
        super.LoadView();
        //属性值
        me.textKey = me.target.attr("data-text");
        me.valueKey = me.target.attr("data-value");
        me.statusKey = me.target.attr("data-status");
        me.textKey == null ? "Text" : me.textKey;
        me.valueKey == null ? "Id" : me.valueKey;
        me.statusKey == null ? "Status" : me.statusKey;
    }

    abstract Clear();
}