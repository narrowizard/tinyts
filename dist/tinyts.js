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
System.register("tinyts/core/http", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UrlComparison, UrlParser, HttpResponse, HttpUtils;
    return {
        setters: [],
        execute: function () {
            UrlComparison = (function () {
                function UrlComparison() {
                }
                return UrlComparison;
            }());
            exports_1("UrlComparison", UrlComparison);
            /**
             * url parser 解析url地址
             */
            UrlParser = (function () {
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
                            this.searchObject[split[0]] = decodeURIComponent(split[1]);
                        }
                    }
                    this.protocol = parser.protocol;
                    this.host = parser.host;
                    this.hostname = parser.hostname;
                    this.port = parser.port;
                    this.pathname = parser.pathname.indexOf("/") == 0 ? parser.pathname : "/" + parser.pathname;
                    this.search = parser.search;
                    this.hash = parser.hash;
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
                        this.url += this.protocol + "//";
                    }
                    this.url += this.host + this.pathname + this.search + this.hash;
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
            exports_1("UrlParser", UrlParser);
            HttpResponse = (function () {
                function HttpResponse() {
                }
                return HttpResponse;
            }());
            exports_1("HttpResponse", HttpResponse);
            HttpUtils = (function () {
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
            exports_1("HttpUtils", HttpUtils);
        }
    };
});
System.register("tinyts/core/view", ["tinyts/core/http"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var http_1, injectModel, ViewState, View, ViewG, ViewV;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            /**
             * injectModel 注入模型
             */
            injectModel = (function () {
                function injectModel() {
                }
                return injectModel;
            }());
            exports_2("injectModel", injectModel);
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
            exports_2("ViewState", ViewState);
            /**
             * View 视图基类
             */
            View = (function () {
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
                    var _this = this;
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
                        if (eventName) {
                            this.eventList[eventName] = [];
                        }
                        else {
                            this.eventList = {};
                        }
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
                    var c = this.constructor;
                    var instance = this;
                    var injector = c["__inject__"];
                    if (injector) {
                        this.BeforeInject();
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
                                break;
                            }
                        }
                        this.AfterInject();
                    }
                };
                // hooks
                View.prototype.BeforeInject = function () { };
                View.prototype.AfterInject = function () { };
                return View;
            }());
            exports_2("View", View);
            ViewG = (function (_super) {
                __extends(ViewG, _super);
                function ViewG() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ViewG.prototype.SetContext = function (context) {
                    this.context = context;
                };
                return ViewG;
            }(View));
            exports_2("ViewG", ViewG);
            /**
             * ViewV 虚拟视图,支持同步跟异步两种模式
             * 同步模式下,html string直接通过GetViewString方法返回
             * 异步模式下
             */
            ViewV = (function (_super) {
                __extends(ViewV, _super);
                function ViewV() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
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
                            _this.target.html(_this.viewString);
                            resolve();
                        });
                    }
                };
                return ViewV;
            }(ViewG));
            exports_2("ViewV", ViewV);
        }
    };
});
System.register("tinyts/control/text", ["tinyts/core/view"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
             * 所以button也继承自该类
             */
            TextView = (function (_super) {
                __extends(TextView, _super);
                function TextView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TextView.prototype.Text = function () {
                    return this.target.text();
                };
                TextView.prototype.SetText = function (v) {
                    this.target.text(v);
                };
                return TextView;
            }(view_1.View));
            exports_3("TextView", TextView);
        }
    };
});
System.register("tinyts/control/button", ["tinyts/control/text"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var text_1, Button;
    return {
        setters: [
            function (text_1_1) {
                text_1 = text_1_1;
            }
        ],
        execute: function () {
            Button = (function (_super) {
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
            exports_4("Button", Button);
        }
    };
});
/**
 * Meta 实现一个模版语法解析的类
 */
System.register("tinyts/core/meta", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Meta;
    return {
        setters: [],
        execute: function () {/**
             * Meta 实现一个模版语法解析的类
             */
            Meta = (function () {
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
            exports_5("Meta", Meta);
        }
    };
});
System.register("tinyts/control/list", ["tinyts/core/view", "tinyts/core/meta"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var view_2, meta_1, ListView;
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
            ListView = (function (_super) {
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
                                _this.viewString[index] = $(elem).html();
                            });
                        }
                        else {
                            // 单元素绑定关系
                            this.viewString.push(this.target.html());
                        }
                    }
                    return succ;
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
                 * SetData 设置数据
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
                    var data = this.mData[dataIndex];
                    if (this.getTemplpateModel) {
                        data = this.getTemplpateModel(data);
                    }
                    if (elemIndex == null) {
                        elemIndex = 0;
                    }
                    return meta_1.Meta.Resolve(this.viewString[elemIndex], data);
                };
                ;
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
                 * Count 获取列表长度
                 */
                ListView.prototype.Count = function () {
                    return this.mData.length;
                };
                /**
                 * Add 添加数据，该方法不会刷新整个列表
                 * @param model 待添加的数据
                 */
                ListView.prototype.AppendItems = function () {
                    var model = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        model[_i] = arguments[_i];
                    }
                    (_a = this.mData).push.apply(_a, model);
                    var _a;
                };
                /**
                 * CheckView 检验当前视图是否与数据一直,如不一致,则刷新不一致的部分
                 */
                ListView.prototype.CheckView = function () {
                    for (var i = 0; i < this.mData.length; i++) {
                        var t = this.GetChildren().eq(i).html();
                    }
                };
                return ListView;
            }(view_2.View));
            exports_6("ListView", ListView);
        }
    };
});
System.register("tinyts/control/input", ["tinyts/core/view"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var view_3, InputView;
    return {
        setters: [
            function (view_3_1) {
                view_3 = view_3_1;
            }
        ],
        execute: function () {
            /**
             * InputView 文本输入控件,作为输入框的基类
             */
            InputView = (function (_super) {
                __extends(InputView, _super);
                function InputView() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports_7("InputView", InputView);
        }
    };
});
System.register("tinyts/control/choice", ["tinyts/control/list"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var list_1, ChoiceView;
    return {
        setters: [
            function (list_1_1) {
                list_1 = list_1_1;
            }
        ],
        execute: function () {
            ChoiceView = (function (_super) {
                __extends(ChoiceView, _super);
                function ChoiceView() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ChoiceView;
            }(list_1.ListView));
            exports_8("ChoiceView", ChoiceView);
        }
    };
});
System.register("tinyts/control/table", ["tinyts/control/list"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var list_2, Table;
    return {
        setters: [
            function (list_2_1) {
                list_2 = list_2_1;
            }
        ],
        execute: function () {
            Table = (function (_super) {
                __extends(Table, _super);
                function Table() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Table;
            }(list_2.ListView));
            exports_9("Table", Table);
        }
    };
});
System.register("tinyts/core/container", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var ValueContainer;
    return {
        setters: [],
        execute: function () {
            /**
             * ValueContainer 依赖注入容器
             */
            ValueContainer = (function () {
                function ValueContainer() {
                }
                /**
                 * RegisterViewContainer 注册View容器
                 * @param name View名称
                 * @param constructor View的构造函数
                 */
                ValueContainer.prototype.RegisterViewContainer = function (name, constructor) {
                    if (ValueContainer.viewContainer[name]) {
                        console.warn(name + " already registed!");
                        return;
                    }
                    ValueContainer.viewContainer[name] = constructor;
                };
                /**
                 * GetView 根据View名称获取View对象
                 * @param viewName View名称
                 */
                ValueContainer.prototype.GetView = function (viewName) {
                    var constructor = ValueContainer.viewContainer[viewName];
                    if (constructor != null) {
                        return new constructor();
                    }
                };
                return ValueContainer;
            }());
            exports_10("ValueContainer", ValueContainer);
        }
    };
});
System.register("tinyts/model/injector", ["tinyts/control/input", "tinyts/control/choice", "tinyts/control/text", "tinyts/control/list", "tinyts/core/view"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
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
    exports_11("Resolve", Resolve);
    /**
     * Inject 将context中的control的值注入到model中
     */
    function Inject(context) {
    }
    exports_11("Inject", Inject);
    var input_1, choice_1, text_2, list_3, view_4;
    return {
        setters: [
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (choice_1_1) {
                choice_1 = choice_1_1;
            },
            function (text_2_1) {
                text_2 = text_2_1;
            },
            function (list_3_1) {
                list_3 = list_3_1;
            },
            function (view_4_1) {
                view_4 = view_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("tinyts/core/tinyts", ["tinyts/core/view"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
    exports_12("v", v);
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
    exports_12("f", f);
    var view_5, AncView;
    return {
        setters: [
            function (view_5_1) {
                view_5 = view_5_1;
            }
        ],
        execute: function () {
            /**
             * AncView 祖先视图,继承该视图指示tinyts托管的内容
             * 关于延迟加载的说明(如果要使用此功能,请务必将AncView绑定到一个container元素)
             * tinyts的异步加载过程会导致页面元素的变化,给用户带来不好的体验
             * 因此需要在加载之前将tinyts托管的部分隐藏,请在container元素上加上style="display:none"
             * tinyts在完成注入后,会去除这个style以显示container的内容
             * 注意:请尽量不要在container上加上display:none意外的style属性,可能会引起不可预知的错误
             */
            AncView = (function (_super) {
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
                    if (this.state == view_5.ViewState.LOADSUCC) {
                        var style = this.target.attr("style");
                        var aa = /display\s*:\s*none;?/;
                        style = style.replace(aa, "");
                        this.target.attr("style", style);
                    }
                };
                return AncView;
            }(view_5.View));
            exports_12("AncView", AncView);
        }
    };
});
