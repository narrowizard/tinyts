"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../../core/http");
http_1.HttpUtils.Get("../ts/http_test.ts").then(function (res) {
    console.log(res.HttpStatus);
    console.log(res.ResponseBody);
}).catch(function (reason) {
    console.log(reason);
});
