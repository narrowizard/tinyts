import { View } from '../control/view';
import { Inject } from '../model/injector';
/**
 * B BaseViewModel ViewModel的基类，该类实现了DOM元素的依赖注入
 */
export abstract class B {

    // hooks
    BeforeInject() { }

    AfterInject() { }

    constructor() {
        this.BeforeInject();
        i(this.constructor, this);
        this.AfterInject();
    }


}

/**
 * v decorator 用于标记一个通过ID绑定的View
 * @param c View的构造函数
 * @param selector 选择器
 */
export function v(c: { new (...args: any[]): View }, selector?: string) {
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
        if (!targetType[`__inject__`][name]["views"]) {
            targetType[`__inject__`][name]["views"] = [];
        }

        var temp = new injectModel();
        temp.creator = c;
        temp.propertyName = decoratedPropertyName;
        temp.selector = selector == null ? `#${decoratedPropertyName}` : selector;

        targetType[`__inject__`][name]["views"].push(temp);
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
                var views: injectModel[] = temp["views"];
                for (var j = 0; j < views.length; j++) {
                    var view = views[j];
                    var viewInstance = new view.creator();
                    if (viewInstance instanceof View) {
                        viewInstance.SetSelector(view.selector);
                        viewInstance.SetName(view.propertyName);
                        viewInstance.LoadView();
                    }
                    instance[view.propertyName] = viewInstance;
                }
                break;
            }
        }
    }

}

/**
 * injectModel 注入模型
 */
class injectModel {

    propertyName: string;

    selector: string;

    creator: { new (...args: any[]): View };
}