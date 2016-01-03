/**
 * ViewModel的基类,该类实现了依赖注入
 */
class BaseViewModel implements IViewModel {

    constructor() {
        var Class = this.constructor;
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
                //如果是View
                if (temp instanceof View) {
                    temp.SetID(injectionPoint.propertyName);
                    temp.LoadView();
                } else if (temp instanceof BaseViewModel) {

                }

                this[injectionPoint.propertyName] = temp;
            }
            this.RegisterEvents();
        }
    }

    RegisterEvents() {

    }
}