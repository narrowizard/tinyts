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
var ListModel = /** @class */ (function (_super) {
    __extends(ListModel, _super);
    function ListModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(private aa: UserService) {
    //     super();
    // }
    ListModel.prototype.AfterInject = function () {
        var data = [];
        data.push(new DataModel(2, "bbb", ["ccc", "dd"], "2004-05-03T17:30:08+08:00"));
        console.log(data);
        this.mList.getTemplpateModel = function (data) {
            data.Id = 3;
            return data;
        };
        this.mList.SetData(data);
        console.log(data);
        var data1 = [28, 26, 25, 24, 23, 21, 20, 19, 18, 16];
        var data2 = [1, 2, 3, 4, 5, 6, 7, 8];
        var data3 = mx(data1).join(data2, function (it) { return it; }, function (it) { return it; }, function (a, b) {
            return {
                Id: a
            };
        }).toArray();
        console.log(data3);
    };
    __decorate([
        tinyts_1.v(list_1.ListView),
        __metadata("design:type", list_1.ListView)
    ], ListModel.prototype, "mList", void 0);
    return ListModel;
}(tinyts_1.AncView));
exports.ListModel = ListModel;
var aa = new ListModel();
