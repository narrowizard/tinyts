import { View } from '../../core/view';

var assert = require('assert');
var jsdom = require('jsdom').JSDOM;

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
</body>
</html>`);

global.window = dom.window;
global.document = dom.window.document;

describe('Core', function () {

    before(function () {
        global.$ = require('jquery')
    });

    describe('LoadView', function () {

        it('return false when selector not set', function () {
            var v = new View();
            assert.equal(v.LoadView(), false);
        });

        it('return false when selector not found', function () {
            var v = new View();
            v.SetSelector("#not_existed");
            assert.equal(v.LoadView(), false);
        });

        it('return true when selector is right', function () {
            var v = new View();
            v.SetSelector("#testor");
            assert.equal(v.LoadView(), true);
            assert.equal(v.IsMultiparted(), false);

            assert.equal(v.Name(), undefined);
            v.SetName("test_name");
            assert.deepEqual(v.Name(), "test_name");

            assert.deepEqual(v.PropertyName(), "Name");
        });
    });

    describe('Class, Attribute, Style', function () {

        it('add class, remove class, has class', function () {
            var v = new View();
            v.SetSelector("#testor");
            v.LoadView();
            v.AddClass("new-class");
            assert.equal(v.HasClass('new-class'), true);
            v.RemoveClass('new-class');
            assert.equal(v.HasClass('new-class'), false);
        });

        it('set attr, attr, disable, enable', function () {
            var v = new View();
            v.SetSelector("#testor");
            v.LoadView();
            v.SetAttr("key0", "value1");
            assert.deepEqual(v.Attr("key0"), "value1");
            v.Disable();
            assert.deepEqual(v.GetJQueryInstance().attr("disabled"), "disabled");
            v.Enable()
            assert.equal(v.GetJQueryInstance().attr("disabled"), undefined);
        });

        it('set style, style', function () {
            var v = new View();
            v.SetSelector("#testor");
            v.LoadView();
            v.SetStyle("color", "#DFFF00");
            assert.deepEqual(v.Style("color"), "rgb(223, 255, 0)");
            v.SetStyle("font-size", "14px");
            assert.deepEqual(v.Style("font-size"), "14px");
            assert.deepEqual(v.Style("font-size", true), "14px");
            assert.deepEqual(v.Style("font-size", false), "14");
        });


    });



})



