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
    VirtualView.prototype.LoadView = function () {
        this.SetTemplate();
        _super.prototype.LoadView.call(this);
        this.target.append(this.template);
        //在这里注入control
        var Class = this.constructor;
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
                //如果是Control
                if (temp instanceof View) {
                    temp.SetID(injectionPoint.propertyName);
                    temp.LoadView();
                }
                else if (temp instanceof ViewGroup) {
                    //如果是View
                    temp.SetContext(this);
                }
                this[injectionPoint.propertyName] = temp;
            }
            this.RegisterEvents();
        }
    };
    return VirtualView;
})(View);
//# sourceMappingURL=VirtualView.js.map