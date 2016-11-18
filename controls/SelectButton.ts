import {ListInputView} from '../core/ListInputView';
import {SelectButtonModel} from '../models/RadioModel';
import {controlConfig} from '../config/TinytsConfig';

/**
 * SelectButton 多选(单选)按钮组
 * 请使用button元素,而不要使用input[type="button"]
 * property
 * data-muilti-select
 * data-text 文本键
 * data-value 值键
 * data-status 状态键
 */
export class SelectButton<T extends IModel> extends ListInputView<T>
{
    muiltiSelect: boolean;

    GetChildren(): JQuery {
        return this.target.find("button");
    }

    /**
     * Disable 禁用SelectButton
     */
    Disable() {
        this.GetChildren().attr("disabled", "true");
    }

    /**
     * Enable 启动SelectButton
     */
    Enable() {
        this.GetChildren().removeAttr("disabled");
    }

    /**
     * SetEventHandler 设置SelectButton的点击事件
     * @param selector 无效参数
     * @param handler 点击事件处理器
     * @param event click
     */
    SetEventHandler(selector: string, handler: (p: JQueryEventObject) => void, event?: string) {
        var me = this;
        super.SetEventHandler("button", (p: JQueryEventObject) => {
            var index = $(p.target).index();
            var item = me.GetItem(index);
            //注册选择事件
            if (me.muiltiSelect) {
                //多选
                if (item[me.statusKey]) {
                    item[me.statusKey] = false;
                    $(p.target).removeClass(controlConfig.selectbuttonActiveClass);
                } else {
                    item[me.statusKey] = true;
                    $(p.target).addClass(controlConfig.selectbuttonActiveClass);
                }
            } else {
                me.resetStatus();
                item[me.statusKey] = true;
                //单选
                $(p.target).addClass(controlConfig.selectbuttonActiveClass);
            }
            //注册用户自定义事件
            handler(p);
        });
    }

    Clear() {
        this.resetStatus();
    }

    /**
     * resetStatus 重置所有的状态为未选中
     */
    protected resetStatus() {
        for (var i = 0; i < this.mData.length; i++) {
            this.mData[i][this.statusKey] = false;
        }
        this.GetChildren().removeClass(controlConfig.selectbuttonActiveClass);
    }

    LoadView() {
        var me = this;
        super.LoadView();
        //单选 or 多选
        var t = Boolean(me.target.attr("data-muilti-select"));
        if (t) {
            me.muiltiSelect = true;
        } else {
            me.muiltiSelect = false;
        }
    }

	/**
	 * 选择指定索引项
	 * @param index 选择项的索引
	 */
    Select(index: number) {
        this.GetChildren().eq(index).click();
    }

    /**
     * SelectById 根据Id选择项,单选时如果存在多个相同id的值,将会选中第一个
     */
    SelectById(id: any) {
        for (var i = this.mData.length - 1; i > -1; i--) {
            if (this.mData[i].Id == id) {
                this.Select(i);
            }
        }
    }

    /**
     * SetValue 同SelectById
     * @value 值
     */
    SetValue(value: number) {
        this.SelectById(value);
    }

    /**
     * GetSelectedItem 获取选中项,单选
     */
    GetSelectedItem(): T {
        var me = this;
        return Enumerable.from(me.mData).where(it => it[me.statusKey]).firstOrDefault();
    }

	/**
	 * 获取选择项的id,仅单选时有效
     * 若id未定义,则返回value值
	 */
    GetSelectedItemId(): number {
        var me = this;
        if (me.muiltiSelect) {
            return 0;
        } else {
            var item = Enumerable.from(me.mData).where(it => it[me.statusKey]).firstOrDefault();
            return item ? item.Id ? item.Id : item[me.valueKey] : 0;
        }
    }

	/**
	 * 获取选择项的文本内容,仅单选时有效
	 */
    GetSelectedItemText(): string {
        var me = this;
        if (this.muiltiSelect) {
            return "";
        } else {
            var item = Enumerable.from(me.mData).where(it => it[me.statusKey]).firstOrDefault();
            return item ? item[me.textKey] : "";
        }
    }

    /**
     * GetSelectedItem 获取选中项,多选
     */
    GetSelectedItems(): T[] {
        var me = this;
        return Enumerable.from(me.mData).where(it => it[me.statusKey]).toArray();
    }

    /**
     * GetSelectedItemIds 获取选择项的编号,多选时使用
     */
    GetSelectedItemIds(): number[] {
        var me = this;
        return Enumerable.from(me.mData).where(it => it[me.statusKey]).select(it => it.Id).toArray();
    }

    /**
     * GetSelectedItemTexts 获取选择项的文本,多选时使用
     */
    GetSelectedItemTexts(): string[] {
        var me = this;
        return Enumerable.from(me.mData).where(it => it[me.statusKey]).select(it => it[me.textKey]).toArray();
    }

    /**
     * TraverseSelected 遍历选中的按钮
     * @param handler 遍历处理器
     */
    TraverseSelected(handler: (item: T, index: number) => void) {
        var me = this;
        Enumerable.from(me.mData).where(it => it[me.statusKey]).forEach(handler);
    }

}