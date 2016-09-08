import { View } from './../control/view';
import { InputView } from './../control/input';
import { ChoiceView } from './../control/choice';
import { TextView } from './../control/text';
import { ListView } from './../control/list';

/**
 * Resolve 将model中的数据注入到context中
 */
export function Resolve(model, context) {
    if (model == null) {
        // 清空context

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
                    if (target instanceof InputView) {
                        target.SetValue(value);
                    } else if (target instanceof ChoiceView) {
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
export function Inject(context): any {

}