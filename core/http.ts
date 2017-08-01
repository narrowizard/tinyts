export class UrlComparison {
    Host: boolean;
    Path: boolean;
    Search: boolean;
    Hash: boolean;
    Complete: boolean;
}

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
    segments: string[];
    search: string;
    searchObject: { [key: string]: string | any[] };
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
                var key = split[0];
                var val = decodeURIComponent(split[1]);
                if (this.searchObject[key]) {
                    if (Array.isArray(this.searchObject[key])) {
                        (this.searchObject[key] as Array<any>).push(val);
                    } else {
                        var temp = this.searchObject[key];
                        this.searchObject[key] = [];
                        (this.searchObject[key] as Array<any>).push(temp);
                        (this.searchObject[key] as Array<any>).push(val);
                    }
                } else {
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
    }

    /**
     * CompareUrls 比较url,返回信息
     */
    static CompareUrls(url1: string, url2: string): UrlComparison {
        var temp: UrlComparison = new UrlComparison();
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
        } else {
            temp.Complete = false;
        }
        return temp;
    }
}

export class HttpResponse {
    /**
     * HttpStatus http 状态码
     */
    HttpStatus: number;

    /**
     * ResponseBody 返回值
     */
    ResponseBody: string;

    /**
     * jqXHR 包含异步请求response的所有信息
     */
    jqXHR: JQueryXHR;

}

export class HttpUtils {

    /**
     * Get 异步发送一个http get请求
     * @param url 请求url地址
     * @param params 请求参数
     * @return 
     */
    public static Get(url: string, params?: Object, otherOptions?: JQueryAjaxSettings): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            var baseOptions: JQueryAjaxSettings = {
                url: url,
                type: "GET",
                data: params,
                success: (data: any, textStatus: string, jqXHR: JQueryXHR) => {
                    var dd = new HttpResponse();
                    dd.ResponseBody = data;
                    dd.HttpStatus = jqXHR.status;
                    dd.jqXHR = jqXHR;
                    resolve(dd);
                },
                error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                    reject(jqXHR.status);
                }
            };
            if (otherOptions) {
                baseOptions = $.extend({}, baseOptions, otherOptions);
            }
            $.ajax(baseOptions);
        });
    }

    /**
     * Get 异步发送一个http post请求
     * @param url 请求url地址
     * @param params 请求参数
     * @return 
     */
    public static Post(url: string, params?: Object, otherOptions?: JQueryAjaxSettings): Promise<HttpResponse> {
        return new Promise<HttpResponse>((resolve, reject) => {
            var baseOptions: JQueryAjaxSettings = {
                url: url,
                type: "POST",
                data: params,
                success: (data: any, textStatus: string, jqXHR: JQueryXHR) => {
                    var dd = new HttpResponse();
                    dd.ResponseBody = data;
                    dd.HttpStatus = jqXHR.status;
                    dd.jqXHR = jqXHR;
                    resolve(dd);
                },
                error: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                    reject(jqXHR.status);
                }
            };
            if (otherOptions) {
                baseOptions = $.extend({}, baseOptions, otherOptions);
            }
            $.ajax(baseOptions);
        });
    }

}

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
            if (me.context) {
                me.context.OnRoutePopState(state);
            }
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
    }

    /**
     * ReplaceCurrentState 修改当前router的状态(无历史记录)
     * @param url 指定的url
     * @param data 当前router的数据
     */
    ReplaceCurrentState(url: string, data: any, param?: any) {
        var me = this;
        var stateData = { url: url, data: data, param: param };
        if (window.history.replaceState) {
            window.history.replaceState(stateData, "", url);
        }
        if (me.context) {
            me.context.OnRouteChange(url, data);
        }
    }

    /**
     * ReplaceCurrentStateWithParam 修改当前router的状态,并将data存储在url中
     */
    ReplaceCurrentStateWithParam(url: string, data: any, changeRoute?: boolean) {
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
    }
}

export var routerInstance = new Router();