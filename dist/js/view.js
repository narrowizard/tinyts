define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View() {
        }
        /**
         * SetID 设置控件标识符
         */
        View.prototype.SetID = function (id) {
            this.id = id;
        };
        /**
         * SetSelector 设置控件选择器
         */
        View.prototype.SetSelector = function (selector) {
            this.selector = selector;
        };
        /**
         * LoadView 建立控件与DOM之间的关联关系
         * 初始化控件属性
         * @param parent JQuery对象或选择器 父元素,若指定该参数,则元素查找范围为父元素内
         */
        View.prototype.LoadView = function (parent) {
            // 优先使用selector绑定元素
            if (this.selector) {
                if (parent) {
                    if (typeof parent == "string") {
                        this.target = $(parent).find(this.selector);
                    }
                    else {
                        this.target = parent.find(this.selector);
                    }
                }
                else {
                    this.target = $(this.selector);
                }
            }
            else if (this.id) {
                this.target = $("#" + this.id);
            }
            if (this.target.length > 0) {
                return true;
            }
            else {
                return false;
            }
        };
        return View;
    }());
    exports.View = View;
});
