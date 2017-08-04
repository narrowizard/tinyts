import { AncView, v, s } from '../../core/tinyts';
import { View, ViewV } from '../../core/view';
import { InputView } from '../../control/input';
import { TextView } from '../../control/text';

var assert = require('assert');

class AnyService {
    GetData() {
        return true;
    }
}

interface ViewVTestContext {

}

class ViewVTest extends ViewV<ViewVTestContext>{
    protected viewString = `<p id="mNewPage"></p>`;

    @v(TextView)
    mNewPage: TextView;
}

class TestView extends AncView {

    model: {
        name: string;
    };

    @v(View)
    testor: View;

    @v(InputView)
    mInput: InputView;

    @v(TextView)
    mOutput: TextView;

    @v(ViewVTest)
    mViewV: ViewVTest;

    @s(AnyService)
    service: AnyService;


    AfterInject() {

    }
}

describe("Tinyts", function () {


    it('dependency injector', function () {
        var instance = new TestView();
        assert.notEqual(instance.testor, null);
        assert.notEqual(instance.service, null);
        assert.equal(instance.service.GetData(), true);
    });

    it('data bind', function () {
        var instance = new TestView();
        instance.model.name = "Jaker";
        assert.deepEqual(instance.mInput.Value(), "Jaker");
        assert.deepEqual(instance.mOutput.Value(), "Jaker");
        instance.mInput.SetValue("John");
        assert.deepEqual(instance.model.name, "John");

        // not support 
        // assert.deepEqual(instance.mOutput.Value(), "John");
    });

    it('viewv injector', function () {
        var instance = new TestView();
        assert.notEqual(instance.mViewV, null);
        
        // viewv use promise to set view string
        setTimeout(function () {
            assert.notEqual(instance.mViewV.mNewPage, null);
        }, 1000);
    });

});