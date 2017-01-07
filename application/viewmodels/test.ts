import { v, AncView } from '../../core/tinyts';
import { View, ViewG, ViewV } from '../../core/view';
import { VG } from '../views/vg';
import { HttpUtils } from '../../core/http';



export class TestModel extends AncView {

    @v(VG)
    vg: VG;

    constructor() {
        super(".class");
    }

    BeforeInject() {
        HttpUtils.Get("http://10.0.0.12:8124/static/axure/adminserver/index.html");
    }

    AfterInject() {
        this.vg.text.SetStyle("color", "red");
    }

    Log() {
        console.log("logged!");
    }
}

