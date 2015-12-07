var TextBox = (function () {
    function TextBox(id) {
        this.id = id;
    }
    TextBox.prototype.LoadView = function () {
        this.target = $("#" + this.id);
        this.validationArea = this.target.parent().children(".validation");
    };
    TextBox.prototype.Value = function () {
        var value = this.target.val();
        if ($.trim(value) == "") {
            this.validationArea.css("display", "block");
            return null;
        }
        else {
            this.validationArea.css("display", "");
            return value;
        }
    };
    TextBox.prototype.SetValue = function (value) {
        this.target.val(value);
    };
    return TextBox;
})();
//# sourceMappingURL=textBox.js.map