var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        _super.call(this);
        this.localService = new LocalService();
    }
    Demo.prototype.LoadData = function () {
        this.localService.GetReport(this);
    };
    return Demo;
})(BaseViewModel);
$().ready(function () {
    var demo = new Demo();
    demo.LoadData();
});
//# sourceMappingURL=demo.js.map