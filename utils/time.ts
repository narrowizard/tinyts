/**
 * Time 时间转换
 */
export class Time {
    private _day: number;
    private _hour: number;
    private _minute: number;
    private _second: number;

    SetDay(d: number): Time {
        this._day = d;
        return this;
    }

    SetHour(h: number): Time {
        this._hour = h;
        return this;
    }

    SetMinute(m: number): Time {
        this._minute = m;
        return this;
    }

    SetSecond(s: number): Time {
        this._second = s;
        return this;
    }

    Reset() {
        this._day = this._hour = this._minute = this._second = 0;
    }

    GetSeconds(): number {
        return this._second + this._minute * 60 + this._hour * 60 * 60 + this._day * 24 * 60 * 60;
    }

    GetDateTime(): { s: number, m: number, h: number, d: number } {
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
    }

}

/**
 * CountDown 倒计时
 */
export class CountDown {

    private _seconds: number;

    private _cur: number;

    private _running: boolean;

    private _interval: number;

    /**
     * OnTick 倒计时触发回调
     * @param seconds 以秒的形式返回当前时间
     * @param time.s 秒
     * @param time.m 分
     * @param time.h 时
     * @param time.d 天
     */
    onTick: (seconds: number, time: { s: number, m: number, h: number, d: number }) => void;

    /**
     * OnFinished 计时结束回调,将在倒计时结束或者调用Stop的时候触发
     * @param remain 剩余时间(秒)
     */
    onFinished: (remain: number) => void;

    /**
     * SetTime 设置倒计时时间
     * @param
     */
    SetTime(s: number, m?: number, h?: number, d?: number) {
        var t: Time = new Time();
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
    }

    protected setInterval() {
        var me = this;
        this._running = true;
        me.tick();
        this._interval = setInterval(() => {
            me.tick();
        }, 1000);
    }

    protected clearInterval() {
        this._running = false;
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    protected tick() {
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
        } else {
            if (me.onTick) {
                var t = new Time();
                t.SetSecond(me._cur);
                var dd = t.GetDateTime();
                me.onTick(me._cur, dd);
            }
        }
    }

    /**
     * Start 开始倒计时
     */
    Start() {
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
    }

    /**
     * Stop 停止计时,并清空计时时间
     */
    Stop() {
        if (!this._running) {
            return;
        }
        this.clearInterval();
        if (this.onFinished) {
            this.onFinished(this._cur);
        }
        this._cur = 0;
    }

    /**
     * Pause 暂停计时
     */
    Pause() {
        this.clearInterval();
    }

    /**
     * Recover 恢复计时
     */
    Recover() {
        if (this._running) {
            return;
        }
        var me = this;
        this._running = true;
        this.setInterval();
    }

    /**
     * Reset 重置计时器,清空时间参数
     */
    Reset() {
        this.clearInterval();
        this._cur = 0;
        this._seconds = 0;
    }
}

