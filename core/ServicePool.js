var ServicePool = (function () {
    function ServicePool() {
    }
    ServicePool.prototype.GetService = function (Class) {
        var name = Class.prototype.constructor.name;
        if (this.instances[name]) {
        }
        else {
            this.instances[name] = new Class();
        }
        return this.instances[name];
    };
    return ServicePool;
})();
//# sourceMappingURL=ServicePool.js.map