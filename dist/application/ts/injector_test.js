"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("../../control/input");
var tinyts_1 = require("../../core/tinyts");
var injector_1 = require("../../model/injector");
var validator_test_1 = require("../model/validator_test");
var button_1 = require("../../control/button");
var view_1 = require("../../core/view");
var Name2Model = /** @class */ (function (_super) {
    __extends(Name2Model, _super);
    function Name2Model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], Name2Model.prototype, "Name2", void 0);
    return Name2Model;
}(view_1.ViewG));
var SubModel = /** @class */ (function (_super) {
    __extends(SubModel, _super);
    function SubModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        tinyts_1.v(Name2Model),
        __metadata("design:type", Name2Model)
    ], SubModel.prototype, "aaa", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], SubModel.prototype, "sSubName", void 0);
    return SubModel;
}(view_1.ViewG));
var InjectorTestModel = /** @class */ (function (_super) {
    __extends(InjectorTestModel, _super);
    function InjectorTestModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InjectorTestModel.prototype.AfterInject = function () {
        var me = this;
        me.btnInject.OnClick(function () {
            injector_1.Inject(validator_test_1.TestModel, me).then(function (data) {
                console.log(data);
            }).catch(function (errors) {
                console.log(errors);
            });
        });
    };
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], InjectorTestModel.prototype, "sName", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], InjectorTestModel.prototype, "sPhone", void 0);
    __decorate([
        tinyts_1.v(button_1.Button),
        __metadata("design:type", button_1.Button)
    ], InjectorTestModel.prototype, "btnInject", void 0);
    __decorate([
        tinyts_1.v(SubModel),
        __metadata("design:type", SubModel)
    ], InjectorTestModel.prototype, "sub", void 0);
    return InjectorTestModel;
}(tinyts_1.AncView));
exports.InjectorTestModel = InjectorTestModel;
var aa = new InjectorTestModel();
