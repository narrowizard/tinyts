//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
/**
 * 用于某个控件
 */
function view(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        // temp.SetID(decoratedPropertyName);
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
/**
 * 用于封装的部分视图
 */
function partialView(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
/**
 * 注入
 * @param Class ViewModel's constructor
 * @param instance ViewModel instance
 */
function inject(Class, instance) {
    if (Class["__inject__"]) {
        var result = Object.keys(Class["__inject__"])
            .map(function (propertyName) {
            var temp = { propertyName: "", constructor: null };
            temp.propertyName = propertyName;
            temp.constructor = Class["__inject__"][propertyName];
            return temp;
        });
        for (var _i = 0; _i < result.length; _i++) {
            var injectionPoint = result[_i];
            var temp = new injectionPoint.constructor();
            if (temp instanceof VirtualView) {
                temp.SetContext(instance);
            }
            else if (temp instanceof View) {
                //如果是View
                temp.SetID(injectionPoint.propertyName);
                temp.LoadView();
            }
            else if (temp instanceof ViewGroup) {
                //如果是ViewGroup
                temp.SetContext(instance);
            }
            instance[injectionPoint.propertyName] = temp;
        }
        instance.RegisterEvents();
    }
}
//# sourceMappingURL=ViewFilter.js.map
var View = (function () {
    function View() {
    }
    /**
     * 设置元素的id,该方法会在View初始化之后被调用
     * 可以重载该方法来实现额外的初始化
     * @param id 唯一id
     */
    View.prototype.SetID = function (id) {
        this.attributes = {};
        this.id = id;
    };
    View.prototype.ViewId = function () {
        return this.id;
    };
    View.prototype.LoadView = function () {
        this.target = $("#" + this.id);
    };
    /**
     * 通过选择器绑定View
     */
    View.prototype.BindBySelector = function (selector) {
        this.target = $(selector);
    };
    /**
     * 设置style属性
     */
    View.prototype.SetStyle = function (key, value) {
        this.target.css(key, value);
    };
    View.prototype.SetAttr = function (attrName, value) {
        this.attributes[attrName] = value;
    };
    View.prototype.Attr = function (attrName) {
        return this.attributes[attrName];
    };
    // On 注册控件事件
    // @param eventName:事件名称
    // @param handler: 事件处理函数
    View.prototype.On = function (eventName, handler) {
        if (this.target != null) {
            this.target.on(eventName, handler);
        }
    };
    View.prototype.OnClick = function (handler) {
        if (this.target != null) {
            this.target.click(handler);
        }
    };
    /**
     * SetClass 设置class属性
     * @param className
     * @param selector:该View的子元素选择器
     */
    View.prototype.SetClass = function (className, selector) {
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
    return View;
})();
//# sourceMappingURL=View.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VirtualView = (function (_super) {
    __extends(VirtualView, _super);
    function VirtualView() {
        _super.apply(this, arguments);
    }
    VirtualView.prototype.SetContext = function (context) {
        this.context = context;
    };
    VirtualView.prototype.LoadView = function () {
        this.SetTemplate();
        _super.prototype.LoadView.call(this);
        this.target.append(this.template);
        //在这里注入control
        inject(this.constructor, this);
    };
    return VirtualView;
})(View);
//# sourceMappingURL=VirtualView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextView = (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        _super.apply(this, arguments);
    }
    TextView.prototype.SetText = function (text) {
        this.target.text(text);
    };
    TextView.prototype.GetText = function () {
        return this.target.text();
    };
    TextView.prototype.SetColor = function (color) {
        this.target.css("color", color);
    };
    TextView.prototype.SetBackgroundColor = function (color) {
        this.target.css("background-color", color);
    };
    TextView.prototype.SetSize = function (pixel) {
        this.target.css("font-size", pixel);
    };
    return TextView;
})(View);
//# sourceMappingURL=TextView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        _super.apply(this, arguments);
    }
    /**
     * 设置数据,并刷新视图
     * @param data 数据集合
     */
    ListView.prototype.SetData = function (data) {
        this.mData = data;
        this.RefreshView();
    };
    /**
     * 添加数据,并刷新视图
     * @param T 数据元素
    */
    ListView.prototype.Add = function (model) {
        this.mData.push(model);
        this.append(this.GetView(this.mData.length - 1));
    };
    ListView.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.mData = [];
    };
    /**
     * 清空列表
    */
    ListView.prototype.Clear = function () {
        this.target.html("");
    };
    ;
    ListView.prototype.Remove = function (p) {
        if (typeof p == "number") {
            var index = p;
            if (index < 0 || index > this.mData.length) {
                return;
            }
            for (var i = index; i < this.mData.length - 1; i++) {
                this.mData[i] = this.mData[i + 1];
            }
            this.mData.pop();
        }
        else {
            var obj = p;
            for (var j = 0; j < this.mData.length; j++) {
                if (this.mData[j] == obj) {
                    for (var i = j; i < this.mData.length - 1; i++) {
                        this.mData[i] = this.mData[i + 1];
                    }
                    this.mData.pop();
                    break;
                }
            }
        }
        this.RefreshView();
    };
    ListView.prototype.GetItem = function (param) {
        if (typeof param == "number") {
            var index = param;
            if (index < 0 || index > this.mData.length) {
                return null;
            }
            return this.mData[index];
        }
        else if (typeof param == "function") {
            var predicate = param;
            return this.mData.where(predicate).first();
        }
    };
    ListView.prototype.SetItem = function (param, item) {
        if (typeof param == "number") {
            if (param < 0 || param >= this.Count()) {
                return;
            }
            this.mData[param] = item;
        }
        else if (typeof param == "function") {
            var predicate = param;
            for (var i = 0; i < this.Count(); i++) {
                if (predicate(this.mData[i])) {
                    this.mData[i] = item;
                    break;
                }
            }
        }
        this.RefreshView();
    };
    /**
     * 获取数组元素的长度
     */
    ListView.prototype.Count = function () {
        return this.mData.length;
    };
    /**
     * 获取指定索引元素的Id(唯一编号)
     * 未在该类中实现,请在子类中实现
     * @param index 索引
     */
    ListView.prototype.GetItemId = function (index) {
        return 0;
    };
    /**
     * 获取列表中某一个元素的html代码
     * @param index 索引
    */
    ListView.prototype.GetView = function (index) {
        return "";
    };
    ;
    /**
     * 刷新整个ListView的列表部分
     */
    ListView.prototype.RefreshView = function () {
        this.Clear();
        if (this.mData == null) {
            return;
        }
        for (var i = 0; i < this.mData.length; i++) {
            this.append(this.GetView(i));
        }
    };
    /**
     * 在列表的最后插入元素,请在子类中实现该方法
     * @param viewString 元素的html字符串
     */
    ListView.prototype.append = function (viewString) {
        this.target.append(viewString);
    };
    return ListView;
})(View);
//# sourceMappingURL=ListView.js.map
/**
 * ViewModel的基类,该类实现了依赖注入
 */
var BaseViewModel = (function () {
    function BaseViewModel() {
        inject(this.constructor, this);
    }
    return BaseViewModel;
})();
//# sourceMappingURL=BaseViewModel.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewGroup = (function (_super) {
    __extends(ViewGroup, _super);
    function ViewGroup() {
        _super.apply(this, arguments);
    }
    ViewGroup.prototype.SetContext = function (context) {
        this.context = context;
    };
    return ViewGroup;
})(BaseViewModel);
//# sourceMappingURL=ViewGroup.js.map
var ServicePool = (function () {
    function ServicePool() {
        this.instances = {};
    }
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
})();
var ServicePoolInstance = new ServicePool();
//# sourceMappingURL=ServicePool.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PageListView = (function (_super) {
    __extends(PageListView, _super);
    function PageListView() {
        _super.call(this);
        this.async = true;
    }
    /**
     * 设置数据总条数,用于异步获取数据时的分页计算
     */
    PageListView.prototype.SetItemCount = function (itemCount) {
        this.itemCount = itemCount;
    };
    /**
     * 设置数据,当数据为同步加载时,会同时设置数据总条数
     */
    PageListView.prototype.SetData = function (data) {
        _super.prototype.SetData.call(this, data);
        if (!this.async) {
            this.itemCount = data.length;
        }
    };
    PageListView.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.pageable = Boolean(this.target.attr("data-pageable"));
    };
    return PageListView;
})(ListView);
//# sourceMappingURL=PageListView.js.map