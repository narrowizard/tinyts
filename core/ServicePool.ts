class ServicePool {
    instances: { [key: string]: IService };

    constructor() {
        this.instances = {};
    }

    GetService<T extends IService>(Class: { new (): T }): T {
        var name = Class.prototype.constructor.name;
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
