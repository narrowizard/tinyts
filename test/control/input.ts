import { InputView } from '../../control/input';
import { Button } from '../../control/button';

var assert = require('assert');

describe("InputView", function () {
    it('clear, accept button', function () {
        var b = new Button();
        b.SetSelector("#mButton");
        b.LoadView();
        b.OnClick(() => {

        });
        b.PerformClick();

        var a = new InputView();
        a.SetSelector("#mInputView");
        a.LoadView();

        a.SetAcceptButton("#mButton");
        a.SetAcceptButton(b);
        a.SetValue("some-text");
        assert.deepEqual(a.Value(), "some-text");
        a.Clear();
        assert.deepEqual(a.Value(), "");
    });
});