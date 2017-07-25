"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./../control/input");
var choice_1 = require("./../control/choice");
var text_1 = require("./../control/text");
var list_1 = require("./../control/list");
var view_1 = require("../core/view");
var class_validator_1 = require("class-validator");
/**
 * Resolve 将model中的数据注入到context中
 * @param context 控件上下文
 * @param model 注入模型,若为null,则清空context中的控件
 */
function Resolve(context, model) {
    if (model == null) {
        // 清空context
        for (var prop in context) {
            var target = context[prop];
            if (target instanceof view_1.View) {
                var propName = target.PropertyName();
                if (propName) {
                    if (target instanceof text_1.TextView || target instanceof choice_1.ChoiceView) {
                        target.Clear();
                    }
                    else if (target instanceof list_1.ListView) {
                        target.SetData([]);
                    }
                    else {
                        console.warn(propName + " clear failed, missing clear method!");
                    }
                }
            }
        }
        return;
    }
    for (var prop in context) {
        var target = context[prop];
        if (target instanceof view_1.View) {
            var propName = target.PropertyName();
            if (propName) {
                var value = model[propName];
                if (value) {
                    // 注入
                    if (target instanceof text_1.TextView || target instanceof choice_1.ChoiceView) {
                        target.SetValue(value);
                    }
                    else if (target instanceof list_1.ListView && $.isArray(value)) {
                        target.SetData(value);
                    }
                    else {
                        console.warn(propName + " resolve failed, control type is mismatching!");
                    }
                }
                else {
                    console.warn(propName + " resolve failed, value invalid!");
                }
            }
        }
    }
}
exports.Resolve = Resolve;
function InjectWithoutValidate(TClass, context) {
    var temp = new TClass();
    for (var property in context) {
        if (property == "context") {
            // 上下文,跳过
            continue;
        }
        var target = context[property];
        if (target instanceof view_1.View) {
            if (target instanceof view_1.ViewG || target instanceof view_1.ViewV) {
                // nest inject
                var tt = InjectWithoutValidate(TClass, target);
                // 合并temp和tt
                temp = $.extend({}, temp, tt);
            }
            var propName = target.PropertyName();
            if (propName) {
                var value;
                if (target instanceof input_1.InputView || target instanceof choice_1.ChoiceView) {
                    value = target.Value();
                }
                else if (target instanceof list_1.ListView) {
                    // 暂时不注入列表数据
                }
                //如果model中存在,优先注入
                if (TClass.prototype.hasOwnProperty(propName)) {
                    temp[propName] = value;
                }
                else if (value != null) {
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
function Inject(TClass, context) {
    return new Promise(function (resolve, reject) {
        var data = InjectWithoutValidate(TClass, context);
        var temp = new TClass();
        for (var property in data) {
            temp[property] = data[property];
        }
        // 注入完成,验证
        class_validator_1.validate(temp).then(function (errors) {
            if (errors.length == 0) {
                // 验证通过
                resolve(temp);
            }
            else {
                reject(errors);
            }
        });
    });
}
exports.Inject = Inject;
function ValidateData(TClass, data) {
    return new Promise(function (resolve, reject) {
        var temp = new TClass();
        for (var property in data) {
            temp[property] = data[property];
        }
        // 注入完成,验证
        class_validator_1.validate(temp).then(function (errors) {
            if (errors.length == 0) {
                // 验证通过
                resolve(temp);
            }
            else {
                reject(errors);
            }
        });
    });
}
exports.ValidateData = ValidateData;
