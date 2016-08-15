/**
 * ServicePool 服务池
 * 
 * 为了解决不同的视图模型(ViewModel)中对Service引用(以及初始化)的繁琐
 * 引入了服务池(ServicePool),服务池是一个单例(Single Instance).
 * 并且已经在引入该文件的时候实例化了这个单例(ServicePoolInstance).
 * methods:
 * GetService(T extends IService):T 得到某个服务的实例
 * ReleaseService 释放服务(未实现) 
    * 释放服务应该提供两种接口:
    * 一、手动调用ReleaseService方法释放服务
    * 二、引用某种算法自动释放服务（LRU）
 * 
 */
class ServicePool {
    instances: { [key: string]: IService };

    constructor() {
        this.instances = {};
    }

    /**
     * GetService 获取某个服务的实例
     * @param Class 某服务类的构造函数
     * @return 该服务实例对象
     */
    GetService<T extends IService>(Class: { new (): T }): T {
        var name = Class.prototype.constructor.name;
        if (!name) {
            //IE不支持name属性
            name = Class.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        if (this.instances[name]) {

        } else {
            this.instances[name] = new Class();
        }
        return <T>this.instances[name];
    }

    ReleaseService() {

    }

}

export var ServicePoolInstance = new ServicePool();

/**
 * stable 表示该方法可以使用数据池缓存数据
 */
function stable() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__methods__) {
            target.__methods__ = [];
        }
        target.__methods__.push(propertyKey);
    }
}

interface IHttpRequest {

    GET<T>(url: string, data?): Promise<T>;

    POST<T>(url: string, data): Promise<T>;
}

/**
 * 这是一个处理Http请求的类,在该类的底层实现了一个数据池
 * 针对一些常用的且
 */
export class HttpRequset {

    private static http: IHttpRequest;

    /**
     * SetHttpHandler 设置http处理器
     */
    static SetHttpHandler(handler: IHttpRequest) {
        this.http = handler;
    }

    static Get<T>(url: string, data?): Promise<T> {
        // 发送http请求
        var promise = this.http.GET<T>(url, data);
        promise.then((response) => {

            return response;
        })
        return promise;
    }
}

// 以下是测试内容

// 这是一个实现http方法的类,在这里直接使用了jquery ajax
// 你可以在这里实现对http response的统一处理
class http implements IHttpRequest {

    GET<T>(url: string, data?) {
        var p = new Promise<T>((resolve, reject) => {
            $.ajax({
                url: url,
                data: data,
                type: "GET",
                success: (response) => {
                    if (response.Code == 0) {
                        resolve(response.Data);
                    } else {
                        reject(response);
                    }
                },
                error: (response) => {
                    reject({ Code: -1, Message: "网络错误!" });
                }
            });
        });
        // 可以在这里统一处理错误
        p.catch((response) => {
            console.log(response.Message);
        });

        return p;
    }

    POST<T>(url: string, data?) {
        var p = new Promise<T>((resolve, reject) => {
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                success: (response) => {
                    if (response.Code == 0) {
                        resolve(response.Data);
                    } else {
                        reject(response);
                    }
                },
                error: (response) => {
                    reject({ Code: -1, Message: "网络错误!" });
                }
            });
        });

        // 可以在这里统一处理错误
        p.catch((response) => {
            console.log(response.Message);
        });

        return p;
    }
}

// 首先设置http处理器
HttpRequset.SetHttpHandler(new http());

// 下面实现一个service
class DemoService {

    @stable()
    GetData(data: { Param1: string, Param2: number }) {
        return HttpRequset.Get<string[]>("/program/getsomedata", data);
    }
}

// 下面使用该service

ServicePoolInstance.GetService(DemoService).GetData({ Param1: "我是第一个参数", Param2: 1 }).then((data) => {
    // 输出返回值
    console.log(data.join(","));
});