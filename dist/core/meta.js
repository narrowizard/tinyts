"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Meta 实现一个模版语法解析的类
 */
var Meta = /** @class */ (function () {
    function Meta() {
    }
    /**
     * Resolve 解析模版语法,返回嵌入data后的html string
     * @param viewString 模版语法
     * @param model 需要嵌入的data模型
     */
    Meta.Resolve = function (viewString, model) {
        return Mustache.render(viewString, model);
    };
    Meta.Compile = function (viewString) {
        Mustache.parse(viewString);
    };
    return Meta;
}());
exports.Meta = Meta;
