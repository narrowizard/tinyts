/**
 * Time 时间转换
 */
export class Time {
    private _year: number;
    private _month: number;
    private _day: number;
    private _hour: number;
    private _minute: number;
    private _second: number;

    Reset() {
        this._year = this._month = this._day = this._hour = this._minute = this._second = 0;
    }

}

/**
 * CountDown 倒计时
 */
export class CountDown {

    /**
     * SetTime 设置倒计时时间
     */
    SetTime() {
        var t: Time = new Time();
    }

    /**
     * Start 开始倒计时
     */
    Start() {

    }

    protected tick() {

    }

}


/**
 * Chronograph 秒表
 */
export class Chronograph {

}