import { v, AncView } from '../../core/tinyts';
import { View, ViewG, ViewV } from '../../core/view';

interface VGContext {
    Log: () => void;
}

class VG extends ViewV<VGContext> {

    @v(View, ".red")
    text: View;

    GetViewString() {
        return `<p class="red">paragraph 1</p>

                <p class="red">askfhafh</p>`;
    }

    AfterInject() {
        this.context.Log();
    }
}

export class TestModel extends AncView {

    @v(VG)
    vg: VG;

    AfterInject() {
        this.vg.text.SetStyle("color", "red");
    }

    Log() {
        console.log("logged!");
    }
}

