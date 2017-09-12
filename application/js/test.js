var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
System.register("application/model/validator_test", ["class-validator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var class_validator_1, TestModel;
    return {
        setters: [
            function (class_validator_1_1) {
                class_validator_1 = class_validator_1_1;
            }
        ],
        execute: function () {
            TestModel = /** @class */ (function () {
                function TestModel() {
                }
                __decorate([
                    class_validator_1.Length(5, 10),
                    __metadata("design:type", String)
                ], TestModel.prototype, "name", void 0);
                __decorate([
                    class_validator_1.IsMobilePhone('zh-CN'),
                    __metadata("design:type", String)
                ], TestModel.prototype, "phone", void 0);
                __decorate([
                    class_validator_1.Length(1, 2),
                    __metadata("design:type", String)
                ], TestModel.prototype, "subname", void 0);
                return TestModel;
            }());
            exports_1("TestModel", TestModel);
        }
    };
});
System.register("application/service/user", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var UserService;
    return {
        setters: [],
        execute: function () {
            UserService = /** @class */ (function () {
                function UserService() {
                }
                UserService.prototype.GetUserInfo = function () {
                    return "narro";
                };
                return UserService;
            }());
            exports_2("UserService", UserService);
        }
    };
});
System.register("core/http", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var UrlComparison, UrlParser, HttpResponse, HttpUtils, Router, routerInstance;
    return {
        setters: [],
        execute: function () {
            UrlComparison = /** @class */ (function () {
                function UrlComparison() {
                }
                return UrlComparison;
            }());
            exports_3("UrlComparison", UrlComparison);
            /**
             * url parser 解析url地址
             */
            UrlParser = /** @class */ (function () {
                function UrlParser() {
                }
                /**
                 * Parse 解析url
                 */
                UrlParser.prototype.Parse = function (url) {
                    this.url = url;
                    this.searchObject = {};
                    var parser = document.createElement('a'), queries, split, i;
                    // Let the browser do the work
                    parser.href = this.url;
                    // Convert query string to object
                    queries = parser.search.replace(/^\?/, '').split('&');
                    for (i = 0; i < queries.length; i++) {
                        split = queries[i].split('=');
                        if (split[0] != "" && split[1]) {
                            var key = split[0];
                            var val = decodeURIComponent(split[1]);
                            if (this.searchObject[key]) {
                                if (Array.isArray(this.searchObject[key])) {
                                    this.searchObject[key].push(val);
                                }
                                else {
                                    var temp = this.searchObject[key];
                                    this.searchObject[key] = [];
                                    this.searchObject[key].push(temp);
                                    this.searchObject[key].push(val);
                                }
                            }
                            else {
                                this.searchObject[key] = val;
                            }
                        }
                    }
                    this.protocol = parser.protocol;
                    this.host = parser.host;
                    this.hostname = parser.hostname;
                    this.port = parser.port;
                    this.pathname = parser.pathname.indexOf("/") == 0 ? parser.pathname : "/" + parser.pathname;
                    this.search = parser.search;
                    this.hash = parser.hash;
                    // 解析pathname
                    this.segments = this.pathname.substr(1).split("/");
                    return this;
                };
                /**
                 * 生成url
                 */
                UrlParser.prototype.Generate = function () {
                    this.search = "?";
                    for (var temp in this.searchObject) {
                        this.search += temp + "=" + this.searchObject[temp] + "&";
                    }
                    this.search = this.search.substr(0, this.search.length - 1);
                    this.url = "";
                    if (this.protocol) {
                        if (!this.protocol.endsWith(":")) {
                            this.protocol += ":";
                        }
                        this.url += this.protocol + "//";
                    }
                    this.url += this.host;
                    if (!isNaN(+this.port)) {
                        this.url += ":" + this.port;
                    }
                    this.url += this.pathname + this.search + this.hash;
                    return this.url;
                };
                /**
                 * CompareUrls 比较url,返回信息
                 */
                UrlParser.CompareUrls = function (url1, url2) {
                    var temp = new UrlComparison();
                    var u1 = new UrlParser();
                    var u2 = new UrlParser();
                    u1.Parse(url1);
                    u2.Parse(url2);
                    temp.Path = u1.pathname.toLowerCase() == u2.pathname.toLocaleLowerCase();
                    temp.Search = u1.search.toLowerCase() == u2.search.toLowerCase();
                    temp.Hash = u1.hash.toLowerCase() == u2.hash.toLowerCase();
                    temp.Host = u1.host.toLowerCase() == u2.host.toLowerCase();
                    if (temp.Hash && temp.Host && temp.Path && temp.Search) {
                        temp.Complete = true;
                    }
                    else {
                        temp.Complete = false;
                    }
                    return temp;
                };
                return UrlParser;
            }());
            exports_3("UrlParser", UrlParser);
            HttpResponse = /** @class */ (function () {
                function HttpResponse() {
                }
                return HttpResponse;
            }());
            exports_3("HttpResponse", HttpResponse);
            HttpUtils = /** @class */ (function () {
                function HttpUtils() {
                }
                /**
                 * Get 异步发送一个http get请求
                 * @param url 请求url地址
                 * @param params 请求参数
                 * @return
                 */
                HttpUtils.Get = function (url, params, otherOptions) {
                    return new Promise(function (resolve, reject) {
                        var baseOptions = {
                            url: url,
                            type: "GET",
                            data: params,
                            success: function (data, textStatus, jqXHR) {
                                var dd = new HttpResponse();
                                dd.ResponseBody = data;
                                dd.HttpStatus = jqXHR.status;
                                dd.jqXHR = jqXHR;
                                resolve(dd);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(jqXHR.status);
                            }
                        };
                        if (otherOptions) {
                            baseOptions = $.extend({}, baseOptions, otherOptions);
                        }
                        $.ajax(baseOptions);
                    });
                };
                /**
                 * Get 异步发送一个http post请求
                 * @param url 请求url地址
                 * @param params 请求参数
                 * @return
                 */
                HttpUtils.Post = function (url, params, otherOptions) {
                    return new Promise(function (resolve, reject) {
                        var baseOptions = {
                            url: url,
                            type: "POST",
                            data: params,
                            success: function (data, textStatus, jqXHR) {
                                var dd = new HttpResponse();
                                dd.ResponseBody = data;
                                dd.HttpStatus = jqXHR.status;
                                dd.jqXHR = jqXHR;
                                resolve(dd);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(jqXHR.status);
                            }
                        };
                        if (otherOptions) {
                            baseOptions = $.extend({}, baseOptions, otherOptions);
                        }
                        $.ajax(baseOptions);
                    });
                };
                return HttpUtils;
            }());
            exports_3("HttpUtils", HttpUtils);
            Router = /** @class */ (function () {
                function Router() {
                    var me = this;
                    window.onpopstate = function (event) {
                        var state = event.state;
                        if (me.context) {
                            me.context.OnRoutePopState(state);
                        }
                    };
                }
                /**
                 * SetContext 设置上下文
                 * @param context.OnRouteSucc 路由完成回调
                 * @param context.OnRouteError 路由错误回调
                 */
                Router.prototype.SetContext = function (context) {
                    this.context = context;
                };
                /**
                 * GoBack 返回上一页
                 */
                Router.prototype.GoBack = function () {
                    window.history.back();
                };
                /**
                 * GoForward 前往下一页
                 */
                Router.prototype.GoForward = function () {
                    window.history.forward();
                };
                /**
                 * GoTo 修改当前url为指定url,并触发context的OnRouteChange事件
                 * @param url 指定url
                 * @param data 可能存在的参数
                 */
                Router.prototype.GoTo = function (url, data, param) {
                    //首先判断路由是否有变化,如果没有变化,则不作跳转
                    var res = UrlParser.CompareUrls(window.location.href, url);
                    if (res.Complete) {
                        return;
                    }
                    var me = this;
                    var stateData = { url: url, data: data, param: param };
                    if (window.history.pushState) {
                        window.history.pushState(stateData, "", url);
                    }
                    if (me.context) {
                        me.context.OnRouteChange(url, data);
                    }
                };
                /**
                 * ReplaceCurrentState 修改当前router的状态(无历史记录)
                 * @param url 指定的url
                 * @param data 当前router的数据
                 */
                Router.prototype.ReplaceCurrentState = function (url, data, param) {
                    var me = this;
                    var stateData = { url: url, data: data, param: param };
                    if (window.history.replaceState) {
                        window.history.replaceState(stateData, "", url);
                    }
                    if (me.context) {
                        me.context.OnRouteChange(url, data);
                    }
                };
                /**
                 * ReplaceCurrentStateWithParam 修改当前router的状态,并将data存储在url中
                 */
                Router.prototype.ReplaceCurrentStateWithParam = function (url, data, changeRoute) {
                    var me = this;
                    // 将data添加到url中
                    var xx = new UrlParser();
                    xx.Parse(url);
                    xx.searchObject = $.extend(xx.searchObject, data);
                    var url2 = xx.Generate();
                    var stateData = { url: url, data: {} };
                    if (window.history.replaceState) {
                        window.history.replaceState(stateData, "", url2);
                    }
                    if (changeRoute && me.context) {
                        me.context.OnRouteChange(url2, stateData);
                    }
                };
                return Router;
            }());
            exports_3("routerInstance", routerInstance = new Router());
        }
    };
});
System.register("core/servicepool", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var ServicePool, ServicePoolInstance;
    return {
        setters: [],
        execute: function () {
            /**
             * ServicePool 服务池
             *
             * 为了解决不同的视图模型(ViewModel)中对Service引用(以及初始化)的繁琐
             * 引入了服务池(ServicePool),服务池是一个单例(Single Instance).
             * 并且已经在引入该文件的时候实例化了这个单例(ServicePoolInstance).
             * methods:
             * GetService(T extends IService):T 得到某个服务的实例
             * ReleaseService 释放服务(未实现)
                * 释放服务应该提供两种接口:
                * 一、手动调用ReleaseService方法释放服务
                * 二、引用某种算法自动释放服务（LRU）
             *
             */
            ServicePool = /** @class */ (function () {
                function ServicePool() {
                    this.instances = {};
                }
                /**
                 * GetService 获取某个服务的实例
                 * @param Class 某服务类的构造函数
                 * @return 该服务实例对象
                 */
                ServicePool.prototype.GetService = function (Class) {
                    var name = Class.prototype.constructor.name;
                    if (!name) {
                        //IE不支持name属性
                        name = Class.toString().match(/^function\s*([^\s(]+)/)[1];
                    }
                    if (this.instances[name]) {
                    }
                    else {
                        this.instances[name] = new Class();
                    }
                    return this.instances[name];
                };
                ServicePool.prototype.ReleaseService = function () {
                };
                return ServicePool;
            }());
            exports_4("ServicePoolInstance", ServicePoolInstance = new ServicePool());
        }
    };
});
System.register("core/view", ["core/http", "core/servicepool"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var http_1, servicepool_1, injectModel, serviceInjectModel, ViewState, BindType, DataBindExpressionModel, TreeNode, View, ViewG, ViewV;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (servicepool_1_1) {
                servicepool_1 = servicepool_1_1;
            }
        ],
        execute: function () {
            /**
             * injectModel 视图注入模型
             */
            injectModel = /** @class */ (function () {
                function injectModel() {
                }
                return injectModel;
            }());
            exports_5("injectModel", injectModel);
            /**
             * serviceInjectModel 服务注入模型
             */
            serviceInjectModel = /** @class */ (function () {
                function serviceInjectModel() {
                }
                return serviceInjectModel;
            }());
            exports_5("serviceInjectModel", serviceInjectModel);
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
            })(ViewState || (ViewState = {}));
            exports_5("ViewState", ViewState);
            (function (BindType) {
                /**
                 * OVONIC 双向绑定
                 */
                BindType[BindType["OVONIC"] = 0] = "OVONIC";
                BindType[BindType["MODELTOVIEW"] = 1] = "MODELTOVIEW";
                BindType[BindType["VIEWTOMODEL"] = 2] = "VIEWTOMODEL";
            })(BindType || (BindType = {}));
            DataBindExpressionModel = /** @class */ (function () {
                function DataBindExpressionModel(Expression, ViewInstance) {
                    this.Expression = Expression;
                    this.ViewInstance = ViewInstance;
                }
                return DataBindExpressionModel;
            }());
            TreeNode = /** @class */ (function () {
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
                                var element = temp_view.ViewInstance.GetJQueryInstance()[0];
                                if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                                    var lock = false;
                                    temp_view.ViewInstance.On("compositionstart", function () {
                                        lock = true;
                                        temp[_this.Expression] = _this.Views[i].ViewInstance.Value();
                                    });
                                    temp_view.ViewInstance.On("compositionend", function () {
                                        lock = false;
                                        temp[_this.Expression] = _this.Views[i].ViewInstance.Value();
                                    });
                                    temp_view.ViewInstance.On("input", function () {
                                        if (!lock) {
                                            temp[_this.Expression] = _this.Views[i].ViewInstance.Value();
                                        }
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
            View = /** @class */ (function () {
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
                    return this.name;
                };
                /**
                 * IsMultiparted 返回当前视图是否绑定多个元素
                 */
                View.prototype.IsMultiparted = function () {
                    if (!this.multipart) {
                        return false;
                    }
                    return this.multipart;
                };
                /**
                 * PropertyName 获取属性名
                 * @returns 属性名
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
                 * @returns 是否绑定成功
                 */
                View.prototype.LoadView = function (parent) {
                    if (this.state != undefined && this.state != ViewState.UNLOAD) {
                        console.warn("it's deprecated to call loadview twice!");
                    }
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
                View.prototype.BindJQueryInstance = function (instance) {
                    this.state = ViewState.LOADSUCC;
                    this.target = instance;
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
                                        var viewInstance = new ((_a = view.creator).bind.apply(_a, [void 0].concat(view.params)))();
                                        if (viewInstance instanceof View) {
                                            viewInstance.SetSelector(view.selector);
                                            viewInstance.SetName(view.propertyName);
                                            // 检测当前视图是否存在,如果不存在,则不限制下一级视图注入时的parent属性
                                            if (this.state == ViewState.LOADSUCC && !this.multipart) {
                                                viewInstance.LoadView(this.target);
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
                    var _a;
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
                /**
                 * BeforeInject 该方法将会在Inject前被调用,请在子类重写改方法以实现hooks
                 */
                View.prototype.BeforeInject = function () { };
                /**
                 * AfterInject 该方法将会在Inject后被调用,请在子类重写改方法以实现hooks
                 */
                View.prototype.AfterInject = function () { };
                return View;
            }());
            exports_5("View", View);
            ViewG = /** @class */ (function (_super) {
                __extends(ViewG, _super);
                function ViewG() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * SetContext 设置ViewG的上下文
                 * @param context 上下文
                 */
                ViewG.prototype.SetContext = function (context) {
                    this.context = context;
                };
                return ViewG;
            }(View));
            exports_5("ViewG", ViewG);
            /**
             * ViewV 虚拟视图,支持同步跟异步两种模式
             * 同步模式下,html string直接通过GetViewString方法返回
             * 异步模式下
             */
            ViewV = /** @class */ (function (_super) {
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
            exports_5("ViewV", ViewV);
        }
    };
});
System.register("control/text", ["core/view"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var view_1, TextView;
    return {
        setters: [
            function (view_1_1) {
                view_1 = view_1_1;
            }
        ],
        execute: function () {
            /**
             * TextView 用于文本显示的控件
             * 这里的文本指<tag>文本内容</tag>中的文本内容
             */
            TextView = /** @class */ (function (_super) {
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
            exports_6("TextView", TextView);
        }
    };
});
System.register("control/button", ["control/text"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var text_1, Button;
    return {
        setters: [
            function (text_1_1) {
                text_1 = text_1_1;
            }
        ],
        execute: function () {
            Button = /** @class */ (function (_super) {
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
            exports_7("Button", Button);
        }
    };
});
System.register("control/input", ["control/text"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var text_2, InputView;
    return {
        setters: [
            function (text_2_1) {
                text_2 = text_2_1;
            }
        ],
        execute: function () {
            /**
             * InputView 文本输入控件,作为输入框的基类,重载了TextView中的方法
             * properties
             *      data-accept-button string jquery selector
             */
            InputView = /** @class */ (function (_super) {
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
            }(text_2.TextView));
            exports_8("InputView", InputView);
        }
    };
});
System.register("core/meta", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Meta;
    return {
        setters: [],
        execute: function () {
            /**
             * Meta 实现一个模版语法解析的类
             */
            Meta = /** @class */ (function () {
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
            exports_9("Meta", Meta);
        }
    };
});
System.register("control/list", ["core/view", "core/meta"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var view_2, meta_1, ArrayProxy, ListView, ListViewV, SubView, PAGEMODE, PageManager;
    return {
        setters: [
            function (view_2_1) {
                view_2 = view_2_1;
            },
            function (meta_1_1) {
                meta_1 = meta_1_1;
            }
        ],
        execute: function () {
            /**
             * ArrayProxy<T> 列表数据操作接口
             */
            ArrayProxy = /** @class */ (function (_super) {
                __extends(ArrayProxy, _super);
                function ArrayProxy(data, context) {
                    var _this = _super.apply(this, data) || this;
                    Object.setPrototypeOf(_this, ArrayProxy.prototype);
                    _this.context = context;
                    return _this;
                }
                ArrayProxy.prototype.push = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i] = arguments[_i];
                    }
                    var res = _super.prototype.push.apply(this, items);
                    this.context.RefreshView();
                    return res;
                };
                ArrayProxy.prototype.pop = function () {
                    var res = _super.prototype.pop.call(this);
                    this.context.RefreshView();
                    return res;
                };
                ArrayProxy.prototype.shift = function () {
                    var res = _super.prototype.shift.call(this);
                    this.context.RefreshView();
                    return res;
                };
                ArrayProxy.prototype.unshift = function () {
                    var items = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        items[_i] = arguments[_i];
                    }
                    var res = _super.prototype.unshift.apply(this, items);
                    this.context.RefreshView();
                    return res;
                };
                ArrayProxy.prototype.reverse = function () {
                    var res = _super.prototype.reverse.call(this);
                    this.context.RefreshView();
                    return res;
                };
                ArrayProxy.prototype.sort = function (compareFn) {
                    var res = _super.prototype.sort.call(this, compareFn);
                    this.context.RefreshView();
                    return res;
                };
                // concat<U extends T[]>(...items: U[]): T[] {
                //     var temp = [];
                //     for (var i = 0; i < this.length; i++) {
                //         temp[i] = this[i];
                //     }
                //     return temp.concat(...items);
                // }
                ArrayProxy.prototype.splice = function (start, deleteCount) {
                    var items = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        items[_i - 2] = arguments[_i];
                    }
                    var temp = [];
                    for (var i = 0; i < this.length; i++) {
                        temp[i] = this[i];
                    }
                    var res = temp.splice.apply(temp, [start, deleteCount].concat(items));
                    this.length = temp.length;
                    for (var i = 0; i < temp.length; i++) {
                        this[i] = temp[i];
                    }
                    this.context.RefreshView();
                    return res;
                };
                return ArrayProxy;
            }(Array));
            exports_10("ArrayProxy", ArrayProxy);
            ListView = /** @class */ (function (_super) {
                __extends(ListView, _super);
                function ListView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ListView.prototype.LoadView = function (parent) {
                    var _this = this;
                    var succ = _super.prototype.LoadView.call(this, parent);
                    this.viewString = [];
                    if (succ) {
                        // 设置模版
                        if (this.multipart) {
                            // 多绑定元素,viewString可能每个都不一样,但是数据是一份一样的
                            this.target.each(function (index, elem) {
                                _this.viewString[index] = _this.getTemplateString($(elem));
                            });
                        }
                        else {
                            // 单元素绑定关系
                            this.viewString.push(this.getTemplateString(this.target));
                        }
                        this.ClearView();
                        // 分页器
                        var pagable = this.target.attr("data-pagable");
                        if (pagable) {
                            this.pageManager = new PageManager();
                            this.pageManager.SetContext(this);
                        }
                        if (pagable == "sync") {
                            this.pageManager.SetPageMode(PAGEMODE.SYNC);
                        }
                        else if (pagable == "async") {
                            this.pageManager.SetPageMode(PAGEMODE.ASYNC);
                        }
                    }
                    return succ;
                };
                ListView.prototype.getTemplateString = function (target) {
                    return target.html();
                };
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
                 * SetData 设置数据,在这里作列表数据代理
                 * @param data 数据
                 */
                ListView.prototype.SetData = function (data) {
                    if (!data) {
                        data = [];
                    }
                    if (this.state != view_2.ViewState.LOADSUCC) {
                        console.error(this.name + " load error!");
                        return;
                    }
                    this.mData = new ArrayProxy(data, this);
                    this.RefreshView();
                };
                /**
                 * GetData returns an array with the copy of data proxy's data
                 */
                ListView.prototype.GetData = function () {
                    if (!this.mData) {
                        return [];
                    }
                    var temp = [];
                    for (var i = 0; i < this.mData.length; i++) {
                        temp.push(this.mData[i]);
                    }
                    return temp;
                };
                ListView.prototype.SetValue = function (data) {
                    this.SetData(data);
                };
                /**
                 * Value returns the array proxy object.
                 */
                ListView.prototype.Value = function () {
                    if (!this.mData) {
                        this.mData = new ArrayProxy([], this);
                    }
                    return this.mData;
                };
                /**
                 * RefreshView 刷新列表部分视图
                 */
                ListView.prototype.RefreshView = function () {
                    this.ClearView();
                    if (!this.mData) {
                        return;
                    }
                    for (var i = 0; i < this.mData.length; i++) {
                        this.createView(i);
                    }
                    this.RegisterEvents();
                };
                /**
                 * 获取列表中某一个元素的html代码
                 * @param dataIndex 数据索引
                 * @param (仅多元素绑定时)元素索引
                */
                ListView.prototype.GetView = function (dataIndex, elemIndex) {
                    var data = $.extend(true, {}, this.mData[dataIndex]);
                    if (this.getTemplpateModel) {
                        data = this.getTemplpateModel(data, dataIndex);
                    }
                    if (elemIndex == null) {
                        elemIndex = 0;
                    }
                    return meta_1.Meta.Resolve(this.viewString[elemIndex], data);
                };
                /**
                 * createView 创建一个视图的html代码,并添加到当前view的最后面
                 * @param index 需要创建的view的索引
                 */
                ListView.prototype.createView = function (index) {
                    var _this = this;
                    if (this.multipart) {
                        this.target.each(function (i, elem) {
                            _this.append(_this.GetView(index, i), i);
                        });
                    }
                    else {
                        this.append(this.GetView(index, 0));
                    }
                };
                /**
                 * [override] append 在视图的最后添加html内容,该方法是为了避免类似table元素这种列表内容并非其直接子元素的情况
                 */
                ListView.prototype.append = function (viewString, elemIndex) {
                    if (this.multipart) {
                        if (elemIndex == null) {
                            elemIndex = 0;
                        }
                        this.target.eq(elemIndex).append(viewString);
                    }
                    else {
                        this.target.append(viewString);
                    }
                };
                /**
                 * [override] GetChildren 获取列表内容的jquery引用
                 */
                ListView.prototype.GetChildren = function () {
                    return this.target.children();
                };
                /**
                 * Traverse 遍历列表(需要保证GetChildren方法有效)
                 * @param handler 遍历函数,返回false表示停止遍历
                 */
                ListView.prototype.Traverse = function (handler) {
                    this.GetChildren().each(function (index, elem) {
                        if (!handler(index, elem)) {
                            return false;
                        }
                    });
                };
                /**
                 * [override] ClearView 清空列表部分视图
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
                 * GetPageManager 获取分页器,仅当data-pagable为sync或async时有效
                 */
                ListView.prototype.GetPageManager = function () {
                    if (!this.pageManager) {
                        console.error("data-pagable has not defined!");
                    }
                    return this.pageManager;
                };
                /**
                 * SetPageSize 设置每页条数,请重写此方法来修改页面上的显示
                 */
                ListView.prototype.SetPageSize = function (pagesize) {
                    this.pageSize = pagesize;
                };
                /**
                 * SetCurPage 设置当前页(用于展示)
                 */
                ListView.prototype.SetCurPage = function (page) {
                };
                /**
                 * SetPageCount 设置总页数(用于展示)
                 */
                ListView.prototype.SetPageCount = function (count) {
                };
                /**
                 * GetPageSize 获取每页条数,请重写此方法以返回用户自定义的值
                 */
                ListView.prototype.GetPageSize = function () {
                    return this.pageSize;
                };
                return ListView;
            }(view_2.View));
            exports_10("ListView", ListView);
            ListViewV = /** @class */ (function (_super) {
                __extends(ListViewV, _super);
                function ListViewV(creator) {
                    var _this = _super.call(this) || this;
                    _this.creator = creator;
                    _this.viewInstances = [];
                    return _this;
                }
                /**
                 * createView 创建一个视图的html代码,并添加到当前view的最后面
                 * @param index 需要创建的view的索引
                 */
                ListViewV.prototype.createView = function (index) {
                    var _this = this;
                    if (this.multipart) {
                        this.target.each(function (i, elem) {
                            _this.append(_this.GetView(index, i), i);
                        });
                    }
                    else {
                        this.append(this.GetView(index, 0));
                        var viewInstance = new this.creator();
                        viewInstance.BindJQueryInstance(this.GetChildren().eq(index));
                        viewInstance.Inject();
                        viewInstance.SetViewData(this.mData[index]);
                        this.viewInstances.push(viewInstance);
                    }
                };
                ListViewV.prototype.GetViewInstance = function (index) {
                    return this.viewInstances[index];
                };
                /**
                 * [override] ClearView 清空列表部分视图
                 */
                ListViewV.prototype.ClearView = function () {
                    this.target.html("");
                    this.viewInstances = [];
                };
                return ListViewV;
            }(ListView));
            exports_10("ListViewV", ListViewV);
            SubView = /** @class */ (function (_super) {
                __extends(SubView, _super);
                function SubView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SubView.prototype.SetViewData = function (data) {
                    this.viewData = data;
                };
                SubView.prototype.ViewData = function () {
                    return this.viewData;
                };
                return SubView;
            }(view_2.View));
            exports_10("SubView", SubView);
            // PAGEMODE 分页模式
            // SYNC 同步分页
            // ASYNC 异步分页
            (function (PAGEMODE) {
                PAGEMODE[PAGEMODE["SYNC"] = 0] = "SYNC";
                PAGEMODE[PAGEMODE["ASYNC"] = 1] = "ASYNC";
            })(PAGEMODE || (PAGEMODE = {}));
            PageManager = /** @class */ (function () {
                /**
                 * @param instance 同步模式时,数据会被设置到该instance
                 */
                function PageManager(instance) {
                    this.curPage = 1;
                }
                /**
                 * SetData 设置数据,当模式为同步分页模式时,可以直接调用该函数将数据交给PageManager
                 * @param data 数据,同时会更新total和pageCount
                 */
                PageManager.prototype.SetData = function (data) {
                    if (!data) {
                        return;
                    }
                    this.mData = data;
                    this.SetRecordCount(this.mData.length);
                };
                /**
                 * SetContext 设置上下文
                 * @param context 数据获取器
                 */
                PageManager.prototype.SetContext = function (context) {
                    this.context = context;
                };
                /**
                 * SetPageMode 设置分页模式
                 * 同步模式时,需要在构造函数中传入目标ListView的实例
                 * 异步模式时,需要设置用于获取异步数据的context
                 * @param mode 分页模式
                 */
                PageManager.prototype.SetPageMode = function (mode) {
                    this.pageMode = mode;
                };
                /**
                 * SetCurPage 强行设置当前页,不跳转
                 * 注意,调用此函数会引起分页器的奔溃,请谨慎使用
                 * @param index 页码
                 */
                PageManager.prototype.ForceSetCurPage = function (index) {
                    this.curPage = index;
                };
                /**
                 * CurPage 获取当前页码
                 */
                PageManager.prototype.CurPage = function () {
                    return this.curPage;
                };
                /**
                 * SetPageSize 设置每页条数
                 * @param pagesize 每页条数
                 */
                PageManager.prototype.SetPageSize = function (pagesize) {
                    this.pageSize = pagesize;
                };
                /**
                 * RecordCount 返回记录总条数,仅在通过SetRecordCount方法设置总条数后才有效
                 */
                PageManager.prototype.RecordCount = function () {
                    return this.total;
                };
                /**
                 * SetRecordCount 设置记录总条数,同时设置pageCount
                 * @param count 记录总数量
                 */
                PageManager.prototype.SetRecordCount = function (count) {
                    this.total = count;
                    this.SetPageCount(Math.ceil(this.total / this.pageSize));
                };
                /**
                 * SetPageCount 设置总页数
                 * @param count 总页数
                 */
                PageManager.prototype.SetPageCount = function (count) {
                    //在列表上展示总页数
                    this.context.SetPageCount(count);
                    this.pageCount = count;
                };
                /**
                 * ResetCurPage 重置当前页为第一页
                 */
                PageManager.prototype.ResetCurPage = function () {
                    this.curPage = 1;
                };
                /**
                 * GetCurPage 获取当前页的数据
                 */
                PageManager.prototype.GetCurPage = function () {
                    //在列表上展示当前页
                    this.context.SetCurPage(this.curPage);
                    //获取每页条数
                    var pagesize = this.context.GetPageSize();
                    if (!pagesize) {
                        console.error("pagesize is wrong!");
                        return;
                    }
                    this.SetPageSize(pagesize);
                    if (this.pageMode == PAGEMODE.SYNC) {
                        //同步分页模式,直接将数据交给ListView
                        this.context.SetData(mx(this.mData).skip((this.curPage - 1) * this.pageSize).take(this.pageSize).toArray());
                    }
                    else if (this.pageMode == PAGEMODE.ASYNC) {
                        if (!this.context) {
                            throw "context has not been set!";
                        }
                        //异步分页模式,请求服务器
                        this.getData(this.curPage, this.pageSize);
                    }
                };
                /**
                 * FirstPage 首页
                 */
                PageManager.prototype.FirstPage = function () {
                    this.curPage = 1;
                    this.GetCurPage();
                };
                /**
                 * PrevPage 上一页
                 */
                PageManager.prototype.PrevPage = function () {
                    if (this.curPage <= 1) {
                        return;
                    }
                    this.curPage--;
                    this.GetCurPage();
                };
                /**
                 * NextPage 下一页
                 */
                PageManager.prototype.NextPage = function () {
                    var nPageSize = this.context.GetPageSize();
                    if (nPageSize >= this.pageSize && this.curPage >= this.pageCount) {
                        return;
                    }
                    this.curPage++;
                    this.GetCurPage();
                };
                /**
                 * LastPage 末页
                 */
                PageManager.prototype.LastPage = function () {
                    if (this.pageCount < 1) {
                        return;
                    }
                    this.curPage = this.pageCount;
                    this.GetCurPage();
                };
                /**
                 * TurnToPage 跳转到某页
                 * @param index 页码
                 */
                PageManager.prototype.TurnToPage = function (index) {
                    var nPageSize = this.context.GetPageSize();
                    if (index < 1 || (nPageSize >= this.pageSize && index > this.pageCount)) {
                        return;
                    }
                    this.curPage = index;
                    this.GetCurPage();
                };
                return PageManager;
            }());
        }
    };
});
System.register("control/choice", ["control/input"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var input_1, ChoiceView;
    return {
        setters: [
            function (input_1_1) {
                input_1 = input_1_1;
            }
        ],
        execute: function () {
            ChoiceView = /** @class */ (function (_super) {
                __extends(ChoiceView, _super);
                function ChoiceView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ChoiceView;
            }(input_1.InputView));
            exports_11("ChoiceView", ChoiceView);
        }
    };
});
System.register("model/injector", ["control/input", "control/choice", "control/text", "control/list", "core/view", "class-validator"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
                if (target instanceof view_3.View) {
                    var propName = target.PropertyName();
                    if (propName) {
                        if (target instanceof text_3.TextView || target instanceof choice_1.ChoiceView) {
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
            if (target instanceof view_3.View) {
                var propName = target.PropertyName();
                if (propName) {
                    var value = model[propName];
                    if (value) {
                        // 注入
                        if (target instanceof text_3.TextView || target instanceof choice_1.ChoiceView) {
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
    exports_12("Resolve", Resolve);
    function InjectWithoutValidate(TClass, context) {
        var temp = new TClass();
        for (var property in context) {
            if (property == "context") {
                // 上下文,跳过
                continue;
            }
            var target = context[property];
            if (target instanceof view_3.View) {
                if (target instanceof view_3.ViewG || target instanceof view_3.ViewV) {
                    // nest inject
                    var tt = InjectWithoutValidate(TClass, target);
                    // 合并temp和tt
                    temp = $.extend({}, temp, tt);
                }
                var propName = target.PropertyName();
                if (propName) {
                    var value;
                    if (target instanceof input_2.InputView || target instanceof choice_1.ChoiceView) {
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
            class_validator_2.validate(temp).then(function (errors) {
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
    exports_12("Inject", Inject);
    function ValidateData(TClass, data) {
        return new Promise(function (resolve, reject) {
            var temp = new TClass();
            for (var property in data) {
                temp[property] = data[property];
            }
            // 注入完成,验证
            class_validator_2.validate(temp).then(function (errors) {
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
    exports_12("ValidateData", ValidateData);
    var input_2, choice_1, text_3, list_1, view_3, class_validator_2;
    return {
        setters: [
            function (input_2_1) {
                input_2 = input_2_1;
            },
            function (choice_1_1) {
                choice_1 = choice_1_1;
            },
            function (text_3_1) {
                text_3 = text_3_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (view_3_1) {
                view_3 = view_3_1;
            },
            function (class_validator_2_1) {
                class_validator_2 = class_validator_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("core/tinyts", ["core/view"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    /**
     * v decorator 用于标记一个通过ID绑定的View
     * @param T 目标视图的类型(如果是ViewG,则要求视图实现T的方法,如果是View则不限制)
     * @param c View的构造函数
     * @param selector 选择器
     */
    function v(c, selector) {
        /**
         * 该函数运行在View上
         * @param target View实例
         * @param decoratedPropertyName 属性名
         */
        return function (target, decoratedPropertyName) {
            var targetType = target.constructor;
            // 目标view的名称
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
            var temp = new view_4.injectModel();
            temp.creator = c;
            temp.propertyName = decoratedPropertyName;
            temp.selector = selector == null ? "#" + decoratedPropertyName : selector;
            targetType["__inject__"][name]["views"].push(temp);
        };
    }
    exports_13("v", v);
    function vlist(c, v, selector) {
        /**
         * 该函数运行在ListViewV上
         * @param target View实例
         * @param decoratedPropertyName 属性名
         */
        return function (target, decoratedPropertyName) {
            var targetType = target.constructor;
            // 目标view的名称
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
            var temp = new view_4.injectModel();
            temp.creator = c;
            temp.propertyName = decoratedPropertyName;
            temp.selector = selector == null ? "#" + decoratedPropertyName : selector;
            temp.params = [];
            temp.params.push(v);
            targetType["__inject__"][name]["views"].push(temp);
        };
    }
    exports_13("vlist", vlist);
    /**
     * f decorator 用于声明虚拟视图的html文件
     * @param url html文件的url地址
     */
    function f(url) {
        /**
         * 该函数运行在ViewV的构造函数上
         * @param constructor ViewV的构造函数
         */
        return function (constructor) {
            constructor["__url__"] = url;
        };
    }
    exports_13("f", f);
    /**
     * 用于声明需要注入的service
     * @param s service的构造函数
     */
    function s(s) {
        /**
         * 该函数运行在View上
         * @param target View实例
         * @param decoratedPropertyName 属性名
         */
        return function (target, decoratedPropertyName) {
            var targetType = target.constructor;
            // 目标view的名称
            var name = target.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
            if (!targetType.hasOwnProperty("__inject__")) {
                targetType["__inject__"] = {};
            }
            if (!targetType["__inject__"][name]) {
                targetType["__inject__"][name] = {
                    constructor: target.constructor
                };
            }
            if (!targetType["__inject__"][name]["services"]) {
                targetType["__inject__"][name]["services"] = [];
            }
            var temp = new view_4.serviceInjectModel();
            temp.creator = s;
            temp.propertyName = decoratedPropertyName;
            targetType["__inject__"][name]["services"].push(temp);
        };
    }
    exports_13("s", s);
    var view_4, AncView;
    return {
        setters: [
            function (view_4_1) {
                view_4 = view_4_1;
            }
        ],
        execute: function () {
            /**
             * AncView 祖先视图,继承该视图指示tinyts托管的内容
             * 关于延迟加载的说明(如果要使用此功能,请务必将AncView绑定到一个container元素)
             * tinyts的异步加载过程会导致页面元素的变化,给用户带来不好的体验
             * 因此需要在加载之前将tinyts托管的部分隐藏,请在container元素上加上style="display:none"
             * tinyts在完成注入后,会去除这个style以显示container的内容
             * 注意:请尽量不要在container上加上display:none以外的style属性,可能会引起不可预知的错误
             */
            AncView = /** @class */ (function (_super) {
                __extends(AncView, _super);
                /**
                 * AncView 祖先视图,包含注入功能
                 * @param selector 祖先试图选择器
                 */
                function AncView(selector) {
                    var _this = _super.call(this) || this;
                    // 绑定该视图
                    var viewId = _this.constructor.toString().match(/^function\s*([^\s(]+)/)[1];
                    if (!selector) {
                        selector = "#" + viewId;
                    }
                    _this.SetSelector(selector);
                    _this.SetName(viewId);
                    _this.LoadView();
                    _this.Inject();
                    _this.Show();
                    return _this;
                }
                /**
                 * Show 移除style中的display:none
                 */
                AncView.prototype.Show = function () {
                    if (this.state == view_4.ViewState.LOADSUCC) {
                        var style = this.target.attr("style");
                        if (!style) {
                            return;
                        }
                        var aa = /display\s*:\s*none;?/;
                        style = style.replace(aa, "");
                        this.target.attr("style", style);
                    }
                };
                return AncView;
            }(view_4.View));
            exports_13("AncView", AncView);
        }
    };
});
System.register("application/ts/bind_test", ["core/tinyts", "control/input", "control/button", "control/list", "control/text", "class-validator", "model/injector"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var tinyts_1, input_3, button_1, list_2, text_4, class_validator_3, injector_1, DataModel, ObjectModel, BindTestModel, aa;
    return {
        setters: [
            function (tinyts_1_1) {
                tinyts_1 = tinyts_1_1;
            },
            function (input_3_1) {
                input_3 = input_3_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (list_2_1) {
                list_2 = list_2_1;
            },
            function (text_4_1) {
                text_4 = text_4_1;
            },
            function (class_validator_3_1) {
                class_validator_3 = class_validator_3_1;
            },
            function (injector_1_1) {
                injector_1 = injector_1_1;
            }
        ],
        execute: function () {
            DataModel = /** @class */ (function () {
                function DataModel(Id, Name) {
                    this.Id = Id;
                    this.Name = Name;
                }
                return DataModel;
            }());
            ObjectModel = /** @class */ (function () {
                function ObjectModel() {
                }
                __decorate([
                    class_validator_3.Length(0, 2),
                    __metadata("design:type", String)
                ], ObjectModel.prototype, "name", void 0);
                return ObjectModel;
            }());
            BindTestModel = /** @class */ (function (_super) {
                __extends(BindTestModel, _super);
                function BindTestModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BindTestModel.prototype.AfterInject = function () {
                    var _this = this;
                    this.data = {
                        name: "narro",
                        listData: [new DataModel(2, "bbb")],
                        pos: {
                            x: 11,
                            y: 335
                        },
                        input: "sth"
                    };
                    // this.data.listData.push(new DataModel(3, "aaa"));
                    this.mList.GetData().push((new DataModel(3, "aaa")));
                    this.btnInject.OnClick(function () {
                        console.log(_this.data);
                        injector_1.ValidateData(ObjectModel, _this.data).then(function (ot) {
                            console.log("validate success");
                        }).catch(function (it) {
                            console.log(it);
                        });
                    });
                };
                __decorate([
                    tinyts_1.v(input_3.InputView),
                    __metadata("design:type", input_3.InputView)
                ], BindTestModel.prototype, "sName", void 0);
                __decorate([
                    tinyts_1.v(text_4.TextView),
                    __metadata("design:type", text_4.TextView)
                ], BindTestModel.prototype, "sOutput", void 0);
                __decorate([
                    tinyts_1.v(input_3.InputView),
                    __metadata("design:type", input_3.InputView)
                ], BindTestModel.prototype, "sPhone", void 0);
                __decorate([
                    tinyts_1.v(input_3.InputView),
                    __metadata("design:type", input_3.InputView)
                ], BindTestModel.prototype, "sSubName", void 0);
                __decorate([
                    tinyts_1.v(input_3.InputView),
                    __metadata("design:type", input_3.InputView)
                ], BindTestModel.prototype, "sInput", void 0);
                __decorate([
                    tinyts_1.v(text_4.TextView),
                    __metadata("design:type", text_4.TextView)
                ], BindTestModel.prototype, "oInput", void 0);
                __decorate([
                    tinyts_1.v(button_1.Button),
                    __metadata("design:type", button_1.Button)
                ], BindTestModel.prototype, "btnInject", void 0);
                __decorate([
                    tinyts_1.v(list_2.ListView),
                    __metadata("design:type", list_2.ListView)
                ], BindTestModel.prototype, "mList", void 0);
                return BindTestModel;
            }(tinyts_1.AncView));
            exports_14("BindTestModel", BindTestModel);
            aa = new BindTestModel();
        }
    };
});
System.register("application/ts/http_test", ["core/http"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var http_2;
    return {
        setters: [
            function (http_2_1) {
                http_2 = http_2_1;
            }
        ],
        execute: function () {
            http_2.HttpUtils.Get("../ts/http_test.ts").then(function (res) {
                console.log(res.HttpStatus);
                console.log(res.ResponseBody);
            }).catch(function (reason) {
                console.log(reason);
            });
        }
    };
});
System.register("application/ts/injector_test", ["control/input", "core/tinyts", "model/injector", "application/model/validator_test", "control/button", "core/view"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var input_4, tinyts_2, injector_2, validator_test_1, button_2, view_5, Name2Model, SubModel, InjectorTestModel, aa;
    return {
        setters: [
            function (input_4_1) {
                input_4 = input_4_1;
            },
            function (tinyts_2_1) {
                tinyts_2 = tinyts_2_1;
            },
            function (injector_2_1) {
                injector_2 = injector_2_1;
            },
            function (validator_test_1_1) {
                validator_test_1 = validator_test_1_1;
            },
            function (button_2_1) {
                button_2 = button_2_1;
            },
            function (view_5_1) {
                view_5 = view_5_1;
            }
        ],
        execute: function () {
            Name2Model = /** @class */ (function (_super) {
                __extends(Name2Model, _super);
                function Name2Model() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    tinyts_2.v(input_4.InputView),
                    __metadata("design:type", input_4.InputView)
                ], Name2Model.prototype, "Name2", void 0);
                return Name2Model;
            }(view_5.ViewG));
            SubModel = /** @class */ (function (_super) {
                __extends(SubModel, _super);
                function SubModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    tinyts_2.v(Name2Model),
                    __metadata("design:type", Name2Model)
                ], SubModel.prototype, "aaa", void 0);
                __decorate([
                    tinyts_2.v(input_4.InputView),
                    __metadata("design:type", input_4.InputView)
                ], SubModel.prototype, "sSubName", void 0);
                return SubModel;
            }(view_5.ViewG));
            InjectorTestModel = /** @class */ (function (_super) {
                __extends(InjectorTestModel, _super);
                function InjectorTestModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                InjectorTestModel.prototype.AfterInject = function () {
                    var me = this;
                    me.btnInject.OnClick(function () {
                        injector_2.Inject(validator_test_1.TestModel, me).then(function (data) {
                            console.log(data);
                        }).catch(function (errors) {
                            console.log(errors);
                        });
                    });
                };
                __decorate([
                    tinyts_2.v(input_4.InputView),
                    __metadata("design:type", input_4.InputView)
                ], InjectorTestModel.prototype, "sName", void 0);
                __decorate([
                    tinyts_2.v(input_4.InputView),
                    __metadata("design:type", input_4.InputView)
                ], InjectorTestModel.prototype, "sPhone", void 0);
                __decorate([
                    tinyts_2.v(button_2.Button),
                    __metadata("design:type", button_2.Button)
                ], InjectorTestModel.prototype, "btnInject", void 0);
                __decorate([
                    tinyts_2.v(SubModel),
                    __metadata("design:type", SubModel)
                ], InjectorTestModel.prototype, "sub", void 0);
                return InjectorTestModel;
            }(tinyts_2.AncView));
            exports_16("InjectorTestModel", InjectorTestModel);
            aa = new InjectorTestModel();
        }
    };
});
System.register("utils/date", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var TsDate;
    return {
        setters: [],
        execute: function () {
            TsDate = /** @class */ (function () {
                function TsDate(dateString) {
                    if (!dateString) {
                        // 获取当前时间
                        this.date = new Date();
                        return this;
                    }
                    var D = new Date('2011-06-02T09:34:29+02:00');
                    if (!D || +D !== 1307000069000) {
                        //不支持ISO格式的js引擎
                        var day, tz, rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/, p = rx.exec(dateString) || [];
                        if (p[1]) {
                            day = p[1].split(/\D/);
                            for (var i = 0, L = day.length; i < L; i++) {
                                day[i] = parseInt(day[i], 10) || 0;
                            }
                            day[1] -= 1;
                            day = new Date(Date.UTC.apply(Date, day));
                            if (!day.getDate())
                                this.date = null;
                            if (p[5]) {
                                tz = (parseInt(p[5], 10) * 60);
                                if (p[6])
                                    tz += parseInt(p[6], 10);
                                if (p[4] == '+')
                                    tz *= -1;
                                if (tz)
                                    day.setUTCMinutes(day.getUTCMinutes() + tz);
                            }
                            this.date = day;
                        }
                        this.date = null;
                    }
                    else {
                        this.date = new Date(dateString);
                    }
                }
                /**
                 * fromISO 由ISO对象生成一个TsDate对象
                 * @param s ISO格式的Date字符串
                 * @return 若参数为空,返回null
                 */
                TsDate.fromISO = function (s) {
                    var temp = new TsDate(s);
                    if (!s) {
                        return null;
                    }
                    return temp;
                };
                /**
                 * Format 按照指定格式格式化Date String
                 * @param fmt 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
                 */
                TsDate.prototype.Format = function (fmt) {
                    var o = {
                        "M+": this.date.getMonth() + 1,
                        "d+": this.date.getDate(),
                        "h+": this.date.getHours(),
                        "m+": this.date.getMinutes(),
                        "s+": this.date.getSeconds(),
                        "q+": Math.floor((this.date.getMonth() + 3) / 3),
                        "S": this.date.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt))
                        fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                };
                return TsDate;
            }());
            exports_17("TsDate", TsDate);
        }
    };
});
System.register("application/ts/list_test", ["core/tinyts", "control/list"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var tinyts_3, list_3, DataModel, ListModel, aa;
    return {
        setters: [
            function (tinyts_3_1) {
                tinyts_3 = tinyts_3_1;
            },
            function (list_3_1) {
                list_3 = list_3_1;
            }
        ],
        execute: function () {
            DataModel = /** @class */ (function () {
                function DataModel(Id, Name, ListData, Date) {
                    this.Id = Id;
                    this.Name = Name;
                    this.ListData = ListData;
                    this.Date = Date;
                }
                return DataModel;
            }());
            ListModel = /** @class */ (function (_super) {
                __extends(ListModel, _super);
                function ListModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // constructor(private aa: UserService) {
                //     super();
                // }
                ListModel.prototype.AfterInject = function () {
                    var data = [];
                    data.push(new DataModel(2, "bbb", ["ccc", "dd"], "2004-05-03T17:30:08+08:00"));
                    console.log(data);
                    this.mList.getTemplpateModel = function (data) {
                        data.Id = 3;
                        return data;
                    };
                    this.mList.SetData(data);
                    console.log(data);
                    var data1 = [28, 26, 25, 24, 23, 21, 20, 19, 18, 16];
                    var data2 = [1, 2, 3, 4, 5, 6, 7, 8];
                    var data3 = mx(data1).join(data2, function (it) { return it; }, function (it) { return it; }, function (a, b) {
                        return {
                            Id: a
                        };
                    }).toArray();
                    console.log(data3);
                };
                __decorate([
                    tinyts_3.v(list_3.ListView),
                    __metadata("design:type", list_3.ListView)
                ], ListModel.prototype, "mList", void 0);
                return ListModel;
            }(tinyts_3.AncView));
            exports_18("ListModel", ListModel);
            aa = new ListModel();
        }
    };
});
System.register("application/ts/listviewv_test", ["core/view", "core/tinyts", "control/list"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var view_6, tinyts_4, list_4, DataModel, ULLI, ListViewVModel, aa;
    return {
        setters: [
            function (view_6_1) {
                view_6 = view_6_1;
            },
            function (tinyts_4_1) {
                tinyts_4 = tinyts_4_1;
            },
            function (list_4_1) {
                list_4 = list_4_1;
            }
        ],
        execute: function () {
            DataModel = /** @class */ (function () {
                function DataModel(Id, Name, ListData, Date) {
                    this.Id = Id;
                    this.Name = Name;
                    this.ListData = ListData;
                    this.Date = Date;
                }
                return DataModel;
            }());
            ULLI = /** @class */ (function (_super) {
                __extends(ULLI, _super);
                function ULLI() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ULLI.prototype.AfterInject = function () {
                    var _this = this;
                    this.li.On("click", function () {
                        alert(_this.viewData.Id);
                    });
                };
                __decorate([
                    tinyts_4.v(view_6.View, ".list-item"),
                    __metadata("design:type", view_6.View)
                ], ULLI.prototype, "li", void 0);
                return ULLI;
            }(list_4.SubView));
            ListViewVModel = /** @class */ (function (_super) {
                __extends(ListViewVModel, _super);
                function ListViewVModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // constructor(private aa: UserService) {
                //     super();
                // }
                ListViewVModel.prototype.AfterInject = function () {
                    var data = [];
                    data.push(new DataModel(1, "a1", ["aa"], "qqq"));
                    data.push(new DataModel(2, "a1", ["aa"], "qqq"));
                    this.mList.SetData(data);
                };
                __decorate([
                    tinyts_4.vlist(list_4.ListViewV, ULLI),
                    __metadata("design:type", list_4.ListViewV)
                ], ListViewVModel.prototype, "mList", void 0);
                return ListViewVModel;
            }(tinyts_4.AncView));
            exports_19("ListViewVModel", ListViewVModel);
            aa = new ListViewVModel();
        }
    };
});
System.register("application/ts/service_test", ["core/tinyts", "application/service/user"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var tinyts_5, user_1, ServiceTestModel, aa;
    return {
        setters: [
            function (tinyts_5_1) {
                tinyts_5 = tinyts_5_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
            ServiceTestModel = /** @class */ (function (_super) {
                __extends(ServiceTestModel, _super);
                function ServiceTestModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ServiceTestModel.prototype.AfterInject = function () {
                    console.log(this.userService.GetUserInfo());
                };
                __decorate([
                    tinyts_5.s(user_1.UserService),
                    __metadata("design:type", user_1.UserService)
                ], ServiceTestModel.prototype, "userService", void 0);
                return ServiceTestModel;
            }(tinyts_5.AncView));
            exports_20("ServiceTestModel", ServiceTestModel);
            aa = new ServiceTestModel();
        }
    };
});
System.register("application/ts/validator_test", ["application/model/validator_test", "class-validator"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var validator_test_2, class_validator_4, ValidatorTestModel, aa;
    return {
        setters: [
            function (validator_test_2_1) {
                validator_test_2 = validator_test_2_1;
            },
            function (class_validator_4_1) {
                class_validator_4 = class_validator_4_1;
            }
        ],
        execute: function () {
            ValidatorTestModel = /** @class */ (function () {
                function ValidatorTestModel() {
                    var aa = new validator_test_2.TestModel();
                    aa.name = "aa1111a";
                    aa.phone = "15958049371";
                    class_validator_4.validate(aa).then(function (errors) {
                        if (errors.length > 0) {
                            console.log("validate error!");
                            console.log(errors);
                        }
                        else {
                            console.log("validate succ!");
                        }
                    });
                }
                return ValidatorTestModel;
            }());
            exports_21("ValidatorTestModel", ValidatorTestModel);
            aa = new ValidatorTestModel();
        }
    };
});
System.register("application/ts/viewv_test", ["core/view", "core/tinyts", "control/button", "control/list"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var view_7, tinyts_6, button_3, list_5, ViewVTest, ViewVTest2, ViewVModel, aa;
    return {
        setters: [
            function (view_7_1) {
                view_7 = view_7_1;
            },
            function (tinyts_6_1) {
                tinyts_6 = tinyts_6_1;
            },
            function (button_3_1) {
                button_3 = button_3_1;
            },
            function (list_5_1) {
                list_5 = list_5_1;
            }
        ],
        execute: function () {
            ViewVTest = /** @class */ (function (_super) {
                __extends(ViewVTest, _super);
                function ViewVTest() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.viewString = "<p></p>";
                    return _this;
                }
                ViewVTest.prototype.AfterInject = function () {
                    this.btnClick.SetText("消失");
                };
                __decorate([
                    tinyts_6.v(button_3.Button),
                    __metadata("design:type", button_3.Button)
                ], ViewVTest.prototype, "btnClick", void 0);
                ViewVTest = __decorate([
                    tinyts_6.f("viewv_v.html")
                ], ViewVTest);
                return ViewVTest;
            }(view_7.ViewV));
            ViewVTest2 = /** @class */ (function (_super) {
                __extends(ViewVTest2, _super);
                function ViewVTest2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.viewString = "<ul id=\"list\" data-property=\"mList\"></ul>";
                    return _this;
                }
                ViewVTest2.prototype.AfterInject = function () {
                    console.log(this.list.PropertyName());
                };
                __decorate([
                    tinyts_6.v(list_5.ListView),
                    __metadata("design:type", list_5.ListView)
                ], ViewVTest2.prototype, "list", void 0);
                return ViewVTest2;
            }(view_7.ViewV));
            exports_22("ViewVTest2", ViewVTest2);
            ViewVModel = /** @class */ (function (_super) {
                __extends(ViewVModel, _super);
                function ViewVModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    tinyts_6.v(ViewVTest),
                    __metadata("design:type", ViewVTest)
                ], ViewVModel.prototype, "v", void 0);
                __decorate([
                    tinyts_6.v(ViewVTest2),
                    __metadata("design:type", ViewVTest2)
                ], ViewVModel.prototype, "c", void 0);
                return ViewVModel;
            }(tinyts_6.AncView));
            exports_22("ViewVModel", ViewVModel);
            aa = new ViewVModel();
        }
    };
});
