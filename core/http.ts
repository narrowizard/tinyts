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
        this.url = "";
        if (this.protocol) {
            this.url += this.protocol + "//";
        }
        this.url += this.host + this.pathname + this.search + this.hash;
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

}


