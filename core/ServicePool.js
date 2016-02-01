var ServicePool = (function () {
    function ServicePool() {
        this.instances = {};
    }
    ServicePool.prototype.GetService = function (Class) {
        var name = Class.prototype.constructor.name;
        if (!name) {
            //IE不支持name属性
            name = Class.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        if (this.instances[name]) {
        }
        else {
            this.instances[name] = new Class();
        }
        return this.instances[name];
    };
    ServicePool.prototype.ReleaseService = function () {
    };
    return ServicePool;
})();
var ServicePoolInstance = new ServicePool();
//# sourceMappingURL=ServicePool.js.map