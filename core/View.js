var View = (function () {
    function View() {
    }
    View.prototype.SetID = function (id) {
        this.id = id;
    };
    View.prototype.ViewId = function () {
        return this.id;
    };
    View.prototype.LoadView = function () {
        this.target = $("#" + this.id);
    };
    View.prototype.BindBySelector = function (selector) {
        this.target = $(selector);
    };
    View.prototype.SetAttr = function (attrName, value) {
        this.attributes[attrName] = value;
    };
    View.prototype.Attr = function (attrName) {
        return this.attributes[attrName];
    };
    View.prototype.OnClick = function (handler) {
        if (this.target != null) {
            this.target.click(handler);
        }
    };
    return View;
})();
//# sourceMappingURL=View.js.map