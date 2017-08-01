"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_test_1 = require("../model/validator_test");
var class_validator_1 = require("class-validator");
var ValidatorTestModel = (function () {
    function ValidatorTestModel() {
        var aa = new validator_test_1.TestModel();
        aa.name = "aa1111a";
        aa.phone = "15958049371";
        class_validator_1.validate(aa).then(function (errors) {
            if (errors.length > 0) {
                console.log("validate error!");
                console.log(errors);
            }
            else {
                console.log("validate succ!");
            }
        });
    }
    return ValidatorTestModel;
}());
exports.ValidatorTestModel = ValidatorTestModel;
var aa = new ValidatorTestModel();
