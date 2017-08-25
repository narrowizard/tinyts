"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
var Router = (function () {
    function Router() {
        var me = this;
        this.routerMap = {};
        window.onpopstate = function (event) {
            var state = event.state;
            if (me.context) {
                me.context.OnRoutePopState(state);
            }
            me.routerMap[state.url]();
        };
    }
    /**
     * SetContext 设置上下文
     * @param context.OnRouteSucc 路由完成回调
     * @param context.OnRouteError 路由错误回调
     */
    Router.prototype.SetContext = function (context) {
        this.context = context;
    };
    /**
     * GoBack 返回上一页
     */
    Router.prototype.GoBack = function () {
        window.history.back();
    };
    /**
     * GoForward 前往下一页
     */
    Router.prototype.GoForward = function () {
        window.history.forward();
    };
    /**
     * GoTo 修改当前url为指定url,并触发context的OnRouteChange事件
     * @param url 指定url
     * @param data 可能存在的参数
     */
    Router.prototype.GoTo = function (url, data, param) {
        //首先判断路由是否有变化,如果没有变化,则不作跳转
        var res = http_1.UrlParser.CompareUrls(window.location.href, url);
        if (res.Complete) {
            return;
        }
        var me = this;
        var stateData = { url: url, data: data, param: param };
        if (window.history.pushState) {
            window.history.pushState(stateData, "", url);
        }
        if (me.context) {
            me.context.OnRouteChange(url, data);
        }
        this.routerMap[url]();
    };
    /**
     * ReplaceCurrentState 修改当前router的状态(无历史记录)
     * @param url 指定的url
     * @param data 当前router的数据
     */
    Router.prototype.ReplaceCurrentState = function (url, data, param) {
        var me = this;
        var stateData = { url: url, data: data, param: param };
        if (window.history.replaceState) {
            window.history.replaceState(stateData, "", url);
        }
        if (me.context) {
            me.context.OnRouteChange(url, data);
        }
        this.routerMap[url]();
    };
    /**
     * ReplaceCurrentStateWithParam 修改当前router的状态,并将data存储在url中
     */
    Router.prototype.ReplaceCurrentStateWithParam = function (url, data, changeRoute) {
        var me = this;
        // 将data添加到url中
        var xx = new http_1.UrlParser();
        xx.Parse(url);
        xx.searchObject = $.extend(xx.searchObject, data);
        var url2 = xx.Generate();
        var stateData = { url: url, data: {} };
        if (window.history.replaceState) {
            window.history.replaceState(stateData, "", url2);
        }
        if (changeRoute && me.context) {
            me.context.OnRouteChange(url2, stateData);
        }
        this.routerMap[url]();
    };
    Router.prototype.addRouter = function (url, func) {
        if (this.routerMap[url]) {
            console.warn("router " + url + " already exist, overwrite it!");
        }
        this.routerMap[url] = func;
    };
    Router.prototype.AddAncViewRoute = function (url, c) {
        this.addRouter(url, function () {
            var aa = new c();
        });
    };
    Router.prototype.AddFuncRouter = function (url, func) {
        this.addRouter(url, function () {
            func();
        });
    };
    return Router;
}());
exports.Router = Router;
