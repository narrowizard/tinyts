
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

// function ViewModel<T extends IViewModel>(Class: { new (...args: any[]): T }) {
//     console.log("viewmodel's decorator");
//     return function constructor(): T {
//         const instance: T = new Class();
//         for (let injectionPoint of getInjectionPoints(Class)) {
//             injectionPoint.instance.LoadView();
//             instance[injectionPoint.propertyName] = injectionPoint.instance;
//         }
//         instance.RegisterEvents();
//         return instance;
//     }
// }

// function getInjectionPoints<T>(Class: { __inject__?: { [prop: string]: View } }): Array<InjectionPoint> {
//     var result: Array<InjectionPoint> = [];

//     if (Class.__inject__) {
//         result = Object.keys(Class.__inject__)
//             .map((propertyName: string) => {
//                 return {
//                     propertyName: propertyName,
//                     instance: Class.__inject__[propertyName]
//                 }
//             });
//     }

//     return result;
// }

interface InjectionPoint {
    propertyName: string;
    instance: View;
}