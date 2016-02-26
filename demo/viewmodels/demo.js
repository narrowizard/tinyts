var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        _super.apply(this, arguments);
    }
    Demo.prototype.RegisterEvents = function () {
        var me = this;
        this.btnSubmit.OnClick(function () {
            if (!me.txtInput.Validate()) {
                alert(me.txtInput.GetLastError());
            }
            else {
                alert(me.txtInput.Value());
            }
        });
    };
    __decorate([
        view(TextBox), 
        __metadata('design:type', TextBox)
    ], Demo.prototype, "txtInput", void 0);
    __decorate([
        view(Button), 
        __metadata('design:type', Button)
    ], Demo.prototype, "btnSubmit", void 0);
    return Demo;
})(BaseViewModel);
$().ready(function () {
    var demo = new Demo();
});
//# sourceMappingURL=demo.js.map