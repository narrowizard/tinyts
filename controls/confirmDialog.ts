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
        this.confirmMessage.BindBySelector(controlConfig.confirmDialogMessageSelector);
        this.confirmButton.BindBySelector(controlConfig.confirmButton);
    }

    SetConfirmHandler(context, handler: () => void) {
        this.confirmButton.Off("click");

        this.confirmButton.OnClick(() => {
            handler.apply(context);
        });
    }

    Confirm(msg: string) {
        this.confirmMessage.SetText(msg);
        this.Show();
    }

}