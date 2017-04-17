import { AncView, v } from '../../core/tinyts';
import { TestModel } from '../model/validator_test';
import { InputView } from '../../control/input';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';
import { Meta } from '../../core/meta';

class DataModel {

    constructor(public Id: number, public Name: string) {

    }
}

class ObjectModel {
    name: string;
    listData: DataModel[];
    pos: { x: number, y: number };
}

export class BindTestModel extends AncView {

    data: ObjectModel;

    @v(InputView)
    sName: InputView;

    @v(InputView)
    sPhone: InputView;

    @v(InputView)
    sSubName: InputView;

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
            }
        };

        this.data.listData.push(new DataModel(3, "aaa"));

        this.btnInject.OnClick(() => {
            console.log(this.data.name);
            console.log(this.data.pos.x);
            this.data.name = "foxery";
        });
    }


}

var aa = new BindTestModel();