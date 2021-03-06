import { HttpUtils, HttpResponse } from './http';
import { ServicePoolInstance } from './servicepool';

/**
 * injectModel 视图注入模型
 */
export class injectModel {

    propertyName: string;

    selector: string;

    creator: { new(...args: any[]): View };

    params: any[];
}

/**
 * serviceInjectModel 服务注入模型
 */
export class serviceInjectModel {
    propertyName: string;
    creator: { new(...args: any[]): any };
}

export enum ViewState {
    /**
     * UNLOAD 尚未加载(未调用LoadView)
     */
    UNLOAD,
    /**
     * LOADSUCC 加载成功,这时候可以通过View.IsMultiparted获取该视图是否绑定多个元素
     */
    LOADSUCC,
    /**
     * LOADFAIL 调用了LoadView,但是加载失败了
     */
    LOADFAIL
}

enum BindType {
    /**
     * OVONIC 双向绑定
     */
    OVONIC,
    MODELTOVIEW,
    VIEWTOMODEL
}

class DataBindExpressionModel {
    constructor(public Expression: string,
        public ViewInstance: View) { }
}

class TreeNode {
    Expression: string;
    Child: TreeNode[];
    Views: {
        ViewInstance: View;
        Type: BindType;
    }[]

    constructor() {
        this.Child = [];
        this.Views = [];
    }

    /**
     * AddChild 添加子节点,如果子节点已存在且非叶子节点,则合并子节点
     * @param c 子节点
     */
    AddChild(c: TreeNode) {
        // 遍历检查是否已存在
        var count = mx(this.Child).where(it => it.Expression == c.Expression).count();
        if (count == 1) {
            this.CombineChild(c);
        } else {
            this.Child.push(c);
        }
    }

    /**
     * CombineChild 合并两个子节点
     */
    protected CombineChild(c: TreeNode) {
        var child = mx(this.Child).where(it => it.Expression == c.Expression).first();
        if (c.Views.length > 0) {
            // 如果是叶子节点
            for (var i = 0; i < c.Views.length; i++) {
                child.Views.push(c.Views[i]);
            }
        } else {
            for (var i = 0; i < c.Child.length; i++) {
                child.AddChild(c.Child[i]);
            }
        }

    }

    /**
     * Resolve 解析字符串数组成TreeNode
     * @param data 字符串数组
     * @param view 绑定的视图,如果存在下一级,则传递下去
     */
    Resolve(data: string[], view: View, type: BindType): TreeNode {
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
    }

    BuildProxy(): Object {
        var temp = {};
        if (this.Views.length > 0) {
            // 叶子节点,处理与View的绑定关系
            Object.defineProperty(temp, this.Expression, {
                enumerable: true,
                set: (value) => {
                    this.Views.forEach((v, i, a) => {
                        if (v.Type == BindType.OVONIC || v.Type == BindType.MODELTOVIEW) {
                            temp["_" + this.Expression] = value;
                            v.ViewInstance.SetValue(value);
                        }
                    });
                },
                get: () => {
                    // 返回第一个双向绑定的或者ViewToModel的View的值
                    for (var i = 0; i < this.Views.length; i++) {
                        if (this.Views[i].Type == BindType.OVONIC || this.Views[i].Type == BindType.VIEWTOMODEL) {
                            return this.Views[i].ViewInstance.Value();
                        }
                    }
                    // 如果不存在View满足条件
                    return temp["_" + this.Expression];
                }
            });
            // 查找第一个双向绑定或者ViewToModel的View,注册change事件
            for (var i = 0; i < this.Views.length; i++) {
                var temp_view = this.Views[i];
                if (temp_view.ViewInstance && temp_view.Type == BindType.OVONIC || temp_view.Type == BindType.VIEWTOMODEL) {
                    var element = temp_view.ViewInstance.GetJQueryInstance()[0];
                    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                        var lock = false;
                        temp_view.ViewInstance.On("compositionstart", () => {
                            lock = true;
                            temp[this.Expression] = this.Views[i].ViewInstance.Value();
                        });
                        temp_view.ViewInstance.On("compositionend", () => {
                            lock = false;
                            temp[this.Expression] = this.Views[i].ViewInstance.Value();
                        });
                        temp_view.ViewInstance.On("input", () => {
                            if (!lock) {
                                temp[this.Expression] = this.Views[i].ViewInstance.Value();
                            }
                        });
                        break;
                    }
                }
            }
        } else {
            var child = {};
            // 非叶子节点,直接被覆盖需要处理
            for (var i = 0; i < this.Child.length; i++) {
                Object.defineProperty(child, this.Child[i].Expression, Object.getOwnPropertyDescriptor(this.Child[i].BuildProxy(), this.Child[i].Expression));
            }
            temp["_" + this.Expression] = {};
            Object.defineProperty(temp, this.Expression, {
                enumerable: true,
                set: (value) => {
                    // 在这里setter需要处理子级的getter和setter
                    if (value instanceof Object) {
                        for (var p in value) {
                            if (Object.getOwnPropertyDescriptor(temp["_" + this.Expression], p)) {
                                // 已存在则赋值
                                temp["_" + this.Expression][p] = value[p];
                            } else {
                                // 不存在则定义
                                Object.defineProperty(temp["_" + this.Expression], p, Object.getOwnPropertyDescriptor(value, p));
                            }
                        }
                    }
                },
                get: () => {
                    return temp["_" + this.Expression];
                }
            });
            temp[this.Expression] = child;
        }
        return temp;
    }

}

/**
 * View 视图基类
 */
export class View {

    protected state: ViewState;

    /**
     * name 当前视图在viewmodel的属性名
     */
    protected name: string;

    /**
     * selector 该属性用于解决虚拟视图被多次引用时产生的id冲突问题
     */
    protected selector: string;

    /**
     * multipart 该属性标志了当前的view是否绑定了多个元素,默认false
     */
    protected multipart: boolean;

    /**
     * propertyName 属性名(用于注入)
     */
    protected propertyName: string;

    protected target: JQuery;

    /**
     * eventList 事件列表
     */
    protected eventList: { [eventName: string]: ((eventObj: JQueryEventObject, ...args: any[]) => any)[] };

    /**
     * bindExpression绑定模版 格式 model.property[:paramType]
     * paramType 0 default 双向绑定
     * paramType 1 从model渲染到view
     * paramType 2 从view绑定到model
     */
    protected bindingExpression: string;

    protected bindType: BindType;

    protected bindings: string[];

    /**
     * Value 获取控件值,请在子类重写此方法
     */
    Value(): any {
        return this.name;
    }

    /**
     * SetValue 设置控件值,请在子类重写此方法
     */
    SetValue(value) {

    }

    /**
     * Name 设置当前视图在viewmodel的属性名
     */
    SetName(name: string) {
        this.name = name;
    }

    /**
     * Name 返回当前视图在viewmodel的属性名
     */
    Name(): string {
        return this.name;
    }

    /**
     * IsMultiparted 返回当前视图是否绑定多个元素
     */
    IsMultiparted() {
        if (!this.multipart) {
            return false;
        }
        return this.multipart;
    }

    /**
     * PropertyName 获取属性名
     * @returns 属性名
     */
    PropertyName(): string {
        return this.propertyName;
    }

    /**
     * SetAttr 设置属性,该属性与DOM元素无关
     * @param attrName 属性名
     * @param value 属性值
     */
    SetAttr(attrName: string, value: any) {
        this.target.data(attrName, value);
    }

    /**
     * Attr 获取属性
     */
    Attr(attrName: string): any {
        return this.target.data(attrName);
    }

    /**
     * SetSelector 设置视图选择器
     */
    SetSelector(selector: string) {
        this.selector = selector;
    }

    /**
     * LoadView 建立视图与DOM之间的关联关系
     * 初始化视图属性
     * @param parent JQuery对象或选择器 父元素,若指定该参数,则元素查找范围限制在父元素内
     * @returns 是否绑定成功
     */
    LoadView(parent?: JQuery | string): boolean {
        if (this.state != undefined && this.state != ViewState.UNLOAD) {
            console.warn("it's deprecated to call loadview twice!");
        }
        // 优先使用selector绑定元素
        if (this.selector) {
            if (parent) {
                if (typeof parent == "string") {
                    this.target = $(parent).find(this.selector);
                } else {
                    this.target = (parent as JQuery).find(this.selector);
                }
            } else {
                this.target = $(this.selector);
            }
        } else {
            this.state = ViewState.LOADFAIL;
            console.warn(`[view]${this.name} has not set selector!`);
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
                } else {
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
                        console.warn(`[view]${this.propertyName} mismatched the ${i} element. you cannot use injector with this view any more.`);
                        // 不一致,忽略
                        this.propertyName = null;
                        break;
                    }
                }
            }
            return true;
        } else {
            this.state = ViewState.LOADFAIL;
            console.warn(`[view]${this.name} bind null html element!`);
            return false;
        }
    }

    BindJQueryInstance(instance: JQuery) {
        this.state = ViewState.LOADSUCC;
        this.target = instance;
    }

    /**
     * GetJQueryInstance 获取jquery对象
     */
    GetJQueryInstance(): JQuery {
        console.warn("[view]jquery instance is deprecated to use.")
        return this.target;
    }

    /**
     * Focus 获取焦点
     */
    Focus() {
        this.target.focus();
    }

    /**
     * On 注册视图事件
     * @param eventName:事件名称
     * @param handler: 事件处理函数
     */
    On(eventName: string, handler: (...args: any[]) => any) {
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
            this.target.on(eventName, (eventObj: JQueryEventObject, ...args: any[]) => {
                // 依次调用事件
                for (var i = 0; i < this.eventList[eventName].length; i++) {
                    this.eventList[eventName][i](eventObj, ...args);
                }
            });
        }
    }

    /**
     * Trigger 触发指定的事件
     * @param eventName 事件名称
     * @param index optional 当view处于多个dom绑定模式时,指定触发哪个元素的事件,不传则默认触发第一个元素的事件,传-1则触发所有元素的事件.
     */
    Trigger(eventName: string, index?: number) {
        if (this.multipart) {
            if (index == -1) {
                this.target.trigger(eventName);
                return;
            }
            if (index == null) {
                index = 0;
            }
            this.target.eq(index).trigger(eventName);
        } else {
            this.target.trigger(eventName);
        }
    }

    /**
     * Off 解除绑定事件
     * @param eventName 事件名称
     */
    Off(eventName?: string) {
        if (this.target != null) {
            this.target.off(eventName);
        }
        if (!this.eventList) {
            return;
        }
        if (eventName) {
            this.eventList[eventName] = [];
        } else {
            this.eventList = {};
        }
    }

    /**
     * AddClass 添加class属性
     * @param className
     * @param selector:该View的子元素选择器
     */
    AddClass(className: string, selector?: string) {
        if (!selector) {
            this.target.addClass(className);
        } else {
            this.target.find(selector).addClass(className);
        }
    }

    /**
     * RemoveClass 移除class
     * @param className
     * @param selector:该View的子元素选择器
     */
    RemoveClass(className: string, selector?: string) {
        if (!selector) {
            this.target.removeClass(className);
        } else {
            this.target.find(selector).removeClass(className);
        }
    }

    /**
     * HasClass 是否含有目标class
     * @param className class名称
     */
    HasClass(className: string): boolean {
        return this.target.hasClass(className);
    }

    /**
     * SetStyle 设置style属性
     * @param key css属性名
     * @param value 值
     */
    SetStyle(key: string, value: string) {
        this.target.css(key, value);
    }

    /**
     * Style 获取值
     * @param key css属性名
     * @param unit 是否需要单位(如px)
     */
    Style(key: string, unit?: boolean): string {
        if (unit === false) {
            return this.target.css(key).replace(/[^-\d\.]/g, '');
        } else {
            return this.target.css(key);
        }
    }

    /**
     * Disable 设置视图为不可用(仅支持disabled属性的元素有效)
     */
    Disable() {
        this.target.attr("disabled", "true");
    }

    /**
     * Enable 设置视图为可用(仅支持disabled属性的元素有效)
     */
    Enable() {
        this.target.removeAttr("disabled");
    }

    DataBindExpression() {
        return this.bindingExpression;
    }

    DataBind(): string[] {
        return this.bindings;
    }

    /**
     * Inject 将@v装饰的属性注入到View中,
     * 当当前视图绑定DOM元素成功,并且是单元素绑定模式时,下一级注入会限制在当前DOM元素之内进行
     */
    Inject() {
        var c = this.constructor;
        var injector = {};
        // 处理继承后的注入
        while (c instanceof View.constructor) {
            injector = $.extend(injector, c["__inject__"]);
            c = c["__proto__"];
        }

        var instance = this;
        var dataBindingExpressions: DataBindExpressionModel[] = [];
        this.BeforeInject();
        if (injector) {
            for (var i in injector) {
                // 查找构造函数
                var temp = injector[i];
                if (instance instanceof temp["constructor"]) {
                    // 注入视图
                    var views: injectModel[] = temp["views"];
                    if (views) {
                        for (var j = 0; j < views.length; j++) {
                            var view = views[j];
                            var viewInstance = new view.creator(...view.params);
                            if (viewInstance instanceof View) {
                                viewInstance.SetSelector(view.selector);
                                viewInstance.SetName(view.propertyName);
                                // 检测当前视图是否存在,如果不存在,则不限制下一级视图注入时的parent属性
                                if (this.state == ViewState.LOADSUCC && !this.multipart) {
                                    viewInstance.LoadView(this.target);
                                } else {
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
                                    (() => {
                                        // 在循环中会出现引用出错的问题,在这里用一个闭包隐藏作用域
                                        var temp = viewInstance;
                                        temp.SetTemplateView().then(() => {
                                            temp.Inject();
                                        });
                                    })();
                                } else {
                                    viewInstance.Inject();
                                }
                            }
                            instance[view.propertyName] = viewInstance;
                        }
                    }
                    // 注入服务
                    var services: serviceInjectModel[] = temp["services"];
                    if (services) {
                        for (var j = 0; j < services.length; j++) {
                            var service = services[j];
                            instance[service.propertyName] = ServicePoolInstance.GetService(service.creator);
                        }
                    }
                }
            }
        }
        // views注入完成,根据views生成数据绑定树
        this.ResolveDataBinding(dataBindingExpressions);
        this.AfterInject();
    }

    /**
     * ResolveDataBinding 解析数据绑定模版语法
     * @param bindingExpressions 数据绑定模板 格式为 model1.property1.property2
     */
    protected ResolveDataBinding(bindingExpressions: DataBindExpressionModel[]) {
        // 构造一棵数据绑定树
        var root: TreeNode = new TreeNode();

        for (var i = 0; i < bindingExpressions.length; i++) {
            var temp = bindingExpressions[i].Expression.split(':');
            var type: BindType;
            if (temp[1]) {
                type = temp[1].toLowerCase() == "tov" ? BindType.MODELTOVIEW : temp[1].toLowerCase() == "tom" ? BindType.VIEWTOMODEL : BindType.OVONIC;
            } else {
                type = BindType.OVONIC;
            }
            var segments = temp[0].split('.');
            var node = new TreeNode();
            root.AddChild(node.Resolve(segments, bindingExpressions[i].ViewInstance, type));
        }

        for (var i = 0; i < root.Child.length; i++) {
            Object.defineProperty(this, root.Child[i].Expression, Object.getOwnPropertyDescriptor(root.Child[i].BuildProxy(), root.Child[i].Expression));
        }
    }

    /**
     * BeforeInject 该方法将会在Inject前被调用,请在子类重写改方法以实现hooks
     */
    BeforeInject() { }

    /**
     * AfterInject 该方法将会在Inject后被调用,请在子类重写改方法以实现hooks
     */
    AfterInject() { }
}

export class ViewG<T> extends View {

    protected context: T;

    /**
     * SetContext 设置ViewG的上下文
     * @param context 上下文
     */
    SetContext(context: T) {
        this.context = context;
    }
}

/**
 * ViewV 虚拟视图,支持同步跟异步两种模式
 * 同步模式下,html string直接通过GetViewString方法返回
 * 异步模式下
 */
export abstract class ViewV<T> extends ViewG<T> {

    /**
     * [deprecated] viewString 模板视图内容
     */
    protected viewString: string;

    /**
     * GetViewString 同步获取模板html,同步模式下实现该方法
     */
    GetViewString(): string {
        return "";
    }

    /**
     * SetTemplateView 设置虚拟视图的html
     */
    SetTemplateView(): Promise<void> {
        var url = this.constructor["__url__"];
        if (url) {
            // 异步获取html
            return HttpUtils.Get(url).then((res: HttpResponse) => {
                this.target.html(res.ResponseBody);
            });
        } else {
            return new Promise<void>((resolve, reject) => {
                var s = this.GetViewString();
                if (s == "") {
                    s = this.viewString;
                }
                this.target.html(s);
                resolve();
            });
        }
    }

}