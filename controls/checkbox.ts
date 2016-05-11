import {View} from "../core/View";

export class CheckBox extends View {

    IsCheck(): boolean {
        return this.target.prop("checked");
    }

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