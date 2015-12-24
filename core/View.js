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
    return View;
})();
//# sourceMappingURL=View.js.map