import { v, AncView } from '../../core/tinyts';
import { View } from '../../control/view';

class VG extends View {

    @v(View, ".red")
    text: View;
}

export class TestModel extends AncView {

    @v(VG)
    vg: VG;

    AfterInject() {
        this.vg.text.SetStyle("color", "red");
    }
}

