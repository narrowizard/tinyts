import { View, injectModel } from '../control/view';
import { Inject } from '../model/injector';

/**
 * AncView 祖先视图,继承该视图指示tinyts托管的内容
 */
export class AncView extends View {

    // hooks
    BeforeInject() { }

    AfterInject() { }

    constructor() {
        super();
        // 绑定该视图
        var viewId = this.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
        this.SetSelector(`#${viewId}`);
        this.SetName(viewId);
        this.LoadView();

        this.BeforeInject();
        this.Inject();
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
    return (target: View, decoratedPropertyName: string) => {
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
