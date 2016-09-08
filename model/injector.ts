import { View } from './../control/view';

/**
 * Injector 将model中的数据注入到context中
 */
export function Injector(model, context) {
    $.each(context, (index, value) => {
        if (value instanceof View) {
            var propName = value.PropertyName();
        }
    });
}