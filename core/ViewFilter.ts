
//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
function view(Class: { new (...args: any[]): View }) {
    return function inject(target: IViewModel, decoratedPropertyName: string): void {
        const targetType: { __inject__?: Object } = target.constructor;

        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        var temp = new Class();
        temp.SetID(decoratedPropertyName);
        targetType.__inject__[decoratedPropertyName] = temp;
    }
}

interface InjectionPoint {
    propertyName: string;
    instance: View;
}