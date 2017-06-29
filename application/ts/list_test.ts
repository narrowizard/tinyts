import { ViewV } from '../../core/view';
import { AncView, v, f } from '../../core/tinyts';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';
import { Meta } from '../../core/meta';
import { TsDate } from '../../utils/date';

class DataModel {

    constructor(public Id: number, public Name: string, public ListData: string[], public Date: string) {

    }
}

export class ListModel extends AncView {

    data: DataModel[];

    @v(ListView)
    mList: ListView<DataModel>;

    // constructor(private aa: UserService) {
    //     super();
    // }

    AfterInject() {
        var data: DataModel[] = [];
        data.push(new DataModel(2, "bbb", ["ccc", "dd"], "2004-05-03T17:30:08+08:00"));

        console.log(data);
        this.mList.getTemplpateModel = (data) => {
            data.Id = 3;
            return data;
        };

        this.mList.SetData(data);
        console.log(data);

    }

}

var aa = new ListModel();