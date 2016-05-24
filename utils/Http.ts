import {Extend} from './Array';

Extend();

/**
 * url parser 解析url地址
 */
export class UrlPaser {
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

}

/**
 * HttpUtils 该方法封装了一个请求池,保证同一个请求同时只被发送一次
 */
export class HttpUtils {

    protected static RequestPool: string[] = [];

    /**
     * Go 发起http请求
     */
    public static Go(url: string, success, failed, otherSettings) {
        var exist = Enumerable.from(HttpUtils.RequestPool).where(it => it == url).firstOrDefault();
        if (exist) {
            //请求已存在,放弃
            return;
        }
        this.RequestPool.push(url);
        var ajaxSettings = {
            url: url,
            success: function (response) {
                //移除已存在的请求
                var urlPaser = new UrlPaser();
                urlPaser.Parse(this.url);
                HttpUtils.RequestPool.remove(it => it == urlPaser.pathname);

                success(response);
            },
            error: function (response) {
                //移除已存在的请求
                var urlPaser = new UrlPaser();
                urlPaser.Parse(this.url);
                HttpUtils.RequestPool.remove(it => it == urlPaser.pathname);

                failed(response);
            }
        };
        var newSettings = $.extend({}, ajaxSettings, otherSettings);
        $.ajax(newSettings);
    }
}