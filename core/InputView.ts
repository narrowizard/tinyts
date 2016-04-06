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
 * InputView 包含验证方法的控件基类
 * Validate:()=>boolean,验证value,返回是否验证通过
 * abstract Value:()=>any,请在子类中实现该方法,获取控件的值
 * GetLastError()=>string,获取错误消息
 * 
 * 验证器使用方法:
 * 1.在Input对应的html元素上定义data-validate-$ValidateName,
 * 其中$ValidateName是验证器名称,并且ValidateName对应到html中为validate-name
 * 2.实现该验证器,加上@validator注解
 * 3.调用Input的Validate方法,得到验证结果
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


