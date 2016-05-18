import {EditDialog} from './EditDialog';
import {TextView} from '../core/TextView';
import {controlConfig} from '../config/TinytsConfig';
import {Button} from '../controls/Button';

export class ConfirmDialog extends EditDialog {

    confirmMessage: TextView;

    confirmButton: Button;

    LoadView() {
        super.LoadView();
        this.confirmMessage.BindBySelector(controlConfig.confirmDialogMessageSelector);
        this.confirmButton.BindBySelector(controlConfig.confirmButton);
    }

    SetConfirmHandler(context: { OnConfirm: () => void }) {
        this.confirmButton.Off("click");
        
        this.confirmButton.OnClick(() => {
            context.OnConfirm();
        });
    }

    Confirm() {
        this.Show();
    }

}