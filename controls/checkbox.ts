import {View} from "../core/View";

export class CheckBox extends View {

    /**
     * IsCheck 返回checkbox的选择状态
     */
    IsCheck(): boolean {
        return this.target.prop("checked");
    }

    /**
     * Check 设置checkbox的选择状态
     * @param status 选择状态,若不存在,则为true
     */
    Check(status?: boolean) {
        if (status === undefined) {
            status = true;
        }
        if (status) {
            this.target.prop("checked", true);
        } else {
            this.target.prop("checked", false);
        }
    }
}