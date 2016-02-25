var VMaxLength = (function () {
    function VMaxLength(maxLength) {
        this.maxLength = maxLength;
        this.message = "";
    }
    VMaxLength.prototype.Validate = function (input) {
        return input.length <= this.maxLength;
    };
    return VMaxLength;
})();
var VMinLength = (function () {
    function VMinLength(minLength) {
        this.minLength = minLength;
    }
    VMinLength.prototype.Validate = function (input) {
        return input.length >= this.minLength;
    };
    return VMinLength;
})();
var VRequired = (function () {
    function VRequired() {
    }
    VRequired.prototype.Validate = function (input) {
        return input != "";
    };
    return VRequired;
})();
//# sourceMappingURL=StringValidator.js.map