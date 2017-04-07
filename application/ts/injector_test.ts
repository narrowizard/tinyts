import { InputView } from '../../control/input';
import { v, AncView } from '../../core/tinyts';
import { Inject } from '../../model/injector';
import { TestModel } from '../model/validator_test';
import { Button } from '../../control/button';
import { ViewG } from '../../core/view';

class Name2Model extends ViewG<{}>{

    @v(InputView)
    Name2: InputView;
}

class SubModel extends ViewG<{}> {

    @v(Name2Model)
    aaa: Name2Model;

    @v(InputView)
    sSubName: InputView;
}

export class InjectorTestModel extends AncView {

    @v(InputView)
    sName: InputView;

    @v(InputView)
    sPhone: InputView;

    @v(Button)
    btnInject: Button;

    @v(SubModel)
    sub: SubModel;

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