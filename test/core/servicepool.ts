import { ServicePoolInstance } from '../../core/servicepool';
var assert = require('assert');

class TestService {

}

describe("Core", () => {
    describe("ServicePool", () => {
        it("should return same service instance when secondly get", () => {
            assert.equal(ServicePoolInstance.GetService(TestService), ServicePoolInstance.GetService(TestService));
        });

    });
});
