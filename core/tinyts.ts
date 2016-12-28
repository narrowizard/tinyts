import { View } from '../control/view';
import { Inject } from '../model/injector';
/**
 * B BaseViewModel ViewModel的基类，该类实现了DOM元素的依赖注入
 */
export abstract class B {

    constructor() {
        i(this.constructor, this);
    }

    abstract RegisterEvents();
}

/**
 * v decorator 用于标记一个通过ID绑定的View
 * @param c View的构造函数
 */
export function v(c: { new (...args: any[]): View }) {
    /**
     * 该函数运行在ViewModel上
     * @param target ViewModel实例
     * @param decoratedPropertyName 属性名
     */
    return (target: B, decoratedPropertyName: string) => {
        const targetType: { __inject__?: Object } = target.constructor;
        // 目标viewmodel的名称
        var name = target.constructor.toString().match(/^function\s*([^\s(]+)/)[1];

        if (!targetType.hasOwnProperty(`__inject__`)) {
            targetType[`__inject__`] = {};
        }

        if (!targetType["__inject__"][name]) {
            targetType["__inject__"][name] = {
                constructor: target.constructor
            };
        }

        targetType[`__inject__`][name][decoratedPropertyName] = c;
    };
}

/**
 * decorator 用于标记一个通过ID绑定的ViewGroup
 */
export function p() {

}

/**
 * i inject 注入
 * @param c vm的构造函数
 * @param instance vm实例
 */
function i(c: Function, instance: B) {
    var injector = c["__inject__"];
    if (injector) {
        for (var i in injector) {
            // 查找构造函数
            var temp = injector[i];
            if (instance instanceof temp["constructor"]) {
                for (var injectionPoint in temp) {
                    // 注入
                    if (injectionPoint == "constructor") {
                        continue;
                    }
                    var viewInstance = new temp[injectionPoint]();
                    if (viewInstance instanceof View) {
                        viewInstance.SetID(injectionPoint);
                        viewInstance.LoadView();
                    }
                    instance[injectionPoint] = viewInstance;
                }
            }
        }
    }
    instance.RegisterEvents();
}