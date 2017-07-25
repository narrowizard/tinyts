import { TsDate } from '../../utils/date';

var assert = require('assert');
describe('Date', function () {
  describe('#fromISO()', function () {
    it('should return Now when the param is ignored', function () {
      assert.deepEqual(new Date(), (new TsDate()).date);
    });
  });
});