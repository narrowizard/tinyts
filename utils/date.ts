export class TsDate {
    date: Date;

    constructor(dateString?: string) {
        if (!dateString) {
            // 获取当前时间
            this.date = new Date();
            return this;
        }
        var D = new Date('2011-06-02T09:34:29+02:00');
        if (!D || +D !== 1307000069000) {
            //不支持ISO格式的js引擎
            var day, tz,
                rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
                p = rx.exec(dateString) || [];
            if (p[1]) {
                day = p[1].split(/\D/);
                for (var i = 0, L = day.length; i < L; i++) {
                    day[i] = parseInt(day[i], 10) || 0;
                }
                day[1] -= 1;
                day = new Date(Date.UTC.apply(Date, day));
                if (!day.getDate()) this.date = null;
                if (p[5]) {
                    tz = (parseInt(p[5], 10) * 60);
                    if (p[6]) tz += parseInt(p[6], 10);
                    if (p[4] == '+') tz *= -1;
                    if (tz) day.setUTCMinutes(day.getUTCMinutes() + tz);
                }
                this.date = day;
            }
            this.date = null;
        }
        else {
            this.date = new Date(dateString);
        }
    }

    /**
     * fromISO 由ISO对象生成一个TsDate对象
     * @param s ISO格式的Date字符串
     * @return 若参数为空,返回null
     */
    static fromISO(s: string): TsDate {
        var temp = new TsDate(s);
        if (!s) {
            return null;
        }
        return temp;
    }

    /**
     * Format 按照指定格式格式化Date String
     * @param fmt 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     */
    Format(fmt: string): string {
        var o = {
            "M+": this.date.getMonth() + 1, //月份
            "d+": this.date.getDate(), //日
            "h+": this.date.getHours(), //小时
            "m+": this.date.getMinutes(), //分
            "s+": this.date.getSeconds(), //秒
            "q+": Math.floor((this.date.getMonth() + 3) / 3), //季度
            "S": this.date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}