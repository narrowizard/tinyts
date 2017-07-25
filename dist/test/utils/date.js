"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../../utils/date");
var assert = require('assert');
describe('Date', function () {
    describe('#fromISO()', function () {
        it('should return Now when the param is ignored', function () {
            assert.deepEqual(new Date(), (new date_1.TsDate()).date);
        });
    });
});
