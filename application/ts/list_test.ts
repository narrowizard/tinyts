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

        var data1 = [28, 26, 25, 24, 23, 21, 20, 19, 18, 16];

        var data2 = [1, 2, 3, 4, 5, 6, 7, 8];
        var data3 = mx(data1).join(data2, it => it, it => it, (a, b) => {
            return {
                Id: a
            }
        }).toArray();
        console.log(data3);
    }

}

var aa = new ListModel();