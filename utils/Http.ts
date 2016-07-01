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

    /**
     * Parse 解析url
     */
    Parse(url: string): UrlParser {
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
            if (split[0] != "" && split[1]) {
                this.searchObject[split[0]] = decodeURIComponent(split[1]);
            }
        }

        this.protocol = parser.protocol;
        this.host = parser.host;
        this.hostname = parser.hostname;
        this.port = parser.port;
        this.pathname = parser.pathname.indexOf("/") == 0 ? parser.pathname : "/" + parser.pathname;
        this.search = parser.search;
        this.hash = parser.hash;

        return this;
    }

    /**
     * 生成url
     */
    Generate(): string {
        this.search = "?";
        for (var temp in this.searchObject) {
            this.search += `${temp}=${this.searchObject[temp]}&`;
        }
        this.search = this.search.substr(0, this.search.length - 1);
        this.url = this.protocol + "//" + this.host + this.pathname + this.search + this.hash;
        return this.url;
    }

};

/**
 * HttpUtils 该类封装了一个请求池,保证同一个请求同时只被发送一次
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

class Router {

    context: {
        // url 改变
        OnRouteChange: (url: string, data?: any) => void,
        // 触发前进、后退事件
        OnRoutePopState: (state: { url: string, data: any }) => void
    };

    /**
     * SetContext 设置上下文
     * @param context.OnRouteSucc 路由完成回调
     * @param context.OnRouteError 路由错误回调
     */
    SetContext(context: {
        OnRouteChange: (url: string, data?: any) => void,
        OnRoutePopState: (state: { url: string, data: any }) => void
    }) {
        this.context = context;
    }

    constructor() {
        var me = this;
        window.onpopstate = function (event) {
            var state = event.state;
            me.context.OnRoutePopState(state);
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
     * GoTo 修改当前url为指定url,并触发context的OnRouteChange事件
     * @param url 指定url
     * @param data 可能存在的参数
     */
    GoTo(url: string, data: any, param?: any) {
        var me = this;
        var stateData = { url: url, data: data, param: param };
        window.history.pushState(stateData, "", url);
        me.context.OnRouteChange(url, data);
    }

    /**
     * ReplaceCurrentState 修改当前router的状态(无历史记录)
     * @param url 指定的url
     * @param data 当前router的数据
     */
    ReplaceCurrentState(url: string, data: any, param?: any) {
        var me = this;
        var stateData = { url: url, data: data, param: param };
        window.history.replaceState(stateData, "", url);
        me.context.OnRouteChange(url, data);
    }

    /**
     * ReplaceCurrentStateWithParam 修改当前router的状态,并将data存储在url中
     */
    ReplaceCurrentStateWithParam(url: string, data: any) {
        var me = this;
        // 将data添加到url中
        var xx = new UrlParser();
        xx.Parse(url);
        xx.searchObject = $.extend(xx.searchObject, data);
        var url2 = xx.Generate();
        var stateData = { url: url, data: {} };
        window.history.replaceState(stateData, "", url2);
        me.context.OnRouteChange(url2, stateData);
    }
}

export var routerInstance = new Router();