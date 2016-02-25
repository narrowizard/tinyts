/**
 * InputView包含Validate方法
 */
abstract class InputView extends TextView {

    validators: IValidator<any>[];

    lastError: string;

    LoadView() {
        super.LoadView();
        this.validators = [];
        
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
                this.lastError = this.validators[i].message;
                return false;
            }
        }
        return true;
    }

    abstract Value(): any;

}


