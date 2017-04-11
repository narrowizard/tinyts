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
}

export class BindTestModel extends AncView {

    data: ObjectModel;

    @v(InputView)
    sName: InputView;

    @v(Button)
    btnInject: Button;

    @v(ListView)
    mList: ListView<DataModel>;

    AfterInject() {
        this.data = {
            name: "narro",
            listData: [new DataModel(2, "bbb")]
        };

        this.btnInject.OnClick(() => {
            console.log(this.data.name);
            this.data.name = "foxery";
        });
    }


}

var aa = new BindTestModel();