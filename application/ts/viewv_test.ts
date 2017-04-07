import { ViewV } from '../../core/view';
import { AncView, v, f } from '../../core/tinyts';
import { Button } from '../../control/button';
import { ListView } from '../../control/list';

@f("viewv_v.html")
class ViewVTest extends ViewV<{}> {
    protected viewString = "<p></p>";

    @v(Button)
    btnClick: Button;

    AfterInject() {
        this.btnClick.SetText("消失");
    }
}

export class ViewVTest2 extends ViewV<{}>{

    protected viewString = `<ul id="list" data-property="mList"></ul>`;

    @v(ListView)
    list: ListView<void>;

    AfterInject() {
        console.log(this.list.PropertyName());
    }

}

export class ViewVModel extends AncView {

    @v(ViewVTest)
    v: ViewVTest;

    @v(ViewVTest2)
    c: ViewVTest2;

}

var aa = new ViewVModel();
