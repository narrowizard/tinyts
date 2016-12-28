import { B, v } from '../../core/tinyts';
import { View } from '../../control/view';

export class TestModel extends B {

    @v(View)
    text: View;

    RegisterEvents() {
        this.text.Focus();
    }
}