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
var http_1 = require("./http");
var servicepool_1 = require("./servicepool");
/**
 * injectModel 视图注入模型
 */
var injectModel = (function () {
    function injectModel() {
    }
    return injectModel;
}());
exports.injectModel = injectModel;
/**
 * serviceInjectModel 服务注入模型
 */
var serviceInjectModel = (function () {
    function serviceInjectModel() {
    }
    return serviceInjectModel;
}());
exports.serviceInjectModel = serviceInjectModel;
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
var BindType;
(function (BindType) {
    /**
     * OVONIC 双向绑定
     */
    BindType[BindType["OVONIC"] = 0] = "OVONIC";
    BindType[BindType["MODELTOVIEW"] = 1] = "MODELTOVIEW";
    BindType[BindType["VIEWTOMODEL"] = 2] = "VIEWTOMODEL";
})(BindType || (BindType = {}));
var DataBindExpressionModel = (function () {
    function DataBindExpressionModel(Expression, ViewInstance) {
        this.Expression = Expression;
        this.ViewInstance = ViewInstance;
    }
    return DataBindExpressionModel;
}());
var TreeNode = (function () {
    function TreeNode() {
        this.Child = [];
        this.Views = [];
    }
    /**
     * AddChild 添加子节点,如果子节点已存在且非叶子节点,则合并子节点
     * @param c 子节点
     */
    TreeNode.prototype.AddChild = function (c) {
        // 遍历检查是否已存在
        var count = mx(this.Child).where(function (it) { return it.Expression == c.Expression; }).count();
        if (count == 1) {
            this.CombineChild(c);
        }
        else {
            this.Child.push(c);
        }
    };
    /**
     * CombineChild 合并两个子节点
     */
    TreeNode.prototype.CombineChild = function (c) {
        var child = mx(this.Child).where(function (it) { return it.Expression == c.Expression; }).first();
        if (c.Views.length > 0) {
            // 如果是叶子节点
            for (var i = 0; i < c.Views.length; i++) {
                child.Views.push(c.Views[i]);
            }
        }
        else {
            for (var i = 0; i < c.Child.length; i++) {
                child.AddChild(c.Child[i]);
            }
        }
    };
    /**
     * Resolve 解析字符串数组成TreeNode
     * @param data 字符串数组
     * @param view 绑定的视图,如果存在下一级,则传递下去
     */
    TreeNode.prototype.Resolve = function (data, view, type) {
        if (data.length < 1) {
            return null;
        }
        this.Expression = data[0];
        if (data.length == 1) {
            this.Views.push({ ViewInstance: view, Type: type });
        }
        if (data.length > 1) {
            var temp = (new TreeNode()).Resolve(data.slice(1), view, type);
            if (temp) {
                this.Child.push(temp);
            }
        }
        return this;
    };
    TreeNode.prototype.BuildProxy = function () {
        var _this = this;
        var temp = {};
        if (this.Views.length > 0) {
            // 叶子节点,处理与View的绑定关系
            Object.defineProperty(temp, this.Expression, {
                enumerable: true,
                set: function (value) {
                    _this.Views.forEach(function (v, i, a) {
                        if (v.Type == BindType.OVONIC || v.Type == BindType.MODELTOVIEW) {
                            temp["_" + _this.Expression] = value;
                            v.ViewInstance.SetValue(value);
                        }
                    });
                },
                get: function () {
                    // 返回第一个双向绑定的或者ViewToModel的View的值
                    for (var i = 0; i < _this.Views.length; i++) {
                        if (_this.Views[i].Type == BindType.OVONIC || _this.Views[i].Type == BindType.VIEWTOMODEL) {
                            return _this.Views[i].ViewInstance.Value();
                        }
                    }
                    // 如果不存在View满足条件
                    return temp["_" + _this.Expression];
                }
            });
            // 查找第一个双向绑定或者ViewToModel的View,注册change事件
            for (var i = 0; i < this.Views.length; i++) {
                var temp_view = this.Views[i];
                if (temp_view.ViewInstance && temp_view.Type == BindType.OVONIC || temp_view.Type == BindType.VIEWTOMODEL) {
                    var element = temp_view.ViewInstance.GetJQueryInstance().context;
                    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                        temp_view.ViewInstance.On("compositionend", function () {
                            temp[_this.Expression] = _this.Views[i].ViewInstance.Value();
                        });
                        break;
                    }
                }
            }
        }
        else {
            var child = {};
            // 非叶子节点,直接被覆盖需要处理
            for (var i = 0; i < this.Child.length; i++) {
                Object.defineProperty(child, this.Child[i].Expression, Object.getOwnPropertyDescriptor(this.Child[i].BuildProxy(), this.Child[i].Expression));
            }
            temp["_" + this.Expression] = {};
            Object.defineProperty(temp, this.Expression, {
                enumerable: true,
                set: function (value) {
                    // 在这里setter需要处理子级的getter和setter
                    if (value instanceof Object) {
                        for (var p in value) {
                            if (Object.getOwnPropertyDescriptor(temp["_" + _this.Expression], p)) {
                                // 已存在则赋值
                                temp["_" + _this.Expression][p] = value[p];
                            }
                            else {
                                // 不存在则定义
                                Object.defineProperty(temp["_" + _this.Expression], p, Object.getOwnPropertyDescriptor(value, p));
                            }
                        }
                    }
                },
                get: function () {
                    return temp["_" + _this.Expression];
                }
            });
            temp[this.Expression] = child;
        }
        return temp;
    };
    return TreeNode;
}());
/**
 * View 视图基类
 */
var View = (function () {
    function View() {
    }
    /**
     * Value 获取控件值,请在子类重写此方法
     */
    View.prototype.Value = function () {
        return this.name;
    };
    /**
     * SetValue 设置控件值,请在子类重写此方法
     */
    View.prototype.SetValue = function (value) {
    };
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
    /**
     * IsMultiparted 返回当前视图是否绑定多个元素
     */
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
            this.state = ViewState.LOADFAIL;
            console.warn("[view]" + this.name + " has not set selector!");
            return false;
        }
        var matchedElementLength = this.target.length;
        if (matchedElementLength > 0) {
            this.state = ViewState.LOADSUCC;
            // 绑定成功
            this.propertyName = this.target.attr("data-property");
            this.bindingExpression = this.target.attr("data-bind");
            if (this.bindingExpression) {
                var temp = this.bindingExpression.split(':');
                if (temp[1]) {
                    this.bindType = temp[1].toLowerCase() == "tov" ? BindType.MODELTOVIEW : temp[1].toLowerCase() == "tom" ? BindType.VIEWTOMODEL : BindType.OVONIC;
                }
                else {
                    this.bindType = BindType.OVONIC;
                }
                this.bindings = temp[0].split('.');
            }
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
        var _this = this;
        if (!this.eventList) {
            this.eventList = {};
        }
        var needBind = false;
        // 在注册事件的时候判断该事件是否已存在,如果不存在,则绑定事件
        if (this.eventList[eventName] == null) {
            needBind = true;
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(handler);
        if (needBind && this.target != null) {
            this.target.on(eventName, function (eventObj) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                // 依次调用事件
                for (var i = 0; i < _this.eventList[eventName].length; i++) {
                    (_a = _this.eventList[eventName])[i].apply(_a, [eventObj].concat(args));
                }
                var _a;
            });
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
        if (!this.eventList) {
            return;
        }
        if (eventName) {
            this.eventList[eventName] = [];
        }
        else {
            this.eventList = {};
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
     * HasClass 是否含有目标class
     * @param className class名称
     */
    View.prototype.HasClass = function (className) {
        return this.target.hasClass(className);
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
    View.prototype.DataBindExpression = function () {
        return this.bindingExpression;
    };
    /**
     * DataBind 返回数据绑定第index级属性
     * @param index
     */
    View.prototype.DataBind = function () {
        return this.bindings;
    };
    /**
     * Inject 将@v装饰的属性注入到View中,
     * 当当前视图绑定DOM元素成功,并且是单元素绑定模式时,下一级注入会限制在当前DOM元素之内进行
     */
    View.prototype.Inject = function () {
        var c = this.constructor;
        var injector = {};
        // 处理继承后的注入
        while (c instanceof View.constructor) {
            injector = $.extend(injector, c["__inject__"]);
            c = c["__proto__"];
        }
        var instance = this;
        var dataBindingExpressions = [];
        this.BeforeInject();
        if (injector) {
            for (var i in injector) {
                // 查找构造函数
                var temp = injector[i];
                if (instance instanceof temp["constructor"]) {
                    // 注入视图
                    var views = temp["views"];
                    if (views) {
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
                                // 如果存在data bind expression 
                                if (viewInstance.DataBindExpression()) {
                                    dataBindingExpressions.push(new DataBindExpressionModel(viewInstance.DataBindExpression(), viewInstance));
                                }
                                if (viewInstance instanceof ViewG) {
                                    viewInstance.SetContext(this);
                                }
                                if (viewInstance instanceof ViewV) {
                                    // 默认虚拟视图为耗时操作
                                    (function () {
                                        // 在循环中会出现引用出错的问题,在这里用一个闭包隐藏作用域
                                        var temp = viewInstance;
                                        temp.SetTemplateView().then(function () {
                                            temp.Inject();
                                        });
                                    })();
                                }
                                else {
                                    viewInstance.Inject();
                                }
                            }
                            instance[view.propertyName] = viewInstance;
                        }
                    }
                    // 注入服务
                    var services = temp["services"];
                    if (services) {
                        for (var j = 0; j < services.length; j++) {
                            var service = services[j];
                            instance[service.propertyName] = servicepool_1.ServicePoolInstance.GetService(service.creator);
                        }
                    }
                }
            }
        }
        // views注入完成,根据views生成数据绑定树
        this.ResolveDataBinding(dataBindingExpressions);
        this.AfterInject();
    };
    /**
     * ResolveDataBinding 解析数据绑定模版语法
     * @param bindingExpressions 数据绑定模板 格式为 model1.property1.property2
     */
    View.prototype.ResolveDataBinding = function (bindingExpressions) {
        // 构造一棵数据绑定树
        var root = new TreeNode();
        for (var i = 0; i < bindingExpressions.length; i++) {
            var temp = bindingExpressions[i].Expression.split(':');
            var type;
            if (temp[1]) {
                type = temp[1].toLowerCase() == "tov" ? BindType.MODELTOVIEW : temp[1].toLowerCase() == "tom" ? BindType.VIEWTOMODEL : BindType.OVONIC;
            }
            else {
                type = BindType.OVONIC;
            }
            var segments = temp[0].split('.');
            var node = new TreeNode();
            root.AddChild(node.Resolve(segments, bindingExpressions[i].ViewInstance, type));
        }
        for (var i = 0; i < root.Child.length; i++) {
            Object.defineProperty(this, root.Child[i].Expression, Object.getOwnPropertyDescriptor(root.Child[i].BuildProxy(), root.Child[i].Expression));
        }
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewG.prototype.SetContext = function (context) {
        this.context = context;
    };
    return ViewG;
}(View));
exports.ViewG = ViewG;
/**
 * ViewV 虚拟视图,支持同步跟异步两种模式
 * 同步模式下,html string直接通过GetViewString方法返回
 * 异步模式下
 */
var ViewV = (function (_super) {
    __extends(ViewV, _super);
    function ViewV() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * GetViewString 同步获取模板html,同步模式下实现该方法
     */
    ViewV.prototype.GetViewString = function () {
        return "";
    };
    /**
     * SetTemplateView 设置虚拟视图的html
     */
    ViewV.prototype.SetTemplateView = function () {
        var _this = this;
        var url = this.constructor["__url__"];
        if (url) {
            // 异步获取html
            return http_1.HttpUtils.Get(url).then(function (res) {
                _this.target.html(res.ResponseBody);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                var s = _this.GetViewString();
                if (s == "") {
                    s = _this.viewString;
                }
                _this.target.html(s);
                resolve();
            });
        }
    };
    return ViewV;
}(ViewG));
exports.ViewV = ViewV;
