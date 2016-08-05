import {EditDialog} from './EditDialog';
import {TextView} from '../core/TextView';
import {controlConfig} from '../config/TinytsConfig';
import {Button} from '../controls/Button';

export class ConfirmDialog extends EditDialog {

    confirmMessage: TextView;

    confirmButton: Button;

    LoadView() {
        super.LoadView();
        this.confirmMessage = new TextView();
        this.confirmButton = new Button();
        this.confirmMessage.BindBySelector(`#${this.ViewId()} ${controlConfig.confirmDialogMessageSelector}`);
        this.confirmButton.BindBySelector(`#${this.ViewId()} ${controlConfig.confirmButton}`);
    }

    /**
     * SetConfirmHandler 设置confirm回调
     * @param context 事件上下文
     * @param handler 事件处理函数
     */
    SetConfirmHandler(context, handler: () => void) {
        this.confirmButton.Off("click");

        this.confirmButton.OnClick(() => {
            handler.apply(context);
        });
    }

    /**
     * Confirm 弹出confirm框
     * @param msg 提示信息
     */
    Confirm(msg: string) {
        this.confirmMessage.SetText(msg);
        this.Show();
    }

}