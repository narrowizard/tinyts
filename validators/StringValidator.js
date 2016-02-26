var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var VMaxLength = (function () {
    function VMaxLength(maxLength) {
        this.maxLength = maxLength;
    }
    VMaxLength.prototype.GetMessage = function () {
        return "\u6700\u591A\u8F93\u5165" + this.maxLength + "\u4E2A\u5B57\u7B26.";
    };
    VMaxLength.prototype.Validate = function (input) {
        return input.length <= this.maxLength;
    };
    VMaxLength = __decorate([
        validator, 
        __metadata('design:paramtypes', [Number])
    ], VMaxLength);
    return VMaxLength;
})();
var VMinLength = (function () {
    function VMinLength(minLength) {
        this.minLength = minLength;
    }
    VMinLength.prototype.GetMessage = function () {
        return "\u81F3\u5C11\u8F93\u5165" + this.minLength + "\u4E2A\u5B57\u7B26.";
    };
    VMinLength.prototype.Validate = function (input) {
        return input.length >= this.minLength;
    };
    VMinLength = __decorate([
        validator, 
        __metadata('design:paramtypes', [Number])
    ], VMinLength);
    return VMinLength;
})();
var VRequired = (function () {
    function VRequired() {
    }
    VRequired.prototype.GetMessage = function () {
        return "不能为空.";
    };
    VRequired.prototype.Validate = function (input) {
        return input != "";
    };
    VRequired = __decorate([
        validator, 
        __metadata('design:paramtypes', [])
    ], VRequired);
    return VRequired;
})();
//# sourceMappingURL=StringValidator.js.map