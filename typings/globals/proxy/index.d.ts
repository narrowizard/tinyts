interface IProxy {
    set: (target, property, value) => void;
}

declare class Proxy<T> {
    constructor(object: T, proxy: IProxy);
}

