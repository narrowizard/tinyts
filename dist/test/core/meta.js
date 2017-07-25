"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = require("../../core/meta");
var assert = require('assert');
describe('Meta', function () {
    describe('#Resolve()', function () {
        it('should return Now when the param is ignored', function () {
            var data = {
                Name: "Peter"
            };
            assert.equal("Hello Peter!", meta_1.Meta.Resolve("Hello {{Name}}!", data));
        });
    });
});
