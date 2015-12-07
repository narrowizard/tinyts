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