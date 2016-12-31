var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("core/view", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * injectModel 注入模型
     */
    var injectModel = (function () {
        function injectModel() {
        }
        return injectModel;
    }());
    exports.injectModel = injectModel;
    var ViewState;
    (function (ViewState) {
        /**
         * UNLOAD 尚未加载(未调用LoadView)
         */
        ViewState[ViewState["UNLOAD"] = 0] = "UNLOAD";
        /**
         * LOADSUCC 加载成功,这时候可以通过View.IsMultiparted获取该视图是否绑定多个元素
         */
        ViewState[ViewState["LOADSUCC"] = 1] = "LOADSUCC";
        /**
         * LOADFAIL 调用了LoadView,但是加载失败了
         */
        ViewState[ViewState["LOADFAIL"] = 2] = "LOADFAIL";
    })(ViewState = exports.ViewState || (exports.ViewState = {}));
    /**
     * View 视图基类
     */
    var View = (function () {
        function View() {
        }
        /**
         * Name 设置当前视图在viewmodel的属性名
         */
        View.prototype.SetName = function (name) {
            this.name = name;
        };
        /**
         * Name 返回当前视图在viewmodel的属性名
         */
        View.prototype.Name = function () {
            return name;
        };
        View.prototype.IsMultiparted = function () {
            return this.multipart;
        };
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
         * SetSelector 设置视图选择器
         */
        View.prototype.SetSelector = function (selector) {
            this.selector = selector;
        };
        /**
         * LoadView 建立视图与DOM之间的关联关系
         * 初始化视图属性
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
            else {
                console.warn("[view]" + this.name + " has not set selector!");
            }
            var matchedElementLength = this.target.length;
            if (matchedElementLength > 0) {
                this.state = ViewState.LOADSUCC;
                // 绑定成功
                this.propertyName = this.target.attr("data-property");
                if (matchedElementLength > 1) {
                    // 绑定了多个元素
                    this.multipart = true;
                    // 检测每个元素的propertyName是否一致
                    for (var i = 1; i < matchedElementLength; i++) {
                        if (this.propertyName != this.target.eq(i).attr("data-property")) {
                            console.warn("[view]" + this.propertyName + " mismatched the " + i + " element. you cannot use injector with this view any more.");
                            // 不一致,忽略
                            this.propertyName = null;
                            break;
                        }
                    }
                }
                return true;
            }
            else {
                this.state = ViewState.LOADFAIL;
                console.warn("[view]" + this.name + " bind null html element!");
                return false;
            }
        };
        /**
         * GetJQueryInstance 获取jquery对象
         */
        View.prototype.GetJQueryInstance = function () {
            console.warn("[view]jquery instance is deprecated to use.");
            return this.target;
        };
        /**
         * Focus 获取焦点
         */
        View.prototype.Focus = function () {
            this.target.focus();
        };
        /**
         * On 注册视图事件
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
         * @param index optional 当view处于多个dom绑定模式时,指定触发哪个元素的事件,不传则默认触发第一个元素的事件,传-1则触发所有元素的事件.
         */
        View.prototype.Trigger = function (eventName, index) {
            if (this.multipart) {
                if (index == -1) {
                    this.target.trigger(eventName);
                    return;
                }
                if (index == null) {
                    index = 0;
                }
                this.target.eq(index).trigger(eventName);
            }
            else {
                this.target.trigger(eventName);
            }
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
         * RemoveClass 移除class
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
         * Disable 设置视图为不可用(仅支持disabled属性的元素有效)
         */
        View.prototype.Disable = function () {
            this.target.attr("disabled", "true");
        };
        /**
         * Enable 设置视图为可用(仅支持disabled属性的元素有效)
         */
        View.prototype.Enable = function () {
            this.target.removeAttr("disabled");
        };
        /**
         * Inject 将@v装饰的属性注入到View中,
         * 当当前视图绑定DOM元素成功,并且是单元素绑定模式时,下一级注入会限制在当前DOM元素之内进行
         */
        View.prototype.Inject = function () {
            this.BeforeInject();
            var c = this.constructor;
            var instance = this;
            var injector = c["__inject__"];
            if (injector) {
                for (var i in injector) {
                    // 查找构造函数
                    var temp = injector[i];
                    if (instance instanceof temp["constructor"]) {
                        var views = temp["views"];
                        for (var j = 0; j < views.length; j++) {
                            var view = views[j];
                            var viewInstance = new view.creator();
                            if (viewInstance instanceof View) {
                                viewInstance.SetSelector(view.selector);
                                viewInstance.SetName(view.propertyName);
                                // 检测当前视图是否存在,如果不存在,则不限制下一级视图注入时的parent属性
                                if (this.state == ViewState.LOADSUCC && !this.multipart) {
                                    viewInstance.LoadView(this.selector);
                                }
                                else {
                                    viewInstance.LoadView();
                                }
                                if (viewInstance instanceof ViewG) {
                                    viewInstance.SetContext(this);
                                }
                                if (viewInstance instanceof ViewV) {
                                    viewInstance.SetTemplateView();
                                }
                                viewInstance.Inject();
                            }
                            instance[view.propertyName] = viewInstance;
                        }
                        break;
                    }
                }
            }
            this.AfterInject();
        };
        // hooks
        View.prototype.BeforeInject = function () { };
        View.prototype.AfterInject = function () { };
        return View;
    }());
    exports.View = View;
    var ViewG = (function (_super) {
        __extends(ViewG, _super);
        function ViewG() {
            return _super.apply(this, arguments) || this;
        }
        ViewG.prototype.SetContext = function (context) {
            this.context = context;
        };
        return ViewG;
    }(View));
    exports.ViewG = ViewG;
    var ViewV = (function (_super) {
        __extends(ViewV, _super);
        function ViewV() {
            return _super.apply(this, arguments) || this;
        }
        /**
         * SetTemplateView 设置虚拟视图的html string,渲染到DOM中
         */
        ViewV.prototype.SetTemplateView = function () {
            this.target.html(this.GetViewString());
        };
        return ViewV;
    }(ViewG));
    exports.ViewV = ViewV;
});
define("control/input", ["require", "exports", "core/view"], function (require, exports, view_1) {
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
    }(view_1.View));
    exports.InputView = InputView;
});
define("control/list", ["require", "exports", "core/view"], function (require, exports, view_2) {
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
                console.error(this.name + "未定义getTemplateView方法");
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
define("control/choice", ["require", "exports", "control/list"], function (require, exports, list_1) {
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
define("control/text", ["require", "exports", "core/view"], function (require, exports, view_3) {
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
    }(view_3.View));
    exports.TextView = TextView;
});
define("model/injector", ["require", "exports", "control/input", "control/choice", "control/text", "control/list", "core/view"], function (require, exports, input_1, choice_1, text_1, list_2, view_4) {
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
                        else if (target instanceof text_1.TextView) {
                            target.SetText("");
                        }
                        else if (target instanceof list_2.ListView) {
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
                        else if (target instanceof text_1.TextView) {
                            target.SetText(value);
                        }
                        else if (target instanceof list_2.ListView && $.isArray(value)) {
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
define("core/tinyts", ["require", "exports", "core/view"], function (require, exports, view_5) {
    "use strict";
    /**
     * AncView 祖先视图,继承该视图指示tinyts托管的内容
     */
    var AncView = (function (_super) {
        __extends(AncView, _super);
        function AncView() {
            var _this = _super.call(this) || this;
            // 绑定该视图
            var viewId = _this.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
            _this.SetSelector("#" + viewId);
            _this.SetName(viewId);
            _this.LoadView();
            _this.Inject();
            return _this;
        }
        return AncView;
    }(view_5.View));
    exports.AncView = AncView;
    /**
     * v decorator 用于标记一个通过ID绑定的View
     * @param T 目标视图的类型(如果是ViewG,则要求视图实现T的方法,如果是View则不限制)
     * @param c View的构造函数
     * @param selector 选择器
     */
    function v(c, selector) {
        /**
         * 该函数运行在ViewModel上
         * @param target ViewModel实例
         * @param decoratedPropertyName 属性名
         */
        return function (target, decoratedPropertyName) {
            var targetType = target.constructor;
            // 目标viewmodel的名称
            var name = target.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
            if (!targetType.hasOwnProperty("__inject__")) {
                targetType["__inject__"] = {};
            }
            if (!targetType["__inject__"][name]) {
                targetType["__inject__"][name] = {
                    constructor: target.constructor
                };
            }
            if (!targetType["__inject__"][name]["views"]) {
                targetType["__inject__"][name]["views"] = [];
            }
            var temp = new view_5.injectModel();
            temp.creator = c;
            temp.propertyName = decoratedPropertyName;
            temp.selector = selector == null ? "#" + decoratedPropertyName : selector;
            targetType["__inject__"][name]["views"].push(temp);
        };
    }
    exports.v = v;
});
define("application/viewmodels/test", ["require", "exports", "core/tinyts", "core/view"], function (require, exports, tinyts_1, view_6) {
    "use strict";
    var VG = (function (_super) {
        __extends(VG, _super);
        function VG() {
            return _super.apply(this, arguments) || this;
        }
        VG.prototype.GetViewString = function () {
            return "<p class=\"red\">paragraph 1</p>\n\n                <p class=\"red\">askfhafh</p>";
        };
        VG.prototype.AfterInject = function () {
            this.context.Log();
        };
        return VG;
    }(view_6.ViewV));
    __decorate([
        tinyts_1.v(view_6.View, ".red"),
        __metadata("design:type", view_6.View)
    ], VG.prototype, "text", void 0);
    var TestModel = (function (_super) {
        __extends(TestModel, _super);
        function TestModel() {
            return _super.apply(this, arguments) || this;
        }
        TestModel.prototype.AfterInject = function () {
            this.vg.text.SetStyle("color", "red");
        };
        TestModel.prototype.Log = function () {
            console.log("logged!");
        };
        return TestModel;
    }(tinyts_1.AncView));
    __decorate([
        tinyts_1.v(VG),
        __metadata("design:type", VG)
    ], TestModel.prototype, "vg", void 0);
    exports.TestModel = TestModel;
});
