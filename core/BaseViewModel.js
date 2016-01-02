/**
 * ViewModel的基类,该类实现了依赖注入
 */
var BaseViewModel = (function () {
    function BaseViewModel() {
        var Class = this.constructor;
        if (Class["__inject__"]) {
            var result = Object.keys(Class["__inject__"])
                .map(function (propertyName) {
                return {
                    propertyName: propertyName,
                    instance: Class["__inject__"][propertyName]
                };
            });
            for (var _i = 0; _i < result.length; _i++) {
                var injectionPoint = result[_i];
                injectionPoint.instance.LoadView();
                this[injectionPoint.propertyName] = injectionPoint.instance;
            }
            this.RegisterEvents();
        }
    }
    BaseViewModel.prototype.RegisterEvents = function () {
    };
    return BaseViewModel;
})();
//# sourceMappingURL=BaseViewModel.js.map