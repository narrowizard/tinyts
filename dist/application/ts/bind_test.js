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
var input_1 = require("../../control/input");
var button_1 = require("../../control/button");
var list_1 = require("../../control/list");
var text_1 = require("../../control/text");
var class_validator_1 = require("class-validator");
var injector_1 = require("../../model/injector");
var DataModel = /** @class */ (function () {
    function DataModel(Id, Name) {
        this.Id = Id;
        this.Name = Name;
    }
    return DataModel;
}());
var ObjectModel = /** @class */ (function () {
    function ObjectModel() {
    }
    __decorate([
        class_validator_1.Length(0, 2),
        __metadata("design:type", String)
    ], ObjectModel.prototype, "name", void 0);
    return ObjectModel;
}());
var BindTestModel = /** @class */ (function (_super) {
    __extends(BindTestModel, _super);
    function BindTestModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindTestModel.prototype.AfterInject = function () {
        var _this = this;
        this.data = {
            name: "narro",
            listData: [new DataModel(2, "bbb")],
            pos: {
                x: 11,
                y: 335
            },
            input: "sth"
        };
        // this.data.listData.push(new DataModel(3, "aaa"));
        this.mList.GetData().push((new DataModel(3, "aaa")));
        this.btnInject.OnClick(function () {
            console.log(_this.data);
            injector_1.ValidateData(ObjectModel, _this.data).then(function (ot) {
                console.log("validate success");
            }).catch(function (it) {
                console.log(it);
            });
        });
    };
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], BindTestModel.prototype, "sName", void 0);
    __decorate([
        tinyts_1.v(text_1.TextView),
        __metadata("design:type", text_1.TextView)
    ], BindTestModel.prototype, "sOutput", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], BindTestModel.prototype, "sPhone", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], BindTestModel.prototype, "sSubName", void 0);
    __decorate([
        tinyts_1.v(input_1.InputView),
        __metadata("design:type", input_1.InputView)
    ], BindTestModel.prototype, "sInput", void 0);
    __decorate([
        tinyts_1.v(text_1.TextView),
        __metadata("design:type", text_1.TextView)
    ], BindTestModel.prototype, "oInput", void 0);
    __decorate([
        tinyts_1.v(button_1.Button),
        __metadata("design:type", button_1.Button)
    ], BindTestModel.prototype, "btnInject", void 0);
    __decorate([
        tinyts_1.v(list_1.ListView),
        __metadata("design:type", list_1.ListView)
    ], BindTestModel.prototype, "mList", void 0);
    return BindTestModel;
}(tinyts_1.AncView));
exports.BindTestModel = BindTestModel;
var aa = new BindTestModel();
