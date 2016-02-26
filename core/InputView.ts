/**
 * jquery ext: overload $.attr()
 *      getting all attributes of elements
 */
(function(old) {
    $.fn.attr = function() {
        if (arguments.length === 0) {
            if (this.length === 0) {
                return null;
            }

            var obj = {};
            $.each(this[0].attributes, function() {
                if (this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attr);

/**
 * InputView包含Validate方法
 */
abstract class InputView extends TextView {

    validators: IValidator<any>[];

    lastError: string;

    LoadView() {
        super.LoadView();
        this.validators = [];
        var attributes = this.target.attr();
        for (var temp in attributes) {
            if ((<string>temp).indexOf("data-validate") > -1) {
                var v = ValidatePool.GetValidator(temp, attributes[temp]);
                this.AddValidator(v);
            }
        }
    }

    AddValidator(validator: IValidator<any>) {
        this.validators.push(validator);
    }

    ClearValidator() {
        this.validators = [];
    }

    GetLastError(): string {
        return this.lastError;
    }

    Validate(): boolean {
        var value = this.Value();
        for (var i = 0; i < this.validators.length; i++) {
            if (!this.validators[i].Validate(value)) {
                this.lastError = this.validators[i].GetMessage();
                return false;
            }
        }
        return true;
    }

    abstract Value(): any;

}


