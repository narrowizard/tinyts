import { AncView, v } from '../../core/tinyts';
import { TestModel } from '../model/validator_test';
import { InputView } from '../../control/input';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';
import { Meta } from '../../core/meta';
import { TextView } from '../../control/text';
import { Length } from 'class-validator'
import { ValidateData } from '../../model/injector';

class DataModel {

    constructor(public Id: number, public Name: string) {

    }
}

class ObjectModel {
    @Length(0, 2)
    name: string;
    listData: DataModel[];
    pos: { x: number, y: number };
    input: string;
}

export class BindTestModel extends AncView {

    data: ObjectModel;

    @v(InputView)
    sName: InputView;

    @v(InputView)
    sPhone: InputView;

    @v(InputView)
    sSubName: InputView;

    @v(InputView)
    sInput: InputView;

    @v(TextView)
    oInput: TextView;

    @v(Button)
    btnInject: Button;

    @v(ListView)
    mList: ListView<DataModel>;

    AfterInject() {
        this.data = {
            name: "narro",
            listData: [new DataModel(2, "bbb")],
            pos: {
                x: 11,
                y: 335
            },
            input: "sth"
        };

        this.data.listData.push(new DataModel(3, "aaa"));

        this.btnInject.OnClick(() => {
            ValidateData(ObjectModel, this.data).then(ot => {
                console.log("validate success");
            }).catch(it => {
                console.log(it);
            });
        });
    }


}

var aa = new BindTestModel();