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
var list_1 = require("../../control/list");
var tinyts_1 = require("../../core/tinyts");
var assert = require('assert');
var DataModel = (function () {
    function DataModel() {
    }
    return DataModel;
}());
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestView.prototype.AfterInject = function () {
        var _this = this;
        this.mListView.GetPageManager().getData = function (index, pagesize) {
            var temp = [];
            for (var i = 0; i < pagesize; i++) {
                temp.push({ Name: "narro", Id: index });
            }
            _this.mListView.SetData(temp);
            _this.mListView.GetPageManager().SetPageCount(2);
        };
        this.mListView.SetEventHandler("li", function () {
        });
        this.mListView.RemoveEventHandler("li");
        this.mListView.UnbindEvents("li");
    };
    __decorate([
        tinyts_1.v(list_1.ListView),
        __metadata("design:type", list_1.ListView)
    ], TestView.prototype, "mListView", void 0);
    return TestView;
}(tinyts_1.AncView));
describe("ListView", function () {
    it('array proxy', function () {
        var vm = new TestView();
        vm.model.push({ Name: "John", Id: 1 });
        vm.model.push({ Name: "Jaker", Id: 2 });
        vm.model.push({ Name: "Queen", Id: 3 });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }, { Name: "Queen", Id: 3 }]);
        vm.model.pop();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);
        vm.model.shift();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }]);
        vm.model.unshift({ Name: "John", Id: 1 });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);
        vm.model.reverse();
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }, { Name: "John", Id: 1 }]);
        vm.model.sort(function (a, b) { return a.Id - b.Id; });
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }]);
        vm.model.splice(0, 1);
        assert.deepEqual(vm.mListView.GetData(), [{ Name: "Jaker", Id: 2 }]);
        vm.mListView.Traverse(function (index, elem) {
            assert.equal($(elem).attr('data-id'), 2);
            return true;
        });
        vm.mListView.SetPageSize(1);
        vm.mListView.GetPageManager().FirstPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });
        vm.mListView.GetPageManager().LastPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 2 });
        vm.mListView.GetPageManager().PrevPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });
        vm.mListView.GetPageManager().NextPage();
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 2 });
        vm.mListView.GetPageManager().TurnToPage(1);
        assert.deepEqual(vm.mListView.GetData()[0], { Name: "narro", Id: 1 });
    });
    it('multipart list', function () {
        var ll = new list_1.ListView();
        ll.SetSelector(".list-view");
        ll.LoadView();
        assert.equal(ll.IsMultiparted(), true);
        ll.SetData([{ Name: "John", Id: 1 }, { Name: "Jaker", Id: 2 }, { Name: "Queen", Id: 3 }]);
    });
});
