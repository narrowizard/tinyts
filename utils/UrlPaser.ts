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
        this.pathname = parser.pathname;
        this.search = parser.search;
        this.hash = parser.hash;
    }

}