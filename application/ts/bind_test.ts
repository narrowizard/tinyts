import { AncView, d, v } from '../../core/tinyts';
import { TestModel } from '../model/validator_test';
import { InputView } from '../../control/input';
import { Button } from '../../control/button';

export class BindTestModel extends AncView {

    @d()
    name: string;

    @v(InputView)
    sName: InputView;

    @v(Button)
    btnInject: Button;

    AfterInject() {
        this.name = "narro";
        this.btnInject.OnClick(() => {
            console.log(this.name);
        });
    }


}

var aa = new BindTestModel();