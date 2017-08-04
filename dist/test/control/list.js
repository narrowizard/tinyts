"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("../../control/list");
var assert = require('assert');
var DataModel = (function () {
    function DataModel() {
    }
    return DataModel;
}());
describe("ListView", function () {
    it('render data', function () {
        var dataList = [];
        dataList.push({ Name: "John", Id: 1 });
        dataList.push({ Name: "Jaker", Id: 2 });
        dataList.push({ Name: "Queen", Id: 3 });
        var list = new list_1.ListView();
        list.SetSelector("#mListView");
        list.LoadView();
        list.SetData(dataList);
    });
});
