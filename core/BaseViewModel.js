/**
 * ViewModel的基类,该类实现了依赖注入
 */
var BaseViewModel = (function () {
    function BaseViewModel() {
        var Class = this.constructor;
        if (Class["__inject__"]) {
            var result = Object.keys(Class["__inject__"])
                .map(function (propertyName) {
                var temp = { propertyName: "", constructor: null };
                temp.propertyName = propertyName;
                temp.constructor = Class["__inject__"][propertyName];
                return temp;
            });
            for (var _i = 0; _i < result.length; _i++) {
                var injectionPoint = result[_i];
                var temp = new injectionPoint.constructor();
                //如果是View
                if (temp instanceof View) {
                    temp.SetID(injectionPoint.propertyName);
                    temp.LoadView();
                }
                else if (temp instanceof BaseViewModel) {
                }
                this[injectionPoint.propertyName] = temp;
            }
            this.RegisterEvents();
        }
    }
    return BaseViewModel;
})();
//# sourceMappingURL=BaseViewModel.js.map