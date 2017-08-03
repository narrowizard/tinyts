"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../../core/view");
var assert = require('assert');
var jsdom = require('jsdom').JSDOM;
var dom = new jsdom("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Document</title>\n</head>\n<body>\n    <div id=\"testor\" data-property=\"Name\"></div>\n</body>\n</html>");
global.window = dom.window;
global.document = dom.window.document;
describe('Core', function () {
    before(function () {
        global.$ = require('jquery');
    });
    describe('LoadView', function () {
        it('return false when selector not set', function () {
            var v = new view_1.View();
            assert.equal(v.LoadView(), false);
        });
        it('return false when selector not found', function () {
            var v = new view_1.View();
            v.SetSelector("#not_existed");
            assert.equal(v.LoadView(), false);
        });
        it('return true when selector is right', function () {
            var v = new view_1.View();
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
            var v = new view_1.View();
            v.SetSelector("#testor");
            v.LoadView();
            v.AddClass("new-class");
            assert.equal(v.HasClass('new-class'), true);
            v.RemoveClass('new-class');
            assert.equal(v.HasClass('new-class'), false);
        });
        it('set attr, attr, disable, enable', function () {
            var v = new view_1.View();
            v.SetSelector("#testor");
            v.LoadView();
            v.SetAttr("key0", "value1");
            assert.deepEqual(v.Attr("key0"), "value1");
            v.Disable();
            assert.deepEqual(v.GetJQueryInstance().attr("disabled"), "disabled");
            v.Enable();
            assert.equal(v.GetJQueryInstance().attr("disabled"), undefined);
        });
        it('set style, style', function () {
            var v = new view_1.View();
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
});
