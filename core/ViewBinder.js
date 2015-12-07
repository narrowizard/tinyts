var ViewBinder = (function () {
    function ViewBinder() {
    }
    ViewBinder.getInjectionPoints = function (Class) {
        var result = [];
        if (Class.__inject__) {
            result = Object.keys(Class.__inject__)
                .map(function (propertyName) {
                return {
                    propertyName: propertyName,
                    instance: Class.__inject__[propertyName]
                };
            });
        }
        return result;
    };
    ViewBinder.instantiate = function (Class) {
        var instance = new Class();
        for (var _i = 0, _a = this.getInjectionPoints(Class); _i < _a.length; _i++) {
            var injectionPoint = _a[_i];
            injectionPoint.instance.LoadView();
            instance[injectionPoint.propertyName] = injectionPoint.instance;
        }
        instance.RegisterEvents();
        return instance;
    };
    return ViewBinder;
})();
//# sourceMappingURL=ViewBinder.js.map