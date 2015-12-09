var BaseControl = (function () {
    function BaseControl(id) {
        this.id = id;
        this.data = new Object();
    }
    BaseControl.prototype.ViewId = function () {
        return this.id;
    };
    BaseControl.prototype.LoadView = function () {
        this.target = $("#" + this.id);
    };
    // On 注册控件事件
    // @param eventName:事件名称
    // @param handler: 事件处理函数
    BaseControl.prototype.On = function (eventName, handler) {
        if (this.target != null) {
            this.target.on(eventName, handler);
        }
    };
    BaseControl.prototype.SetAttr = function (attrName, value) {
        this.data[attrName] = value;
    };
    BaseControl.prototype.Attr = function (attrName) {
        return this.data[attrName];
    };
    BaseControl.prototype.ToHtml = function () {
        var _this = this;
        var html = "";
        html += "<" + this.elementName + " id='" + this.id + "'";
        Object.keys(this.data).map(function (index) {
            html += (index + "=" + _this.data[index]);
        });
        html += ">";
        html += this.textValue;
        html += "</" + this.elementName + ">";
        return html;
    };
    BaseControl.prototype.RefreshView = function () {
        this.target.replaceWith(this.ToHtml());
    };
    return BaseControl;
})();
//# sourceMappingURL=BaseControl.js.map