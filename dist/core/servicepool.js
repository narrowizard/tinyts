"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var ServicePool = (function () {
    function ServicePool() {
        this.instances = {};
    }
    /**
     * GetService 获取某个服务的实例
     * @param Class 某服务类的构造函数
     * @return 该服务实例对象
     */
    ServicePool.prototype.GetService = function (Class) {
        var name = Class.prototype.constructor.name;
        if (!name) {
            //IE不支持name属性
            name = Class.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        if (this.instances[name]) {
        }
        else {
            this.instances[name] = new Class();
        }
        return this.instances[name];
    };
    ServicePool.prototype.ReleaseService = function () {
    };
    return ServicePool;
}());
exports.ServicePoolInstance = new ServicePool();
