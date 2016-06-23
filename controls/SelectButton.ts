import {ListView} from '../core/ListView';
import {RadioModel} from '../models/RadioModel';
import {controlConfig} from '../config/TinytsConfig';

/**
 * SelectButton 多选(单选)按钮组
 * 请使用button元素,而不要使用input[type="button"]
 */
export class SelectButton<T extends RadioModel> extends ListView<T>
{
    muiltiSelect: boolean;

    GetChildren(): JQuery {
        return this.target.find("button");
    }

    LoadView() {
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
	 * 获取选择项的id,仅单选时有效
	 */
    GetSelectedItemId(): number {
        if (this.muiltiSelect) {
            return 0;
        } else {
            return +this.GetChildren().filter(`.${controlConfig.selectbuttonActiveClass}`).attr("data-id");
        }
    }

	/**
	 * 获取选择项的文本内容,仅单选时有效
	 */
    GetSelectedItemText(): string {
        if (this.muiltiSelect) {
            return "";
        } else {
            return this.GetChildren().filter(`.${controlConfig.selectbuttonActiveClass}`).text();
        }
    }

    RefreshView() {
        var me = this;
        //添加多选(单选事件)
        this.SetEventHandler("button", (p: JQueryEventObject) => {
            if (me.muiltiSelect) {
                //多选
                if ($(p.target).hasClass(controlConfig.selectbuttonActiveClass)) {
                    $(p.target).removeClass(controlConfig.selectbuttonActiveClass);
                } else {
                    $(p.target).addClass(controlConfig.selectbuttonActiveClass);
                }
            } else {
                //单选
                me.GetChildren().removeClass(controlConfig.selectbuttonActiveClass);
                $(p.target).addClass(controlConfig.selectbuttonActiveClass);
            }
        });
        super.RefreshView();
    }
}