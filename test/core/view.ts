import { View } from '../../core/view';
var assert = require('assert');

describe("Core", () => {
    describe("View", () => {
        it("should load view failed without selector set", () => {
            var v = new View();
            var succ = v.LoadView();
            assert.equal(succ, false);
        });
    });
});

