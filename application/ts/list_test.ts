import { ViewV } from '../../core/view';
import { AncView, v, f } from '../../core/tinyts';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';

class DataModel {

    constructor(public Id: number, public Name: string, public ListData: string[]) {

    }
}

export class ListModel extends AncView {

    @v(ListView)
    mList: ListView<DataModel>;

    // constructor(private aa: UserService) {
    //     super();
    // }

    AfterInject() {
        var data: DataModel[] = [];
        data.push(new DataModel(2, "bbb", ["ccc", "dd"]));
        this.mList.SetData(data);
    }

}

var aa = new ListModel();