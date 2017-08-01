"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlComparison = (function () {
    function UrlComparison() {
    }
    return UrlComparison;
}());
exports.UrlComparison = UrlComparison;
/**
 * url parser 解析url地址
 */
var UrlParser = (function () {
    function UrlParser() {
    }
    /**
     * Parse 解析url
     */
    UrlParser.prototype.Parse = function (url) {
        this.url = url;
        this.searchObject = {};
        var parser = document.createElement('a'), queries, split, i;
        // Let the browser do the work
        parser.href = this.url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            if (split[0] != "" && split[1]) {
                var key = split[0];
                var val = decodeURIComponent(split[1]);
                if (this.searchObject[key]) {
                    if (Array.isArray(this.searchObject[key])) {
                        this.searchObject[key].push(val);
                    }
                    else {
                        var temp = this.searchObject[key];
                        this.searchObject[key] = [];
                        this.searchObject[key].push(temp);
                        this.searchObject[key].push(val);
                    }
                }
                else {
                    this.searchObject[key] = val;
                }
            }
        }
        this.protocol = parser.protocol;
        this.host = parser.host;
        this.hostname = parser.hostname;
        this.port = parser.port;
        this.pathname = parser.pathname.indexOf("/") == 0 ? parser.pathname : "/" + parser.pathname;
        this.search = parser.search;
        this.hash = parser.hash;
        // 解析pathname
        this.segments = this.pathname.substr(1).split("/");
        return this;
    };
    /**
     * 生成url
     */
    UrlParser.prototype.Generate = function () {
        this.search = "?";
        for (var temp in this.searchObject) {
            this.search += temp + "=" + this.searchObject[temp] + "&";
        }
        this.search = this.search.substr(0, this.search.length - 1);
        this.url = "";
        if (this.protocol) {
            if (!this.protocol.endsWith(":")) {
                this.protocol += ":";
            }
            this.url += this.protocol + "//";
        }
        this.url += this.host;
        if (!isNaN(+this.port)) {
            this.url += ":" + this.port;
        }
        this.url += this.pathname + this.search + this.hash;
        return this.url;
    };
    /**
     * CompareUrls 比较url,返回信息
     */
    UrlParser.CompareUrls = function (url1, url2) {
        var temp = new UrlComparison();
        var u1 = new UrlParser();
        var u2 = new UrlParser();
        u1.Parse(url1);
        u2.Parse(url2);
        temp.Path = u1.pathname.toLowerCase() == u2.pathname.toLocaleLowerCase();
        temp.Search = u1.search.toLowerCase() == u2.search.toLowerCase();
        temp.Hash = u1.hash.toLowerCase() == u2.hash.toLowerCase();
        temp.Host = u1.host.toLowerCase() == u2.host.toLowerCase();
        if (temp.Hash && temp.Host && temp.Path && temp.Search) {
            temp.Complete = true;
        }
        else {
            temp.Complete = false;
        }
        return temp;
    };
    return UrlParser;
}());
exports.UrlParser = UrlParser;
var HttpResponse = (function () {
    function HttpResponse() {
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
var HttpUtils = (function () {
    function HttpUtils() {
    }
    /**
     * Get 异步发送一个http get请求
     * @param url 请求url地址
     * @param params 请求参数
     * @return
     */
    HttpUtils.Get = function (url, params, otherOptions) {
        return new Promise(function (resolve, reject) {
            var baseOptions = {
                url: url,
                type: "GET",
                data: params,
                success: function (data, textStatus, jqXHR) {
                    var dd = new HttpResponse();
                    dd.ResponseBody = data;
                    dd.HttpStatus = jqXHR.status;
                    dd.jqXHR = jqXHR;
                    resolve(dd);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR.status);
                }
            };
            if (otherOptions) {
                baseOptions = $.extend({}, baseOptions, otherOptions);
            }
            $.ajax(baseOptions);
        });
    };
    /**
     * Get 异步发送一个http post请求
     * @param url 请求url地址
     * @param params 请求参数
     * @return
     */
    HttpUtils.Post = function (url, params, otherOptions) {
        return new Promise(function (resolve, reject) {
            var baseOptions = {
                url: url,
                type: "POST",
                data: params,
                success: function (data, textStatus, jqXHR) {
                    var dd = new HttpResponse();
                    dd.ResponseBody = data;
                    dd.HttpStatus = jqXHR.status;
                    dd.jqXHR = jqXHR;
                    resolve(dd);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR.status);
                }
            };
            if (otherOptions) {
                baseOptions = $.extend({}, baseOptions, otherOptions);
            }
            $.ajax(baseOptions);
        });
    };
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
var Router = (function () {
    function Router() {
        var me = this;
        window.onpopstate = function (event) {
            var state = event.state;
            if (me.context) {
                me.context.OnRoutePopState(state);
            }
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
        var res = UrlParser.CompareUrls(window.location.href, url);
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
    };
    /**
     * ReplaceCurrentStateWithParam 修改当前router的状态,并将data存储在url中
     */
    Router.prototype.ReplaceCurrentStateWithParam = function (url, data, changeRoute) {
        var me = this;
        // 将data添加到url中
        var xx = new UrlParser();
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
    };
    return Router;
}());
exports.routerInstance = new Router();
