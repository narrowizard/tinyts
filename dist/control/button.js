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
var text_1 = require("./text");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * OnClick 注册点击事件
     */
    Button.prototype.OnClick = function (handler) {
        this.target.click(handler);
    };
    /**
     * PerformClick 触发button的点击事件
     */
    Button.prototype.PerformClick = function () {
        if (this.target != null) {
            this.target.click();
        }
    };
    return Button;
}(text_1.TextView));
exports.Button = Button;
