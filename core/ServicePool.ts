class ServicePool {
    instances: { [key: string]: IService };

    constructor() {
        this.instances = {};
    }

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

var ServicePoolInstance = new ServicePool();
