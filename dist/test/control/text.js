"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("../../control/text");
var assert = require('assert');
describe("TextView", function () {
    it('clear', function () {
        var a = new text_1.TextView();
        a.SetSelector("#mTextView");
        a.LoadView();
        a.SetValue("some-text");
        assert.deepEqual(a.Value(), "some-text");
        a.Clear();
        assert.deepEqual(a.Value(), "");
    });
});
