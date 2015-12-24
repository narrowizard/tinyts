var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Demo = (function () {
    function Demo() {
    }
    Demo.prototype.init = function () {
        this.mainScrollPageView.NextPage();
    };
    Demo.prototype.RegisterEvents = function () {
        var me = this;
    };
    __decorate([
        view(ScrollPageView), 
        __metadata('design:type', ScrollPageView)
    ], Demo.prototype, "mainScrollPageView", void 0);
    return Demo;
})();
$().ready(function () {
    var demo = ViewBinder.instantiate(Demo);
    demo.init();
});
//# sourceMappingURL=demo.js.map