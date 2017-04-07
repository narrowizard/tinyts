import { TestModel } from '../model/validator_test';
import { validate } from 'class-validator';

export class ValidatorTestModel {
    constructor() {
        var aa = new TestModel();
        aa.name = "aa1111a";
        aa.phone = "15958049371";

        validate(aa).then(errors => {
            if (errors.length > 0) {
                console.log("validate error!");
                console.log(errors);
            } else {
                console.log("validate succ!");
            }
        });
    }
}

var aa = new ValidatorTestModel();