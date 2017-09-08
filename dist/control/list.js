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
var view_1 = require("../core/view");
var meta_1 = require("../core/meta");
/**
 * ArrayProxy<T> 列表数据操作接口
 */
var ArrayProxy = /** @class */ (function (_super) {
    __extends(ArrayProxy, _super);
    function ArrayProxy(data, context) {
        var _this = _super.apply(this, data) || this;
        Object.setPrototypeOf(_this, ArrayProxy.prototype);
        _this.context = context;
        return _this;
    }
    ArrayProxy.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var res = _super.prototype.push.apply(this, items);
        this.context.RefreshView();
        return res;
    };
    ArrayProxy.prototype.pop = function () {
        var res = _super.prototype.pop.call(this);
        this.context.RefreshView();
        return res;
    };
    ArrayProxy.prototype.shift = function () {
        var res = _super.prototype.shift.call(this);
        this.context.RefreshView();
        return res;
    };
    ArrayProxy.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var res = _super.prototype.unshift.apply(this, items);
        this.context.RefreshView();
        return res;
    };
    ArrayProxy.prototype.reverse = function () {
        var res = _super.prototype.reverse.call(this);
        this.context.RefreshView();
        return res;
    };
    ArrayProxy.prototype.sort = function (compareFn) {
        var res = _super.prototype.sort.call(this, compareFn);
        this.context.RefreshView();
        return res;
    };
    // concat<U extends T[]>(...items: U[]): T[] {
    //     var temp = [];
    //     for (var i = 0; i < this.length; i++) {
    //         temp[i] = this[i];
    //     }
    //     return temp.concat(...items);
    // }
    ArrayProxy.prototype.splice = function (start, deleteCount) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            temp[i] = this[i];
        }
        var res = temp.splice.apply(temp, [start, deleteCount].concat(items));
        this.length = temp.length;
        for (var i = 0; i < temp.length; i++) {
            this[i] = temp[i];
        }
        this.context.RefreshView();
        return res;
    };
    return ArrayProxy;
}(Array));
exports.ArrayProxy = ArrayProxy;
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListView.prototype.LoadView = function (parent) {
        var _this = this;
        var succ = _super.prototype.LoadView.call(this, parent);
        this.viewString = [];
        if (succ) {
            // 设置模版
            if (this.multipart) {
                // 多绑定元素,viewString可能每个都不一样,但是数据是一份一样的
                this.target.each(function (index, elem) {
                    _this.viewString[index] = _this.getTemplateString($(elem));
                });
            }
            else {
                // 单元素绑定关系
                this.viewString.push(this.getTemplateString(this.target));
            }
            this.ClearView();
            // 分页器
            var pagable = this.target.attr("data-pagable");
            if (pagable) {
                this.pageManager = new PageManager();
                this.pageManager.SetContext(this);
            }
            if (pagable == "sync") {
                this.pageManager.SetPageMode(PAGEMODE.SYNC);
            }
            else if (pagable == "async") {
                this.pageManager.SetPageMode(PAGEMODE.ASYNC);
            }
        }
        return succ;
    };
    ListView.prototype.getTemplateString = function (target) {
        return target.html();
    };
    /**
     * SetEventHandler 设置事件处理函数
     * @param selector 选择器
     * @param handler 事件处理函数
     * @param event 事件名,默认为click事件
     */
    ListView.prototype.SetEventHandler = function (selector, handler, event) {
        if (!this.eventHandler) {
            this.eventHandler = [];
        }
        this.eventHandler.push({ selector: selector, handler: handler, event: event });
    };
    /**
     * RemoveEventHandler 移除handler,在下一次刷新数据列表时不再绑定
     * @param selector 选择器
     */
    ListView.prototype.RemoveEventHandler = function (selector) {
        var temp = [];
        for (var i = 0; i < this.eventHandler.length; i++) {
            if (this.eventHandler[i].selector != selector) {
                temp.push(this.eventHandler[i]);
            }
        }
        this.eventHandler = temp;
    };
    /**
     * UnbindEvents 解除绑定的事件,解除已经绑定的事件
     * 注意，使用该方法解除事件后，若刷新数据，事件依然会重新绑定
     * @param selector 选择器
     * @param event 事件名,若不传,则解除所有事件
     */
    ListView.prototype.UnbindEvents = function (selector, event) {
        if (event) {
            this.target.find(selector).off(event);
        }
        else {
            this.target.find(selector).off();
        }
    };
    /**
     * SetData 设置数据,在这里作列表数据代理
     * @param data 数据
     */
    ListView.prototype.SetData = function (data) {
        if (!data) {
            data = [];
        }
        if (this.state != view_1.ViewState.LOADSUCC) {
            console.error(this.name + " load error!");
            return;
        }
        this.mData = new ArrayProxy(data, this);
        this.RefreshView();
    };
    /**
     * GetData returns an array with the copy of data proxy's data
     */
    ListView.prototype.GetData = function () {
        if (!this.mData) {
            return [];
        }
        var temp = [];
        for (var i = 0; i < this.mData.length; i++) {
            temp.push(this.mData[i]);
        }
        return temp;
    };
    ListView.prototype.SetValue = function (data) {
        this.SetData(data);
    };
    /**
     * Value returns the array proxy object.
     */
    ListView.prototype.Value = function () {
        if (!this.mData) {
            this.mData = new ArrayProxy([], this);
        }
        return this.mData;
    };
    /**
     * RefreshView 刷新列表部分视图
     */
    ListView.prototype.RefreshView = function () {
        this.ClearView();
        if (!this.mData) {
            return;
        }
        for (var i = 0; i < this.mData.length; i++) {
            this.createView(i);
        }
        this.RegisterEvents();
    };
    /**
     * 获取列表中某一个元素的html代码
     * @param dataIndex 数据索引
     * @param (仅多元素绑定时)元素索引
    */
    ListView.prototype.GetView = function (dataIndex, elemIndex) {
        var data = $.extend(true, {}, this.mData[dataIndex]);
        if (this.getTemplpateModel) {
            data = this.getTemplpateModel(data, dataIndex);
        }
        if (elemIndex == null) {
            elemIndex = 0;
        }
        return meta_1.Meta.Resolve(this.viewString[elemIndex], data);
    };
    /**
     * createView 创建一个视图的html代码,并添加到当前view的最后面
     * @param index 需要创建的view的索引
     */
    ListView.prototype.createView = function (index) {
        var _this = this;
        if (this.multipart) {
            this.target.each(function (i, elem) {
                _this.append(_this.GetView(index, i), i);
            });
        }
        else {
            this.append(this.GetView(index, 0));
        }
    };
    /**
     * [override] append 在视图的最后添加html内容,该方法是为了避免类似table元素这种列表内容并非其直接子元素的情况
     */
    ListView.prototype.append = function (viewString, elemIndex) {
        if (this.multipart) {
            if (elemIndex == null) {
                elemIndex = 0;
            }
            this.target.eq(elemIndex).append(viewString);
        }
        else {
            this.target.append(viewString);
        }
    };
    /**
     * [override] GetChildren 获取列表内容的jquery引用
     */
    ListView.prototype.GetChildren = function () {
        return this.target.children();
    };
    /**
     * Traverse 遍历列表(需要保证GetChildren方法有效)
     * @param handler 遍历函数,返回false表示停止遍历
     */
    ListView.prototype.Traverse = function (handler) {
        this.GetChildren().each(function (index, elem) {
            if (!handler(index, elem)) {
                return false;
            }
        });
    };
    /**
     * [override] ClearView 清空列表部分视图
     */
    ListView.prototype.ClearView = function () {
        this.target.html("");
    };
    /**
     * RegisterEvents 注册列表子元素的事件
     * 注意，手动调用该方法会在注册事件之前先解除列表原有的所有事件
     */
    ListView.prototype.RegisterEvents = function () {
        if (!this.eventHandler) {
            this.eventHandler = [];
        }
        //解绑事件
        for (var i = 0; i < this.eventHandler.length; i++) {
            this.UnbindEvents(this.eventHandler[i].selector);
        }
        //绑定事件
        for (var i = 0; i < this.eventHandler.length; i++) {
            var targetView = this.target.find(this.eventHandler[i].selector);
            if (this.eventHandler[i].event) {
                targetView.on(this.eventHandler[i].event, this.eventHandler[i].handler);
            }
            else {
                targetView.click(this.eventHandler[i].handler);
            }
        }
    };
    /**
     * GetPageManager 获取分页器,仅当data-pagable为sync或async时有效
     */
    ListView.prototype.GetPageManager = function () {
        if (!this.pageManager) {
            console.error("data-pagable has not defined!");
        }
        return this.pageManager;
    };
    /**
     * SetPageSize 设置每页条数,请重写此方法来修改页面上的显示
     */
    ListView.prototype.SetPageSize = function (pagesize) {
        this.pageSize = pagesize;
    };
    /**
     * SetCurPage 设置当前页(用于展示)
     */
    ListView.prototype.SetCurPage = function (page) {
    };
    /**
     * SetPageCount 设置总页数(用于展示)
     */
    ListView.prototype.SetPageCount = function (count) {
    };
    /**
     * GetPageSize 获取每页条数,请重写此方法以返回用户自定义的值
     */
    ListView.prototype.GetPageSize = function () {
        return this.pageSize;
    };
    return ListView;
}(view_1.View));
exports.ListView = ListView;
// PAGEMODE 分页模式
// SYNC 同步分页
// ASYNC 异步分页
var PAGEMODE;
(function (PAGEMODE) {
    PAGEMODE[PAGEMODE["SYNC"] = 0] = "SYNC";
    PAGEMODE[PAGEMODE["ASYNC"] = 1] = "ASYNC";
})(PAGEMODE || (PAGEMODE = {}));
var PageManager = /** @class */ (function () {
    /**
     * @param instance 同步模式时,数据会被设置到该instance
     */
    function PageManager(instance) {
        this.curPage = 1;
    }
    /**
     * SetData 设置数据,当模式为同步分页模式时,可以直接调用该函数将数据交给PageManager
     * @param data 数据,同时会更新total和pageCount
     */
    PageManager.prototype.SetData = function (data) {
        if (!data) {
            return;
        }
        this.mData = data;
        this.SetRecordCount(this.mData.length);
    };
    /**
     * SetContext 设置上下文
     * @param context 数据获取器
     */
    PageManager.prototype.SetContext = function (context) {
        this.context = context;
    };
    /**
     * SetPageMode 设置分页模式
     * 同步模式时,需要在构造函数中传入目标ListView的实例
     * 异步模式时,需要设置用于获取异步数据的context
     * @param mode 分页模式
     */
    PageManager.prototype.SetPageMode = function (mode) {
        this.pageMode = mode;
    };
    /**
     * SetCurPage 强行设置当前页,不跳转
     * 注意,调用此函数会引起分页器的奔溃,请谨慎使用
     * @param index 页码
     */
    PageManager.prototype.ForceSetCurPage = function (index) {
        this.curPage = index;
    };
    /**
     * CurPage 获取当前页码
     */
    PageManager.prototype.CurPage = function () {
        return this.curPage;
    };
    /**
     * SetPageSize 设置每页条数
     * @param pagesize 每页条数
     */
    PageManager.prototype.SetPageSize = function (pagesize) {
        this.pageSize = pagesize;
    };
    /**
     * RecordCount 返回记录总条数,仅在通过SetRecordCount方法设置总条数后才有效
     */
    PageManager.prototype.RecordCount = function () {
        return this.total;
    };
    /**
     * SetRecordCount 设置记录总条数,同时设置pageCount
     * @param count 记录总数量
     */
    PageManager.prototype.SetRecordCount = function (count) {
        this.total = count;
        this.SetPageCount(Math.ceil(this.total / this.pageSize));
    };
    /**
     * SetPageCount 设置总页数
     * @param count 总页数
     */
    PageManager.prototype.SetPageCount = function (count) {
        //在列表上展示总页数
        this.context.SetPageCount(count);
        this.pageCount = count;
    };
    /**
     * ResetCurPage 重置当前页为第一页
     */
    PageManager.prototype.ResetCurPage = function () {
        this.curPage = 1;
    };
    /**
     * GetCurPage 获取当前页的数据
     */
    PageManager.prototype.GetCurPage = function () {
        //在列表上展示当前页
        this.context.SetCurPage(this.curPage);
        //获取每页条数
        var pagesize = this.context.GetPageSize();
        if (!pagesize) {
            console.error("pagesize is wrong!");
            return;
        }
        this.SetPageSize(pagesize);
        if (this.pageMode == PAGEMODE.SYNC) {
            //同步分页模式,直接将数据交给ListView
            this.context.SetData(mx(this.mData).skip((this.curPage - 1) * this.pageSize).take(this.pageSize).toArray());
        }
        else if (this.pageMode == PAGEMODE.ASYNC) {
            if (!this.context) {
                throw "context has not been set!";
            }
            //异步分页模式,请求服务器
            this.getData(this.curPage, this.pageSize);
        }
    };
    /**
     * FirstPage 首页
     */
    PageManager.prototype.FirstPage = function () {
        this.curPage = 1;
        this.GetCurPage();
    };
    /**
     * PrevPage 上一页
     */
    PageManager.prototype.PrevPage = function () {
        if (this.curPage <= 1) {
            return;
        }
        this.curPage--;
        this.GetCurPage();
    };
    /**
     * NextPage 下一页
     */
    PageManager.prototype.NextPage = function () {
        var nPageSize = this.context.GetPageSize();
        if (nPageSize >= this.pageSize && this.curPage >= this.pageCount) {
            return;
        }
        this.curPage++;
        this.GetCurPage();
    };
    /**
     * LastPage 末页
     */
    PageManager.prototype.LastPage = function () {
        if (this.pageCount < 1) {
            return;
        }
        this.curPage = this.pageCount;
        this.GetCurPage();
    };
    /**
     * TurnToPage 跳转到某页
     * @param index 页码
     */
    PageManager.prototype.TurnToPage = function (index) {
        var nPageSize = this.context.GetPageSize();
        if (index < 1 || (nPageSize >= this.pageSize && index > this.pageCount)) {
            return;
        }
        this.curPage = index;
        this.GetCurPage();
    };
    return PageManager;
}());
