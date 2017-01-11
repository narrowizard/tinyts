import { HttpUtils } from '../../core/http';

HttpUtils.Get("../ts/http_test.ts").then((res) => {
    console.log(res.HttpStatus);
}).catch((reason) => {
    console.log(reason);
});