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