import { View } from './view';
import { AncView } from './tinyts';
import { routerInstance, UrlParser } from './http';

export class Router {

    protected routerMap: { [url: string]: () => void };

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
        this.routerMap = {};

        window.onpopstate = function (event) {
            var state = event.state;
            if (me.context) {
                me.context.OnRoutePopState(state);
            }
            me.routerMap[state.url]();
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
    GoTo(url: string, data: any, param?: any): Promise<void> {
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
        this.routerMap[url]();
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
        this.routerMap[url]();
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
        this.routerMap[url]();
    }

    protected addRouter(url: string, func: () => void) {
        if (this.routerMap[url]) {
            console.warn(`router ${url} already exist, overwrite it!`);
        }
        this.routerMap[url] = func;
    }

    AddAncViewRoute(url: string, c: { new (...args: any[]): AncView }) {
        this.addRouter(url, () => {
            var aa = new c();
        });
    }

    AddFuncRouter(url: string, func: () => void) {
        this.addRouter(url, () => {
            func();
        });
    }
}