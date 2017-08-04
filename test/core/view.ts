import { View } from '../../core/view';

var assert = require('assert');

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
            // view's value return name
            assert.deepEqual(v.Value(), "test_name");
            assert.deepEqual(v.PropertyName(), "Name");
        });

        it('parent, multipart binding', function () {
            var v = new View();
            v.SetSelector(".multi");
            assert.equal(v.LoadView("body"), true);
            assert.equal(v.IsMultiparted(), true);
        });
    });

    describe('Class, Attribute, Style', function () {

        it('add class, remove class, has class', function () {
            var v = new View();
            v.SetSelector("#testor2");
            v.LoadView();

            // child
            var v2 = new View();
            v2.SetSelector("#testor3");
            v2.LoadView();
            v.AddClass("new-class", "#testor3");
            assert.equal(v.HasClass('new-class'), false);
            assert.equal(v2.HasClass('new-class'), true);
            v.RemoveClass("new-class", "#testor3");
            assert.equal(v.HasClass('new-class'), false);
            assert.equal(v2.HasClass('new-class'), false);

            v.AddClass("new-class");
            assert.equal(v.HasClass('new-class'), true);
            assert.equal(v2.HasClass('new-class'), false);
            v.RemoveClass('new-class');
            assert.equal(v.HasClass('new-class'), false);
            assert.equal(v2.HasClass('new-class'), false);

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



