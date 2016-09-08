var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("controls/view", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * View 控件基类
     */
    var View = (function () {
        function View() {
        }
        /**
         * SetAttr 设置属性,该属性与DOM元素无关
         * @param attrName 属性名
         * @param value 属性值
         */
        View.prototype.SetAttr = function (attrName, value) {
            this.target.data(attrName, value);
        };
        /**
         * Attr 获取属性
         */
        View.prototype.Attr = function (attrName) {
            return this.target.data(attrName);
        };
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
         * @param parent JQuery对象或选择器 父元素,若指定该参数,则元素查找范围限制在父元素内
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
            else {
                console.error("neither selector nor id is set!");
            }
            if (this.target.length > 0) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * GetJQueryInstance 获取jquery对象
         */
        View.prototype.GetJQueryInstance = function () {
            console.warn("jquery instance is deprecated to use.");
            return this.target;
        };
        /**
         * Focus 获取焦点
         */
        View.prototype.Focus = function () {
            this.target.focus();
        };
        /**
         * On 注册控件事件
         * @param eventName:事件名称
         * @param handler: 事件处理函数
         */
        View.prototype.On = function (eventName, handler) {
            if (this.target != null) {
                this.target.on(eventName, handler);
            }
        };
        /**
         * Trigger 触发指定的事件
         * @param eventName 事件名称
         */
        View.prototype.Trigger = function (eventName) {
            this.target.trigger(eventName);
        };
        /**
         * Off 解除绑定事件
         * @param eventName 事件名称
         */
        View.prototype.Off = function (eventName) {
            if (this.target != null) {
                this.target.off(eventName);
            }
        };
        /**
         * AddClass 添加class属性
         * @param className
         * @param selector:该View的子元素选择器
         */
        View.prototype.AddClass = function (className, selector) {
            if (!selector) {
                this.target.addClass(className);
            }
            else {
                this.target.find(selector).addClass(className);
            }
        };
        /**
         * SetClass 移除class
         * @param className
         * @param selector:该View的子元素选择器
         */
        View.prototype.RemoveClass = function (className, selector) {
            if (!selector) {
                this.target.removeClass(className);
            }
            else {
                this.target.find(selector).removeClass(className);
            }
        };
        /**
         * SetStyle 设置style属性
         * @param key css属性名
         * @param value 值
         */
        View.prototype.SetStyle = function (key, value) {
            this.target.css(key, value);
        };
        /**
         * Style 获取值
         * @param key css属性名
         * @param unit 是否需要单位(如px)
         */
        View.prototype.Style = function (key, unit) {
            if (unit === false) {
                return this.target.css(key).replace(/[^-\d\.]/g, '');
            }
            else {
                return this.target.css(key);
            }
        };
        return View;
    }());
    exports.View = View;
});
define("controls/input", ["require", "exports", "controls/view"], function (require, exports, view_1) {
    "use strict";
    /**
     * InputView 文本输入控件,作为输入框的基类
     */
    var InputView = (function (_super) {
        __extends(InputView, _super);
        function InputView() {
            _super.apply(this, arguments);
        }
        /**
         * PropertyName 获取属性名
         */
        InputView.prototype.PropertyName = function () {
            return this.propertyName;
        };
        InputView.prototype.LoadView = function (parent) {
            var succ = _super.prototype.LoadView.call(this);
            if (succ) {
                this.propertyName = this.target.attr("data-property");
            }
            return succ;
        };
        /**
         * Value 取值
         */
        InputView.prototype.Value = function () {
            return this.target.val();
        };
        /**
         * SetValue 设置值
         */
        InputView.prototype.SetValue = function (v) {
            this.target.val(v);
        };
        /**
         * Clear 清空值
         */
        InputView.prototype.Clear = function () {
            this.target.val("");
        };
        return InputView;
    }(view_1.View));
    exports.InputView = InputView;
});
define("controls/list", ["require", "exports", "controls/view"], function (require, exports, view_2) {
    "use strict";
    var ListView = (function (_super) {
        __extends(ListView, _super);
        function ListView() {
            _super.apply(this, arguments);
        }
        return ListView;
    }(view_2.View));
    exports.ListView = ListView;
});
define("controls/text", ["require", "exports", "controls/view"], function (require, exports, view_3) {
    "use strict";
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView() {
            _super.apply(this, arguments);
        }
        return TextView;
    }(view_3.View));
    exports.TextView = TextView;
});
define("core/tinyts", ["require", "exports"], function (require, exports) {
    "use strict";
    var BaseVM = (function () {
        function BaseVM() {
        }
        return BaseVM;
    }());
    exports.BaseVM = BaseVM;
    function v() {
    }
    exports.v = v;
    function p() {
    }
    exports.p = p;
});
