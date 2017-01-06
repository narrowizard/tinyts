import { Inject } from '../model/injector';
import { View, injectModel, ViewG, ViewState } from './view';

/**
 * AncView 祖先视图,继承该视图指示tinyts托管的内容
 * 关于延迟加载的说明(如果要使用此功能,请务必将AncView绑定到一个container元素)
 * tinyts的异步加载过程会导致页面元素的变化,给用户带来不好的体验
 * 因此需要在加载之前将tinyts托管的部分隐藏,请在container元素上加上style="display:none"
 * tinyts在完成注入后,会去除这个style以显示container的内容
 * 注意:请尽量不要在container上加上display:none意外的style属性,可能会引起不可预知的错误
 */
export class AncView extends View {

    /**
     * AncView 祖先视图,包含注入功能
     * @param selector 祖先试图选择器
     */
    constructor(selector?: string) {
        super();
        // 绑定该视图
        var viewId = this.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
        if (!selector) {
            selector = `#${viewId}`;
        }
        this.SetSelector(selector);
        this.SetName(viewId);
        this.LoadView();
        this.Inject();
        this.Show();
    }

    /**
     * Show 移除style中的display:none
     */
    protected Show() {
        if (this.state == ViewState.LOADSUCC) {
            var style = this.target.attr("style");
            var aa = /display\s*:\s*none;?/;
            style = style.replace(aa, "");
            this.target.attr("style", style);
        }
    }

}

/**
 * v decorator 用于标记一个通过ID绑定的View
 * @param T 目标视图的类型(如果是ViewG,则要求视图实现T的方法,如果是View则不限制)
 * @param c View的构造函数
 * @param selector 选择器
 */
export function v<T>(c: { new (...args: any[]): ViewG<T> | View }, selector?: string) {
    /**
     * 该函数运行在ViewModel上
     * @param target ViewModel实例
     * @param decoratedPropertyName 属性名
     */
    return (target: T, decoratedPropertyName: string) => {
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
