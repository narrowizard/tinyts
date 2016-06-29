import {GenerateSetAccessor} from './AccessorGenerator';

export function MaxLength(maxLength: number) {
    return GenerateSetAccessor<string>((value) => {
        return value.length <= maxLength;
    }, (tagName) => {
        return `${tagName}最大长度为${maxLength}`;
    });
}

export function MinLength(minLength: number) {
    return GenerateSetAccessor<string>((value) => {
        return value.length >= minLength;
    }, (tagName) => {
        return `${tagName}最小长度为${minLength}`;
    });
}

export function Required() {
    return GenerateSetAccessor<string>((value) => {
        return value != "";
    }, (tagName) => {
        return `${tagName}不能为空`;
    });
}

export function Mobile() {
    return GenerateSetAccessor<string>((value) => {
        return /^1[3587]\d{9}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/.test(value);
    }, (tagName) => {
        return `${tagName}不是正确的手机号`;
    })
}