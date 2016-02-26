function validator(target) {
    // save a reference to the original constructor
    var original = target;
    var name = original.prototype.constructor.name;
    if (!name) {
        //IE不支持name属性
        name = original.toString().match(/^function\s*([^\s(]+)/)[1];
    }
    /**
     * 注册validator
     */
    ValidatePool.RegisterValidator(translateName(name), original);
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return construct(original, args);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
}
function translateName(input) {
    return "data-validate" + input.replace(/([A-Z])/g, "-$1").toLowerCase().substr(2);
}
var ValidatePool = (function () {
    function ValidatePool() {
    }
    ValidatePool.RegisterValidator = function (name, c) {
        ValidatePool.validators[name] = c;
    };
    /**
     * 创建一个validator实例
     */
    ValidatePool.GetValidator = function (name, value) {
        if (ValidatePool.validators[name]) {
            return new ValidatePool.validators[name](value);
        }
        else {
            return null;
        }
    };
    ValidatePool.validators = {};
    return ValidatePool;
})();
//# sourceMappingURL=IValidator.js.map