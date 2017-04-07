import { InputView } from './../control/input';
import { ChoiceView } from './../control/choice';
import { TextView } from './../control/text';
import { ListView } from './../control/list';
import { View, ViewG, ViewV } from '../core/view';
import { validate } from 'class-validator';

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
                    if (target instanceof TextView || target instanceof ChoiceView) {
                        target.Clear();
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
                    if (target instanceof TextView || target instanceof ChoiceView) {
                        target.SetValue(value);
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

function InjectWithoutValidate<T>(TClass: { new (...args: any[]): T }, context): T {
    var temp = new TClass();
    for (var property in context) {
        if (property == "context") {
            // 上下文,跳过
            continue;
        }
        var target: Object = context[property];
        if (target instanceof View) {
            if (target instanceof ViewG || target instanceof ViewV) {
                // nest inject
                var tt = InjectWithoutValidate(TClass, target);
                // 合并temp和tt
                temp = $.extend({}, temp, tt);
            }
            var propName = target.PropertyName();
            if (propName) {
                var value;
                if (target instanceof InputView || target instanceof ChoiceView) {
                    value = target.Value();
                } else if (target instanceof ListView) {
                    // 暂时不注入列表数据
                }
                //如果model中存在,优先注入
                if (TClass.prototype.hasOwnProperty(propName)) {
                    temp[propName] = value;
                } else if (value != null) {
                    //注入model中不存在,但是value不为null的值
                    temp[propName] = value;
                }
            }
        }
    }
    return temp;
}

/**
 * Inject 将context中的control的值注入到model中
 */
export function Inject<T>(TClass: { new (...args: any[]): T }, context): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        var data = InjectWithoutValidate(TClass, context);
        var temp = new TClass();
        for (var property in data) {
            temp[property] = data[property];
        }
        // 注入完成,验证
        validate(temp).then((errors) => {
            if (errors.length == 0) {
                // 验证通过
                resolve(temp);
            } else {
                reject(errors);
            }
        });
    });
}
