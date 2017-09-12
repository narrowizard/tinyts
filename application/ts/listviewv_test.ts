import { ViewV, View } from '../../core/view';
import { AncView, v, f, vlist } from '../../core/tinyts';
import { Button } from '../../control/button';
import { ListView, ListViewV, SubView } from '../../control/list';
import { Meta } from '../../core/meta';
import { TsDate } from '../../utils/date';

class DataModel {

    constructor(public Id: number, public Name: string, public ListData: string[], public Date: string) {

    }
}

class ULLI extends SubView<DataModel> {

    @v(View, ".list-item")
    li: View;

    AfterInject() {
        this.li.On("click", () => {
            alert(this.viewData.Id);
        });
    }
}

export class ListViewVModel extends AncView {

    data: DataModel[];

    @vlist(ListViewV, ULLI)
    mList: ListViewV<DataModel, ULLI>;

    // constructor(private aa: UserService) {
    //     super();
    // }

    AfterInject() {
        var data = [];
        data.push(new DataModel(1, "a1", ["aa"], "qqq"));
        data.push(new DataModel(2, "a1", ["aa"], "qqq"));
        this.mList.SetData(data);
    }

}

var aa = new ListViewVModel();