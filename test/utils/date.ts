import { TsDate } from '../../utils/date';

var assert = require('assert');
describe('Date', function () {
  describe('#fromISO()', function () {

    it('test 2004-05-03T17:30:08+08:00', function () {
      var dateString = "2004-05-03T17:30:08+08:00";
      var date = TsDate.fromISO(dateString);
      assert.equal(date.date.getFullYear(), 2004);
      // month index from 0
      assert.equal(date.date.getMonth(), 5 - 1);
      assert.equal(date.date.getDate(), 3);
      assert.equal(date.date.getHours(), 17);
      assert.equal(date.date.getMinutes(), 30);
      assert.equal(date.date.getSeconds(), 8);
      assert.equal(date.date.getTimezoneOffset(), -8 * 60);
      assert.deepEqual(date.Format("yyyy-MM-dd hh:mm:ss"), "2004-05-03 17:30:08");
    });
  });
});