"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../../utils/date");
var assert = require('assert');
describe('Date', function () {
    describe('#fromISO()', function () {
        it('test 2004-05-03T17:30:08+08:00', function () {
            var dateString = "2004-05-03T17:30:08+08:00";
            var date = date_1.TsDate.fromISO(dateString);
            assert.equal(date.date.getUTCFullYear(), 2004);
            // month index from 0
            assert.equal(date.date.getUTCMonth(), 5 - 1);
            assert.equal(date.date.getUTCDate(), 3);
            assert.equal(date.date.getUTCHours(), 9);
            assert.equal(date.date.getUTCMinutes(), 30);
            assert.equal(date.date.getUTCSeconds(), 8);
            assert.deepEqual(date.Format("yyyy-MM-dd hh:mm:ss"), "2004-05-03 09:30:08");
        });
        it('should return null when fromISO get undefined parameter', function () {
            var date = date_1.TsDate.fromISO(null);
            assert.equal(date, null);
        });
        it('new TsDate() should return current datetime', function () {
            var date = new date_1.TsDate();
            var now = new Date();
            assert.equal(date.date.getFullYear(), now.getUTCFullYear());
            assert.equal(date.date.getUTCMonth(), now.getUTCMonth());
            assert.equal(date.date.getUTCDate(), now.getUTCDate());
        });
    });
});
