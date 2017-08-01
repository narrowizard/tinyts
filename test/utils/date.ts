import { TsDate } from '../../utils/date';

var assert = require('assert');
describe('Date', function () {
  describe('#fromISO()', function () {

    it('test 2004-05-03T17:30:08+08:00', function () {
      var dateString = "2004-05-03T17:30:08+08:00";
      var date = TsDate.fromISO(dateString);
      assert.equal(date.date.getFullYear(), 2004);
      // month index from 0
      assert.equal(date.date.getUTCMonth(), 5 - 1);
      assert.equal(date.date.getUTCDate(), 3);
      assert.equal(date.date.getUTCHours(), 9);
      assert.equal(date.date.getUTCMinutes(), 30);
      assert.equal(date.date.getUTCSeconds(), 8);
      assert.deepEqual(date.Format("yyyy-MM-dd hh:mm:ss"), "2004-05-03 17:30:08");
    });
  });
});