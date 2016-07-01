export function GenerateSetAccessor<T>(validator: (...args: T[]) => boolean, getErr: (tagName: string) => string): (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<T>) => void {
    return (target: IModel, propertyName: string, descriptor: TypedPropertyDescriptor<T>) => {
        var originalSet = descriptor.set;
        if (descriptor.set != null) {
            descriptor.set = function (...args: T[]) {
                if (validator(...args)) {
                    //验证成功
                    originalSet.call(this, ...args);
                } else {
                    if (!target["__tag__"]) {
                        target["__tag__"] = {};
                    }
                    var temp = target.constructor["__tag__"]["_" + propertyName];
                    var tagName = temp == null ? propertyName : temp;
                    //在这里调用错误回调
                    if (target.OnValidateError) {
                        target.OnValidateError(getErr(tagName));
                    }
                    //并抛出异常
                    throw `${tagName} validate failed!`;
                }
            };
        }
    };
}