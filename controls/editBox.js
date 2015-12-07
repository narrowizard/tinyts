var EditDialog = (function () {
    function EditDialog(id) {
        this.id = id;
    }
    EditDialog.prototype.Switch = function () {
        if (this.state) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    EditDialog.prototype.hide = function () {
        this.instance.css("display", "none");
        this.state = false;
    };
    EditDialog.prototype.show = function () {
        this.instance.css("display", "block");
        this.state = true;
    };
    EditDialog.prototype.LoadView = function () {
        this.instance = $("#" + this.id);
    };
    return EditDialog;
})();
//# sourceMappingURL=editBox.js.map