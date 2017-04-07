import { InputView } from '../../control/input';
import { v, AncView } from '../../core/tinyts';
import { Inject } from '../../model/injector';
import { TestModel } from '../model/validator_test';
import { Button } from '../../control/button';

export class InjectorTestModel extends AncView {

    @v(InputView)
    sName: InputView;

    @v(InputView)
    sPhone: InputView;

    @v(Button)
    btnInject: Button;

    AfterInject() {
        var me = this;
        me.btnInject.OnClick(() => {
            Inject(TestModel, me).then((data) => {
                console.log(data);
            }).catch((errors) => {
                console.log(errors);
            });
        });
    }
}

var aa = new InjectorTestModel();