import { Meta } from '../../core/meta';

var assert = require('assert');
describe('Meta', function () {
  describe('#Resolve()', function () {
    it('should return Now when the param is ignored', function () {
      var data = {
        Name: "Peter"
      }
      assert.equal("Hello Peter!", Meta.Resolve("Hello {{Name}}!", data));
    });
  });
});