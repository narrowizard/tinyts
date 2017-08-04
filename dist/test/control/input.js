"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../../control/input");
var button_1 = require("../../control/button");
var assert = require('assert');
describe("InputView", function () {
    it('clear, accept button', function () {
        var b = new button_1.Button();
        b.SetSelector("#mButton");
        b.LoadView();
        b.OnClick(function () {
        });
        b.PerformClick();
        var a = new input_1.InputView();
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
