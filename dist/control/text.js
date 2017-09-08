"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../core/view");
/**
 * TextView 用于文本显示的控件
 * 这里的文本指<tag>文本内容</tag>中的文本内容
 */
var TextView = /** @class */ (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Value 取值
     */
    TextView.prototype.Value = function () {
        return this.target.text();
    };
    /**
     * SetValue 设置值
     */
    TextView.prototype.SetValue = function (v) {
        this.target.text(v);
    };
    /**
     * Clear 清空值
     */
    TextView.prototype.Clear = function () {
        this.target.text("");
    };
    return TextView;
}(view_1.View));
exports.TextView = TextView;
