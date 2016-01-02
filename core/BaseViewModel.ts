/**
 * ViewModel的基类,该类实现了依赖注入
 */
class BaseViewModel implements IViewModel {

    constructor() {
        var Class = this.constructor;
        if (Class["__inject__"]) {
            var result = Object.keys(Class["__inject__"])
                .map((propertyName: string) => {
                    return {
                        propertyName: propertyName,
                        instance: Class["__inject__"][propertyName]
                    }
                });
            for (let injectionPoint of result) {
                injectionPoint.instance.LoadView();
                this[injectionPoint.propertyName] = injectionPoint.instance;
            }
            this.RegisterEvents();
        }
    }

    RegisterEvents() {

    }
}