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
var view_1 = require("../../core/view");
var tinyts_1 = require("../../core/tinyts");
var button_1 = require("../../control/button");
var list_1 = require("../../control/list");
var ViewVTest = (function (_super) {
    __extends(ViewVTest, _super);
    function ViewVTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewString = "<p></p>";
        return _this;
    }
    ViewVTest.prototype.AfterInject = function () {
        this.btnClick.SetText("消失");
    };
    __decorate([
        tinyts_1.v(button_1.Button),
        __metadata("design:type", button_1.Button)
    ], ViewVTest.prototype, "btnClick", void 0);
    ViewVTest = __decorate([
        tinyts_1.f("viewv_v.html")
    ], ViewVTest);
    return ViewVTest;
}(view_1.ViewV));
var ViewVTest2 = (function (_super) {
    __extends(ViewVTest2, _super);
    function ViewVTest2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewString = "<ul id=\"list\" data-property=\"mList\"></ul>";
        return _this;
    }
    ViewVTest2.prototype.AfterInject = function () {
        console.log(this.list.PropertyName());
    };
    __decorate([
        tinyts_1.v(list_1.ListView),
        __metadata("design:type", list_1.ListView)
    ], ViewVTest2.prototype, "list", void 0);
    return ViewVTest2;
}(view_1.ViewV));
exports.ViewVTest2 = ViewVTest2;
var ViewVModel = (function (_super) {
    __extends(ViewVModel, _super);
    function ViewVModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        tinyts_1.v(ViewVTest),
        __metadata("design:type", ViewVTest)
    ], ViewVModel.prototype, "v", void 0);
    __decorate([
        tinyts_1.v(ViewVTest2),
        __metadata("design:type", ViewVTest2)
    ], ViewVModel.prototype, "c", void 0);
    return ViewVModel;
}(tinyts_1.AncView));
exports.ViewVModel = ViewVModel;
var aa = new ViewVModel();
