import {validator, IValidator} from './IValidator';

@validator
export class VMaxLength implements IValidator<string>{

    constructor(private tag: string, private maxLength: number) {
    }

    GetMessage() {
        return `${this.tag}不能超过${this.maxLength}个字符.`;
    }

    Validate(input: string): boolean {
        return input.length <= this.maxLength;
    }
}

@validator
export class VMinLength implements IValidator<string>{

    constructor(private tag: string, private minLength: number) {

    }

    GetMessage() {
        return `${this.tag}至少${this.minLength}个字符.`;
    }

    Validate(input: string): boolean {
        return input.length >= this.minLength;
    }

}

@validator
export class VRequired implements IValidator<string>{

    constructor(private tag: string) {

    }

    GetMessage() {
        return `${this.tag}不能为空.`;
    }

    Validate(input: string): boolean {
        return input != "";
    }
}

export function Register() {

};