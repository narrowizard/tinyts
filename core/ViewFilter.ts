//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中

/**
 * 用于某个控件
 */
function view(Class: { new (...args: any[]): View }) {
    return function inject(target: IViewModel, decoratedPropertyName: string): void {
        const targetType: { __inject__?: Object } = target.constructor;

        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        // temp.SetID(decoratedPropertyName);
        targetType.__inject__[decoratedPropertyName] = Class;
    }
}

/**
 * 用于封装的部分视图
 */
function partialView<T>(Class: { new (...args: any[]): ViewGroup<T> }) {
    return function inject(target: T, decoratedPropertyName: string): void {
        const targetType: { __inject__?: Object } = target.constructor;

        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        targetType.__inject__[decoratedPropertyName] = Class;
    }
}

/**
 * 注入
 * @param Class ViewModel's constructor
 * @param instance ViewModel instance
 */
function inject(Class: Function, instance: IViewModel) {
    if (Class["__inject__"]) {
        var result = Object.keys(Class["__inject__"])
            .map((propertyName: string) => {
                var temp: InjectionPoint = { propertyName: "", constructor: null };
                temp.propertyName = propertyName;
                temp.constructor = Class["__inject__"][propertyName];
                return temp;
            });
        for (let injectionPoint of result) {
            var temp = new injectionPoint.constructor();
            if (temp instanceof VirtualView) {
                temp.SetContext(instance);
            }
            else if (temp instanceof View) {
                //如果是View
                (temp as View).SetID(injectionPoint.propertyName);
                (temp as View).LoadView();
            } else if (temp instanceof ViewGroup) {
                //如果是ViewGroup
                temp.SetContext(instance);
            }

            instance[injectionPoint.propertyName] = temp;
        }
        instance.RegisterEvents();
    }
}

interface InjectionPoint {
    propertyName: string;
    constructor: { new (...args: any[]): any };
}