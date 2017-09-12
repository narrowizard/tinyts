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
var list_1 = require("../../control/list");
var DataModel = /** @class */ (function () {
    function DataModel(Id, Name, ListData, Date) {
        this.Id = Id;
        this.Name = Name;
        this.ListData = ListData;
        this.Date = Date;
    }
    return DataModel;
}());
var ULLI = /** @class */ (function (_super) {
    __extends(ULLI, _super);
    function ULLI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ULLI.prototype.AfterInject = function () {
        var _this = this;
        this.li.On("click", function () {
            alert(_this.viewData.Id);
        });
    };
    __decorate([
        tinyts_1.v(view_1.View, ".list-item"),
        __metadata("design:type", view_1.View)
    ], ULLI.prototype, "li", void 0);
    return ULLI;
}(list_1.SubView));
var ListViewVModel = /** @class */ (function (_super) {
    __extends(ListViewVModel, _super);
    function ListViewVModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(private aa: UserService) {
    //     super();
    // }
    ListViewVModel.prototype.AfterInject = function () {
        var data = [];
        data.push(new DataModel(1, "a1", ["aa"], "qqq"));
        data.push(new DataModel(2, "a1", ["aa"], "qqq"));
        this.mList.SetData(data);
    };
    __decorate([
        tinyts_1.vlist(list_1.ListViewV, ULLI),
        __metadata("design:type", list_1.ListViewV)
    ], ListViewVModel.prototype, "mList", void 0);
    return ListViewVModel;
}(tinyts_1.AncView));
exports.ListViewVModel = ListViewVModel;
var aa = new ListViewVModel();
