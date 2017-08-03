"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../../core/view");
var assert = require('assert');
var jsdom = require('jsdom').JSDOM;
var dom = new jsdom("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Document</title>\n</head>\n<body>\n    <div id=\"testor\"></div>\n</body>\n</html>");
global.window = dom.window;
global.document = dom.window.document;
describe('Core', function () {
    before(function () {
        global.$ = require('jquery');
    });
    it('test view', function () {
        var v = new view_1.View();
        v.SetSelector("#testor");
        assert.equal(v.LoadView(), true);
    });
});
