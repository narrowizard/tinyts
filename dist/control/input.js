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
/**
 * InputView 文本输入控件,作为输入框的基类,重载了TextView中的方法
 * properties
 *      data-accept-button string jquery selector
 */
var InputView = (function (_super) {
    __extends(InputView, _super);
    function InputView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputView.prototype.LoadView = function (parent) {
        var _this = this;
        var succ = _super.prototype.LoadView.call(this, parent);
        if (succ) {
            var acceptSelector = this.target.attr("data-accept-button");
            if (acceptSelector) {
                this.acceptBtn = $(acceptSelector);
            }
            this.On("keypress", function (args) {
                if (args.which == 13) {
                    if (_this.acceptBtn) {
                        if (_this.acceptBtn.prop("disabled")) {
                        }
                        else {
                            _this.acceptBtn.click();
                        }
                    }
                }
            });
        }
        return succ;
    };
    InputView.prototype.SetAcceptButton = function (p) {
        if (typeof p == "string") {
            this.acceptBtn = $(p);
        }
        else if (typeof p == "object") {
            this.acceptBtn = p.GetJQueryInstance();
        }
    };
    InputView.prototype.Value = function () {
        return this.target.val();
    };
    InputView.prototype.SetValue = function (v) {
        this.target.val(v);
        // it causes stack overflow
        // this.Trigger("input");
    };
    /**
     * Clear 清空值
     */
    InputView.prototype.Clear = function () {
        this.target.val("");
    };
    return InputView;
}(text_1.TextView));
exports.InputView = InputView;
