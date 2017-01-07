import { ViewV, View } from '../../core/view';
import { v } from '../../core/tinyts';

interface VGContext {
    Log: () => void;
}


export class VG extends ViewV<VGContext> {

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