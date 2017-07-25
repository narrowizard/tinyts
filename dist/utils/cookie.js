"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * refrence to jquery.cookie
 */
var Cookie = (function () {
    function Cookie() {
    }
    /**
     * Get 获取指定键值
     * @param key 键名
     */
    Cookie.prototype.Get = function (key) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, key.length + 1) == (key + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(key.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    /**
     * Remove 移除指定键
     * @param key 键名
     */
    Cookie.prototype.Remove = function (key) {
        this.Set(key, null);
    };
    /**
     * Set 设置指定键
     * @param key 键名
     * @param value 值
     */
    Cookie.prototype.Set = function (key, value, options) {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // NOTE Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    };
    return Cookie;
}());
exports.CookieInstance = new Cookie();
