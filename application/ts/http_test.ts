import { HttpUtils, HttpResponse } from '../../core/http';

HttpUtils.Get("../ts/http_test.ts").then((res) => {
    console.log(res.HttpStatus);
    console.log(res.ResponseBody);
}).catch((reason) => {
    console.log(reason);
});