import { AncView, v, s } from '../../core/tinyts';
import { View } from '../../core/view';
import { InputView } from '../../control/input';

var assert = require('assert');
var jsdom = require('jsdom').JSDOM;
var mx = require('../../../libs/multiplex');

var dom = new jsdom(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="testor" data-property="Name"></div>
    <input type="text" id="mInput" data-bind="model.name" />
</body>
</html>`);

global.window = dom.window;
global.document = dom.window.document;
global.mx = mx;

class AnyService {
    GetData() {
        return true;
    }
}

class TestView extends AncView {

    model: {
        name: string
    };

    @v(View)
    testor: View;

    @v(InputView)
    mInput: InputView;

    @s(AnyService)
    service: AnyService;

    AfterInject() {
        this.model.name = "Jaker";
    }
}

describe("Tinyts", function () {
    it('dependency injector', function () {
        var instance = new TestView();
        assert.notEqual(instance.testor, null);
        assert.notEqual(instance.service, null);
        assert.equal(instance.service.GetData(), true);
        assert.deepEqual(instance.mInput.Value(), "Jaker");

        instance.mInput.SetValue("John");
        assert.deepEqual(instance.model.name, "John");
    });
});