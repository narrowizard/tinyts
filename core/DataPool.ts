import {dataPoolReleaseRate} from '../config/TinytsConfig';

interface dataPoolPoint {
    deadLine: Date;
    data: any;
    heat: number;
}

/**
 * DataPool 数据池,配合单页面应用效果更好哟
 * 对于一些较为稳定的数据,使用Data Pool能节约较多的网络请求,从而提高应用的效率
 */
class DataPool {

    constructor() {
        this.dataPool = {};
        this.dataHandler = {};
        // 在构造函数里读取localStorage
        this.read();
    }

    /**
     * dataPool 内存池
     */
    protected dataPool: { [key: string]: { [paramkey: string]: dataPoolPoint } };

    /**
     * dataGetter 数据获取器
     */
    protected dataHandler: { [key: string]: { expire: number, getData: (param: any) => Promise<any> } };

    /**
     * GetData 从Data Pool中取数据
     * @param dataKey 数据键名
     * @param param 参数(必须是对象)
     * @param callback 获取数据的成功回调
     */
    GetData(dataKey: string, param: any, callback: (data) => void) {
        var paramKey = "";
        if (param) {
            paramKey = JSON.stringify(param);
        } else {
            paramKey = "tinyts";
        }
        // 首先查看是否定义了数据获取器
        if (!this.dataHandler[dataKey]) {
            // 未定义数据获取器
            console.warn("未定义数据获取器");
        }
        // 从dataPool中查找数据
        if (!this.dataPool[dataKey] || !this.dataPool[dataKey][paramKey]
            || (this.dataPool[dataKey][paramKey].deadLine && this.dataPool[dataKey][paramKey].deadLine.getTime() < (new Date()).getTime())) {
            // dataPool中不存在或已过期,请求数据
            this.requestData(dataKey, param, paramKey, callback);
        } else {
            this.dataPool[dataKey][paramKey].heat++;
            callback(this.dataPool[dataKey][paramKey].data);
        }
    }

    /**
     * ForceData 强制刷新并获取数据
     */
    ForceData(dataKey: string, param: any, callback: (data) => void) {
        var paramKey = "";
        if (param) {
            paramKey = JSON.stringify(param);
        } else {
            paramKey = "tinyts";
        }
        this.requestData(dataKey, param, paramKey, callback);
    }

    /**
     * RegisterData 注册数据,加入到DataPool需要维护的数据列表中
     * @param dataKey 数据键名
     * @param dataGetter 数据获取方法
     * @param expire 有效期
     */
    RegisterData(dataKey: string, dataGetter: (param: any) => Promise<any>, expire?: number) {
        if (this.dataHandler[dataKey]) {
            // 该数据获取器已存在
            return;
        }
        if (!expire) {
            expire = 0;
        }
        var temp = {
            expire: expire,
            getData: dataGetter
        };
        this.dataHandler[dataKey] = temp;
    }

    /**
     * requestData 请求数据
     */
    protected requestData(dataKey: string, param: any, paramkey: string, callback: (data) => void) {
        var me = this;

        if (!this.dataHandler[dataKey]) {
            // 数据获取器未定义
            console.error("数据获取器未定义");
            return;
        }
        var expire = this.dataHandler[dataKey].expire;

        this.dataHandler[dataKey].getData(param).then((data) => {
            if (!me.dataPool[dataKey]) {
                me.dataPool[dataKey] = {};
            }
            if (!me.dataPool[dataKey][paramkey]) {
                me.dataPool[dataKey][paramkey] = { deadLine: null, data: null, heat: 1 };
            }
            // 请求数据成功
            if (expire > 0) {
                // 计算有效期
                var now = new Date();
                var deadLine = new Date(now.getTime() + expire);
                me.dataPool[dataKey][paramkey].deadLine = deadLine;
            } else {
                me.dataPool[dataKey][paramkey].deadLine = null;
            }
            me.dataPool[dataKey][paramkey].data = data;
            callback(me.dataPool[dataKey][paramkey].data);
            this.write();
        });
    }

    /**
     * write 将DataPool中的数据写入Local Storage
     * 在写入之前需要使用JSON.stringify
     */
    protected write() {
        // 首先释放已过期的数据
        this.removeOverdue();
        localStorage.setItem("tinytsDataPool", JSON.stringify(this.dataPool));
    }

    /**
     * read 从Local Storage中读取data到data pool中
     * 在读取之后需要使用JSON.parse
     */
    protected read() {
        var data = localStorage.getItem("tinytsDataPool");
        if (!data) {
            return;
        }
        var temp = JSON.parse(data);
        this.dataPool = temp;
        // 释放已过期的数据
        this.removeOverdue();
    }

    /**
     * removeOverdue 释放已过期的数据,该方法将在DataPool内部被自动调用
     */
    protected removeOverdue() {
        for (var property in this.dataPool) {
            for (var pk in this.dataPool[property]) {
                if (this.dataPool[property][pk].deadLine && (this.dataPool[property][pk].deadLine.getTime() < (new Date()).getTime())) {
                    // 已过期
                    if (pk == "tinyts") {
                        delete this.dataPool[property];
                        break;
                    } else {
                        delete this.dataPool[property][pk];
                        continue;
                    }
                }
            }
        }
    }

    /**
     * releaseData 清理内存,清除不常用的数据
     * @param rate 释放的数据比例 0 < rate < 1
     */
    protected releaseData(rate: number) {
        if (rate < 0 || rate > 1) {
            return;
        }

    }
}

export var dataPoolInstance = new DataPool();
