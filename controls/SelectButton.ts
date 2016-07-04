import {ListView} from '../core/ListView';
import {SelectButtonModel} from '../models/RadioModel';
import {controlConfig} from '../config/TinytsConfig';

/**
 * SelectButton 多选(单选)按钮组
 * 请使用button元素,而不要使用input[type="button"]
 */
export class SelectButton<T extends SelectButtonModel> extends ListView<T>
{
    muiltiSelect: boolean;

    GetChildren(): JQuery {
        return this.target.find("button");
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
                if (item.Status) {
                    item.Status = false;
                    $(p.target).removeClass(controlConfig.selectbuttonActiveClass);
                } else {
                    item.Status = true;
                    $(p.target).addClass(controlConfig.selectbuttonActiveClass);
                }
            } else {
                me.resetStatus();
                item.Status = true;
                //单选
                me.GetChildren().removeClass(controlConfig.selectbuttonActiveClass);
                $(p.target).addClass(controlConfig.selectbuttonActiveClass);
            }
            //注册用户自定义事件
            handler(p);
        });
    }

    /**
     * resetStatus 重置所有的状态为未选中
     */
    protected resetStatus() {
        for (var i = 0; i < this.mData.length; i++) {
            this.mData[i].Status = false;
        }
    }

    LoadView() {
        var me = this;
        super.LoadView();
        var t = Boolean(this.target.attr("data-muilti-select"));
        if (t) {
            this.muiltiSelect = true;
        } else {
            this.muiltiSelect = false;
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
    SelectById(id: number) {
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
        return Enumerable.from(this.mData).where(it => it.Status).firstOrDefault();
    }

	/**
	 * 获取选择项的id,仅单选时有效
	 */
    GetSelectedItemId(): number {
        if (this.muiltiSelect) {
            return 0;
        } else {
            var item = Enumerable.from(this.mData).where(it => it.Status).firstOrDefault();
            return item ? item.Id : 0;
        }
    }

	/**
	 * 获取选择项的文本内容,仅单选时有效
	 */
    GetSelectedItemText(): string {
        if (this.muiltiSelect) {
            return "";
        } else {
            var item = Enumerable.from(this.mData).where(it => it.Status).firstOrDefault();
            return item ? item.Text : "";
        }
    }

    /**
     * GetSelectedItem 获取选中项,多选
     */
    GetSelectedItems(): T[] {
        return Enumerable.from(this.mData).where(it => it.Status).toArray();
    }

    /**
     * GetSelectedItemIds 获取选择项的编号,多选时使用
     */
    GetSelectedItemIds(): number[] {
        return Enumerable.from(this.mData).where(it => it.Status).select(it => it.Id).toArray();
    }

    /**
     * GetSelectedItemTexts 获取选择项的文本,多选时使用
     */
    GetSelectedItemTexts(): string[] {
        return Enumerable.from(this.mData).where(it => it.Status).select(it => it.Text).toArray();
    }

    /**
     * TraverseSelected 遍历选中的按钮
     * @param handler 遍历处理器
     */
    TraverseSelected(handler: (item: T, index: number) => void) {
        Enumerable.from(this.mData).where(it => it.Status).forEach(handler);
    }

}