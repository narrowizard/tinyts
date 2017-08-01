"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../../core/view");
var assert = require('assert');
describe("Core", function () {
    describe("View", function () {
        it("should load view failed without selector set", function () {
            var v = new view_1.View();
            var succ = v.LoadView();
            assert.equal(succ, false);
        });
    });
});
