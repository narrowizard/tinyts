import {Extend} from './Array';

Extend();

/**
 * url parser 解析url地址
 */
export class UrlParser {
    //原始地址
    url: string;
    //解析结果
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchObject: { [key: string]: string };
    hash: string;

    Parse(url: string) {
        this.url = url;
        this.searchObject = {};
        var parser = document.createElement('a'),
            queries, split, i;
        // Let the browser do the work
        parser.href = this.url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            this.searchObject[split[0]] = split[1];
        }

        this.protocol = parser.protocol;
        this.host = parser.host;
        this.hostname = parser.hostname;
        this.port = parser.port;
        this.pathname = parser.pathname.indexOf("/") == 0 ? parser.pathname : "/" + parser.pathname;
        this.search = parser.search;
        this.hash = parser.hash;
    }

};

/**
 * HttpUtils 该方法封装了一个请求池,保证同一个请求同时只被发送一次
 */
export class HttpUtils {

    protected static RequestPool: string[] = [];

    /**
     * Go 发起http请求
     */
    public static Go(url: string, success, failed, otherSettings) {
        var urlPaser = new UrlParser();
        urlPaser.Parse(url);

        var exist = Enumerable.from(HttpUtils.RequestPool).where(it => it == urlPaser.hostname + urlPaser.pathname).firstOrDefault();
        if (exist) {
            //请求已存在,放弃
            return;
        }

        this.RequestPool.push(urlPaser.hostname + urlPaser.pathname);
        var ajaxSettings = {
            url: url,
            success: function (response) {
                //移除已存在的请求
                var urlPaser = new UrlParser();
                urlPaser.Parse(this.url);
                HttpUtils.RequestPool.remove(it => it == urlPaser.hostname + urlPaser.pathname);

                success(response);
            },
            error: function (response) {
                //移除已存在的请求
                var urlPaser = new UrlParser();
                urlPaser.Parse(this.url);
                HttpUtils.RequestPool.remove(it => it == urlPaser.hostname + urlPaser.pathname);

                failed(response);
            }
        };
        var newSettings = $.extend({}, ajaxSettings, otherSettings);
        $.ajax(newSettings);
    }
};

export class Router {

    context: {
        OnRouteSucc: (html: string) => void,
        OnRouteError: (error: string) => void
    };

    /**
     * SetContext 设置上下文
     * @param context.OnRouteSucc 路由完成回调
     * @param context.OnRouteError 路由错误回调
     */
    SetContext(context: {
        OnRouteSucc: (html: string) => void,
        OnRouteError: (error: string) => void
    }) {
        this.context = context;
    }

    constructor() {
        var me = this;
        window.onpopstate = function (event) {
            var state = event.state;
            var url = state.url;
            var data = state.data;
            me.GetPage(url, data);
        }
    }

    /**
     * GoBack 返回上一页
     */
    GoBack() {
        window.history.back();
    }

    /**
     * GoForward 前往下一页 
     */
    GoForward() {
        window.history.forward();
    }

    /**
     * GoTo 修改当前url为指定url,并请求该url
     * @param url 指定url
     * @param data 可能存在的参数
     */
    GoTo(url: string, data) {
        var me = this;
        var stateData = { url: url, data: data };
        window.history.pushState(stateData, "", url);
        me.GetPage(url, data);
    }

    /**
     * GetPage 获取异步页面
     * @param url 请求地址
     * @param data 请求参数
     */
    GetPage(url: string, data) {
        if (!me.context) {
            console.error("router:context not defined!");
            return;
        }
        var me = this;
        //异步请求页面
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: (response) => {
                me.context.OnRouteSucc(response);
            },
            error: (err) => {
                me.context.OnRouteError(err.statusText);
            }
        });
    }

    /**
     * ReplaceCurrentState 修改当前router的状态(无历史记录),并执行异步请求
     * @param url 指定的url
     * @param data 当前router的数据
     */
    ReplaceCurrentState(url: string, data) {
        var me = this;
        var stateData = { url: url, data: data };
        window.history.replaceState(stateData, "", url);
        me.GetPage(url, data);
    }

    /**
     * RegisterCurrentState 为当前的url注册router state,并执行异步请求
     */
    RegisterCurrentState() {
        var me = this;
        var url = window.location.href;
        me.ReplaceCurrentState(url, null);
    }
}