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
var text_1 = require("../../control/text");
var assert = require('assert');
var AnyService = /** @class */ (function () {
    function AnyService() {
    }
    AnyService.prototype.GetData = function () {
        return true;
    };
    return AnyService;
}());
var ViewVTest = /** @class */ (function (_super) {
    __extends(ViewVTest, _super);
    function ViewVTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewString = "<p id=\"mNewPage\"></p>";
        return _this;
    }
    __decorate([
        tinyts_1.v(text_1.TextView),
        __metadata("design:type", text_1.TextView)
    ], ViewVTest.prototype, "mNewPage", void 0);
    return ViewVTest;
}(view_1.ViewV));
var TestView = /** @class */ (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestView.prototype.AfterInject = function () {
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
        tinyts_1.v(text_1.TextView),
        __metadata("design:type", text_1.TextView)
    ], TestView.prototype, "mOutput", void 0);
    __decorate([
        tinyts_1.v(ViewVTest),
        __metadata("design:type", ViewVTest)
    ], TestView.prototype, "mViewV", void 0);
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
    });
    it('data bind', function () {
        var instance = new TestView();
        instance.model.name = "Jaker";
        assert.deepEqual(instance.mInput.Value(), "Jaker");
        assert.deepEqual(instance.mOutput.Value(), "Jaker");
        instance.mInput.SetValue("John");
        assert.deepEqual(instance.model.name, "John");
        // not support 
        // assert.deepEqual(instance.mOutput.Value(), "John");
    });
    it('viewv injector', function () {
        var instance = new TestView();
        assert.notEqual(instance.mViewV, null);
        // viewv use promise to set view string
        setTimeout(function () {
            assert.notEqual(instance.mViewV.mNewPage, null);
        }, 1000);
    });
});
