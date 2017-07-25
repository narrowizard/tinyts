"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Time 时间转换
 */
var Time = (function () {
    function Time() {
    }
    Time.prototype.SetDay = function (d) {
        this._day = d;
        return this;
    };
    Time.prototype.SetHour = function (h) {
        this._hour = h;
        return this;
    };
    Time.prototype.SetMinute = function (m) {
        this._minute = m;
        return this;
    };
    Time.prototype.SetSecond = function (s) {
        this._second = s;
        return this;
    };
    Time.prototype.Reset = function () {
        this._day = this._hour = this._minute = this._second = 0;
    };
    Time.prototype.GetSeconds = function () {
        return this._second + this._minute * 60 + this._hour * 60 * 60 + this._day * 24 * 60 * 60;
    };
    Time.prototype.GetDateTime = function () {
        var ss = this.GetSeconds();
        var d = Math.floor(ss / 86400);
        ss = ss - d * 86400;
        var h = Math.floor(ss / 3600);
        ss = ss - h * 3600;
        var m = Math.floor(ss / 60);
        ss = ss - m * 60;
        var s = ss;
        return {
            s: s,
            m: m,
            h: h,
            d: d
        };
    };
    return Time;
}());
exports.Time = Time;
/**
 * CountDown 倒计时
 */
var CountDown = (function () {
    function CountDown() {
    }
    /**
     * SetTime 设置倒计时时间
     * @param
     */
    CountDown.prototype.SetTime = function (s, m, h, d) {
        var t = new Time();
        if (!m) {
            m = 0;
        }
        if (!h) {
            h = 0;
        }
        if (!d) {
            d = 0;
        }
        this._seconds = t.SetDay(d).SetHour(h).SetMinute(m).SetSecond(s).GetSeconds() + 1;
    };
    CountDown.prototype.setInterval = function () {
        var me = this;
        this._running = true;
        me.tick();
        this._interval = setInterval(function () {
            me.tick();
        }, 1000);
    };
    CountDown.prototype.clearInterval = function () {
        this._running = false;
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    };
    CountDown.prototype.tick = function () {
        var me = this;
        //停止状态
        if (!me._running) {
            me.clearInterval();
            return;
        }
        //倒计时处理函数
        me._cur--;
        if (me._cur == 0) {
            if (me.onFinished) {
                me.onFinished(0);
                me.clearInterval();
            }
        }
        else {
            if (me.onTick) {
                var t = new Time();
                t.SetSecond(me._cur);
                var dd = t.GetDateTime();
                me.onTick(me._cur, dd);
            }
        }
    };
    /**
     * Start 开始倒计时
     */
    CountDown.prototype.Start = function () {
        if (this._running) {
            return;
        }
        var me = this;
        if (!me.onTick && !me.onFinished) {
            console.error("both onTick and onFinished undefined!");
            return;
        }
        this._cur = this._seconds;
        me.setInterval();
    };
    /**
     * Stop 停止计时,并清空计时时间
     */
    CountDown.prototype.Stop = function () {
        if (!this._running) {
            return;
        }
        this.clearInterval();
        if (this.onFinished) {
            this.onFinished(this._cur);
        }
        this._cur = 0;
    };
    /**
     * Pause 暂停计时
     */
    CountDown.prototype.Pause = function () {
        this.clearInterval();
    };
    /**
     * Recover 恢复计时
     */
    CountDown.prototype.Recover = function () {
        if (this._running) {
            return;
        }
        var me = this;
        this._running = true;
        this.setInterval();
    };
    /**
     * Reset 重置计时器,清空时间参数
     */
    CountDown.prototype.Reset = function () {
        this.clearInterval();
        this._cur = 0;
        this._seconds = 0;
    };
    return CountDown;
}());
exports.CountDown = CountDown;
