var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function log(target, key, value) {
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var a = args.map(function (a) { return JSON.stringify(a); }).join();
            var result = value.value.apply(this, args);
            var r = JSON.stringify(result);
            console.log("Call:" + key + "(" + a + ")=>" + r);
            return result;
        }
    };
}
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.foo = function (n) {
        return n * 2;
    };
    Object.defineProperty(D.prototype, "foo",
        __decorate([
            log, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Number]), 
            __metadata('design:returntype', void 0)
        ], D.prototype, "foo", Object.getOwnPropertyDescriptor(D.prototype, "foo")));
    return D;
})(Function);
//# sourceMappingURL=example.js.map