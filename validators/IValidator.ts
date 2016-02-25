interface IValidator<T> {
    Validate(input: T): boolean;
    message: string;
}

class ValidatePool {
    
    
    /**
     * 创建一个validator实例
     */
    GetValidator(name: string) {
        
    }
    
    
}
