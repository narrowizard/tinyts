import { B, v } from '../../core/tinyts';
import { View } from '../../control/view';

export class TestModel extends B {

    @v(View, ".red")
    text: View;

    AfterInject() {
        this.text.SetStyle("color", "red");
    }
}
