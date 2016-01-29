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