define("tinyts2/core/http", ["require", "exports"], function (require, exports) {
    "use strict";
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
                this.url += this.protocol + "//";
            }
            this.url += this.host + this.pathname + this.search + this.hash;
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
        return HttpUtils;
    }());
    exports.HttpUtils = HttpUtils;
});
define("tinyts2/application/ts/http_test", ["require", "exports", "tinyts2/core/http"], function (require, exports, http_1) {
    "use strict";
    http_1.HttpUtils.Get("../ts/http_test.ts").then(function (res) {
        console.log(res.HttpStatus);
    }).catch(function (reason) {
        console.log(reason);
    });
});
