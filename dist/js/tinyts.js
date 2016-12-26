var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tinyts2/control/view", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * View 控件基类
     */
    var View = (function () {
        function View() {
        }
        /**
             * PropertyName 获取属性名
             */
        View.prototype.PropertyName = function () {
            return this.propertyName;
        };
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
                // 绑定成功
                this.propertyName = this.target.attr("data-property");
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
        /**
         * Disable 设置控件为不可用(仅支持disabled属性的元素有效)
         */
        View.prototype.Disable = function () {
            this.target.attr("disabled", "true");
        };
        /**
         * Enable 设置控件为可用(仅支持disabled属性的元素有效)
         */
        View.prototype.Enable = function () {
            this.target.removeAttr("disabled");
        };
        return View;
    }());
    exports.View = View;
});
define("tinyts2/control/text", ["require", "exports", "tinyts2/control/view"], function (require, exports, view_1) {
    "use strict";
    /**
     * TextView 用于文本显示的控件
     * 这里的文本指<tag>文本内容</tag>中的文本内容
     * 所以button也继承自该类
     */
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView() {
            return _super.apply(this, arguments) || this;
        }
        TextView.prototype.Text = function () {
            return this.target.text();
        };
        TextView.prototype.SetText = function (v) {
            this.target.text(v);
        };
        return TextView;
    }(view_1.View));
    exports.TextView = TextView;
});
define("tinyts2/control/button", ["require", "exports", "tinyts2/control/text"], function (require, exports, text_1) {
    "use strict";
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super.apply(this, arguments) || this;
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
});
define("tinyts2/control/list", ["require", "exports", "tinyts2/control/view"], function (require, exports, view_2) {
    "use strict";
    var ListView = (function (_super) {
        __extends(ListView, _super);
        function ListView() {
            return _super.apply(this, arguments) || this;
        }
        /**
         * SetEventHandler 设置事件处理函数
         * @param selector 选择器
         * @param handler 事件处理函数
         * @param event 事件名,默认为click事件
         */
        ListView.prototype.SetEventHandler = function (selector, handler, event) {
            if (!this.eventHandler) {
                this.eventHandler = [];
            }
            this.eventHandler.push({ selector: selector, handler: handler, event: event });
        };
        /**
         * RemoveEventHandler 移除handler,在下一次刷新数据列表时不再绑定
         * @param selector 选择器
         */
        ListView.prototype.RemoveEventHandler = function (selector) {
            var temp = [];
            for (var i = 0; i < this.eventHandler.length; i++) {
                if (this.eventHandler[i].selector != selector) {
                    temp.push(this.eventHandler[i]);
                }
            }
            this.eventHandler = temp;
        };
        /**
         * UnbindEvents 解除绑定的事件,解除已经绑定的事件
         * 注意，使用该方法解除事件后，若刷新数据，事件依然会重新绑定
         * @param selector 选择器
         * @param event 事件名,若不传,则解除所有事件
         */
        ListView.prototype.UnbindEvents = function (selector, event) {
            if (event) {
                this.target.find(selector).off(event);
            }
            else {
                this.target.find(selector).off();
            }
        };
        /**
         * SetData 设置数据
         * @param data 数据
         */
        ListView.prototype.SetData = function (data) {
            if (!data) {
                data = [];
            }
            this.mData = data;
            this.RefreshView();
        };
        /**
         * RefreshView 刷新列表部分视图
         */
        ListView.prototype.RefreshView = function () {
            this.ClearView();
            if (!this.mData) {
                return;
            }
            for (var i = 0; i < this.Count(); i++) {
                this.append(this.GetView(i));
            }
            this.RegisterEvents();
        };
        /**
         * 获取列表中某一个元素的html代码
         * @param index 索引
        */
        ListView.prototype.GetView = function (index) {
            if (!this.getTemplateView) {
                console.error(this.id + "未定义getTemplateView方法");
                return "";
            }
            return this.getTemplateView(index, this.mData[index]);
        };
        ;
        /**
         * 在列表的最后插入元素,请在子类中实现该方法
         * @param viewString 元素的html字符串
         */
        ListView.prototype.append = function (viewString) {
            this.target.append(viewString);
        };
        /**
         * ClearView 清空列表部分视图
         */
        ListView.prototype.ClearView = function () {
            this.target.html("");
        };
        /**
         * RegisterEvents 注册列表子元素的事件
         * 注意，手动调用该方法会在注册事件之前先解除列表原有的所有事件
         */
        ListView.prototype.RegisterEvents = function () {
            if (!this.eventHandler) {
                this.eventHandler = [];
            }
            //解绑事件
            for (var i = 0; i < this.eventHandler.length; i++) {
                this.UnbindEvents(this.eventHandler[i].selector);
            }
            //绑定事件
            for (var i = 0; i < this.eventHandler.length; i++) {
                var targetView = this.target.find(this.eventHandler[i].selector);
                if (this.eventHandler[i].event) {
                    targetView.on(this.eventHandler[i].event, this.eventHandler[i].handler);
                }
                else {
                    targetView.click(this.eventHandler[i].handler);
                }
            }
        };
        /**
         * Count 获取列表长度
         */
        ListView.prototype.Count = function () {
            return this.mData.length;
        };
        /**
         * Add 添加数据，该方法不会刷新整个列表
         * @param model 待添加的数据
         */
        ListView.prototype.Add = function () {
            var model = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                model[_i] = arguments[_i];
            }
            (_a = this.mData).push.apply(_a, model);
            var c = model.length;
            for (var i = 0; i < c; i++) {
                this.append(this.GetView(this.Count() - c + i));
            }
            var _a;
        };
        return ListView;
    }(view_2.View));
    exports.ListView = ListView;
});
define("tinyts2/control/input", ["require", "exports", "tinyts2/control/view"], function (require, exports, view_3) {
    "use strict";
    /**
     * InputView 文本输入控件,作为输入框的基类
     */
    var InputView = (function (_super) {
        __extends(InputView, _super);
        function InputView() {
            return _super.apply(this, arguments) || this;
        }
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
    }(view_3.View));
    exports.InputView = InputView;
});
define("tinyts2/control/choice", ["require", "exports", "tinyts2/control/list"], function (require, exports, list_1) {
    "use strict";
    var ChoiceView = (function (_super) {
        __extends(ChoiceView, _super);
        function ChoiceView() {
            return _super.apply(this, arguments) || this;
        }
        return ChoiceView;
    }(list_1.ListView));
    exports.ChoiceView = ChoiceView;
});
define("tinyts2/control/table", ["require", "exports", "tinyts2/control/list"], function (require, exports, list_2) {
    "use strict";
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table() {
            return _super.apply(this, arguments) || this;
        }
        return Table;
    }(list_2.ListView));
    exports.Table = Table;
});
define("tinyts2/core/tinyts", ["require", "exports"], function (require, exports) {
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
define("tinyts2/model/injector", ["require", "exports", "tinyts2/control/view", "tinyts2/control/input", "tinyts2/control/choice", "tinyts2/control/text", "tinyts2/control/list"], function (require, exports, view_4, input_1, choice_1, text_2, list_3) {
    "use strict";
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
                if (target instanceof view_4.View) {
                    var propName = target.PropertyName();
                    if (propName) {
                        if (target instanceof input_1.InputView || target instanceof choice_1.ChoiceView) {
                            target.Clear();
                        }
                        else if (target instanceof text_2.TextView) {
                            target.SetText("");
                        }
                        else if (target instanceof list_3.ListView) {
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
            if (target instanceof view_4.View) {
                var propName = target.PropertyName();
                if (propName) {
                    var value = model[propName];
                    if (value) {
                        // 注入
                        if (target instanceof input_1.InputView || target instanceof choice_1.ChoiceView) {
                            target.SetValue(value);
                        }
                        else if (target instanceof text_2.TextView) {
                            target.SetText(value);
                        }
                        else if (target instanceof list_3.ListView && $.isArray(value)) {
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
    /**
     * Inject 将context中的control的值注入到model中
     */
    function Inject(context) {
    }
    exports.Inject = Inject;
});
