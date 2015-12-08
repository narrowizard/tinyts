//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
function view(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        targetType.__inject__[decoratedPropertyName] = new Class(decoratedPropertyName);
    };
}
//# sourceMappingURL=ViewFilter.js.map