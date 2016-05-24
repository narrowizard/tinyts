import {View} from '../core/View';
import {InputView} from '../core/InputView';

/**
 * ModelParser 模型注入器
 */
export class ModelInjector extends Object {

    /**
     * InjectModelDistrict 按严格模式注入Model
     * @param context 从context中查找定义了data-property属性的控件,并将值注入到Model中
     * @return 返回注入后的model
     */
    static InjectModelDistrict(context): any {
        var temp = {};
        for (var property in context) {
            var target = context[property];
            if (target instanceof View) {
                var propName = (target as View).GetPropertyName();
                if (propName) {
                    var value;
                    if (target instanceof InputView) {
                        //如果是InputView则增加验证
                        value = (target as InputView).ValidatedValue();
                    } else {
                        value = (target as View).Value();
                    }
                    if (value != null) {
                        temp[propName] = value;
                    }
                }
            }
        }
        return temp;
    }
}