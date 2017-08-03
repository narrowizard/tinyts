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
var tinyts_1 = require("../../core/tinyts");
var view_1 = require("../../core/view");
var input_1 = require("../../control/input");
var assert = require('assert');
var jsdom = require('jsdom').JSDOM;
var mx = require('../../../libs/multiplex');
var dom = new jsdom("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Document</title>\n</head>\n<body>\n    <div id=\"testor\" data-property=\"Name\"></div>\n    <input type=\"text\" id=\"mInput\" data-bind=\"model.name\" />\n</body>\n</html>");
global.window = dom.window;
global.document = dom.window.document;
global.mx = mx;
var AnyService = (function () {
    function AnyService() {
    }
    AnyService.prototype.GetData = function () {
        return true;
    };
    return AnyService;
}());
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestView.prototype.AfterInject = function () {
        this.model.name = "Jaker";
    };
    __decorate([
        tinyts_1.v(view_1.View),
        __metadata("design:type", view_1.View)
    ], TestView.prototype, "testor", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], TestView.prototype, "mInput", void 0);
    __decorate([
        tinyts_1.s(AnyService),
        __metadata("design:type", AnyService)
    ], TestView.prototype, "service", void 0);
    return TestView;
}(tinyts_1.AncView));
describe("Tinyts", function () {
    it('dependency injector', function () {
        var instance = new TestView();
        assert.notEqual(instance.testor, null);
        assert.notEqual(instance.service, null);
        assert.equal(instance.service.GetData(), true);
        assert.deepEqual(instance.mInput.Value(), "Jaker");
        instance.mInput.SetValue("John");
        assert.deepEqual(instance.model.name, "John");
    });
});
