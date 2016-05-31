import {View} from '../core/View';
import {InputView} from '../core/InputView';

/**
 * ModelParser 模型注入器
 */
export class ModelInjector {

    /**
     * InjectModelDistrict 按严格模式注入Model,严格模式指最后得到的Model已经经过数据验证
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

    /**
     * InjectModel 注入Model
     * @param context 从context中查找定义了data-property属性的控件,并将值注入到Model中
     * @return 返回注入后的model
     */
    static InjectModel(context): any {
        var temp = {};
        for (var property in context) {
            var target = context[property];
            if (target instanceof View) {
                var propName = (target as View).GetPropertyName();
                if (propName) {
                    var value = (target as View).Value();
                    if (value != null) {
                        temp[propName] = value;
                    }
                }
            }
        }
        return temp;
    }

    /**
     * ResolveModel 解析model,将值注入到控件中
     * @param model 模型
     * @param context 上下文,控件父容器
     */
    static ResolveModel(model, context) {
        for (var property in context) {
            var target = context[property];
            if (target instanceof View) {
                var propName = (target as View).GetPropertyName();
                if (propName) {
                    var value = model[propName];
                    if (value != null) {
                        (target as View).SetValue(value);
                    }
                }
            }
        }
    }

    /**
     * ClearView 清除context中所有View的值
     * @param context 上下文
     */
    static ClearView(context) {
        for (var property in context) {
            var target = context[property];
            if (target instanceof View) {
                (target as View).Clear();
            }
        }
    }
}