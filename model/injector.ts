import { InputView } from './../control/input';
import { ChoiceView } from './../control/choice';
import { TextView } from './../control/text';
import { ListView } from './../control/list';
import { View } from '../core/view';

/**
 * Resolve 将model中的数据注入到context中
 * @param context 控件上下文
 * @param model 注入模型,若为null,则清空context中的控件
 */
export function Resolve(context, model) {
    if (model == null) {
        // 清空context
        for (var prop in context) {
            var target: Object = context[prop];
            if (target instanceof View) {
                var propName = target.PropertyName();
                if (propName) {
                    if (target instanceof InputView || target instanceof ChoiceView) {
                        target.Clear();
                    } else if (target instanceof TextView) {
                        target.SetText("");
                    } else if (target instanceof ListView) {
                        target.SetData([]);
                    } else {
                        console.warn(`${propName} clear failed, missing clear method!`);
                    }
                }
            }
        }
        return;
    }

    for (var prop in context) {
        var target: Object = context[prop];
        if (target instanceof View) {
            var propName = target.PropertyName();
            if (propName) {
                var value = model[propName];
                if (value) {
                    // 注入
                    if (target instanceof InputView || target instanceof ChoiceView) {
                        target.SetValue(value);
                    } else if (target instanceof TextView) {
                        target.SetText(value);
                    } else if (target instanceof ListView && $.isArray(value)) {
                        target.SetData(value);
                    } else {
                        console.warn(`${propName} resolve failed, control type is mismatching!`);
                    }
                } else {
                    console.warn(`${propName} resolve failed, value invalid!`);
                }
            }
        }
    }
}

/**
 * Inject 将context中的control的值注入到model中
 */
export function Inject<T>(context): T {

}