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
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.getTemplateString = function (target) {
        return target.find("tbody").html();
    };
    Table.prototype.append = function (viewString, elemIndex) {
        if (this.multipart) {
            if (elemIndex == null) {
                elemIndex = 0;
            }
            this.target.eq(elemIndex).find("tbody").append(viewString);
        }
        else {
            this.target.find("tbody").append(viewString);
        }
    };
    Table.prototype.ClearView = function () {
        this.target.find("tbody").html("");
    };
    return Table;
}(list_1.ListView));
exports.Table = Table;
