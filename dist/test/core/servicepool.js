"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var servicepool_1 = require("../../core/servicepool");
var assert = require('assert');
var TestService = /** @class */ (function () {
    function TestService() {
    }
    return TestService;
}());
describe("Core", function () {
    describe("ServicePool", function () {
        it("should return same service instance when secondly get", function () {
            assert.equal(servicepool_1.ServicePoolInstance.GetService(TestService), servicepool_1.ServicePoolInstance.GetService(TestService));
        });
    });
});
