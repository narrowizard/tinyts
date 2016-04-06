var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * VirtualView<T> 虚拟视图
 * 依靠类中的template属性渲染试图
 *
 * 继承该类必须实现SetTemplate方法,在该方法中设置视图的View(Html code)
 * 需要手动调用SetContext方法设置上下文
 */
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