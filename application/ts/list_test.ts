import { ViewV } from '../../core/view';
import { AncView, v, f } from '../../core/tinyts';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';

class DataModel {

    constructor(public Id: number, public Name: string) {

    }
}

export class ListModel extends AncView {

    @v(ListView)
    mList: ListView<DataModel>;

    constructor(private aa: UserService) {
        super();
    }

    AfterInject() {
        var data: DataModel[] = [];
        data.push({});
        data.push(new DataModel(2, "bbb"));
        this.mList.SetData(data);
    }

}
