/**
 * CookieOptions Cookie的设置参数
 * @param expires 过期时间,可以是数字(天),或者过期时间
 * @param path 
 * @param domain
 * @param secure 
 */
interface CookieOptions {
    expires?: any;
    path?: string;
    domain?: string;
    secure?: boolean;
}

/**
 * refrence to jquery.cookie
 */
class Cookie {

    Get(key: string) {
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
    }

    Set(key: string, value: string, options: CookieOptions) {
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
            } else {
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
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
}

export var CookieInstance = new Cookie();