var Button = (function () {
    function Button(id) {
        this.id = id;
    }
    Button.prototype.LoadView = function () {
        this.target = $("#" + this.id);
    };
    return Button;
})();
//# sourceMappingURL=button.js.map