import { Length, IsMobilePhone } from 'class-validator'

export class TestModel {

    @Length(5, 10)
    name: string;

    @IsMobilePhone('zh-CN')
    phone: string;

    @Length(1, 2)
    subname: string;

}