class VMaxLength implements IValidator<string>{

    constructor(private maxLength: number) {
        this.message = "";
    }

    message: string;

    Validate(input: string): boolean {
        return input.length <= this.maxLength;
    }
}

class VMinLength implements IValidator<string>{

    constructor(private minLength: number) {

    }

    message: string;

    Validate(input: string): boolean {
        return input.length >= this.minLength;
    }

}

class VRequired implements IValidator<string>{

    message: string;

    Validate(input: string): boolean {
        return input != "";
    }
}