//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
/**
 * 用于某个控件
 */
function view(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        // temp.SetID(decoratedPropertyName);
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
/**
 * 用于封装的部分视图
 */
function partialView(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
/**
 * 注入
 * @param Class ViewModel's constructor
 * @param instance ViewModel instance
 */
function inject(Class, instance) {
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
            if (temp instanceof VirtualView) {
                temp.SetContext(instance);
            }
            else if (temp instanceof View) {
                //如果是View
                temp.SetID(injectionPoint.propertyName);
                temp.LoadView();
            }
            else if (temp instanceof ViewGroup) {
                //如果是ViewGroup
                temp.SetContext(instance);
            }
            instance[injectionPoint.propertyName] = temp;
        }
        instance.RegisterEvents();
    }
}
//# sourceMappingURL=ViewFilter.js.map