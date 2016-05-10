import {validator, IValidator} from './IValidator';

@validator
export class VMaxLength implements IValidator<string>{

    constructor(private maxLength: number) {
    }

    GetMessage() {
        return `最多输入${this.maxLength}个字符.`;
    }

    Validate(input: string): boolean {
        return input.length <= this.maxLength;
    }
}

@validator
export class VMinLength implements IValidator<string>{

    constructor(private minLength: number) {

    }

    GetMessage() {
        return `至少输入${this.minLength}个字符.`;
    }

    Validate(input: string): boolean {
        return input.length >= this.minLength;
    }

}

@validator
export class VRequired implements IValidator<string>{

    GetMessage() {
        return "不能为空.";
    }

    Validate(input: string): boolean {
        return input != "";
    }
}