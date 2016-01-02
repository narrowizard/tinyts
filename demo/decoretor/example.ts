function log(target: Function, key: string, value: any) {
    return {
        value: function(...args: any[]) {
            var a = args.map(a => JSON.stringify(a)).join();
            var result = value.value.apply(this, args);
            var r = JSON.stringify(result);
            console.log(`Call:${key}(${a})=>${r}`);
            return result;
        }
    }
}

class D extends Function{

    @log
    foo(n: number) {
        return n * 2;
    }
}

